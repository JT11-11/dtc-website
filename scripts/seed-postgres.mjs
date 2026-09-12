// Generates PostgreSQL INSERTs for db/schema.prisma from the validated CSV.
// Zero dependencies — plain node. Run: node scripts/seed-postgres.mjs > seed.sql
// Status values are normalized with the same rules as lib/country-iso.ts
// (Implemented → Passed), so seed.sql matches what the API serves today.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const csvPath = path.join(root, "public", "data", "restrictions.csv");

// Minimal CSV parser honoring quotes (the Description/Source fields are quoted).
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

function esc(v) {
  return "'" + String(v ?? "").replace(/'/g, "''") + "'";
}

function normalizeStatus(raw) {
  const s = String(raw ?? "").trim().toLowerCase();
  if (
    s.startsWith("pass") || s.startsWith("implem") ||
    s.startsWith("enact") || s.startsWith("in force") || s === "active"
  ) return "Passed";
  if (s.startsWith("pend")) return "Pending";
  return "Proposed";
}

const text = fs.readFileSync(csvPath, "utf-8").replace(/^\uFEFF/, "");
const all = parseRows(text);
// Row 1 = free-text title, row 2 = header.
const header = all[1].map((h) => h.trim());
const idx = (name) => header.indexOf(name);

const out = [];
out.push("BEGIN;");
out.push("TRUNCATE \"Source\", \"Measure\" RESTART IDENTITY CASCADE;");
for (const r of all.slice(2)) {
  const country = (r[idx("Country")] ?? "").replace(/\s+/g, " ").trim();
  if (!country) continue;
  const law = (r[idx("Law Name")] ?? "").trim();
  const date = (r[idx("Date")] ?? "").trim();
  const status = normalizeStatus(r[idx("Status of Implementation")]);
  const ages = (r[idx("Ages Affected")] ?? "").trim();
  const description = (r[idx("Description")] ?? "").trim();
  const sources = (r[idx("Source")] ?? "")
    .split(/[,\s]+/).map((s) => s.trim()).filter((s) => /^https?:\/\//.test(s));
  out.push(
    `INSERT INTO "Measure" (country, law, date, status, ages, description) VALUES (${esc(country)}, ${esc(law)}, ${esc(date)}, '${status}', ${esc(ages)}, ${esc(description)}) RETURNING id;`,
  );
  for (const src of sources) {
    out.push(
      `INSERT INTO "Source" (url, "measureId") VALUES (${esc(src)}, (SELECT currval(pg_get_serial_sequence('"Measure"','id'))));`,
    );
  }
}
out.push("COMMIT;");
console.log(out.join("\n"));
