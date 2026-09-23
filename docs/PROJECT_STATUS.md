# PROJECT STATUS — AI Practice (interactive AI-literacy platform)

**Last updated:** 2026-09-22 (**SEO keyword-first sprint + Spanish wave shipped to the repo (deploy
pending) — 74 lesson files (62 EN + 12 ES) · 235 built pages · 79 tests green: EN pages render
keyword-first titles/descriptions from the existing intents, reciprocal EN↔ES hreflang, `/es` core +
12 lessons live in the build, favicon/OG rebranded to the site palette, home gains an interactive demo +
trust band, and the exact Search Console/domain owner guide lives in `docs/LAUNCH_READINESS.md`**)
· **Status vocabulary:** DONE (implemented) · TESTED (verified by execution) · PARTIAL · BLOCKED · NOT STARTED
**Rule applied:** nothing says TESTED unless it was actually executed and observed in this session.

---

## Gate board

| Gate | Scope | State | Evidence |
|---|---|---|---|
| **0 — Bootstrap** | Workspace path fix, isolated repo, toolchain pins, scaffold, verify chain | **TESTED** | `git init -b main` inside `Adsense IA idea`; clean path confirmed (no literal trailing-space directory exists); `npm install` → 289 packages, 0 vulnerabilities; `npm run verify` all green on 2026-09-19: `tsc --noEmit` (after TS6 fix), `astro check` 0 errors / 0 warnings / 0 hints, vitest 2/2, production build 1 page. |
| **1 — Market research (Gate 0)** | Six `research/` artifacts: MARKET_VALIDATION, COMPETITOR_MATRIX, KEYWORD_UNIVERSE, SEO_INTENT_MAP, CURRICULUM_OPPORTUNITY, BRAND_OPTIONS | **DONE** (artifacts) · **PARTIAL** (no volume API) | 24-row competitor matrix (8 rows live-fetched 2026-09-19 incl. Coddy 5.26M users, DeepLearning.AI 7M, Learn Prompting 3M, TinkerLLM, GeraQuest, OpenAI Academy, Anthropic tutorial); 74 query clusters mapped (≈42 P1); page-family intent rules + doorway policy + linking contract; MVP recommendation ≈36 lessons/≈41 exercises across 5–6 tracks; 20-name brand shortlist with DNS probe (signal weak/inconclusive; no trademark search; nothing purchased). Re-validate demand with Search Console post-launch; refresh competitors quarterly. |
| **2 — Curriculum (Gate 1)** | `docs/CURRICULUM_MAP.md` (100 units; 36 MVP flagged), `docs/CONTENT_STANDARDS.md` | **DONE** (architecture) | 100 units across 8 tracks with level/outcome/exercise-engine/class/SEO-cluster per unit; MVP = 36 units (foundations 8, prompting 11, research 5, work 6, coding 2, safety 4) in 5 waves; images + workflows deferred to v1.1; standards cover lesson anatomy, style + banned phrases, answer-first rule, source/truth rules (facts registry for CUR units), exercise-authoring rules, linking contract, metadata schema and the Gate 7 audit checklist. |
| **3 — Foundation (Gate 2)** | Content/exercise schemas, exercise runtime, progress store, SEO system, page shells, contract tests | **TESTED (complete)** | All exit criteria met 2026-09-19: `npm run verify` → check 0/0/0 (28 files), **23/23 tests** (toolchain 2 · progress 8 · grading 7 · registry 6), build **11 pages** + sitemap (10 URLs). Shells: home, `/learn`, track, lesson, `/practice`, standalone exercise page, `/glossary` + terms, `/about`, 404, `robots.txt`; canonical/OG + JSON-LD (BreadcrumbList, LearningResource, DefinedTerm) verified in built HTML. **Browser-verified on both surfaces**: wrong/right feedback, SR-only heading (1 px, visually-hidden), `+15 XP` once per solve, cross-page persistence (attempts 3 / xp 15 — no duplicate XP). **axe WCAG A/AA: 0 violations across 9 templates; no 390 px overflow anywhere.** Known benign Rolldown `astro:head-inject` warning (absent from output). Remaining engine UIs (fix-prompt, order-steps, find-the-problem…) land with their content waves under Gate 4. |
| **4 — Content + practice engine (Gates 3+4)** | ≥30–40 lessons, ≥30 exercises, facts registry, browser-verified flows | **TESTED (MVP complete — 36/36 units)** | W1: FN01–FN08 + facts registry (3 verified rows). W2: PR01–PR11. W3: RS01–RS05. W4: WK01–WK06. **W5: CD01–CD02 (coding) + SF01–SF04 (safety) — curriculum complete.** **Seven engine families live** (choice, find-the-problem, fix-prompt, order-steps, build-prompt, evaluate-output, real-challenge); real-challenge browser-verified today (empty gate → plan → rubric → model answer, +15 XP once) plus CD02 vetting flow (partial → incorrect with per-claim breakdown; full → correct, +15 XP). Totals: **36 lessons · 36 exercises · 19 glossary terms**; check 0/0/0, **43/43 tests**, build **104 pages** + sitemap (includes `/assessment`). Next gates: Gates 6–11. |
| **5 — Skills assessment (Gate 5)** | `/assessment` deterministic diagnostic | **TESTED** | 18 items (3 per MVP track) in `src/data/assessment.ts`; framework-free scoring in `src/lib/assessment.ts`; +6 tests (structure + perfect/partial/empty scoring + band copy) → **43/43**; browser-verified 2026-09-19: mixed answers scored 2/18, per-item feedback (`correct`/`incorrect`, unanswered counted), band copy, per-track breakdown with revisit links, `aip:assessment:v1` record with taken-count, reload shows previous result, retake clears everything. Nav + home CTA wired; nav now wraps at narrow widths (fixed 64px overflow at 390px found during this gate; re-verified 390/360 clean). |
| **6 — UX + content QA (Gates 6+7)** | Design pass, per-lesson content audit | **TESTED** | Gate 6: templates reviewed live at 1280/390/360 px (home · learn · track · lesson · practice · exercise · glossary · about · 404 · assessment); fixes: nav wrap at narrow widths, prose code-block styling. Gate 7: automated suite `tests/content-qa.test.ts` (banned phrases, structure, linking contract, word bands, review dates, link integrity) — **all green after fixes**: 21 lessons strengthened to ≥2 glossary links, 4 new terms (action item · caveat · data classification · unsupported claim), 1 broken cross-track link fixed; per-unit verdicts recorded in `docs/CONTENT_QA.md` (36 lessons + 36 exercises + 23 terms + assessment = PASS). Totals: **50/50 tests**, build **108 pages**. |
| **7 — SEO/GEO/a11y/perf (Gates 8+9+10)** | Registry tests, structured data, axe, Core Web Vitals | **TESTED** | Gate 8: canonical/OG everywhere; sitemap 107 URLs (404 excluded); structured data completed — home `WebSite`, `/learn`+`/assessment` breadcrumbs+LD (previously missing), track pages now emit `BreadcrumbList`; anti-doorway intact. Gate 9: **axe WCAG A/AA — 0 violations across 11 templates** (incl. new quiz surfaces). Gate 10: cold-load 29–49 ms, 1–3 requests, ~61 KB transfer incl. the single latin-subset font; test/lint-independent audit script `scripts/audit-dist.mjs`. Full report: `docs/SEO_A11Y_PERF.md`. |
| **8 — Launch readiness (Gate 11)** | Docs set, prod-check dry-run, launch checklist | **DONE** | `docs/LAUNCH_READINESS.md`: pre-launch evidence table, **executed production dry-run** (origin override via `PUBLIC_SITE_URL` verified with `scripts/check-origin.mjs` — canonical + sitemap switched, then restored; chain re-green), step-by-step deploy plan with the misuse guard, post-deploy checks, rollback via static artifact + `launch-v1` tag, boundary notes (placeholder-origin guard, hostile storage, AdSense prerequisites deferred). **Deployed to Vercel 2026-09-20** (project `aipractice`, auto-deploy from `main`, owner-approved); deploy lesson: the commit author must map to the GitHub account or Vercel blocks the deployment. **Live 2026-09-20:** home/privacy/learn 200, canonical apex, robots + sitemap OK, custom 404; apex 308→www (align primary domain); `.vercel.app` URLs stay login-gated. |
| **9 — Post-launch loop** | Content loop + expansion rule (documented) | **DONE** | `docs/POST_LAUNCH_LOOP.md`: cadence table (per-report · weekly triage · monthly Search Console → intent map · quarterly competitor/axe/audit · **≤90-day facts registry review, due 2026-12-18**), correction workflow (fix or cut, evidence-first, QA-logged), expansion rule limited to the documented v1.1 map with demand evidence + green QA, metrics policy (Vercel Analytics — cookieless, aggregate — owner-approved 2026-09-20, gated to Vercel builds; local builds stay script-free). |

## Post-launch content waves (2026-09-20)

| Wave | What shipped | Evidence |
|---|---|---|
| Design v2 + gamification + teaching blocks (`e5a771d` → `1cfa379`) | premium editorial palette, XP/levels/badges, five teaching components | browser-verified |
| AI Images IM01–IM12 (`f8bb637` → `dbafa45`) | full images track + animated diagrams | 141 pages · 65 tests |
| Demand wave (`66fb5d8`, `e9df942`) | RS06–RS08, WK07–WK09 (autocomplete-backed) | 153 pages |
| **Batch 3 — traffic + interaction + GEO (this session)** | **FN09–FN12 (foundations 12/12) · WF01–WF02 (workflows track opened) · PR16 templates + WK14 job-search (strongest unserved autocomplete pulls) · 28-lesson teaching-block retrofit now enforced by tests · /faq with FAQPage schema · generated /llms.txt · explicit AI-crawler robots policy** | **177 pages · 70 tests green · axe 0 violations (WCAG A/AA) on /faq + three new lessons · browser-verified CU feedback, StepReveal, +15 XP** |
| **Keyword-first SEO + ES wave (2026-09-22)** | **All 62 EN lessons render `seo.title` (keyword-first, test-enforced ≤50 chars) · hub/static/home titles rewritten · sentence-clipped descriptions · Organization + Person + dateModified JSON-LD · og:type/twitter/og:locale completed · sitemap without synthetic lastmod · `relatedExercises` rendered · favicon + og.png rebranded to pine/amber · home interactive demo + trust band · `/about` author bio · i18n: EN at root, ES under `/es` with reciprocal hreflang + language switcher + ES UI dictionary · ES content: 12 lessons, 12 exercises, 20 glossary terms, FAQ/assessment/about/privacy** | **235 pages · 79 tests green (new `content-qa-es` contract 8/8) · ES HTML externally-verifiable in dist: `lang=es`, hreflang pairs + x-default, `og:locale es_ES`, keyword-first ES titles** |

## Operating constraints (from the master brief)

- No deployment, domain purchase, AdSense submission, paid APIs, analytics or external account
  changes without explicit approval. (Approvals granted so far: Vercel hosting + Vercel Analytics,
  2026-09-20 — both recorded in this file and in `docs/POST_LAUNCH_LOOP.md`.)
- Zero LLM APIs in the MVP: deterministic grading, rubric self-assessment, localStorage progress.
- Anti-doorway policy + evergreen/current content classes enforced by tests.
- Isolation: this repo never touches sibling projects (`Adsense idea principal`,
  `Adsense 2 idea\audioexact`).

## Commands

```
npm ci            # clean install
npm run verify    # typecheck + astro check + unit tests + production build
npm run dev       # dev server
npm run preview   # serve dist/ (astro preview start/stop/status)
```

## Repository memory

No secrets, no env files, no ads. External services: GitHub remote + Vercel hosting (auto-deploy
from `main`); Vercel Analytics is enabled on Vercel builds only — cookieless, aggregate, documented
on `/privacy` — and never ships in local builds.

**Remote:** `origin` → `https://github.com/lorenzoampuero/AI-prac` (branch `main`, pushed 2026-09-19;
the repository currently returns 404 to anonymous visitors, i.e. it is not public).

**Domain:** **`https://getaipractice.site`** — decided 2026-09-20, **registered and connected to Vercel
the same day (LIVE)**; `www.getaipractice.site` serves the site and the apex 308-redirects to it
(primary-domain switch pending so redirects match the canonical apex origin). The build's default origin
points there; `PUBLIC_SITE_URL` overrides it for staging/preview builds.
