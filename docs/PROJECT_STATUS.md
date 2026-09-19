# PROJECT STATUS — AI Practice (interactive AI-literacy platform)

**Last updated:** 2026-09-19 (Phase 0 — isolated repo bootstrap) · **Status vocabulary:** DONE (implemented) · TESTED (verified by execution) · PARTIAL · BLOCKED · NOT STARTED
**Rule applied:** nothing says TESTED unless it was actually executed and observed in this session.

---

## Gate board

| Gate | Scope | State | Evidence |
|---|---|---|---|
| **0 — Bootstrap** | Workspace path fix, isolated repo, toolchain pins, scaffold, verify chain | **TESTED** | `git init -b main` inside `Adsense IA idea`; clean path confirmed (no literal trailing-space directory exists); `npm install` → 289 packages, 0 vulnerabilities; `npm run verify` all green on 2026-09-19: `tsc --noEmit` (after TS6 fix), `astro check` 0 errors / 0 warnings / 0 hints, vitest 2/2, production build 1 page. |
| **1 — Market research (Gate 0)** | `research/MARKET_VALIDATION.md`, `COMPETITOR_MATRIX.md`, `KEYWORD_UNIVERSE.md`, `CURRICULUM_OPPORTUNITY.md`, `SEO_INTENT_MAP.md`, `BRAND_OPTIONS.md` | NOT STARTED | |
| **2 — Curriculum (Gate 1)** | `docs/CURRICULUM_MAP.md` (~100 units; MVP 30–40 flagged), `docs/CONTENT_STANDARDS.md` | NOT STARTED | |
| **3 — Foundation (Gate 2)** | Content/exercise schemas, exercise runtime, progress store, SEO system, page shells, contract tests | NOT STARTED | |
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
