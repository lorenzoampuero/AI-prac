# SEO INTENT MAP — page families, intent rules, cannibalization guardrails

**Gate 0 artifact · Date: 2026-09-19**

**Purpose:** Prevent intent collisions *before* content exists (master brief §33/34) and define the internal
linking contract. This file governs page **families**. Per-unit SEO intent lives in `docs/CURRICULUM_MAP.md`
(Gate 1); per-URL enforcement arrives with `docs/SEO_PAGE_REGISTRY.md` (Gate 8) and contract tests.

**Honesty note:** competitor columns reference pages verified in `COMPETITOR_MATRIX.md` (fetched 2026-09-19)
or well-known desk facts. No volume claims.

---

## 1. URL conventions

| Rule | Value |
|---|---|
| Trailing slash | never (`trailingSlash: 'never'`) |
| Case | lowercase, hyphenated slugs |
| Lesson URLs | `/learn/[track]/[lesson-slug]` |
| Practice URLs | `/practice/[exercise-slug]` (standalone, indexable) |
| Glossary URLs | `/glossary/[term-slug]` |
| Query strings | never create indexable state (`?filter=` is client-side only) |
| Assessment results | not a URL (rendered in place); no shareable indexable result pages |
| Canonical | every indexable page exactly one canonical; no cross-canonical between lesson and practice |

## 2. Page-family intent table

| Family | URL pattern | Primary intent (must satisfy) | Secondary | Audience | MVP | What competitors lack here | Internal links (out → in) |
|---|---|---|---|---|---|---|---|
| Homepage | `/` | "What is this and can I try it now?" | brand | everyone | ✅ | a 60-second first exercise before any signup | → tracks, → assessment, ← none |
| Learn hub | `/learn` | "Where do I start learning AI?" (curriculum overview) | navigation | beginners | ✅ | practice-first curriculum, not course videos | → all track hubs |
| Track hub ×8 | `/learn/ai-foundations` etc. | "[Track] explained: what it covers and the order to learn it" (real teaching intro, not a list) | SEO cluster owner for its track | segment | 5–6 of 8 (P1 tracks) | genuine track intros + prerequisites + exercises per lesson | → lessons in order, ← lessons back, ↔ adjacent tracks |
| Lesson | `/learn/[track]/[slug]` | the cluster's informational job (e.g., "few-shot prompting explained") — answer-first, then practice | transfer to other tools | learners | ✅ 30–40 | embedded exercise + feedback + "why it works" — not prose-only | ← track hub/preq, → next lesson, → glossary terms, → canonical exercise page |
| Practice hub | `/practice` | "practice AI skills with exercises" (browse/filter) | utility | returners | ✅ | no-signup filtering; skill/difficulty/time facets | → exercises, → related lessons |
| Exercise | `/practice/[slug]` | "practice [specific skill] with feedback" | utility | returners | ✅ ~30 | deterministic feedback (no API key), model-agnostic | ← practice hub/lesson, → parent lesson, → next exercise |
| Glossary hub | `/glossary` | "AI terms explained simply" | navigation | mixed | ✅ | links every term to a lesson + exercise | → terms |
| Glossary term | `/glossary/[term]` | "what is [term]?" — short, accurate, dated when product-related | quick reference | mixed | ✅ ~40 | every definition points to deeper learning (no dead-end dictionary) | ← lessons, → lesson(s), → exercise |
| Assessment | `/assessment` | "test my AI skills" (15–20 items → strengths/weaknesses) | utility | mixed | ✅ | no account, no fake precision, actionable recommendations | → recommended lessons, → practice |
| About/method | `/about` | "who makes this and how is content verified?" (E-E-A-T) | trust | curious | ✅ | dated sources, review process, correction policy | → glossary, → contact line |
| 404 | (non-indexable) | recovery | — | — | ✅ | helpful links home | → `/learn`, `/practice` |

## 3. Provisional MVP inventory (Gate 1 finalizes units/slugs)

| Family | Count | Notes |
|---|---|---|
| Learn hub | 1 | |
| Track hubs | 5–6 | foundations, prompting, ai-research, ai-for-work, ai-safety (+ai-coding intro if capacity) |
| Lessons | 30–40 | per `CURRICULUM_OPPORTUNITY.md` recommendation |
| Practice hub | 1 | |
| Exercises (standalone) | ~30 | ≥1 embedded per lesson; standalone pages only when they add unique framing |
| Glossary terms | ~40 | terms appearing in MVP lessons first |
| Assessment | 1 | |
| About | 1 | |
| **Indexable total (approx.)** | **~115–125** | every URL must pass registry rules before indexing |

## 4. Cannibalization rules (worked examples)

| Overlap risk | Rule | Example |
|---|---|---|
| Lesson vs glossary term (same keyword family) | **Lesson owns the query** when it teaches a skill; glossary owns only the short "what is X" definition with `LearningResource`-style brevity. Glossary canonical never competes: it links out with "Learn to use it →" | "Few-shot prompting": lesson `/learn/prompting/examples` owns it; `/glossary/few-shot-prompting` is a 120–180-word definition + link |
| Lesson vs exercise (same skill) | Lesson = teaching + one embedded exercise variant. Standalone exercise = distinct framing ("Practice: fix this weak prompt") with different scenarios — never a copy of the embed | `/learn/prompting/constraints` vs `/practice/add-constraints-to-a-vague-brief` |
| Track hub vs `/learn` hub | `/learn` = ordering across tracks (curriculum); track hub = deep intro + lesson sequence within one track. No duplicated lesson lists beyond what navigation requires | — |
| Assessment vs quiz content | Assessment = one diagnostic, skill-mapped, no spin-offs. No per-topic quiz pages (doorway risk) | — |
| Foundation lesson vs safety lesson (early overlap) | Assign each overlap explicitly (e.g., "hallucinations" lives in foundations; "verifying high-consequence answers" lives in research; "what not to paste" in safety). Registry test asserts unique primary intent per unit | — |

## 5. Doorway-page policy (banned patterns — test-enforced later)

- ❌ `/chatgpt-prompt-for-[profession]`, `/ai-for-[industry]` mass variants
- ❌ Name-swapped guides (`/chatgpt-tutorial` cloned as `/claude-tutorial` with only names changed — the
  v1.1 guides must each carry product-specific, sourced, differentiated value)
- ❌ Numeric-value page farms (no `/50-prompt-examples` style unless the list itself is the product — it is not)
- ❌ Empty thin pages: every indexable page must carry minimum substance (lesson: ≥500 words + exercise;
  exercise: scenario + rubric + explanation; glossary: 60–180 words + links)

## 6. Internal linking contract (checked by tests at Gate 8)

1. Every lesson lists: prerequisite (if any), next lesson, ≥2 glossary links, ≥1 exercise link.
2. Every exercise links to its parent lesson; every glossary term links to ≥1 lesson.
3. Track hubs link every lesson in the track, in order; lessons link back to their hub.
4. `/learn` hub links every published track hub. No orphan indexable pages.
5. Link graph is symmetric where required by the registry test (lesson ↔ hub, exercise ↔ lesson).

## 7. Indexability matrix

| State | Indexable? | Mechanism |
|---|---|---|
| Published lesson/exercise/glossary/about/assessment | ✅ | included in sitemap, canonical present |
| Scaffold / draft content | ❌ | `noindex` + excluded from sitemap (scaffold ships this way today) |
| Assessment in-progress/result views | ❌ | client-side state only |
| Practice filters | ❌ | query params only; canonical `/practice` |
| 404 | ❌ | status 404, styled page |
