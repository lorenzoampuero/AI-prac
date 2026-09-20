# LAUNCH READINESS — AI Practice (Gate 11)

**Date: 2026-09-19 · Status: READY TO LAUNCH — nothing deployed; every deploy/domain/account action
requires the owner's explicit approval (master-brief constraint).**

## What is verified (this session)

| Area | Evidence |
|---|---|
| Build + quality chain | `npm run verify` → check 0 errors / 0 warnings, **50/50 tests**, build **108 pages** + sitemap |
| Content | 36 lessons · 36 exercises · 23 glossary terms · 18-item assessment; per-unit QA verdicts in `docs/CONTENT_QA.md` |
| Accessibility | axe WCAG A/AA: **0 violations across 11 templates** (`docs/SEO_A11Y_PERF.md`) |
| SEO/GEO | Canonical/OG everywhere; sitemap 107 URLs (404 excluded); structured data complete; anti-doorway enforced by tests |
| Performance | Cold load 29–49 ms; ~61 KB transfer per page incl. the single latin-subset font |
| Privacy posture | No analytics, no third-party requests, no accounts; progress is device-local only |
| Repo hygiene | Clean `git status`; `.gitignore` covers `dist/`, `.astro/`, env files; **no `.env`, no keys, no credentials anywhere** (the fake `sk_live_…` strings inside safety exercises are intentional teaching props) |

## Production dry-run (executed 2026-09-19)

- Built with an injected origin: `PUBLIC_SITE_URL=https://preview.example.test npm run build`
- Verified with `node scripts/check-origin.mjs preview.example.test` → canonical and the sitemap's first
  `loc` both switched to the override (**exit 0**).
- Unset the variable and re-ran `npm run verify` → canonical/sitemap fell back to the placeholder origin;
  chain still green.
- Mechanism validated: launch-day origin change is a single env variable, nothing else.

## Deployment plan (NOT executed — owner approval required at every step)

1. **Approval + inputs (owner):** choose domain (registrar purchase), hosting target (any static host/CDN
   works — output is plain files in `dist/`), and the public origin URL.
2. **Freeze check:** confirm `content/CURRENT_FACTS_REGISTRY.md` review dates have not passed
   (currently review by **2026-12-18**); re-verify if later.
3. **Build:** `npm ci && npm run verify` with `PUBLIC_SITE_URL=<final origin>` set.
4. **Guard:** `node scripts/check-origin.mjs <final origin>` must exit 0 (blocks accidental placeholder
   deploys).
5. **Deploy:** upload `dist/` to the host (no server runtime needed; no environment secrets).
6. **Tag:** `git tag launch-v1 && git push origin main launch-v1` (rollback anchor).
7. **Post-deploy checks (5 minutes, manual):** load home + one lesson + `/assessment` from the real URL;
   confirm canonical/OG in view-source; fetch `/sitemap-index.xml` and `/robots.txt`; check `/404`; confirm
   no mixed-content or font 404s.

## Post-launch verification (owner-owned, day 1–7)

- Search Console: verify ownership, submit `sitemap-index.xml`, check Pages report for 200s (expect 107).
- Render check: paste 3 URLs into a link preview/debugger (OG tags) and one AI-search style query to see
  indexability.
- Re-run `node scripts/audit-dist.mjs` against the produced build for a final artifact record.

## Rollback

Static site, zero server state, zero migrations — rollback = redeploy the previous `dist/` artifact
(keep the last good one; `launch-v1` tag anchors the source). Device-local user progress is independent
of deploys: clearing/reverting the site never destroys visitor data, and no visitor data exists server-side.

## Boundary notes

- The default origin is the deliberate placeholder `https://ai-practice.invalid`. Shipping with it is a
  configuration bug — step 4 above exists to catch exactly that.
- Hostile-storage browsers: progress/assessment saving degrades silently by design (features work, XP is
  just not remembered).
- **Monetization is out of scope for launch.** Before any AdSense submission (later, with approval):
  add a privacy-policy page, decide the cookie/consent approach, prepare `ads.txt` once an account exists,
  and re-run the anti-doorway audit against AdSense policy expectations (original content — already
  enforced by the registry tests).
