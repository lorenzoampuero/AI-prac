# BRAND OPTIONS — name candidates for the AI practice platform

**Gate 0 artifact · Date: 2026-09-19 · Status: research only — NOTHING is purchased, registered or reserved.**

**Method & honesty:** 20 candidate domains were probed with DNS lookups (2026-09-19). **The probe signal is
weak:** 18 of 20 resolved to A records, which likely reflects parked-page saturation and/or resolver behavior
in this environment — "resolves" does not prove a live product, and "NXDOMAIN" does not prove availability
(a registered domain can lack DNS). **No trademark search was performed** (USPTO/EUIPO checks are the
operator's step before any purchase). No WHOIS checks were made.

---

## 1. Evaluation criteria (used below)

1. **Memorability & spelling** in English as a second language (the audience is global).
2. **Metaphor fit**: practice, reps, drills, gym, lab — the product is a training ground, not a course.
3. **Distinctiveness** (trademark-ability): descriptive names are weak marks; compounds are average;
   coined words are strong but risk poor recall.
4. **Collision check** against AI-learning brands seen in `COMPETITOR_MATRIX.md`: Coddy, Mimo, Sololearn,
   TinkerLLM, GeraQuest, Learn Prompting, DAIR.AI, Codecademy, Exercism, DataCamp, Brilliant, Elements of AI.
5. **Tagline independence**: must not echo TinkerLLM's "Learn AI by doing" positioning.
6. **Domain reality**: .com preferred; .app/.site acceptable fallbacks (ImgExact precedent: .site worked).

## 2. Candidates

| # | Name | Concept & why it works | Risks / collisions | DNS probe (2026-09-19) |
|---|---|---|---|---|
| 1 | **AI Practice** | Exact description of the product; perfect query alignment ("ai practice") | Generic → weak trademark; crowded; current internal slug `ai-practice` | aipractice .com/.app/.site all resolve |
| 2 | **Prompt Gym** | Gym = practice metaphor; short; visual | "Prompt gym" concept exists in courses/communities | promptgym .com/.app resolve |
| 3 | **AI Kata** | "Kata" = practiced forms; implies reps + discipline; memorable | Code-kata associations (dev-centric); aikata.com resolves | aikata.com resolves |
| 4 | **Prompt Kata** | Same metaphor, keyword-forward | Narrow to prompting only; promptkata.com resolves | promptkata.com resolves |
| 5 | **AI Drills** | Drills = deliberate practice; instantly understood | Slightly militaristic/boring connotation; aidrills.com resolves | aidrills.com resolves |
| 6 | **AI Literacy** | Category-defining phrase; enterprise/education credible; best topical match for "AI literacy" queries | Descriptive → nearly untrademarkable; could read as an org/NGO | **ailiteracy.com → NXDOMAIN** |
| 7 | **AI Skills Lab** | "Lab" = hands-on; professional; pairs with "AI Skills Assessment" feature | Three words, longer to type; aiskillslab.com NXDOMAIN | **aiskillslab.com → NXDOMAIN** |
| 8 | **LiterAI** | Clever portmanteau | Spelling/pronunciation ambiguity; literai.com resolves | literai.com resolves |
| 9 | **HandsOn AI** | Direct promise of the method | handsonai.com resolves; "hands-on" is everywhere in corporate AI content | handsonai.com resolves |
| 10 | **AI Mind Gym** | Brain-training mental model (Lumosity-adjacent) | Mindgym is a real corporate brand (UK) — collision risk | aimindgym.com resolves |
| 11 | **Prompt Practice** | Exact-match utility phrase | Weak distinctiveness; promptpractice.com resolves | promptpractice.com resolves |
| 12 | **AI Gymnasium** | Elevated "gym"; distinctive in AI ed | Long; old-fashioned connotation; resolves | aigymnasium.com resolves |
| 13 | **The AI Gym** | Friendly, memorable | "AI Gym" is an established generic term across products; resolves | theaigym.com resolves |
| 14 | **Practice Bench** | Sports/bench metaphor; short | Vague without "AI"; practicebench.com resolves | practicebench.com resolves |
| 15 | **AI Reps** | "Reps" = repeated practice; fitness-coded | Jargon for non-fitness audiences; aireps.com resolves | aireps.com resolves |
| 16 | **Prompt Coach** | Coaching framing | Implies a coach persona/service; crowded "coach" space | promptcoach.com resolves |
| 17 | **Prompt Loop** | The retention loop (practice → feedback → return); distinctive-ish | "Loop" cluster crowded; promptloop.com resolves | promptloop.com resolves |
| 18 | **AI Workout** | Workout metaphor, playful | Fitness collision (Workout apps); not probed yet | not probed |
| 19 | **Prompt Pad** | Practice pad (music/drum practice); compact | Not probed yet; "pad" also notepad-coded | not probed |
| 20 | **Skill Reps** | Practice-reps framing + skills | Not probed yet; generic-leaning | not probed |

## 3. Assessment notes per shortlist factor

- **Best category-fit names:** AI Literacy, AI Skills Lab, AI Practice — strongest topical alignment, weakest
  distinctiveness. Viable if the brand is built as "the free practice ground for AI skills" rather than a
  personality brand.
- **Best metaphor names:** Prompt Gym, AI Kata, Prompt Loop, AI Drills — more distinctive, more memorable,
  slightly narrower (prompt-coded) or less formal.
- **Names to avoid:** anything evoking TinkerLLM ("tinker"), existing leaders (Coddy/Mimo/DataCamp style
  compounds), or "academy/learn/prompt-guide" (crowded with the exact competitors documented in the matrix).

## 4. Recommendation (for the operator's later decision — no action now)

1. Keep the internal slug `ai-practice` (already in `package.json`) until a brand decision is made.
2. When ready, shortlist **3 finalists** and, before any purchase: registrar WHOIS + trademark screen
   (USPTO, EUIPO, at least a plain web search for the exact string in the AI-education space).
3. Suggested finalist set to re-evaluate at that time: **AI Skills Lab** (professional, NXDOMAIN today),
   **AI Literacy** (category phrase, NXDOMAIN today, verify trademark risk carefully), **Prompt Gym**
   (brandable metaphor, domain status uncertain).
4. The chosen name must not reuse "Learn AI by doing" and must keep the H1 distinct from TinkerLLM's tagline
   (noted in `COMPETITOR_MATRIX.md`).

**Reminder:** this file does not authorize purchases; the master brief (§0/§80/§93) requires explicit
approval before spending money on domains.

---

## 5. RDAP update — 2026-09-20 (strong signal, registry-level)

The earlier DNS probe was inconclusive; this pass queried the **registry RDAP endpoints directly**
(Verisign for `.com`, Google Registry for `.app`/`.dev`, Identity Digital for `.io`/`.site`) via
`scripts/domain-check.mjs`. 404 from the registry = not registered (very likely purchasable).

| Domain | Registry verdict |
|---|---|
| aipractice.com | registered (parked — TurnCommerce/NameBright) |
| **aipractice.app** | **AVAILABLE** |
| **aipractice.dev** | **AVAILABLE** |
| **aipractice.site** | **AVAILABLE** |
| aipractice.io | registered (GoDaddy) |
| aiskillslab.com | registered |
| **aiskillslab.app** | **AVAILABLE** |
| ailiteracy.com | registered |
| promptgym.com | registered |
| **promptgym.app** | **AVAILABLE** |
| aikata.com · promptkata.com · aidrills.com · promptloop.com · practicebench.com | all registered |

**Reading:** the `.com` space for every shortlist name is gone (several held by domain resellers).
The realistic path for the current brand is **`aipractice.app`** (matches the shipped name everywhere,
Google Registry, HTTPS enforced via HSTS preload, available today) with `aipractice.dev` as the
technical-audience alternative and `aipractice.site` as the ImgExact-style fallback. RDAP is a strong
signal, not a guarantee — confirm at a registrar and run the trademark screen before buying.

**Follow-up probe — phrase-style candidates (2026-09-20):**

| Domain | Registry verdict |
|---|---|
| **practiceaboutai.com** | **AVAILABLE** (best .com for the concept) |
| **practiceaboutai.app** | **AVAILABLE** |
| practiceabout.ai | reported available via rdap.org (verify at registrar; `.ai` renews at ~€60–100+/yr) |
| **getaipractice.com** | **AVAILABLE** (get-hack fallback) |
| practicewithai.com · practiceai.com | registered (Namecheap / Name.com) |

Note on `practiceaboutai.com`: descriptive and keyword-rich, but 18 characters, slower to dictate, and
the phrase reads slightly off ("practice *about* AI"). A legitimate second choice; `aipractice.app`
remains the shortest, on-brand match.

**TLD follow-up (2026-09-20):** `aipractice.site`, `aipractice.info`, `aipractice.online`,
`practiceaboutai.site`, `practiceaboutai.info` and `practiceaboutai.online` are **all available**.
Perceived-trust ranking for a trust-sensitive education product: `.app`/`.dev` > `.site` > `.online` >
`.info` (`.info` has a long spam-association history — avoid). `.site`/`.online` carry first-year promo
pricing with meaningfully higher renewals; `.app` renews flat at ~€12–15/yr. Google treats all TLDs
equally for ranking; the differences here are user perception and renewal cost, not SEO.
