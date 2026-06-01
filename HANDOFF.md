# Handoff — Video & Final Photo Stage

## What is done

All fabricated content has been removed and real media is wired in. The build passes (`npm run build` — all 6 routes, TypeScript clean).

### Media already processed
`scripts/process-images.cjs` was run with `sharp` and produced:
- `/public/images/team/` — 5 real headshots: `aditya.jpg`, `ahaan.jpg`, `jasper.jpg`, `tejas.jpg`, `tini.jpg`
- `/public/images/un/` — 11 curated, auto-rotated, web-sized UN/event photos

### Components already using real media
| Component | What it shows |
|---|---|
| `components/blocks/about-7.tsx` | 5 real team headshots with verified names/roles |
| `components/blocks/about-field.tsx` | 8-photo masonry UN gallery |
| `components/blocks/outreach-videos.tsx` | 5 real video files (captions are placeholder — see below) |
| `components/blocks/about-dtc.tsx` | `un/flags-duo.jpg` banner |
| `components/blocks/impact-dtc.tsx` | `un/window.jpg` + `un/official-meeting.jpg` |
| `components/blocks/cta-1.tsx` | 5 team headshots + `un/unga.jpg` as parallax BG cards |

### Components now on real media (completed this session)
| Component | Location | What changed |
|---|---|---|
| `components/blocks/outreach-videos.tsx` | "In Motion" video strip | Verified all 5 clips via ffmpeg frames; dropped weak `IMG_3400.mp4` (back-of-head walking shot); relabeled the 4 strong clips with honest, grounded captions; grid changed to `lg:grid-cols-4` |
| `components/blocks/about-4.tsx` | About page — "What makes us different" | 4 Unsplash URLs → `team/aditya.jpg` (Paid), `un/conf-room.jpg` (Rigorous), `un/sdg-water.jpg` (Specific), `un/unga.jpg` (Grounded) |
| `components/blocks/research-dtc.tsx` | Homepage — "Research & Policy" panels | 3 Unsplash URLs → `un/hlpf.jpg` (Restriction Database), `un/official-meeting.jpg` (LGBTQ+ Online Safety), `un/ga-hall.jpg` (Platform Governance) |
| `next.config.ts` | image config | Removed now-unused `images.unsplash.com` remotePattern — no component references Unsplash anymore |

All four kept video clips are real UN-corridor outreach footage (DTC members handing printed briefs to badged delegates / conversations between sessions). No image is reused across `about-4` and `research-dtc`.

**No remaining stock-media work.** Every used component is on real DTC media. `npm run build` passes (6 routes static, TypeScript clean).

> ffmpeg note: it is installed via winget but not on PATH. Full path:
> `C:\Users\Ahaan\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe`

---

## Key source-of-truth files

- `DTCInformation/Dynamic Teen Coalition Yearly Wrap 2025.pdf` — real team names, roles, contributions
- `DTC YPL Manifest.docx` — founding history, mission, what the org actually is
- `DTCInformation/FR08_Twisted_Pair_Legitimacy_Theorem_v2.2.pdf` — the real Twisted Pair paper (3 Primitives, not DTC)
- `DTCInformation/FR05_Ghost_Authority_Lemma_v2.3.pdf` — the real Ghost Authority Lemma

## Hard rules (do not break these)

- **No fabrication** — every name, stat, bio, journal, date must trace to the source docs above
- **3 Primitives attribution** — Twisted Pair and Ghost Authority are credited to "3 Primitives (3primitives.io)", never to DTC or named individuals
- **No Passell / Gildenston names** on the public site (user decision)
- **No Hack Club 501(c)(3)** — the org is not formally incorporated (manifest is explicit)
- **Contact values** — use the site's own: `hello@dtcpolicylab.org`, `discord.gg/dtcpolicylab`, `dtcpolicylab.org`
- **Journal** — "Taylor & Francis (Social Sciences)", not "The Social Science Journal"

## Build check

```bash
npm run build
```

Should produce: all 6 routes static, TypeScript clean, no errors. If it breaks, check for stray Unsplash `remotePatterns` — the `next.config.ts` only whitelists `images.unsplash.com`; once all Unsplash URLs are gone from used components, that entry can be removed.
