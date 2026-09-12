// Server-side loader for the Global Teen Restriction Database.
//
// Reads + validates public/data/restrictions.csv once per server instance
// (module-level cache) so every consumer — /api/restrictions, /api/search,
// /work/database, the validate-data script — gets the same validated rows.
// Row 1 of the CSV is a free-text title, row 2 is the header.
import { promises as fs } from "node:fs";
import path from "node:path";
import Papa from "papaparse";
import {
  findUnmappedCountries,
  isoForCountry,
  normalizeCountry,
  normalizeStatus,
  type Restriction,
} from "./country-iso";

export interface RestrictionsPayload {
  measures: Restriction[];
  /** CSV countries with no ISO mapping — table-only, flagged not dropped. */
  unmapped: string[];
  totalMeasures: number;
  filteredMeasures: number;
}

export interface LoadedRestrictions {
  measures: Restriction[];
  unmapped: string[];
  totalMeasures: number;
}

let cache: LoadedRestrictions | null = null;

export function clearRestrictionsCache() {
  cache = null;
}

export async function loadRestrictions(): Promise<LoadedRestrictions> {
  if (cache) return cache;

  const csvPath = path.join(
    process.cwd(),
    "public",
    "data",
    "restrictions.csv",
  );
  const text = await fs.readFile(csvPath, "utf-8");
  const firstNewline = text.indexOf("\n");
  const body = firstNewline >= 0 ? text.slice(firstNewline + 1) : text;

  const parsed = Papa.parse<Record<string, string>>(body, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h: string) => h.trim(),
  });

  const measures: Restriction[] = [];
  for (const r of parsed.data) {
    const country = normalizeCountry(r["Country"] ?? "");
    if (!country) continue;
    const sources = (r["Source"] ?? "")
      .split(/[,\s]+/)
      .map((s: string) => s.trim())
      .filter((s: string) => /^https?:\/\//.test(s));
    measures.push({
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

  cache = {
    measures,
    unmapped: findUnmappedCountries(measures),
    totalMeasures: measures.length,
  };
  if (cache.unmapped.length > 0) {
    console.warn(
      "[restrictions] CSV countries with no ISO mapping (table-only):",
      cache.unmapped,
    );
  }
  return cache;
}
