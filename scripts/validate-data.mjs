// Data-integrity gate for the Restriction Database + work catalogue.
// Zero dependencies — runs in CI before lint/typecheck/build.
// Mirrors the rules in lib/country-iso.ts without importing TS:
//   - every CSV country must have a mapping key (else it silently drops
//     to table-only via findUnmappedCountries)
//   - raw statuses must be explicit (unknown values would all collapse
//     to "Proposed" via normalizeStatus — fail instead)
//   - no legacy misspellings, no empty required fields
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const errors = [];
const warnings = [];
const fail = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

function parseRows(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((v) => v.trim() !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows;
}

// --- restrictions.csv -------------------------------------------------------
const csvPath = path.join(root, "public", "data", "restrictions.csv");
const raw = fs.readFileSync(csvPath, "utf-8").replace(/^\uFEFF/, "");
const all = parseRows(raw);
const header = all[1].map((h) => h.trim());
const REQUIRED = ["Country", "Law Name", "Status of Implementation", "Description", "Source"];
for (const col of REQUIRED) {
  if (!header.includes(col)) fail(`CSV missing required column: ${col}`);
}
const idx = (n) => header.indexOf(n);
const dataRows = all.slice(2).filter((r) => (r[idx("Country")] ?? "").trim() !== "");
if (dataRows.length < 40) fail(`CSV has only ${dataRows.length} data rows (expected 40+)`);

const ALLOWED_RAW_STATUS = new Set(["Implemented", "Pending", "Proposed", "Passed"]);
const countries = new Set();
let sourceless = 0;
for (const [i, r] of dataRows.entries()) {
  const line = i + 3;
  const country = (r[idx("Country")] ?? "").replace(/\s+/g, " ").trim();
  countries.add(country);
  if (country === "Philipines") fail(`line ${line}: legacy misspelling "Philipines" — use "Philippines"`);
  if (!r[idx("Law Name")]?.trim()) fail(`line ${line} (${country}): empty Law Name`);
  const status = (r[idx("Status of Implementation")] ?? "").trim();
  if (!ALLOWED_RAW_STATUS.has(status)) {
    fail(`line ${line} (${country}): unknown status "${status}" — add it to normalizeStatus() explicitly`);
  }
  const urls = (r[idx("Source")] ?? "").split(/[,\s]+/).map((s) => s.trim()).filter((s) => /^https?:\/\//.test(s));
  if (urls.length === 0) { sourceless++; warn(`line ${line} (${country}): no source URL`); }
}
if (sourceless > 5) fail(`${sourceless} rows have no source URL (max 5 tolerated)`);

// Every CSV country must map to an ISO id in lib/country-iso.ts.
const isoSrc = fs.readFileSync(path.join(root, "lib", "country-iso.ts"), "utf-8");
for (const c of [...countries].sort()) {
  const keyForms = [`"${c}"`, `"${c}":`, `${c}:`];
  if (!keyForms.some((k) => isoSrc.includes(k))) {
    fail(`country "${c}" has no key in COUNTRY_TO_ISO — it would render table-only`);
  }
}

// --- lib/work.ts ------------------------------------------------------------
const workSrc = fs.readFileSync(path.join(root, "lib", "work.ts"), "utf-8");
const ids = [...workSrc.matchAll(/^\s*id:\s*"([^"]+)"/gm)].map((m) => m[1]);
if (ids.length === 0) fail("lib/work.ts: no work item ids found");
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length) fail(`lib/work.ts: duplicate ids: ${[...new Set(dupes)].join(", ")}`);
const numbers = [...workSrc.matchAll(/^\s*number:\s*"([^"]+)"/gm)].map((m) => m[1]);
const dupeNums = numbers.filter((n, i) => numbers.indexOf(n) !== i);
if (dupeNums.length) fail(`lib/work.ts: duplicate numbers: ${[...new Set(dupeNums)].join(", ")}`);

// work-dtc.tsx must consume the catalogue, not carry its own copy.
const showcase = fs.readFileSync(path.join(root, "components", "blocks", "work-dtc.tsx"), "utf-8");
if (showcase.includes("const workItems")) {
  fail("work-dtc.tsx still defines its own workItems — import from @/lib/work");
}

// --- report -----------------------------------------------------------------
for (const w of warnings) console.warn("warn:", w);
if (errors.length) {
  for (const e of errors) console.error("error:", e);
  console.error(`\nvalidate-data: FAILED (${errors.length} errors, ${warnings.length} warnings)`);
  process.exit(1);
}
console.log(`validate-data: OK (${dataRows.length} measures, ${countries.size} countries, ${ids.length} work items, ${warnings.length} warnings)`);
