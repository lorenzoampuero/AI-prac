# KEYWORD UNIVERSE — practical AI literacy clusters

**Gate 0 artifact · Date: 2026-09-19**

**Method & honesty:** No SERP or volume API was used (none available in this environment). Clusters are
compiled from the operator brief, the live competitor scan (see `COMPETITOR_MATRIX.md`) and domain knowledge.
**Volumes are unknown** — priority here reflects intent fit and competitive reasoning, not measured demand.
Search Console data after launch is the re-validation mechanism (per master brief §63/94).

**Priority legend:** **P1** = MVP (30–40 lesson scope) · **P2** = v1.1 expansion · **P3** = later / monitor.

---

## Demand evidence — Google autocomplete pulls (2026-09-20)

Live pulls from Google's public autocomplete endpoint during the v1.1 waves — the actual strings people
type. Directional evidence, not measured volume (still no volume API available; Search Console remains
the re-validation mechanism). Units below were authored/reordered with this evidence on the table.

| Query family (seed) | Real suggestions pulled | Served by |
|---|---|---|
| how to write ai image prompts | “…like a pro”, “better”, “good … for ai image generation” | IM02 Subject, scene, style (existing) |
| verify ai answers / how to fact check ai | “how can you verify ai answers”, “how to fact check ai answers / outputs” | **RS06 Cross-check AI answers (new)** |
| ai outdated information | “ai outdated information” | **RS07 Check dates and freshness (new)** |
| chatgpt wrong calculations | “chatgpt wrong calculations” | **RS08 Check the numbers (new)** |
| ai presentation outline | “…generator”, “ai presentation maker from outline” | **WK07 AI for presentations (new)** |
| ai report writing | “…tool / free / generator” | **WK08 Reports that hold up (new)** |
| ai cover letter / tailor resume | “ai cover letter generator free”, “tailor resume with ai linkedin” | WK14 Job-search workflows (planned — strongest pull not yet served) |
| chatgpt prompt templates | “chatgpt prompt templates free download” | PR16 Reusable prompt templates (planned) |
| chatgpt excel formulas | “can chatgpt write excel formulas” | WK06 spreadsheets lesson exists; title/intent does not yet match the query — flagged |
| ai for excel data analysis | “…free”, “dashboard” | WK13 Data cleanup (planned) |

**Reading:** high-intent “tool/query” phrasing (“generator”, “free”, “tool”) surrounds every family — these
searchers want a how-to, not a product. Lesson format (answer-first + exercise) is the honest match.

## Demanda en español (ES) — autocomplete pulls (2026-09-22)

Live pulls with `hl=es&gl=es` when the `/es` version was approved (wave 1). Same caveat as EN:
directional evidence, not measured volume. Product tutorials deliberately excluded (doorway rule).

| Query family (seed) | Real suggestions pulled (es) | ES unit targeted |
|---|---|---|
| como escribir prompts | “…para claude / gemini / imágenes / copilot / chatgpt” | Prompts claros (PR01 ES) |
| chatgpt formulas excel | “chatgpt formulas excel” | Hojas de cálculo (WK06 ES) |
| verificar respuestas ia | “verificar respuestas ia”, “es confiable chatgpt”, “cuan confiable es chatgpt” | Verificar respuestas (RS06 ES) |
| ia alucinaciones | “alucinaciones ia ejemplos”, “ia generativa alucinaciones” | Por qué la IA inventa cosas (FN07 ES) |
| plantillas de prompts | “plantillas de prompts para chatgpt” | Plantillas de prompts (PR16 ES) |
| resumir texto con ia | “…gratis”, “resumir texto largo con ia” | Textos largos sin perder el hilo (PR07 ES) |
| cv con ia / carta de presentación | “cv con ia gratis sin registro”, “carta de presentación ia gratis” | Búsqueda de empleo (WK14 ES) |
| prompts imagenes ia | “prompts para generar imagenes ia”, “mejores prompts para imagenes ia” | Sujeto, escena, estilo (IM02 ES) |
| agentes de ia | “agentes de ia ejemplos”, “agentes de ia gratis” | Qué es un agente (FN12 ES) |
| como aprender ia | “como aprender ia desde cero gratis”, “…en español” | Home ES + /es/learn |
| errores comunes de chatgpt | “errores comunes de chatgpt”, “errores al usar chatgpt” | FN07 ES + FAQ ES |
| es seguro pegar datos en chatgpt | (sin pull — nucleo de seguridad, respaldado por FAQ) | Qué no pegar (SF03 ES) |

**Reading (ES):** same pattern as EN — “gratis”, “ejemplos”, “plantillas”, “para chatgpt” dominate; the
audience wants practical templates and verification over vendor walkthroughs.

---

## A. AI foundations (literacy core)

| # | Cluster | Representative queries | Intent | MVP target | P |
|---|---|---|---|---|---|
| A1 | learn ai | learn ai, learn artificial intelligence for beginners, how to start learning ai | Informational | `/learn` hub + `ai-foundations` track | P1 |
| A2 | how to use ai | how to use ai, how to use ai in daily life, using ai for beginners | Informational | Lesson: how to use AI (workflow-first) | P1 |
| A3 | what is generative ai | what is generative ai, gen ai meaning, generative ai explained simply | Informational | Lesson: what generative AI is | P1 |
| A4 | what is an llm | what is an llm, how do large language models work, llm explained simply | Informational | Lesson: what an LLM does | P1 |
| A5 | tokens | what are tokens in ai, tokens explained, does ai read words | Informational | Lesson: tokens, simply | P1 |
| A6 | context window | what is a context window, why does chatgpt forget, context limit explained | Informational | Lesson: context windows | P1 |
| A7 | hallucinations | ai hallucination, why does ai make things up, chatgpt lied to me | Informational | Lesson: why AI can be wrong | P1 |
| A8 | models vs products | difference between ai model and app, gpt vs chatgpt, what are ai models | Informational | Lesson: models vs products | P1 |
| A9 | multimodal ai | multimodal ai meaning, ai that sees images, voice and vision in ai | Informational | Lesson: multimodal AI | P2 |
| A10 | reasoning models | what is a reasoning model, thinking models explained, fast vs reasoning ai | Informational | Lesson: fast vs reasoning models | P1 |
| A11 | nondeterminism | why does ai give different answers, same prompt different answer | Informational | Lesson: why answers vary | P1 |
| A12 | training vs inference | training vs inference, does ai learn from my chats, is chatgpt learning now | Informational | Lesson: training vs inference | P2 |

## B. Prompting (the practice heart)

| # | Cluster | Representative queries | Intent | MVP target | P |
|---|---|---|---|---|---|
| B1 | prompt engineering (head) | prompt engineering, prompt engineering for beginners, what is prompt engineering | Informational | `/learn/prompting` hub + intro lesson | P1 |
| B2 | how to write prompts | how to write better prompts, how to write a good prompt, better ai instructions | Informational | Lesson: clear instructions | P1 |
| B3 | how to prompt chatgpt | how to prompt chatgpt, chatgpt prompting tips, prompting chatgpt better | Informational | Lesson (model-agnostic + product examples) | P1 |
| B4 | context in prompting | give ai context, context in prompts, why ai misses the point | Informational | Lesson: context | P1 |
| B5 | constraints | add constraints to prompt, too long response ai, limit ai output | Informational | Lesson: constraints | P1 |
| B6 | output format | tell ai output format, format chatgpt response, response format prompt | Informational | Lesson: specify format | P1 |
| B7 | examples / few-shot | few shot prompting, few-shot examples, give examples in prompt | Informational | Lesson: examples & few-shot | P1 |
| B8 | step-by-step (CoT family) | chain of thought prompting, ask ai to think step by step, reasoning prompt | Informational | Covered inside reasoning/uncertainty lessons (honest, no folklore) | P1 |
| B9 | structured output | ask ai for json, structured output, json prompt format | Informational | Lesson: structured output | P1 |
| B10 | delimiters | prompt delimiters, xml tags in prompts, separate instructions from data | Informational | Lesson: delimiters & clean input | P2 |
| B11 | long input | summarize long document, prompt with long text, chatgpt long documents | Informational | Lesson: working with long input | P1 |
| B12 | iterate | how to get better answers from ai, ai gives wrong answer fix, iterate on output | Informational | Lesson: iterate from output | P1 |
| B13 | evaluate output | how to check ai responses, is the ai answer good, evaluate ai output | Informational | Lesson: evaluation criteria + exercise | P1 |
| B14 | improve/debug a prompt | improve my prompt, my prompt doesn't work, fix this prompt | Utility | Exercise family: fix the prompt + prompt debugger (P2 tool) | P1 exercises |
| B15 | prompt practice / exercises | prompt engineering exercises, prompt practice, prompt challenges, practice prompts | Utility | `/practice` + exercise pages | **P1 (key)** |
| B16 | prompt examples explained | good prompt examples, prompt examples with explanation, before after prompts | Hybrid | Lesson with bad→better examples + hub | P1 |
| B17 | grounded prompts | prompt with sources, tell ai to use my document, ground ai in text | Informational | Lesson: ground in supplied sources | P1 |

## C. AI for work (knowledge-worker value)

| # | Cluster | Representative queries | Intent | MVP target | P |
|---|---|---|---|---|---|
| C1 | ai for work | ai for work, how to use ai at work, ai productivity | Informational | `/learn/ai-for-work` hub + lesson | P1 |
| C2 | meeting notes | ai meeting notes, summarize meeting notes, meeting notes to action items | Utility | Lesson + exercise (decisions/owners/deadlines) | P1 |
| C3 | email | ai email writing, reply to email with ai, professional email with ai | Utility | Lesson + exercise | P1 |
| C4 | documents / pdf | chat with pdf, ai analyze document, ai read contract | Utility | Lesson: extracting from documents | P1 |
| C5 | spreadsheets | ai for spreadsheets, chatgpt excel help, ai formula help | Utility | Lesson + exercise (data extraction/classification) | P2 |
| C6 | presentations | ai slides, ai presentation outline | Utility | Lesson: outlines & structure | P2 |
| C7 | summarize | ai summarizer, how to summarize with ai, tldr with ai | Utility | Exercise family: summarize precisely | P1 |
| C8 | extract data | extract data from text with ai, ai table extraction | Utility | Lesson + exercise | P1 |
| C9 | classify / triage | ai classify text, ai email triage, sort data with ai | Utility | Exercise: classification prompt | P2 |

## D. AI images

| # | Cluster | Representative queries | Intent | MVP target | P |
|---|---|---|---|---|---|
| D1 | ai image prompts | ai image prompts, how to write image prompts, image prompt guide | Informational | `/learn/ai-images` hub + lesson | P2 (v1.1 unless capacity) |
| D2 | composition & framing | image prompt camera angle, framing in image prompts | Informational | Lesson: composition & camera | P2 |
| D3 | lighting | lighting in image prompts, golden hour prompt | Informational | Lesson: lighting | P2 |
| D4 | text in images | ai image text wrong, text in ai images | Informational | Lesson: typography limits | P2 |
| D5 | iteration/editing | edit ai image, iterate on image prompt, img2img explained | Informational | Lesson: iterate & edit | P2 |
| D6 | image prompt builder | image prompt generator, image prompt builder | Utility | Tool (v1.1) | P2 |

## E. AI research & verification (differentiator)

| # | Cluster | Representative queries | Intent | MVP target | P |
|---|---|---|---|---|---|
| E1 | verify ai answers | how to verify ai answers, is chatgpt reliable, can i trust ai | Informational | `/learn/ai-research` hub + lesson | **P1 (core)** |
| E2 | fact-check ai | fact check chatgpt, ai fact checking, chatgpt wrong facts | Informational | Lesson + spot-the-error exercises | P1 |
| E3 | citations / sources | does chatgpt cite sources, ai references fake, ai citation check | Informational | Lesson: inspecting citations | P1 |
| E4 | primary vs secondary sources | primary source vs secondary source, source quality research | Informational | Lesson: source quality (with exercises) | P1 |
| E5 | search vs generation | ai search vs chatbot, when to use web search ai | Informational | Lesson: search vs generation | P1 |
| E6 | deep research tools | chatgpt deep research, ai research tools comparison | Informational | Lesson: research planning + capability framing | P2 |
| E7 | hallucination spotting | ai hallucination examples, spot ai mistakes, ai confidence vs correctness | Utility | Exercise family (find the problem) | **P1 (key)** |

## F. AI coding (beginner-safe)

| # | Cluster | Representative queries | Intent | MVP target | P |
|---|---|---|---|---|---|
| F1 | ai coding for beginners | can ai write code, learn to code with ai, ai coding basics | Informational | `/learn/ai-coding` hub + lesson | P2 (intro lesson P1 if capacity) |
| F2 | debug with ai | debug with chatgpt, fix my error with ai, explain error message ai | Utility | Lesson + exercise | P2 |
| F3 | ai code review | review my code with ai, ai code review | Utility | Lesson | P2 |
| F4 | tests with ai | write tests with ai, generate unit tests | Utility | Lesson | P2 |
| F5 | spec the feature | ask ai to build a feature, feature request prompt | Utility | Lesson | P2 |
| F6 | vetting AI code | is ai generated code safe, can i run this code | Informational | Lesson (blind execution risks) | P2 |

## G. Workflows & agents

| # | Cluster | Representative queries | Intent | MVP target | P |
|---|---|---|---|---|---|
| G1 | ai workflows | ai workflow, ai workflow examples, build an ai workflow | Informational | `/learn/ai-workflows` hub + lesson | P2 |
| G2 | agents vs workflows | ai agent vs workflow, what are ai agents | Informational | Lesson: agents explained | P2 |
| G3 | rag explained | what is rag, retrieval augmented generation explained simply | Informational | Lesson: retrieval (RAG simply) | P2 |
| G4 | tool calling | function calling explained, ai using tools | Informational | Lesson: tools & function calling | P2 |
| G5 | memory & context | ai memory explained, context engineering beginners | Informational | Lesson: memory concepts | P3 |
| G6 | human approval | human in the loop ai, ai approval workflow | Informational | Lesson: keep a human in the loop | P2 |
| G7 | automation boundaries | what to automate with ai, ai automation limits | Informational | Lesson: automation boundaries | P2 |

## H. Safety & privacy

| # | Cluster | Representative queries | Intent | MVP target | P |
|---|---|---|---|---|---|
| H1 | safe ai use | how to use ai safely, ai safety for beginners | Informational | `/learn/ai-safety` hub + lesson | P1 |
| H2 | what not to share | what not to share with chatgpt, is chatgpt private, sensitive data ai | Informational | Lesson: what not to paste | **P1 (key)** |
| H3 | prompt injection | what is prompt injection, prompt injection examples | Informational | Lesson: prompt injection basics | P1 |
| H4 | work policies | can i use ai for work, ai at work rules | Informational | Lesson: judgment at work (no legal advice) | P2 |
| H5 | bias & mistakes | ai bias examples, ai mistakes to watch | Informational | Covered in foundations + safety | P2 |
| H6 | high-consequence decisions | should i trust ai for decisions, ai advice risks | Informational | Lesson: when not to rely on AI | P1 |
| H7 | provider data handling | does chatgpt train on my data, ai privacy settings | Informational (current facts) | Glossary + lesson notes w/ dates + sources | P2 |

## I. Tool & capability selection

| # | Cluster | Representative queries | Intent | MVP target | P |
|---|---|---|---|---|---|
| I1 | which ai should i use | which ai should i use, best ai for my task | Informational/Utility | Lesson: choose a capability + "which AI" helper (P2 tool) | P1 lesson |
| I2 | chatgpt vs claude vs gemini | chatgpt vs claude, gemini vs chatgpt, claude vs gemini | Informational | Lesson: capability comparison (dated, sourced, no fanboy) | P2 |
| I3 | best ai for X | best ai for writing/research/coding/images | Informational | Capability-dimension pages (only if maintainable) | P3 |
| I4 | fast vs reasoning choice | when to use reasoning model, fast model vs smart model | Informational | Folded into A10 lesson | P1 |
| I5 | local ai / privacy-first | local ai models, run ai privately, offline ai | Informational | Lesson: local models & privacy options | P3 |
| I6 | free ai tools | free ai tools, ai tools list | Commercial-ish | **Not targeted** (spam-prone); a curated honest page only if maintainable | P3 |

## J. Meta / utility (acquisition features)

| # | Cluster | Representative queries | Intent | MVP target | P |
|---|---|---|---|---|---|
| J1 | ai skills test | ai skills test, test my ai knowledge, ai skills assessment | Utility | `/assessment` | **P1 (key)** |
| J2 | ai glossary | ai glossary, ai terms explained, llm glossary | Informational | `/glossary` + term pages | P1 |
| J3 | ai quiz | ai quiz for beginners, ai knowledge quiz | Utility | `/assessment` variants | P1 |
| J4 | chatgpt tutorial | chatgpt tutorial for beginners, how to use chatgpt | Informational | Guide page (v1.1) + MVP lessons | P2 |
| J5 | claude tutorial | claude tutorial, how to use claude | Informational | Guide page (v1.1) | P2 |
| J6 | gemini tutorial | gemini tutorial, how to use gemini | Informational | Guide page (v1.1) | P2 |
| J7 | daily practice | ai daily challenge, daily ai practice | Utility | `/daily` (v1.1, canonicalized) | P2 |
| J8 | free ai course | free ai course, learn ai free | Commercial | Served by `/learn` positioning (no fake certification) | P3 |

---

## Summary

- **Total clusters mapped: 74.** P1 (MVP): ~42 · P2: ~26 · P3/monitor: ~6.
- **Track distribution (P1):** foundations 10 · prompting 14 · work 8 · research 6 · safety 4. Images/coding/
  workflows/agents enter as P2 (supports the recommended MVP mix in `CURRICULUM_OPPORTUNITY.md`).
- **Utility clusters are a second traffic engine:** practice (B15), verification drills (E7), skills test
  (J1), glossary (J2) — these also earn links and repeat visits, not just informational clicks.

## Guardrails (carried into SEO_INTENT_MAP and enforced by tests)

1. **No doorway pages** — no mass "chatgpt prompts for [profession]" pages (master brief §34).
2. **No two URLs sharing one primary intent** — lesson vs glossary vs exercise roles are defined per family.
3. **No fake freshness or fabricated volumes** — this file states uncertainty explicitly and is re-validated
   with Search Console data post-launch.
4. **Product-specific queries** (J4–J6, H7, E6) ship only with sourced, dated facts and substantial value —
   never as name-swapped duplicates.
