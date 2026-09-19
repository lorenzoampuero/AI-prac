# CURRICULUM OPPORTUNITY — where demand meets an attackable gap

**Gate 0 artifact · Date: 2026-09-19**

**Method note:** Derived from the verified competitor scan (`COMPETITOR_MATRIX.md`), the cluster map
(`KEYWORD_UNIVERSE.md`) and the operator brief. **No volume data** — sequencing reflects intent fit,
competitive gap and deterministic-practice feasibility. Gate 1 (`docs/CURRICULUM_MAP.md`) finalizes the full
~100-unit map; this file recommends what the **MVP build** should contain and why.

---

## 1. Gap → product implications

| Gap (from matrix) | Product implication |
|---|---|
| No zero-friction deterministic practice | Every lesson ends in a no-signup exercise; practice hub from day one |
| Verification taught as prose, not drills | "Find the problem" and "evaluate output" engines own the research/safety tracks |
| Vendor academies ≠ neutral | Model-agnostic lessons; product mentions only as dated, sourced examples |
| "Which AI for X?" unserved interactively | Capability-selection lesson in MVP; helper tool P2 |
| Knowledge workers aren't video-first | 500–1,200-word lessons + immediate practice; no video dependency |

## 2. Recommended MVP allocation (target ≈ 36 lessons / ≈ 40 exercises)

| Track | Lessons | Exercises | Why these first | P |
|---|---|---|---|---|
| AI foundations | 8 | 8 | "learn ai / how to use ai / llm" head-intent clusters (A1–A8); prerequisite for everything | P1 |
| Prompting | 11 | 14 | Highest-intent practice cluster (B1–B17); differentiator vs prose-only guides | P1 |
| AI research & verification | 5 | 6 | Strongest gap + strongest trust story; unique exercises | P1 |
| AI for work | 6 | 7 | Utility queries with repeat use; "meeting → actions" style drills | P1 |
| AI safety & privacy | 4 | 4 | Practical judgment (H2 key); short lessons, memorable checks | P1 |
| AI coding (beginner) | 2 | 2 | Captures "can ai write code" demand without programmer prereqs | P1 (if capacity) |
| **Total** | **36** | **~41** | | |

Deferred to v1.1 (per `KEYWORD_UNIVERSE.md` P2 and the approved plan): AI images, workflows/agents expansion,
model guides, daily challenge, comparison pages.

## 3. MVP unit shortlist (titles provisional until Gate 1)

**Foundations (8):** what generative AI is · what an LLM does · tokens, simply · context windows · why AI can
be wrong (hallucinations) · models vs products · fast vs reasoning models · why answers vary.

**Prompting (11):** define the outcome · give useful context · write clear instructions · add constraints ·
specify the format · examples & few-shot · work with long input · ground responses in your sources · structured
output (JSON) · iterate from the output · evaluate before you ship.

**Research & verification (5):** search vs generation · inspect the citations · primary vs secondary sources ·
find the unsupported claim · ask for uncertainty (calibrated answers).

**Work (6):** summarize without losing meaning · meeting notes → decisions/owners/deadlines · email that
sounds like you · extract data from documents · classify and triage text · spreadsheets: describe, don't
guess.

**Safety (4):** what not to paste · prompt injection, simply · when not to rely on AI (consequences) ·
using AI at work: judgment calls.

**Coding (2):** what AI can (and can't) do with code · describe, vet, and never blind-run.

## 4. Exercise-engine coverage plan (types from master brief §16)

| Engine | First used in | MVP count target |
|---|---|---|
| A. Pick the better prompt | Prompting (early) | ~6 |
| B/C. Fix / build the prompt (rubric + heuristics) | Prompting (core) | ~9 |
| D. Find the problem (unsupported claim, ignored constraint…) | Research + prompting | ~7 |
| E. Order the steps | Research + work | ~4 |
| F. Model/mode selection | Foundations + selection lesson | ~4 |
| G. Evaluate output (rubric) | Prompting + work | ~5 |
| H. Image prompt builder | v1.1 (Images track) | 0 |
| I. Real-world challenge (rubric self-assessment) | Work (late wave) | ~6 |

## 5. Utility opportunities (ranked)

| # | Utility | Audience/traffic role | Effort | P |
|---|---|---|---|---|
| 1 | AI Skills Assessment (15–20 deterministic items → strengths + lesson recs) | Acquisition + sharing; "ai skills test" cluster (J1) | M | P1 |
| 2 | Glossary (~40 terms, each linked to lesson + exercise) | SEO long-tail + internal-link mesh (J2) | S–M | P1 |
| 3 | Prompt debugger (heuristic, non-AI: missing objective/context/constraints/format) | Differentiator; "fix my prompt" cluster (B14) | M | P2 |
| 4 | "Which AI should I use?" decision helper (capability types, dated facts) | Link magnet; selection cluster (I1) | M | P2 |
| 5 | Prompt builder (structured fields → assembled prompt) | Utility + shareability | S–M | P2 |
| 6 | Daily challenge (rotating exercise, canonicalized) | Retention (J7) | S | P2 |

## 6. Explicit anti-scope (do not build)

Accounts/sync · certificates (no fake credential value) · leaderboards · **absolute "best AI" rankings** ·
per-profession prompt pages (doorway policy) · AI-graded open answers (no API cost in MVP) · mobile apps ·
community features. Revisit only with post-launch data (master brief §95).

## 7. Feasibility constraints carried into Gate 1

1. Every planned unit must be gradable **deterministically** (no LLM in the loop) or self-assessed with a
   rubric that is genuinely useful.
2. Product-specific facts (model features, prices, policies) require `source + verified_at` and live in the
   facts registry — never only in prose.
3. Unit quality bar: real user question answered + transferable skill + exercise worth doing. If a unit can't
   meet it, it slips to v1.1 rather than shipping weak.
