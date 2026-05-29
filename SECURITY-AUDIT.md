Security audit summary — dtc-website

Summary of automated changes:

- Added global security headers and a Content Security Policy in `next.config.ts`.
- Added an `overrides` entry in `package.json` to pin `fast-uri` to `3.1.2` and applied it via `npm install`.
- Verified the project builds successfully (`npm run build`).
- Re-checked `fast-uri@3.1.2` with GHAS: no known vulnerabilities reported.

Findings:

- `fast-uri@3.1.0` previously had 2 high-severity advisories; now overridden to `3.1.2`.
- `next@16.2.4` was flagged by GHAS with multiple high-severity advisories. Per your instruction, Next.js was not changed. This remains a high-priority item to address in a controlled upgrade window.

Recommendations:

- Schedule and perform a controlled Next.js upgrade (major upgrades can introduce breaking changes). Run full test and QA cycles when upgrading.
- Add automated CI checks that run dependency vulnerability scans (GHAS or `npm audit`) on pull requests.
- Consider adding `npm audit` or `snyk` checks to CI; fail PRs on high-severity findings.
- Periodically review CSP and tighten as you monitor which inline sources or external domains are required by client code (3D libraries may require relaxed allowances).

What I changed (files):

- `next.config.ts` — added security headers and CSP
- `package.json` — added `overrides.fast-uri = "3.1.2"`
- `package-lock.json` — updated by `npm install` to reflect the override

Next actions I can take for you (choose):

- Create a PR with these changes and a branch for review.
- Open a follow-up task to plan and test a Next.js upgrade.
- Add CI steps for automated dependency scanning and build checks.

If you'd like, I can create the PR now with these changes.