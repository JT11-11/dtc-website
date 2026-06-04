"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type {
  Feature,
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
} from "geojson";
import Papa from "papaparse";
import { ExternalLink } from "lucide-react";
import {
  isoForCountry,
  normalizeCountry,
  normalizeStatus,
  findUnmappedCountries,
  STATUS_COLOR,
  NOT_ON_110M_MAP,
  type Restriction,
  type RestrictionStatus,
} from "@/lib/country-iso";

const STATUSES: RestrictionStatus[] = ["Passed", "Pending", "Proposed"];

type WorldTopology = {
  objects: { countries: unknown };
} & Record<string, unknown>;

// Parse the raw CSV text. Row 1 is a free-text title, row 2 is the header.
function parseCsv(text: string): Restriction[] {
  const firstNewline = text.indexOf("\n");
  const body = firstNewline >= 0 ? text.slice(firstNewline + 1) : text;
  const parsed = Papa.parse<Record<string, string>>(body, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  });
  const rows: Restriction[] = [];
  for (const r of parsed.data) {
    const country = normalizeCountry(r["Country"] ?? "");
    if (!country) continue;
    const sources = (r["Source"] ?? "")
      .split(/[,\s]+/)
      .map((s) => s.trim())
      .filter((s) => /^https?:\/\//.test(s));
    rows.push({
      country,
      iso: isoForCountry(country),
      law: (r["Law Name"] ?? "").trim(),
      date: (r["Date"] ?? "").trim(),
      status: normalizeStatus(r["Status of Implementation"] ?? ""),
      ages: (r["Ages Affected"] ?? "").trim(),
      description: (r["Description"] ?? "").trim(),
      sources,
    });
  }
  return rows;
}

export function RestrictionMap() {
  const [rows, setRows] = useState<Restriction[]>([]);
  const [geographies, setGeographies] = useState<
    Feature<Geometry, GeoJsonProperties>[]
  >([]);
  const [activeFilters, setActiveFilters] = useState<Set<RestrictionStatus>>(
    new Set(STATUSES),
  );
  const [selectedIso, setSelectedIso] = useState<string | null>(null);
  const [hover, setHover] = useState<{
    iso: string;
    x: number;
    y: number;
  } | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Load both datasets on the client.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [csvText, topo] = await Promise.all([
          fetch("/data/restrictions.csv").then((r) => r.text()),
          fetch("/data/world-110m.json").then(
            (r) => r.json() as Promise<WorldTopology>,
          ),
        ]);
        if (cancelled) return;
        const parsed = parseCsv(csvText);
        // Flag (don't guess) any country we couldn't map to a geography.
        const unmapped = findUnmappedCountries(parsed);
        if (unmapped.length) {
          console.warn(
            "[RestrictionMap] CSV countries with no ISO mapping (table-only):",
            unmapped,
          );
        }
        const fc = feature(
          topo as never,
          (topo as { objects: { countries: never } }).objects.countries,
        ) as unknown as FeatureCollection<Geometry, GeoJsonProperties>;
        setRows(parsed);
        setGeographies(fc.features);
      } catch (err) {
        if (!cancelled) {
          console.error("[RestrictionMap] failed to load data", err);
          setLoadError("Could not load the restriction data.");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // iso -> the restriction record(s) for that country.
  const byIso = useMemo(() => {
    const m = new Map<string, Restriction[]>();
    for (const r of rows) {
      if (!r.iso) continue;
      const list = m.get(r.iso) ?? [];
      list.push(r);
      m.set(r.iso, list);
    }
    return m;
  }, [rows]);

  // The "headline" status for a country (Passed beats Pending beats Proposed).
  const statusForIso = (iso: string): RestrictionStatus | null => {
    const list = byIso.get(iso);
    if (!list || !list.length) return null;
    for (const s of STATUSES) if (list.some((r) => r.status === s)) return s;
    return list[0].status;
  };

  const isoVisible = (iso: string): boolean => {
    const s = statusForIso(iso);
    return s !== null && activeFilters.has(s);
  };

  const projection = useMemo(
    () => geoNaturalEarth1().scale(170).translate([490, 320]),
    [],
  );
  const pathGen = useMemo(() => geoPath(projection), [projection]);

  const counts = useMemo(() => {
    const c: Record<RestrictionStatus, number> = {
      Passed: 0,
      Pending: 0,
      Proposed: 0,
    };
    const countries = new Set<string>();
    for (const r of rows) {
      c[r.status] += 1;
      countries.add(r.country);
    }
    return { byStatus: c, countries: countries.size, measures: rows.length };
  }, [rows]);

  const toggleFilter = (s: RestrictionStatus) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  };

  const visibleRows = useMemo(
    () =>
      rows
        .filter((r) => activeFilters.has(r.status))
        .sort((a, b) => a.country.localeCompare(b.country)),
    [rows, activeFilters],
  );

  const selectedRows = selectedIso ? (byIso.get(selectedIso) ?? []) : [];
  const hoverRows = hover ? (byIso.get(hover.iso) ?? []) : [];

  return (
    <div className="w-full">
      {/* Stat band — verified figures from the DTC YPL Manifest. */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border">
        {[
          { n: `${counts.countries || 42}`, l: "countries with bans or restrictions" },
          { n: "0%", l: "developed with meaningful youth consultation" },
          { n: "100%", l: "of affected teens are subject to them" },
        ].map((s) => (
          <div key={s.l} className="bg-card px-6 py-7">
            <div className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--un-blue)]">
              {s.n}
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-snug">
              {s.l}
            </p>
          </div>
        ))}
      </div>

      {/* Legend + filters (also drive the table). */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mr-1">
          Filter
        </span>
        {STATUSES.map((s) => {
          const on = activeFilters.has(s);
          return (
            <button
              key={s}
              type="button"
              onClick={() => toggleFilter(s)}
              aria-pressed={on}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                on
                  ? "border-foreground/20 bg-card text-foreground"
                  : "border-border bg-transparent text-muted-foreground opacity-60"
              }`}
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: STATUS_COLOR[s] }}
              />
              {s}
              <span className="text-muted-foreground">
                {counts.byStatus[s]}
              </span>
            </button>
          );
        })}
      </div>

      {loadError ? (
        <p className="mt-8 text-sm text-muted-foreground">{loadError}</p>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* The map (visual layer). Decorative — the table below is canonical. */}
          <div className="relative rounded-2xl border border-border bg-card p-2">
            <svg
              ref={svgRef}
              viewBox="0 0 980 560"
              className="h-auto w-full"
              role="img"
              aria-label="World map of teen social-media restrictions by country"
              onMouseLeave={() => setHover(null)}
            >
              <rect width="980" height="560" fill="transparent" />
              {geographies.map((geo, i) => {
                const iso = String(geo.id ?? "");
                const hasData = byIso.has(iso);
                const visible = hasData && isoVisible(iso);
                const status = visible ? statusForIso(iso) : null;
                const d = pathGen(geo) ?? undefined;
                const isSelected = selectedIso === iso;
                return (
                  <path
                    key={iso || i}
                    d={d}
                    fill={
                      status ? STATUS_COLOR[status] : "var(--muted)"
                    }
                    fillOpacity={visible ? 0.9 : 0.5}
                    stroke="var(--background)"
                    strokeWidth={isSelected ? 1.5 : 0.5}
                    style={{
                      cursor: hasData ? "pointer" : "default",
                      outline: "none",
                    }}
                    tabIndex={hasData ? 0 : -1}
                    role={hasData ? "button" : undefined}
                    aria-label={
                      hasData
                        ? `${byIso.get(iso)?.[0].country}: ${status ?? "filtered out"}`
                        : undefined
                    }
                    onMouseMove={(e) => {
                      if (!hasData) return;
                      const rect = svgRef.current?.getBoundingClientRect();
                      setHover({
                        iso,
                        x: e.clientX - (rect?.left ?? 0),
                        y: e.clientY - (rect?.top ?? 0),
                      });
                    }}
                    onClick={() =>
                      hasData &&
                      setSelectedIso((cur) => (cur === iso ? null : iso))
                    }
                    onKeyDown={(e) => {
                      if (hasData && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        setSelectedIso((cur) => (cur === iso ? null : iso));
                      }
                    }}
                  />
                );
              })}
            </svg>

            {/* Hover tooltip */}
            {hover && hoverRows.length > 0 && (
              <div
                className="pointer-events-none absolute z-10 max-w-[240px] rounded-lg border border-border bg-popover px-3 py-2 text-popover-foreground shadow-lg"
                style={{
                  left: Math.min(hover.x + 12, 720),
                  top: hover.y + 12,
                }}
              >
                <p className="text-sm font-semibold">{hoverRows[0].country}</p>
                <p className="text-xs text-muted-foreground">
                  {hoverRows[0].law}
                </p>
                <p className="mt-1 text-xs">
                  <span
                    className="mr-1 inline-block h-2 w-2 rounded-full align-middle"
                    style={{
                      backgroundColor: STATUS_COLOR[hoverRows[0].status],
                    }}
                  />
                  {hoverRows[0].status}
                  {hoverRows[0].ages ? ` · ${hoverRows[0].ages}` : ""}
                </p>
              </div>
            )}
          </div>

          {/* Detail panel */}
          <div className="rounded-2xl border border-border bg-card p-5">
            {selectedRows.length > 0 ? (
              <div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  {selectedRows[0].country}
                </h3>
                <div className="mt-4 space-y-5">
                  {selectedRows.map((r, i) => (
                    <div
                      key={i}
                      className="border-t border-border pt-4 first:border-t-0 first:pt-0"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: STATUS_COLOR[r.status] }}
                        />
                        <span className="text-sm font-semibold text-foreground">
                          {r.status}
                        </span>
                        {r.ages && (
                          <span className="text-sm text-muted-foreground">
                            · {r.ages}
                          </span>
                        )}
                        {r.date && (
                          <span className="ml-auto text-xs text-muted-foreground">
                            {r.date}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {r.law}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {r.description}
                      </p>
                      {r.sources.map((src, si) => (
                        <a
                          key={si}
                          href={src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[var(--un-blue)] hover:underline"
                        >
                          Source {r.sources.length > 1 ? si + 1 : ""}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <p className="text-sm text-muted-foreground">
                  Select a country on the map — or any row in the table — to read
                  the law, who it affects, and the primary source.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Canonical, accessible data table. */}
      <div className="mt-10">
        <div className="flex items-baseline justify-between">
          <h3 className="text-lg font-bold tracking-tight text-foreground">
            All {counts.measures || 48} measures
          </h3>
          <p className="text-sm text-muted-foreground">
            {visibleRows.length} shown
          </p>
        </div>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Country</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Ages</th>
                <th className="px-4 py-3 font-semibold">Law</th>
                <th className="px-4 py-3 font-semibold">Source</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((r, i) => (
                <tr
                  key={`${r.country}-${i}`}
                  className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer"
                  onClick={() => r.iso && setSelectedIso(r.iso)}
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {r.country}
                    {r.iso && NOT_ON_110M_MAP.has(r.iso) && (
                      <span
                        className="ml-1 align-middle text-[10px] text-muted-foreground"
                        title="Too small to render on the map at this resolution"
                      >
                        (table only)
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: STATUS_COLOR[r.status] }}
                      />
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                    {r.ages || "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.law}</td>
                  <td className="px-4 py-3">
                    {r.sources[0] ? (
                      <a
                        href={r.sources[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[var(--un-blue)] hover:underline"
                      >
                        Link <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RestrictionMap;
