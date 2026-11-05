// Maps the country names exactly as they appear in
// `public/data/restrictions.csv` (the DTC Global Teen Restriction Database)
// to ISO 3166-1 numeric codes, zero-padded to 3 digits to match the
// `id` values used by world-atlas `countries-110m.json`.
//
// Source of truth = the CSV. If a country name in the CSV is not a key here,
// it will be surfaced by `findUnmappedCountries()` so we flag it instead of
// silently dropping it from the map.
//
// NOTE: Malta (470) and Singapore (702) are intentionally mapped but do NOT
// exist as geometries in the 110m world atlas (too small to render at that
// resolution). They appear in the data table but not on the map — expected.
export const COUNTRY_TO_ISO: Record<string, string> = {
  Australia: "036",
  Austria: "040",
  Belgium: "056",
  Bulgaria: "100",
  Canada: "124",
  China: "156",
  Croatia: "191",
  Cyprus: "196",
  "Czech Republic": "203",
  Denmark: "208",
  Estonia: "233",
  Finland: "246",
  France: "250",
  Germany: "276",
  Greece: "300",
  Hungary: "348",
  Iceland: "352",
  India: "356",
  Indonesia: "360",
  Ireland: "372",
  Italy: "380",
  Latvia: "428",
  Lithuania: "440",
  Luxembourg: "442",
  Malta: "470",
  Nepal: "524",
  Netherlands: "528",
  "New Zealand": "554",
  Norway: "578",
  Pakistan: "586",
  Philipines: "608", // (sic) — CSV spelling; ISO 608 = Philippines
  Poland: "616",
  Portugal: "620",
  Singapore: "702",
  Slovakia: "703",
  Slovenia: "705",
  Spain: "724",
  Sweden: "752",
  "Türkiye": "792",
  "United Kingdom": "826",
  "United States": "840",
  Vietnam: "704",
};

// Countries that have a code here but are absent from the 110m atlas geometry
// set — they render in the table only, never on the map.
export const NOT_ON_110M_MAP = new Set(["470", "702"]);

export type RestrictionStatus = "Passed" | "Pending" | "Proposed";

export interface Restriction {
  country: string;
  iso: string | null; // ISO numeric (atlas id) or null if unmapped
  law: string;
  date: string;
  status: RestrictionStatus;
  ages: string;
  description: string;
  sources: string[]; // one or more source URLs
}

// Status → brand color tokens (kept in sync with the map legend + table chips).
export const STATUS_COLOR: Record<RestrictionStatus, string> = {
  Passed: "var(--un-blue)",
  Pending: "var(--sky-blue)",
  Proposed: "var(--sun-gold)",
};

export function normalizeCountry(raw: string): string {
  return raw.replace(/\s+/g, " ").trim();
}

export function isoForCountry(raw: string): string | null {
  return COUNTRY_TO_ISO[normalizeCountry(raw)] ?? null;
}

export function normalizeStatus(raw: string): RestrictionStatus {
  const s = raw.trim().toLowerCase();
  if (s.startsWith("pass")) return "Passed";
  if (s.startsWith("pend")) return "Pending";
  return "Proposed";
}

// Returns CSV country names that have no ISO mapping — call after parsing to
// log/flag them rather than guessing.
export function findUnmappedCountries(rows: Restriction[]): string[] {
  return Array.from(
    new Set(rows.filter((r) => r.iso === null).map((r) => r.country)),
  );
}
