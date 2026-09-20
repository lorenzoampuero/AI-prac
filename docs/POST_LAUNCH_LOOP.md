# POST-LAUNCH LOOP — maintenance, corrections and expansion rules

**Date: 2026-09-19 · Companion to `docs/LAUNCH_READINESS.md`. Everything here is manual by design: no
analytics, no automation accounts, no third-party scripts on the site.**

## Cadence

| When | What | Where the evidence goes |
|---|---|---|
| **Per report** | Correction workflow (below) | `docs/CONTENT_QA.md` corrections log |
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
