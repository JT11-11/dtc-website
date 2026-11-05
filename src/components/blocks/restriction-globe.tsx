"use client";

import dynamic from "next/dynamic";
import Papa from "papaparse";
import { ExternalLink, RotateCcw, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  CATEGORY_COLORS,
  categoryForStatus,
  RESTRICTION_CATEGORIES,
  type RestrictionCategory,
  type RestrictionRecord,
  type WorldTopology,
} from "@/lib/adci-restrictions";

const GlobeScene = dynamic(() => import("./restriction-globe-scene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[360px] items-center justify-center text-sm text-muted-foreground">
      Preparing the map
    </div>
  ),
});

function parseRecords(csv: string): RestrictionRecord[] {
  const parsed = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });
  const records = new Map<string, RestrictionRecord>();

  for (const row of parsed.data) {
    const countryCode = (row.country_code ?? "").trim().toUpperCase();
    const country = (row.country ?? "").trim();
    if (!countryCode || !country || records.has(countryCode)) continue;
    records.set(countryCode, {
      country,
      countryCode,
      status: (row.status ?? "").trim(),
      lawName: (row.law_name ?? "").trim(),
      ageAffected: (row.age_affected ?? "").trim(),
      description: (row.description ?? "").trim(),
      region: (row.region ?? "").trim(),
      year: Number(row.year) || 0,
      sourceUrl: (row.source_url ?? "").trim(),
    });
  }

  return [...records.values()].sort((a, b) => a.country.localeCompare(b.country));
}

export function RestrictionGlobe() {
  const [records, setRecords] = useState<RestrictionRecord[]>([]);
  const [topology, setTopology] = useState<WorldTopology | null>(null);
  const [activeCategories, setActiveCategories] = useState(
    new Set<RestrictionCategory>(RESTRICTION_CATEGORIES),
  );
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [resetView, setResetView] = useState(0);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch("/data/adci-restrictions.csv").then((response) => {
        if (!response.ok) throw new Error("Could not load the restriction export.");
        return response.text();
      }),
      fetch("/data/world-110m.json").then((response) => {
        if (!response.ok) throw new Error("Could not load the world map.");
        return response.json() as Promise<WorldTopology>;
      }),
    ])
      .then(([csv, world]) => {
        if (cancelled) return;
        const parsed = parseRecords(csv);
        setRecords(parsed);
        setTopology(world);
        setSelectedCode(parsed[0]?.countryCode ?? null);
      })
      .catch(() => {
        if (!cancelled) setLoadError("The restriction map could not be loaded.");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleRecords = useMemo(
    () =>
      records.filter((record) =>
        activeCategories.has(categoryForStatus(record.status)),
      ),
    [records, activeCategories],
  );
  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return visibleRecords.filter((record) =>
      `${record.country} ${record.region} ${record.status} ${record.lawName}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [visibleRecords, query]);
  const selectedRecord = records.find(
    (record) => record.countryCode === selectedCode,
  );
  const categoryCounts = useMemo(
    () =>
      Object.fromEntries(
        RESTRICTION_CATEGORIES.map((category) => [
          category,
          records.filter(
            (record) => categoryForStatus(record.status) === category,
          ).length,
        ]),
      ) as Record<RestrictionCategory, number>,
    [records],
  );

  function toggleCategory(category: RestrictionCategory) {
    setActiveCategories((current) => {
      const next = new Set(current);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.8fr)]">
      <section className="min-w-0 overflow-hidden rounded-lg border border-border bg-[#e8e6de]">
        <div className="flex items-center justify-between border-b border-[#d6d3c9] px-4 py-3 sm:px-5">
          <div>
            <p className="text-sm font-semibold text-foreground">World view</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {visibleRecords.length} countries shown
            </p>
          </div>
          <button
            aria-label="Reset globe view"
            className="inline-flex size-9 items-center justify-center rounded-md border border-[#d2cfc5] text-foreground transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--un-blue)]"
            onClick={() => setResetView((value) => value + 1)}
            title="Reset globe view"
            type="button"
          >
            <RotateCcw aria-hidden="true" size={16} />
          </button>
        </div>
        <div className="relative h-[380px] sm:h-[500px] lg:h-[600px]">
          {loadError ? (
            <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
              {loadError}
            </div>
          ) : topology ? (
            <GlobeScene
              key={resetView}
              onSelect={setSelectedCode}
              records={visibleRecords}
              selectedCode={selectedCode}
              topology={topology}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Loading country data
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-[#d6d3c9] px-4 py-3 sm:px-5">
          {RESTRICTION_CATEGORIES.map((category) => (
            <button
              aria-pressed={activeCategories.has(category)}
              className={`inline-flex items-center gap-2 text-xs transition-opacity ${
                activeCategories.has(category)
                  ? "text-foreground"
                  : "text-muted-foreground opacity-50"
              }`}
              key={category}
              onClick={() => toggleCategory(category)}
              type="button"
            >
              <span
                aria-hidden="true"
                className="size-2.5 rounded-full"
                style={{ backgroundColor: CATEGORY_COLORS[category] }}
              />
              {category}
              <span className="tabular-nums text-muted-foreground">
                {categoryCounts[category]}
              </span>
            </button>
          ))}
        </div>
      </section>

      <aside className="flex min-h-[520px] min-w-0 flex-col rounded-lg border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <p className="text-sm font-semibold text-foreground">Country record</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Select a marker or a country in the index.
          </p>
        </div>
        <div className="min-h-[192px] border-b border-border px-5 py-5">
          {selectedRecord ? (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {selectedRecord.region} · {selectedRecord.year}
                  </p>
                  <h2 className="mt-2 text-2xl text-foreground">
                    {selectedRecord.country}
                  </h2>
                </div>
                <span
                  className="mt-1 size-3 shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      CATEGORY_COLORS[categoryForStatus(selectedRecord.status)],
                  }}
                />
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">
                {selectedRecord.lawName || selectedRecord.status.replaceAll("_", " ")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {selectedRecord.ageAffected || "No specific age threshold"}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {selectedRecord.description}
              </p>
              {selectedRecord.sourceUrl && (
                <a
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:text-[var(--un-blue)]"
                  href={selectedRecord.sourceUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open source <ExternalLink aria-hidden="true" size={14} />
                </a>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Choose a country to inspect its latest entry.
            </p>
          )}
        </div>
        <div className="flex min-h-0 flex-1 flex-col">
          <label className="relative mx-4 my-3 block">
            <Search
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={15}
            />
            <input
              className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--un-blue)]"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search countries"
              type="search"
              value={query}
            />
          </label>
          <div className="border-t border-border px-5 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Country index <span className="ml-1 tabular-nums">{filteredRecords.length}</span>
          </div>
          <ul className="min-h-0 flex-1 overflow-y-auto">
            {filteredRecords.map((record) => {
              const selected = record.countryCode === selectedCode;
              return (
                <li key={record.countryCode}>
                  <button
                    aria-current={selected ? "true" : undefined}
                    className={`flex w-full items-center justify-between gap-3 border-t border-border/70 px-5 py-3 text-left transition-colors hover:bg-muted/60 ${
                      selected ? "bg-muted/70" : "bg-transparent"
                    }`}
                    onClick={() => setSelectedCode(record.countryCode)}
                    type="button"
                  >
                    <span className="min-w-0 truncate text-sm text-foreground">
                      {record.country}
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                      <span
                        aria-hidden="true"
                        className="size-2 rounded-full"
                        style={{
                          backgroundColor:
                            CATEGORY_COLORS[categoryForStatus(record.status)],
                        }}
                      />
                      {record.ageAffected.replace(/[()]/g, "") || record.status.replaceAll("_", " ")}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
}