# CONTENT STANDARDS — how every lesson, exercise and term gets written

**Gate 1 artifact · Date: 2026-09-19 · Authority:** this file governs all content shipped by this repo. The
Gate 7 audit (`docs/CONTENT_QA.md`, to be created) checks every unit against it; a failing unit is fixed or
cut — never shipped weak.

---

## 1. Unit anatomy (every lesson follows this exact order)

| Block | Purpose | Budget |
|---|---|---|
| Title + one-line outcome | Sets a falsifiable promise ("After this you can…") | 1 sentence |
| Meta strip | Level · minutes · skills · (prerequisite if any) | from schema |
| **Concept** | Short explanation, answer-first (see §3) | 80–220 words |
| **Why it matters** | One concrete situation where this changes the outcome | 60–140 words |
| **Bad example** | The common mistake, shown, not described | snippet + ≤60 words |
| **Better example** | The improvement | snippet + ≤60 words |
| **Why it works** | The mechanism — teach transfer, not magic | 80–200 words |
| **Practice** | The embedded exercise (component) | see §5 |
| **Transfer** | Where else this skill applies (2–3 situations) | ≤80 words |
| **Next** | Prerequisite / next lesson / related exercise links | links only |

Total per lesson: **500–1,200 useful words** (exercise-heavy lessons may sit lower; every sentence must earn
its place). No textbook chapters.

## 2. Voice and style

- Clear, precise, friendly, non-hype. Second person ("you"), active voice, short paragraphs.
- **Banned**: "revolutionizing", "game-changer", "unlock the power", "in today's fast-paced world", "the
  future is here", "10x your productivity", "simply just", gratuitous superlatives.
- Define jargon on first use — every specialized term links its `/glossary/[term]` entry.
- Numbers and claims: only verifiable ones, with a source. No invented statistics, no fake precision.
- Accessibility of language: short sentences, no idioms that break for non-native speakers, no culture-bound
  examples. Assume the reader is smart but new.

## 3. Answer-first rule (SEO/GEO core)

The first paragraph after H1 must answer the question implied by the title/hub in plain language, without
preamble. Example: "Few-shot prompting means giving the AI a couple of examples of the pattern you want
before asking it to complete a new one." Then expand. AI-search and human skimmers both get the answer
immediately — and crawlers see it in the HTML, never behind interaction (§56/§90 of the master brief).

## 4. Truth, sources and freshness

| Content type | Rule |
|---|---|
| Evergreen principle (`EV`) | No product specifics; review informally at expansion time |
| Product-specific detail (`CUR`) | **Requires** a `content/CURRENT_FACTS_REGISTRY.md` entry: claim, source URL, `verified_at` date. Display "Last reviewed" on the page |
| Technical claims | Prefer official docs, papers, standards; community sources may inform *what users struggle with*, never as authority |
| Model comparisons | Never absolute "best AI" rankings. Always "best for what" with dimensions (speed, reasoning, cost, privacy…), date tested, method, limitations |
| Prompt folklore | Never present a magic phrase/formula as universally correct. Teach principles (objective, context, constraints, format, examples, evaluation) |

## 5. Exercise authoring rules

- **Deterministic grading only** in the MVP — no LLM judge, no API key. Each exercise defines how it is
  evaluated (exact match, ordering, required elements, rubric checklist, heuristics with honest wording).
- Every exercise contains: scenario, task, hints (progressive, opt-in), solution + **explanation of why**,
  and the skill/difficulty tags from the schema.
- Open-ended tasks use **rubric self-assessment + a model answer**; the UI text says clearly it is
  self-assessment, not machine grading.
- Feedback copy follows this pattern (never "Wrong. Try again."):
  1. What was good, 2. What was missing, 3. Why it matters, 4. How to improve.
- No trick questions without teaching value; no leading questions where two answers are defensible unless the
  explanation resolves them.
- An exercise must be worth doing once — relevance over cleverness.

## 6. Originality and copyright

- All lessons and exercises are **written original** for this project. No scraping courses, docs or prompt
  libraries to compose lessons (§52/§53).
- External content: short quotes only (≤25 words, attributed, linked); concept summaries always in our own
  words. Never reproduce substantial material from courses or vendor docs.
- Research for a lesson is allowed and encouraged — copying is not.

## 7. Internal linking (checked by tests)

Every published lesson: prerequisite (if any) · next lesson · ≥2 glossary links · ≥1 exercise (embedded or
standalone) · back-link to its track hub. Every exercise links its parent lesson; every glossary term links
≥1 lesson. No orphan indexable pages (see `research/SEO_INTENT_MAP.md` §6).

## 8. Metadata every unit must carry (schema fields)

`id · slug · title · description · track · level (B/I/A) · estimated_minutes · skills[] · prerequisites[] ·
learning_outcome · class (EV/CUR) · last_reviewed · sources[] · seo.intent · exercises[]`

Build-time validation: missing/invalid fields fail the build; registry tests add uniqueness and graph checks.

## 9. Review dates

- `CUR` units: review ≤90 days (the facts registry flags staleness; `scripts` will surface overdue items in a
  later phase).
- `EV` units: no forced cadence; re-read when a linked `CUR` fact changes.
- "Last reviewed" visible on `CUR` pages only (never fake freshness on evergreen pages).

## 10. Gate 7 audit checklist (per lesson)

Accuracy · clarity · originality · sources present + authoritative · exercise alignment (practices what the
lesson teaches) · copyright clean · staleness (dates make sense) · hype-free · answer-first opening · links
complete. Verdict recorded per unit in `docs/CONTENT_QA.md` — **fix or cut**, no partial passes.