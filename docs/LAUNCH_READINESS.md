# LAUNCH READINESS — AI Practice (Gate 11)

**Date: 2026-09-19 · Updated 2026-09-20 · Status: LIVE — the site serves publicly at
`https://getaipractice.site` (apex 308-redirects to `www.getaipractice.site`, which serves 200;
canonical + sitemap use the apex origin). Remaining owner actions: enable Analytics in the dashboard,
align the primary domain with the canonical origin, then Search Console.**

## What is verified (this session)

| Area | Evidence |
|---|---|
| Build + quality chain | `npm run verify` → check 0 errors / 0 warnings, **50/50 tests**, build **108 pages** + sitemap |
| Content | 36 lessons · 36 exercises · 23 glossary terms · 18-item assessment; per-unit QA verdicts in `docs/CONTENT_QA.md` |
| Accessibility | axe WCAG A/AA: **0 violations across 11 templates** (`docs/SEO_A11Y_PERF.md`) |
| SEO/GEO | Canonical/OG everywhere; sitemap 107 URLs (404 excluded); structured data complete; anti-doorway enforced by tests |
| Performance | Cold load 29–49 ms; ~61 KB transfer per page incl. the single latin-subset font |
| Privacy posture | No accounts, no ads; progress device-local only. Vercel Web Analytics (cookieless, aggregate) approved 2026-09-20 and gated to Vercel builds (`process.env.VERCEL`); local/non-Vercel builds ship zero third-party scripts |
| Repo hygiene | Clean `git status`; `.gitignore` covers `dist/`, `.astro/`, env files; **no `.env`, no keys, no credentials anywhere** (the fake `sk_live_…` strings inside safety exercises are intentional teaching props) |

## Production dry-run (executed 2026-09-19)

- Built with an injected origin: `PUBLIC_SITE_URL=https://preview.example.test npm run build`
- Verified with `node scripts/check-origin.mjs preview.example.test` → canonical and the sitemap's first
  `loc` both switched to the override (**exit 0**).
- Unset the variable and re-ran `npm run verify` → canonical/sitemap fell back to the placeholder origin;
  chain still green.
- Mechanism validated: launch-day origin change is a single env variable, nothing else.

## Deployment plan (Vercel connected 2026-09-20; domain steps pending owner action)

1. **Approval + inputs (owner):** **register `getaipractice.site`** (domain decided 2026-09-20;
purchase pending — optionally also grab `getaipractice.com`, which was still available, as a
redirect), then choose the hosting target (any static host/CDN works — the output is plain files in
`dist/`).
2. **Freeze check:** confirm `content/CURRENT_FACTS_REGISTRY.md` review dates have not passed
   (currently review by **2026-12-18**); re-verify if later.
3. **Build:** `npm ci && npm run verify` with `PUBLIC_SITE_URL=<final origin>` set.
4. **Guard:** `node scripts/check-origin.mjs <final origin>` must exit 0 (blocks accidental placeholder
   deploys).
5. **Deploy:** Vercel auto-deploys every push to `main` (project `aipractice`, connected 2026-09-20;
   no server runtime, no environment secrets, no env vars — the default origin is the final domain).
6. **Tag:** `git tag launch-v1 && git push origin main launch-v1` (rollback anchor).
7. **Post-deploy checks (5 minutes, manual):** load home + one lesson + `/assessment` from the real URL;
   confirm canonical/OG in view-source; fetch `/sitemap-index.xml` and `/robots.txt`; check `/404`; confirm
   no mixed-content or font 404s.

### Deploy notes — Vercel commit ownership (learned 2026-09-20)

- Vercel **blocks** ("Deployment Blocked") any Git-triggered deployment whose commit author does not
  resolve to a GitHub account with access to the project. The bootstrap identity
  `AI Practice Builder <dev@ai-practice.local>` triggered this on every push after the initial import.
- Repo-local identity is now `lorenzoampuero <259212707+lorenzoampuero@users.noreply.github.com>`
  (GitHub noreply address — always attributed to the owner's account). Keep it when committing in this
  repo.
- Manual dashboard deploys/redeploys are unaffected; automatic deploys need the attributed author.

- **Deployment Protection (Vercel Authentication) is active on the project** and gates every generated
  URL (`*.vercel.app`) — production included — behind a Vercel login (observed externally 2026-09-20:
  anonymous fetches receive the login page, so content cannot be verified from outside while it is on).
  Launch setting: **Standard Protection** (Project → Settings → Deployment Protection) — previews and
  generated URLs stay gated, while the production custom domain `getaipractice.site` is public. If the
  scope reads **All Deployments**, the public site would also show a login — change it before launch.
- Consequence: post-deploy checks run against `https://getaipractice.site`; the `*.vercel.app` URL
  staying login-gated under Standard Protection is intended.

### Live verification — executed 2026-09-20 against the real domain (external fetches)

- DNS + TLS live; `getaipractice.site` → **308** → `www.getaipractice.site` (**200**, Vercel edge).
- Home: title “AI Practice”, canonical `https://getaipractice.site/`, analytics script present
  (Vercel build ⇒ the `VERCEL` gate is on; counting starts once Analytics is enabled in the dashboard).
- `/privacy` 200 with the analytics disclosure present (old “no analytics” wording gone).
- `/robots.txt` 200 (Sitemap → `https://getaipractice.site/sitemap-index.xml`); `sitemap-index.xml`
  200 (1 child sitemap, apex URLs); `/learn` hub 200; unknown URL → **404** with the custom page.
- `*.vercel.app` URLs stay login-gated (Vercel Authentication) while the custom domain is public —
  the intended posture (previews private, production public).
- **Pending alignment:** the served URL (`www`) differs from the canonical/sitemap origin (apex). Set
  `getaipractice.site` as the primary domain in Vercel so `www` redirects to the apex and redirects
  agree with the canonical.
- **Discovery baseline (2026-09-20):** zero indexed results externally (`site:` queries empty — day 0);
  crawl-readiness verified (robots allows all, sitemap 108 URLs, no `X-Robots-Tag` on production).
  IndexNow key shipped at `/5f3a9c1e7b2d4f8a6c0e2b9d1f7a3c5e.txt`; `npm run indexnow` notifies
  Bing/Yandex; Google indexing flows through Search Console (owner step). See the Discovery section in
  `docs/POST_LAUNCH_LOOP.md`.

## Post-launch verification (owner-owned, day 1–7)

- Search Console: verify ownership, submit `sitemap-index.xml`, check Pages report for 200s (expect 108).
- Render check: paste 3 URLs into a link preview/debugger (OG tags) and one AI-search style query to see
  indexability.
- Re-run `node scripts/audit-dist.mjs` against the produced build for a final artifact record.

## Rollback

Static site, zero server state, zero migrations — rollback = redeploy the previous `dist/` artifact
(keep the last good one; `launch-v1` tag anchors the source). Device-local user progress is independent
of deploys: clearing/reverting the site never destroys visitor data, and no visitor data exists server-side.

## Boundary notes

- The default build origin is now the chosen domain `https://getaipractice.site`; step 4's origin guard
  confirms every release build carries the intended origin, and `PUBLIC_SITE_URL` remains available for
  staging/preview builds.
- Hostile-storage browsers: progress/assessment saving degrades silently by design (features work, XP is
  just not remembered).
- **Monetization is out of scope for launch.** Before any AdSense submission (later, with approval): the privacy-policy page (**already shipped at `/privacy`**) gets its contact channel added at launch, decide the cookie/consent approach, prepare `ads.txt` once an account exists, and re-run the anti-doorway audit against AdSense policy expectations (original content — already enforced by the registry tests).
