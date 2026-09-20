# CURRICULUM MAP — 100 units for practical AI literacy

**Gate 1 artifact · Date: 2026-09-19 · Status: architecture locked for MVP; v1.1 units are planning-level only.**

> **Shipped update (2026-09-20):** MVP 36/36 live · v1.1 waves shipped: **AI Images IM01–IM12 complete**,
> **RS06–RS08** (cross-check, freshness, numbers) and **WK07–WK09** (presentations, reports, support) live,
> FN02–FN04 + IM01 gained animated teaching diagrams.
> **Batch 3 (same day):** **FN09–FN12** complete the foundations track (12/12), **WF01–WF02** open the
> workflows track, **PR16** reusable templates and **WK14** job-search workflows live; all remaining MVP
> lessons retrofitted with a teaching block + KeyTakeaways (new §11 rules enforced by tests); **/faq** and
> **/llms.txt** shipped for answer engines. Details in `CONTENT_QA.md` v1.1 verdicts.

**Sources:** `research/CURRICULUM_OPPORTUNITY.md` (MVP mix), `research/KEYWORD_UNIVERSE.md` (cluster refs),
master brief §7–15 (track allocation 12/20/15/12/12/10/10/9). Slugs are finalized per unit at authoring time;
uniqueness + intent rules are enforced by the registry tests defined in `research/SEO_INTENT_MAP.md` §6.

**Legend:** Lvl B/I/A = beginner/intermediate/advanced · Ex = primary exercise engine (A pick-better-prompt ·
B fix-the-prompt · C build-the-prompt · D find-the-problem · E order-the-steps · F model/mode selection ·
G evaluate-output · H image-prompt-builder · I real-world challenge) · Class EV = evergreen principle ·
CUR = contains current product facts (facts-registry backed, review ≤90 days) · Status MVP = launch scope,
1.1 = next phase. Cluster refs point to `KEYWORD_UNIVERSE.md`.

---

## Foundations — FN01–FN12 (MVP: 8)

| ID | Unit | Lvl | Learning outcome | Ex | Class | SEO | Status |
|---|---|---|---|---|---|---|---|
| FN01 | What generative AI is | B | Explain what "generative" means and when it applies | A | EV | A3 | **MVP** |
| FN02 | What an LLM actually does | B | Describe next-token prediction as the core mental model | D | EV | A4 | **MVP** |
| FN03 | Tokens, simply | B | Explain why text is counted in tokens and what limits mean | A | EV | A5 | **MVP** |
| FN04 | Context windows | B | Explain what fits in a conversation and why chats forget | A | EV | A6 | **MVP** |
| FN05 | Why AI makes things up (hallucinations) | B | Recognize confident wrong answers and why they happen | D | EV | A7 | **MVP** |
| FN06 | Models vs products | B | Distinguish models, apps and features when choosing tools | F | CUR | A8 | **MVP** |
| FN07 | Fast vs reasoning models | B | Choose a speed/quality mode for a task | F | CUR | A10, I4 | **MVP** |
| FN08 | Why answers vary | I | Explain nondeterminism and stop chasing repeatable phrasing | A | EV | A11 | **MVP** |
| FN09 | Multimodal AI | B | Use image/audio/document inputs appropriately | F | CUR | A9 | 1.1 |
| FN10 | Training vs inference | I | Explain why chats don't instantly "train" the model | A | CUR | A12 | 1.1 |
| FN11 | Tools and function calling, simply | I | Explain how AI can act through tools | E | CUR | G4 | 1.1 |
| FN12 | What an agent is (and isn't) | I | Distinguish agents from chatbots before using them | A | CUR | G2 | 1.1 |

## Prompting — PR01–PR20 (MVP: 11)

| ID | Unit | Lvl | Learning outcome | Ex | Class | SEO | Status |
|---|---|---|---|---|---|---|---|
| PR01 | Define the outcome | B | State the result you want before thinking about wording | A | EV | B2 | **MVP** |
| PR02 | Give useful context | B | Supply the who/why/known details that change the answer | C | EV | B4 | **MVP** |
| PR03 | Write clear instructions | B | Replace vague asks with specific, checkable instructions | A | EV | B2, B3 | **MVP** |
| PR04 | Add constraints | B | Bound length, scope and exclusions | C | EV | B5 | **MVP** |
| PR05 | Specify the format | B | Request tables/sections/lists that fit the actual use | A | EV | B6 | **MVP** |
| PR06 | Examples and few-shot | I | Teach a pattern with 2–3 examples instead of adjectives | B | EV | B7 | **MVP** |
| PR07 | Work with long input | I | Structure large text so instructions aren't lost | E | EV | B11 | **MVP** |
| PR08 | Ground responses in your sources | I | Make answers quote only from supplied text | D | EV | B17 | **MVP** |
| PR09 | Structured output (JSON, simply) | I | Get reliably shaped results for other tools | C | EV | B9 | **MVP** |
| PR10 | Iterate from the output | B | Improve via feedback instead of re-rolling | G | EV | B12 | **MVP** |
| PR11 | Evaluate before you ship | I | Judge outputs against criteria you defined | G | EV | B13 | **MVP** |
| PR12 | Delimiters and clean input | I | Separate instructions from data with clear markers | B | EV | B10 | 1.1 |
| PR13 | Ask for alternatives | B | Get options, then choose deliberately | C | EV | — | 1.1 |
| PR14 | Specify tone and audience | B | Match voice to reader without guessing | B | EV | — | 1.1 |
| PR15 | Separate facts from assumptions | I | Make the model label what it knows vs what it infers | D | EV | — | 1.1 |
| PR16 | Reusable prompt templates | I | Turn a good prompt into a repeatable asset | C | EV | — | 1.1 |
| PR17 | Prompt chaining (stages) | I | Break complex work into verifiable steps | E | EV | — | 1.1 |
| PR18 | Debug a bad prompt | A | Diagnose missing objective/context/constraints | B | EV | B14 | 1.1 |
| PR19 | Advanced structured output | A | Design schemas and validate outputs | C | EV | B9 | 1.1 |
| PR20 | What transfers across models | I | Keep prompts portable and know what's model-specific | G | CUR | I2 | 1.1 |

## AI Research & Verification — RS01–RS12 (MVP: 5)

| ID | Unit | Lvl | Learning outcome | Ex | Class | SEO | Status |
|---|---|---|---|---|---|---|---|
| RS01 | Search vs generation | B | Decide when web access changes the answer | F | EV | E5 | **MVP** |
| RS02 | Inspect the citations | I | Verify quotes and sources exist and say what's claimed | D | EV | E3 | **MVP** |
| RS03 | Primary vs secondary sources | I | Rank sources and trace claims to their origin | D | EV | E4 | **MVP** |
| RS04 | Find the unsupported claim | I | Spot confident claims that lack evidence | D | EV | E7 | **MVP** |
| RS05 | Ask for uncertainty | I | Get calibrated answers instead of false confidence | A | EV | — | **MVP** |
| RS06 | Cross-check claims | I | Triangulate before believing | G | EV | E2 | 1.1 |
| RS07 | Check dates and freshness | B | Catch stale or superseded information | D | EV | — | 1.1 |
| RS08 | Numeric verification | I | Recompute numbers and sanity-check statistics | D | EV | — | 1.1 |
| RS09 | Contradictions between sources | A | Handle conflicting credible evidence | G | EV | — | 1.1 |
| RS10 | Research planning | I | Decompose a question into searchable parts | E | EV | — | 1.1 |
| RS11 | Read documents critically | I | Locate the actual quote and its context | D | EV | — | 1.1 |
| RS12 | Write with sources honestly | I | Cite and paraphrase without fake precision | I | EV | — | 1.1 |

## AI for Work — WK01–WK15 (MVP: 6)

| ID | Unit | Lvl | Learning outcome | Ex | Class | SEO | Status |
|---|---|---|---|---|---|---|---|
| WK01 | Summarize without losing meaning | B | Compress while preserving decisions and caveats | G | EV | C7 | **MVP** |
| WK02 | Meeting notes → decisions, owners, deadlines | B | Turn messy notes into a usable action table | C | EV | C2 | **MVP** |
| WK03 | Email that sounds like you | B | Draft replies in your voice under constraints | C | EV | C3 | **MVP** |
| WK04 | Extract data from documents | I | Pull structured fields from PDFs and text | C | EV | C4, C8 | **MVP** |
| WK05 | Classify and triage text | I | Sort messages or tickets by rules you define | B | EV | C9 | **MVP** |
| WK06 | Spreadsheets: describe, don't guess | I | Get formulas and steps with assumptions surfaced | C | EV | C5 | **MVP** |
| WK07 | Presentations and outlines | B | Build a deck structure that argues clearly | C | EV | C6 | 1.1 |
| WK08 | Report drafting and structure | I | Draft reports with evidence hygiene | I | EV | — | 1.1 |
| WK09 | Customer support replies | I | Handle tone, de-escalation and policy edges | C | EV | — | 1.1 |
| WK10 | Marketing copy with constraints | B | Write copy that respects brand and claims | C | EV | — | 1.1 |
| WK11 | Brainstorming that beats the blank page | B | Diverge then converge deliberately | I | EV | — | 1.1 |
| WK12 | Comparing options and decisions | I | Build honest comparison tables | G | EV | — | 1.1 |
| WK13 | Data cleanup and transformation | I | Convert messy formats safely | C | EV | — | 1.1 |
| WK14 | Job-search workflows | B | Tailor a CV or cover letter without exaggeration | C | EV | — | 1.1 |
| WK15 | Planning and project breakdown | I | Decompose projects and caveat estimates | E | EV | — | 1.1 |

## AI Images — IM01–IM12 (MVP: 0 — v1.1 track)

| ID | Unit | Lvl | Learning outcome | Ex | Class | SEO | Status |
|---|---|---|---|---|---|---|---|
| IM01 | How image generation works, plainly | B | Explain diffusion vs editing at a useful level | H | CUR | D1 | 1.1 |
| IM02 | Subject, scene, style | B | Write a first solid image prompt | H | EV | D1 | 1.1 |
| IM03 | Composition and framing | I | Control layout, negative space and aspect ratio | H | EV | D2 | 1.1 |
| IM04 | Camera angle and lens concepts | I | Speak in camera terms that change the result | H | EV | D2 | 1.1 |
| IM05 | Lighting fundamentals | I | Set mood through light descriptions | H | EV | D3 | 1.1 |
| IM06 | Color and mood | B | Direct palette and atmosphere | H | EV | D3 | 1.1 |
| IM07 | Materials and texture | I | Describe surfaces precisely | H | EV | — | 1.1 |
| IM08 | Text inside images | I | Recognize limits and realistic workarounds | H | CUR | D4 | 1.1 |
| IM09 | Iterate and edit | I | Refine vs regenerate; inpaint concepts | H | EV | D5 | 1.1 |
| IM10 | Consistency across images | A | Keep characters and styles stable | H | EV | — | 1.1 |
| IM11 | Style references, honestly | I | Use references as concepts, not magic words | G | EV | — | 1.1 |
| IM12 | Negative constraints | I | Exclude unwanted elements where supported | H | CUR | — | 1.1 |

## AI Coding (beginner-safe) — CD01–CD10 (MVP: 2)

| ID | Unit | Lvl | Learning outcome | Ex | Class | SEO | Status |
|---|---|---|---|---|---|---|---|
| CD01 | What AI can (and can't) do with code | B | Set realistic expectations before generating code | F | EV | F1 | **MVP** |
| CD02 | Describe, vet, never blind-run | B | Treat generated code as a draft to verify | D | EV | F6 | **MVP** |
| CD03 | Write a good implementation request | I | Spec a feature with constraints | C | EV | F5 | 1.1 |
| CD04 | Give environment context | I | Provide errors, versions and reproduction details | B | EV | — | 1.1 |
| CD05 | Debug step by step | I | Work an error methodically with AI | E | EV | F2 | 1.1 |
| CD06 | Ask for a minimal reproduction | I | Reduce a bug to a runnable snippet | E | EV | — | 1.1 |
| CD07 | Request tests (and judge them) | I | Get meaningful tests, not theater | G | EV | F4 | 1.1 |
| CD08 | Review generated code | I | Spot edge cases, footguns and unsafe patterns | D | EV | F3 | 1.1 |
| CD09 | Ask AI to explain code | B | Use explanations as a genuine learning loop | I | EV | — | 1.1 |
| CD10 | Iterate safely (Git basics) | I | Commit, diff and revert when working with AI | E | EV | — | 1.1 |

## AI Workflows & Agents — WF01–WF10 (MVP: 0 — v1.1 track)

| ID | Unit | Lvl | Learning outcome | Ex | Class | SEO | Status |
|---|---|---|---|---|---|---|---|
| WF01 | Prompt vs workflow | B | Know when a single prompt won't be enough | E | EV | G1 | 1.1 |
| WF02 | Map a workflow | I | Design inputs → steps → outputs → checks | I | EV | G1 | 1.1 |
| WF03 | Retrieval and context (RAG, simply) | I | Explain grounding answers in your own data | A | EV | G3 | 1.1 |
| WF04 | Memory: what persists and where | I | Reason about state across sessions | A | CUR | G5 | 1.1 |
| WF05 | Tools in workflows | I | Understand function calling at work | E | CUR | G4 | 1.1 |
| WF06 | Human approval points | I | Place checkpoints that actually matter | E | EV | G6 | 1.1 |
| WF07 | Failure handling | I | Design what happens when a step fails | D | EV | — | 1.1 |
| WF08 | Automation boundaries | I | Decide what should never auto-run | G | EV | G7 | 1.1 |
| WF09 | Measure a workflow | A | Track quality, cost and drift | G | EV | — | 1.1 |
| WF10 | When not to build an agent | I | Apply a simplicity test before complexity | G | EV | G2 | 1.1 |

## AI Safety & Privacy — SF01–SF09 (MVP: 4)

| ID | Unit | Lvl | Learning outcome | Ex | Class | SEO | Status |
|---|---|---|---|---|---|---|---|
| SF01 | What not to paste | B | Protect credentials, personal and company data | D | EV | H2 | **MVP** |
| SF02 | Prompt injection, simply | I | Recognize attacks hidden in untrusted content | D | EV | H3 | **MVP** |
| SF03 | When not to rely on AI | I | Apply consequence-based judgment to delegation | A | EV | H6 | **MVP** |
| SF04 | Using AI at work: judgment calls | I | Navigate disclosure, policy and verification | I | EV | H4 | **MVP** |
| SF05 | How providers handle your data | I | Read the actual policies (dated, sourced) | A | CUR | H7 | 1.1 |
| SF06 | Bias in practice | I | See where outputs skew and how to check | D | EV | H5 | 1.1 |
| SF07 | Mistakes at scale | I | Sample and double-check volume work | G | EV | — | 1.1 |
| SF08 | Honest AI use at school and work | B | Apply disclosure norms and integrity rules | I | EV | — | 1.1 |
| SF09 | Your personal AI rules | B | Write a reusable judgment checklist | I | EV | — | 1.1 |

---

## Totals & MVP definition

| Track | Units | MVP | Wave |
|---|---|---|---|
| Foundations | 12 | 8 | **W1** |
| Prompting | 20 | 11 | **W2** |
| Research & verification | 12 | 5 | **W3** |
| Work | 15 | 6 | **W4** |
| Safety | 9 | 4 | **W3** |
| Coding | 10 | 2 | **W5** |
| Images | 12 | 0 | v1.1 |
| Workflows & agents | 10 | 0 | v1.1 |
| **Total** | **100** | **36** | |

**Practice target:** every MVP unit ships with ≥1 embedded exercise; the standalone practice library grows to
**≥41 exercises** (≈36 unit exercises + variants) during W1–W5. **Glossary target:** ~40 terms extracted
from MVP lessons (each: 60–180 words + lesson/track links).

## Sequencing rules

1. Units within a track are ordered (each lesson links back to its predecessor). Cross-track assumption:
   RS/WK/SF units assume FN + early PR literacy; front-load FN then PR.
2. `CUR` units ship only with facts-registry entries (source + verified_at) and re-review every ≤90 days.
3. The registry test (Gate 8) asserts: unique slug, unique primary intent, no doorway patterns, symmetric
   links (hub ↔ lesson ↔ exercise), and ≥1 exercise reference per published lesson.
4. Quality beats count: any unit that fails the `CONTENT_STANDARDS.md` bar moves to 1.1 rather than shipping
   weak (MVP floor remains 30 lessons / 30 exercises).
