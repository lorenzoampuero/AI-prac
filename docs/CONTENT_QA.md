# CONTENT QA — Gate 7 verdicts (per unit)

**Gate 7 artifact · Date: 2026-09-19 · Rule: fix or cut — no partial passes.**
**Method:** automated checks in `tests/content-qa.test.ts` (banned phrases, lesson structure, linking
contract, word bands, review dates, link integrity) + registry tests (`tests/registry.test.ts`) + manual
skims of shipped pages. Fixes applied in `2b43af2`.

## Automated results (all green)

| Check | Result |
|---|---|
| Banned phrasing (standards §2) across lessons/exercises/glossary | 0 hits |
| Practice section + declared `<ExerciseCard>` in every published lesson | 36/36 |
| `## Next` link + ≥2 glossary links per lesson (§7) | 36/36 (21 lessons strengthened; 4 new terms added: action item, caveat, data classification, unsupported claim) |
| Word band (§1, exercise-heavy leeway) | all 36 lessons ≥462 words after the enrichment pass (minimum previously 391); spread ≈462–570 |
| Review dates (§9): `current` has `lastReviewed`, `evergreen` does not | 36/36 (2 CUR lessons carry registry-backed dates) |
| Link integrity: every internal lesson link resolves | 100% (1 broken cross-track link `ai-work → ai-for-work` found and fixed) |
| Glossary references (lesson/exercise ids) resolve | 23/23 |
| Exercise alignment: embedded exercise ∈ declared, declared ∈ published, engine implemented | 36/36 |

## Gate 6 — UX pass (reviewed 2026-09-19)

- Templates reviewed live at 1280 px and 390/360 px: home, `/learn`, track hub, lesson, `/practice`,
  exercise page, `/glossary` + term, `/about`, 404, `/assessment`.
- Fixes this gate: header nav wraps at narrow widths (Assessment link had pushed 390 px to 454 px —
  found at Gate 5, fixed via `flex-wrap`); prose code blocks styled (introduced by the coding lessons).
- Confirmed good: skip link, focus styles, sticky-free header, breadcrumbs everywhere, feedback states
  (`correct` / `incorrect` / `done` / `none`), device-local copy in footer, honest future-track cards.

## Per-unit verdicts

| Track | Units | Verdict |
|---|---|---|
| Foundations | FN01 what-generative-ai-is · FN02 what-an-llm-actually-does · FN03 tokens-simply · FN04 context-windows · FN05 why-ai-makes-things-up · FN06 models-vs-products (CUR) · FN07 fast-vs-reasoning-models (CUR) · FN08 why-answers-vary | **PASS** ×8 — sources registry-backed for CUR; no hype; exercises aligned |
| Prompting | PR01 define-the-outcome · PR02 give-useful-context · PR03 write-clear-instructions · PR04 add-constraints · PR05 specify-the-format · PR06 examples-and-few-shot · PR07 work-with-long-input · PR08 ground-responses-in-your-sources · PR09 structured-output · PR10 iterate-from-the-output · PR11 evaluate-before-you-ship | **PASS** ×11 — chain complete; feedback copy follows the good/missing/why/improve pattern |
| Research | RS01 search-vs-generation · RS02 inspect-the-citations · RS03 primary-vs-secondary-sources · RS04 find-the-unsupported-claim · RS05 ask-for-uncertainty | **PASS** ×5 — quote-first teaching consistent with the exercises |
| Work | WK01 summarize-without-losing-meaning · WK02 meeting-notes-to-action-items · WK03 email-that-sounds-like-you · WK04 extract-data-from-documents · WK05 classify-and-triage-text · WK06 spreadsheets-describe-dont-guess | **PASS** ×6 — scenarios are concrete; no tool-specific claims |
| Coding | CD01 what-ai-can-do-with-code · CD02 describe-vet-never-blind-run | **PASS** ×2 — code sample is ours, safe-by-construction, and the exercise vets it |
| Safety | SF01 what-not-to-paste · SF02 prompt-injection-simply · SF03 when-not-to-rely-on-ai · SF04 using-ai-at-work | **PASS** ×4 — no policy overreach; judgment framing consistent |
| Exercises | All 36 published | **PASS** — every engine has a live, browser-verified UI; deterministic grading or explicit self-assessment wording |

## v1.1 waves (verified 2026-09-20)

Same automated gate suite + browser verification per batch (blocks, exercises, XP, reduced-motion,
390 px, live deploy). Totals after the waves: **153 pages · 65 tests green**.

| Track | Units | Verdict |
|---|---|---|
| AI Images (v1.1) | IM01 how-image-generation-works (CUR) · IM02 subject-scene-style · IM03 composition-and-framing · IM04 camera-angle-and-lens · IM05 lighting-fundamentals · IM06 color-and-mood · IM07 materials-and-texture · IM08 text-inside-images (CUR) · IM09 iterate-and-edit · IM10 consistency-across-images · IM11 style-references · IM12 negative-constraints (CUR) | **PASS** ×12 — the three CUR units are registry-backed (rows #4–6, OpenAI image guide, review by 2026-12-18); every lesson carries ≥2 teaching blocks + KeyTakeaways; two rounds of extra teaching blocks added to IM04 during review |
| Research (v1.1 wave) | RS06 cross-check-answers · RS07 check-dates-and-freshness · RS08 check-the-numbers | **PASS** ×3 — triangulation, dating and recomputation habits; exercises: evaluate-output / find-the-problem / model-choice; RS05→RS06 chain updated |
| Work (v1.1 wave) | WK07 ai-for-presentations · WK08 reports-that-hold-up · WK09 support-replies-that-deescalate | **PASS** ×3 — claim-first deck briefs, [SOURCE?] report skeletons, policy-gated support replies; WK06→WK07 chain updated; WK09 closes the shipped wave |
| Glossary | 23 terms | **PASS** — every term links ≥1 lesson; definitions plain-language |
| Assessment | 18 items / 6 tracks | **PASS** — one correct option per item, honest band copy, device-local results |

## Known non-blockers

- Rolldown logs a benign `use astro:head-inject` hint from MDX asset propagation; the directive is absent
  from published HTML.
- Word counts: the enrichment pass lifted every lesson to ≥462 words (from a 391-word minimum); lower
  positions remain within §1's exercise-heavy leeway and can keep growing at expansion time.
