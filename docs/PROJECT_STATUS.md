# PROJECT STATUS — AI Practice (interactive AI-literacy platform)

**Last updated:** 2026-09-19 (Phase 0 + Gate 0 + Gate 1 complete; Gate 2 in progress) · **Status vocabulary:** DONE (implemented) · TESTED (verified by execution) · PARTIAL · BLOCKED · NOT STARTED
**Rule applied:** nothing says TESTED unless it was actually executed and observed in this session.

---

## Gate board

| Gate | Scope | State | Evidence |
|---|---|---|---|
| **0 — Bootstrap** | Workspace path fix, isolated repo, toolchain pins, scaffold, verify chain | **TESTED** | `git init -b main` inside `Adsense IA idea`; clean path confirmed (no literal trailing-space directory exists); `npm install` → 289 packages, 0 vulnerabilities; `npm run verify` all green on 2026-09-19: `tsc --noEmit` (after TS6 fix), `astro check` 0 errors / 0 warnings / 0 hints, vitest 2/2, production build 1 page. |
| **1 — Market research (Gate 0)** | Six `research/` artifacts: MARKET_VALIDATION, COMPETITOR_MATRIX, KEYWORD_UNIVERSE, SEO_INTENT_MAP, CURRICULUM_OPPORTUNITY, BRAND_OPTIONS | **DONE** (artifacts) · **PARTIAL** (no volume API) | 24-row competitor matrix (8 rows live-fetched 2026-09-19 incl. Coddy 5.26M users, DeepLearning.AI 7M, Learn Prompting 3M, TinkerLLM, GeraQuest, OpenAI Academy, Anthropic tutorial); 74 query clusters mapped (≈42 P1); page-family intent rules + doorway policy + linking contract; MVP recommendation ≈36 lessons/≈41 exercises across 5–6 tracks; 20-name brand shortlist with DNS probe (signal weak/inconclusive; no trademark search; nothing purchased). Re-validate demand with Search Console post-launch; refresh competitors quarterly. |
| **2 — Curriculum (Gate 1)** | `docs/CURRICULUM_MAP.md` (100 units; 36 MVP flagged), `docs/CONTENT_STANDARDS.md` | **DONE** (architecture) | 100 units across 8 tracks with level/outcome/exercise-engine/class/SEO-cluster per unit; MVP = 36 units (foundations 8, prompting 11, research 5, work 6, coding 2, safety 4) in 5 waves; images + workflows deferred to v1.1; standards cover lesson anatomy, style + banned phrases, answer-first rule, source/truth rules (facts registry for CUR units), exercise-authoring rules, linking contract, metadata schema and the Gate 7 audit checklist. |
| **3 — Foundation (Gate 2)** | Content/exercise schemas, exercise runtime, progress store, SEO system, page shells, contract tests | **IN PROGRESS** | Content model live (`src/content.config.ts`): lessons/exercises/glossary with zod validation via `astro/zod` (Astro 7 deprecates `z` from `astro:content`/`astro:schema` — fixed 109 hints → 0), 8 practice-engine schemas, draft sample content validating end-to-end; MDX 8.0.1 + sitemap 3.7.4 wired, pins guarded by tests. Verify green 2026-09-19: typecheck, check 0/0/0, tests 2/2, build. Remaining: exercise runtime + first engines UI, SEO helpers/robots, page shells, contract tests. |
| **4 — Content + practice engine (Gates 3+4)** | ≥30–40 lessons, ≥30 exercises, facts registry, browser-verified flows | NOT STARTED | |
| **5 — Skills assessment (Gate 5)** | `/assessment` deterministic diagnostic | NOT STARTED | |
| **6 — UX + content QA (Gates 6+7)** | Design pass, per-lesson content audit | NOT STARTED | |
| **7 — SEO/GEO/a11y/perf (Gates 8+9+10)** | Registry tests, structured data, axe, Core Web Vitals | NOT STARTED | |
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
