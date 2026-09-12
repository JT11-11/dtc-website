# Vercel runbook — DTC Youth Policy Lab

## Required env vars (none to build; all to run fully)

| Var | Purpose | Without it |
|---|---|---|
| `RESEND_API_KEY` | Deliver `/api/contact` mail via Resend | Submissions queue to `data/contact-queue/` locally, or are logged only on Vercel (read-only fs) |
| `CONTACT_TO_EMAIL` | Inbox for contact mail | Defaults to `hello@dtcpolicylab.org` |
| `CONTACT_FROM_EMAIL` | Sender identity for Resend | Defaults to `DTC Site <site@dtcpolicylab.org>` — verify this domain in Resend first |
| `CONTACT_ADMIN_TOKEN` | Enables `GET /api/contact` inbox triage | Endpoint returns 404 (as if it doesn't exist) |
| `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` | Shared rate limiting across serverless instances | Falls back to per-instance in-memory limiter (fine at low traffic, leaky at scale) |

## Known Vercel gotchas (handled in code)

1. **Read-only filesystem.** Functions can only write to `/tmp`.
   `contactQueueDir()` (`lib/contact.ts`) routes the local queue to
   `os.tmpdir()` when `process.env.VERCEL` is set. `/tmp` is ephemeral —
   treat the queue as a crash buffer, not storage. Set `RESEND_API_KEY`
   in production so nothing depends on it.
2. **Server file reads.** `loadRestrictions()` reads
   `public/data/restrictions.csv` with `fs`. File-tracing doesn't always
   include it, so `next.config.ts` pins it via
   `outputFileTracingIncludes` for `/api/restrictions`, `/api/search`
   and `/work/database`. If you move the CSV, update that list.
3. **Deployment bloat.** `.vercelignore` keeps `DTCInformation/` (~25MB
   of source PDFs), root `*.docx`/`*.pdf` and `.github/` out of
   deployments. Nothing serves them (reports link to Google Drive).

## Media: Git LFS videos 404 on Vercel

`public/videos/*.mp4` are Git-LFS tracked (`*.MOV` in `.gitattributes`,
mp4s alongside them). Vercel's build clone does not fetch LFS objects,
so `<video src="/videos/...">` 404s in production. The component
(`outreach-videos.tsx`) now degrades to a labeled placeholder tile
instead of a broken player. Permanent fix, cheapest first:

1. Upload the clips to **Vercel Blob** (`npx vercel blob ...` or the
   dashboard) and replace `/videos/*.mp4` URLs with the Blob URLs.
2. Or move them to YouTube unlisted (like the other two clips) and use
   the existing `YouTubeCard`.
3. Then remove the LFS lines from `.gitattributes` and
   `git lfs untrack` so future clones stay small.

## Suggested Vercel dashboard settings

- Framework: Next.js (auto). Node 20+.
- No special build command (`next build` runs `postinstall` for the
  dotlottie wasm copy automatically).
- Add the env vars above to Production + Preview as needed.
