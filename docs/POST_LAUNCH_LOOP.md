# POST-LAUNCH LOOP — maintenance, corrections and expansion rules

**Date: 2026-09-19 · Updated 2026-09-20 · Companion to `docs/LAUNCH_READINESS.md`. Everything here is
manual by design: no automation accounts; the only runtime addition is the owner-approved cookieless
Vercel Analytics (gated to Vercel builds — see Metrics policy).**

## Cadence

| When | What | Where the evidence goes |
|---|---|---|
| **Per report** | Correction workflow (below) | `docs/CONTENT_QA.md` corrections log |
| **Per content release** | Run `npm run indexnow` once the deploy is live (Bing/Yandex ping; Google flows through the sitemap) | — (release note) |
| **Weekly (light)** | Triage the public correction channel (opens with launch). Verify claim → fix or cut | Same log |
| **Monthly** | Search Console: top queries vs the `seo.intent` map (`research/SEO_INTENT_MAP.md`). Find high-impression pages with weak content or missing intents | Notes in `docs/CONTENT_QA.md` |
| **Quarterly** | Refresh `research/COMPETITOR_MATRIX.md`; re-run axe sweep + `scripts/audit-dist.mjs`; re-read `docs/CONTENT_STANDARDS.md` before any content batch | `docs/SEO_A11Y_PERF.md` update |
| **≤ every 90 days (hard)** | Re-verify every row in `content/CURRENT_FACTS_REGISTRY.md` (currently due **2026-12-18**); update `lastReviewed` on the two `CUR` lessons | Registry + lesson frontmatter |

## Correction workflow (fix or cut — no partial passes)

1. Capture the report (no account needed; the channel will be a documented contact point at launch).
2. Verify against a primary source before touching content — a correction is itself a claim.
3. Fix the lesson/exercise/term; keep the fix minimal and consistent with the standards.
4. Re-run `npm run verify` (registry + QA suites must stay green).
5. Record: date, page, what was wrong, what changed — in `docs/CONTENT_QA.md`.
6. Redeploy with the same procedure as launch (build → origin guard → deploy).

## Expansion rule (anti-doorway)

New units are added **only** from the documented v1.1 map in `docs/CURRICULUM_MAP.md` (AI Images ×12,
AI Workflows ×10, remaining Coding ×8, remaining Safety ×5, remaining Research ×7, remaining Prompting ×9,
remaining Foundations ×4, remaining Work ×9), one wave at a time, and only when:

1. **Demand exists in evidence:** Search Console shows real queries with no matching page intent — not a
   guess about what might rank.
2. **The track's existing units pass:** no unit in that track has an open QA failure.
3. **The unit clears the same bars:** schema validated, an exercise on an implemented engine,
   2+ glossary links, the content-QA suite stays green.

Never: pages per profession, employer or tool ("prompt for [job]"), duplicate intents, or thin pages to
chase volume. The registry tests (`tests/registry.test.ts`) enforce the slug and intent rules mechanically.

## Discovery & indexing (first 14 days)

**Day-0 baseline (2026-09-20):** zero indexed results on external engines (`site:` queries empty) —
expected on a domain hours old; Google still has to crawl a brand-new site. Crawl-readiness is verified:
robots allows everything, sitemap holds 108 URLs, production carries no `X-Robots-Tag`.

**Owner step — Search Console (once):**

1. `search.google.com/search-console` → Add property → **Domain** type → verify via DNS TXT (one
   property covers apex, www and every subdomain).
2. Sitemaps → submit `https://getaipractice.site/sitemap-index.xml`.
3. URL Inspection → **Request Indexing** for the flagship pages: `/`, `/learn`, `/practice`,
   `/assessment`, `/glossary` and one flagship lesson.
4. Bing Webmaster Tools is optional (it can import the sitemap from Search Console).

**Ping the other engines (recurring):** `npm run indexnow` submits every sitemap URL to IndexNow
(Bing, Yandex, …). Run it once the key file is live, then after each content release — never for
docs-only deploys. Google has no ping API: indexing there flows through the sitemap + crawling.

**Honest timeline:** indexing of core pages — days (faster with Request Indexing) · first long-tail
impressions — 2–6 weeks · meaningful organic clicks — 2–6 months of content-led work · competitive head
terms (“prompt engineering”) — much longer. Backlinks are the slow variable: share the site only where
it is genuinely useful.

**Batch 3 deployed (2026-09-20):** pushed `bbcc4c2` → Vercel auto-deploy; externally verified within the
minute: `/faq`, `/llms.txt`, the new workflow lesson and the 175-URL sitemap all serving fresh
(`x-vercel-cache: MISS`, `age: 0`). IndexNow re-submitted all 175 URLs (accepted). Owner step still
open: Search Console → **Request Indexing** for `/faq` alongside the flagship pages.

**Weekly spot-check (first month):** `site:getaipractice.site` plus a branded query on Google and Bing;
compare incoming queries against the P1 clusters in `research/KEYWORD_UNIVERSE.md`; log surprises here.

**Answer engines (GEO):** `/llms.txt` is generated from the content collections at build time — it can
never drift, so there is nothing to maintain by hand. The `/faq` hub is the one manual surface: when
Search Console shows question-shaped queries with no matching answer, add the answer **and** link the
lesson that teaches it — never a second page competing with a lesson's intent. Robots explicitly allows
the major AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, …) on top of the wildcard.

## Metrics policy

- **Update 2026-09-20 — owner approved Vercel Web Analytics.** It ships gated to Vercel builds only
  (`process.env.VERCEL`), is cookieless and aggregate (page views + referrers, no profiling), and the
  privacy page documents it. Local and non-Vercel builds remain script-free.
- Search Console (aggregate, owner-side) and user-reported issues remain the qualitative signals.
- Device-local progress data is never collected, transmitted or aggregated.
- Any further data feature — ads, accounts, another tool — still requires an explicit owner decision and
  a privacy-page update before it ships; this log is the record.

## Known watch-items

- AI product changes (model lineups, feature names) → the two `CUR` lessons go stale first; the registry
  due date is the backstop.
- Font and Astro minor upgrades → re-run the full verify chain + audit script; pins are intentional.
- If load patterns ever justify a CDN/edge change, the static output keeps that a hosting-side switcheroo
  with no code changes.
- **New-domain security false positives:** reputation heuristics may block a freshly registered domain
  (observed 2026-09-20: RAV Endpoint Protection blocked `www.getaipractice.site` on the owner's machine).
  Same-day checks: Google Safe Browsing **clean**, Sucuri SiteCheck **clean** — nothing to fix on the
  site. Allow it locally if needed and file a false-positive report with the vendor
  (`support@reasonlabs.com` + `reasonlabs.com/help` for RAV); reputation consolidates with domain age,
  indexing and traffic.
