/*
 * One-off media curation script.
 * Reads the raw photos the team dropped into /public/images, auto-rotates them
 * (bakes EXIF orientation so iPhone shots are upright in every browser),
 * resizes + compresses for web, and writes a curated set into
 * /public/images/team and /public/images/un with clean, purposeful names.
 *
 * Run: node scripts/process-images.cjs
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const IMG = path.join(__dirname, "..", "public", "images");
const TEAM = path.join(IMG, "team");
const UN = path.join(IMG, "un");
fs.mkdirSync(TEAM, { recursive: true });
fs.mkdirSync(UN, { recursive: true });

// [source, destination, maxDimension, quality]
const jobs = [
  // ── Team headshots (square-ish, smaller) ──────────────────────────
  ["adityapic.jpg", "team/aditya.jpg", 800, 82],
  ["ahaanpic.jpg", "team/ahaan.jpg", 800, 82],
  ["jasperpic.jpg", "team/jasper.jpg", 800, 82],
  ["tejaspic.jpg", "team/tejas.jpg", 800, 82],
  ["tini.jpeg", "team/tini.jpg", 800, 82],

  // ── Curated UN / event photos (auto-rotated, web-sized) ───────────
  ["un-flag-portrait.jpg.jpg", "un/flag-portrait.jpg", 1600, 80], // Aditya w/ UN flag + emblem
  ["un-official-selfie.jpg.jpg", "un/official-meeting.jpg", 1600, 80], // w/ UN official
  ["un-window-silhouette.jpg.jpg", "un/window.jpg", 1600, 80], // silhouette over UN grounds
  ["un-sdg-exhibit.jpg.jpg", "un/sdg-exhibit.jpg", 1600, 80], // Hello Kitty 17 SDGs
  ["un-group-photo.jpg.JPG", "un/group.jpg", 1600, 82], // DTC group in UN lobby
  ["IMG_3429.jpg", "un/ga-hall.jpg", 1600, 80], // UN General Assembly hall
  ["IMG_3415.jpg", "un/hlpf.jpg", 1600, 80], // HLPF Conf Room 4 + DTC framework doc
  ["IMG_3444.jpg", "un/unga.jpg", 1600, 80], // at the #UNGA sign
  ["IMG_3381.jpg", "un/flags-duo.jpg", 1600, 80], // two members at UN flag row
  ["IMG_3453.jpg", "un/sdg-water.jpg", 1600, 80], // holding SDG 14 Life Below Water
  ["IMG_3431.jpg", "un/conf-room.jpg", 1600, 80], // inside a UN conference room
];

(async () => {
  for (const [src, dest, max, q] of jobs) {
    const input = path.join(IMG, src);
    const output = path.join(IMG, dest);
    if (!fs.existsSync(input)) {
      console.log("SKIP (missing):", src);
      continue;
    }
    await sharp(input)
      .rotate() // auto-orient from EXIF, then strip the tag
      .resize(max, max, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: q, mozjpeg: true })
      .toFile(output);
    const { size } = fs.statSync(output);
    const meta = await sharp(output).metadata();
    console.log(
      `OK  ${dest.padEnd(24)} ${meta.width}x${meta.height}  ${(size / 1024).toFixed(0)}KB`
    );
  }
  console.log("\nDone.");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
