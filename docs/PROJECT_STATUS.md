# PROJECT STATUS — AI Practice (interactive AI-literacy platform)

**Last updated:** 2026-09-19 (**MVP complete — 36/36 units; Gates 5–10 TESTED; 50 tests / 108 pages**) · **Status vocabulary:** DONE (implemented) · TESTED (verified by execution) · PARTIAL · BLOCKED · NOT STARTED
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
| **8 — Launch readiness (Gate 11)** | Docs set, prod-check dry-run, launch checklist | NOT STARTED | |
| **9 — Post-launch loop** | Content loop + expansion rule (documented) | NOT STARTED | |

## Operating constraints (from the master brief)

- No deployment, domain purchase, AdSense submission, paid APIs, analytics or external account
  changes without explicit approval.
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

Phase 0 only: scaffold, pins, verification chain. No secrets, no env files, no external
services, no analytics, no ads, nothing deployed.
