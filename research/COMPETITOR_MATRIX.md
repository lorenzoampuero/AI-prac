# COMPETITOR MATRIX — AI learning & practice landscape

**Gate 0 artifact · Snapshot: 2026-09-19**

**Method:** Rows marked **(F)** were fetched live this session; rows marked **(D)** are desk reference
(well-known public facts, not re-verified today). No fabricated metrics; vendor self-reported numbers are
labeled. Traffic estimates marked "(brief)" come from the operator's Semrush summaries — unverified here.

---

## 1. Matrix

| # | Product | URL | Category | Structure & practice model | Monetization | Strengths | Weaknesses / gaps | Threat |
|---|---|---|---|---|---|---|---|---|
| 1 | **Coddy** (F) | coddy.tech | Gamified interactive code + AI learning | 20+ languages; runnable lessons with test cases; "AI Chat" prompting courses; streaks, leagues, freeze days, leaderboards, certificates; iOS/Android apps; huge programmatic-SEO surface (tools, certifications, cheat sheets, "vs" pages, visualizations) | Free core; certificates; affiliate program | 5,263,448 registered users (self-reported); best-in-class gamification engine; mobile apps; enormous content surface | Coding-first identity; AI prompting is one track among many; account required; generic lesson formula; no verification/research/safety depth | **High** — the UX benchmark to beat, adjacent content |
| 2 | **DeepLearning.AI** (F) | deeplearning.ai | Video courses + labs | Short courses (1–7 h) + specializations; "ChatGPT Prompt Engineering for Developers" (1h40), "Generative AI for Everyone" (5h), etc.; newsletter (The Batch); mobile apps | Coursera specializations, sponsorships, enterprise | 7M+ learners (self-reported); Andrew Ng brand; vendor co-marketing (OpenAI, Anthropic, Google, AWS…) | Passive video format; no hands-on practice loop on-site; developer-leaning; long completion times | **High** — owns "learn AI" head terms |
| 3 | **Learn Prompting** (F) | learnprompting.org | Course platform + certifications | Course catalog (ChatGPT for Everyone 25 lessons; Intro to PE 12; Advanced PE 34; AI Safety; RAG; Prompt Hacking…); ratings shown (4.4–4.7); 7-day email courses; Discord; HackAPrompt competition | Free courses; enterprise/business tier; paid masterclass; certificates | 3M+ learners; research-backed brand; security/red-teaming niche; strong instructor credibility | Course-shaped (read/watch), not exercise-driven; sign-up flows; no deterministic hands-on engine; fragments across many topics | **High** on prompt-education queries |
| 4 | **DAIR.AI Prompting Guide** (F) | promptingguide.ai | Reference encyclopedia | Technique taxonomy (zero-shot, few-shot, CoT, RAG, ReAct, ToT…); agents section; guides; prompt hub; papers; models; risks; "last updated Feb 2026" | Paid academy courses (2–5 h); sponsorship (SerpAPI) | The de-facto reference; massive internal linking; updated; trusted by developers | Zero interactivity; developer/researcher tone; no exercises; overwhelming for beginners | **High** on technique queries — we must pair "answer-first + practice" |
| 5 | **OpenAI Academy** (F) | academy.openai.com | Vendor academy | Audience tracks: knowledge workers ("prompting and review" habits), builders, leaders, education; live + on-demand events; videos; resources; sign-in platform | Free (funnel for OpenAI products) | Official authority; free; live events create trust; structured audience thinking ("Apply AI at Work") | Single-vendor; account required; not model-agnostic; no exercise engine; scattered across events/content | **High** for product-specific queries |
| 6 | **Anthropic interactive tutorial** (F) | github.com/anthropics/prompt-eng-interactive-tutorial | Interactive tutorial (open source) | 9 chapters + appendix (prompt structure → examples → hallucinations → complex prompts → chaining/tools/search); exercises with answer key; Jupyter-based ("Example Playground") | Free (open source) | 38.2k stars / 4.2k forks; outstanding practice-first pedagogy; chapter→exercise structure | Last commit ~2 years ago (stale; Claude 3 era); requires API/Console setup; developer-only; unmaintained | **Low-Medium** (niche, stale — great pedagogy reference) |
| 7 | **TinkerLLM** (F) | tinkerllm.com | Exercise playground | 23 learning units / 176 exercises; real Gemini calls with the user's own API key; instant validation per exercise; deliberately teaches failures (hallucinations, sycophancy, bias); params playground (temperature, top-k, thinking budget) | 50 exercises free; ₹499 (~$9) one-time full access | **Closest to our thesis**; instant feedback; "learn by breaking things"; BYO-key = zero running cost; honest positioning | API-key friction (non-expert killer); Gemini-only; developer/LLM-under-the-hood leaning; paywall after 50; small brand | **Medium-High** — direct thesis competitor; beatable on friction + breadth |
| 8 | **GeraQuest** (F) | geraquest.com | Gamified challenges | 6 modes (prompt challenges, quiz, scenario builder, daily challenge, achievements, leaderboard); real-model scoring (accuracy, efficiency, creativity, robustness); 200+ topics; GeraCoins; streaks | Free, no ads, no paywalls (ecosystem play) | Strong game loop; daily challenge; competitive framing | Account required; scoring = real model calls (cost/latency/nondeterminism); quiz-heavy; shallow on work/research/safety | **Medium** — gamification competitor |
| 9 | Mimo (D) | mimo.org | Gamified code learning | Bite-size lessons + streaks + mobile-first | Subscription | Duolingo-style loop; mobile excellence | Not AI literacy; code-first | Low-Medium (UX reference) |
| 10 | Sololearn (D) | sololearn.com | Gamified code learning | Mobile-first lessons + playground + community | Freemium | Scale in mobile learning | Not AI literacy | Low (UX reference) |
| 11 | Codecademy (D) | codecademy.com | Interactive tech courses | In-browser lessons with checks | Subscription | Brand; interactive checks | Career-tech focus; not AI literacy | Low-Medium |
| 12 | Exercism (D) | exercism.org | Practice-first code platform | Hundreds of exercises + mentoring | Nonprofit/donations | Pure practice DNA; free | Code-only; no AI literacy | Low (model reference) |
| 13 | Khan Academy (D) | khanacademy.org | Free learning at scale | Structured courses; mastery mechanics; AI tutor (Khanmigo) | Nonprofit/philanthropy | Trust; free; mastery system | No practical AI-literacy curriculum | Low-Medium |
| 14 | Duolingo (D) | duolingo.com | Gamified learning benchmark | Streaks, XP, leagues, hearts | Freemium/super | The loop everyone measures against | Not AI education | Low (benchmark) |
| 15 | Brilliant (D) | brilliant.org | Interactive STEM | Interactive problem sequences | Subscription | Strong interactive pedagogy | Paid; STEM-first; no AI literacy | Low |
| 16 | **Elements of AI** (D) | elementsofai.com | University AI-literacy course | Text chapters + quizzes; translated widely | Free (university) | "AI for everyone" brand; academic credibility | Static content; no skills practice; no updates cadence | Medium on "AI literacy" framing |
| 17 | Google Cloud / AI Essentials (D) | cloud.google.com/learn | Vendor curriculum | Learning paths + "AI Essentials" course | Free course → Google product funnel | Free; big brand | Product-led; video/course format | Medium |
| 18 | Microsoft Learn — AI paths (D) | learn.microsoft.com | Vendor curriculum | Modules, sandboxes, certifications | Free (product funnel) | Free; structured paths; certs | Product-led; developer tone | Medium |
| 19 | Coursera / Udemy marketplace (D) | coursera.org, udemy.com | Course marketplaces | Thousands of AI/prompting courses | Paid courses | Distribution; variety | Low-trust discovery; video-heavy; completion collapse | Low-Medium (indirect) |
| 20 | DataCamp (D) | datacamp.com | Interactive data education | Coding exercises + tracks | Subscription | True interactive engine | Data/code niche; not AI literacy | Low-Medium |
| 21 | PromptBase / FlowGPT (D) | promptbase.com, flowgpt.com | Prompt marketplaces | Buy/share prompt lists | Sales/credits | "Prompt buying" demand signal | Prompt-list culture, not learning | Low (content contrast) |
| 22 | Futurepedia (D) | futurepedia.io | AI tool directory | Tool listings, ratings | Ads/affiliates | Tool-discovery demand | Directory, not education | Low (adjacent intent) |
| 23 | Zapier Learn (D) | zapier.com/learn | Workflow/automation education | Guides + playbooks tied to product | Product funnel | Real workflow framing | Product-locked; not AI-literacy | Low-Medium (workflow queries) |
| 24 | "Prompt Guide" | (URL unknown) | Mixed: evaluated exercises + prompt library | Reported by operator brief | Unknown | Reported practice+library mix | Could not locate/verify from here | Unknown — verify |

## 2. Cross-cutting gaps (our attack surface)

1. **Zero-friction deterministic practice barely exists.** The players with real exercises need either an
   account (GeraQuest), an API key (TinkerLLM, Anthropic), or a paid seat (DataCamp, Brilliant). Nobody in
   the verified set gives first practice in < 60 s with no signup and no key.
2. **Verification is taught in prose, not practiced.** Spot-the-hallucination, source inspection and
   "don't trust a confident answer" training appear as content — rarely as drills (only TinkerLLM covers
   failure modes seriously).
3. **Model-agnostic neutrality is scarce.** Vendor academies are single-vendor; TinkerLLM is Gemini-only.
4. **"Which AI should I use?" is underserved as an interactive utility** — mostly static blog listicles.
5. **The knowledge worker is assumed to want videos.** The strongest practice-first pedagogy (Anthropic's)
   is developer-gated and stale; the strongest gamified loops (Coddy, Mimo) are coding-first.

## 3. Threat assessment summary

| Threat | Level | Our counter |
|---|---|---|
| Coddy adds generic AI-literacy tracks | High | Go deeper (verification/research/safety/work), better feedback pedagogy, no-account practice |
| TinkerLLM removes API-key friction | Medium-High | Zero-setup from minute one; broader tracks; free without paywall |
| Vendor academies own head terms | High | Target practice/utility queries and long-tail clusters they ignore; stay neutral |
| Reference sites (DAIR) outrank technique pages | Medium-High | Answer-first + embedded exercise = better query satisfaction than prose |
| Category gets crowded fast | Medium | Ship quality bar (30–40 excellent) before scale; monitor quarterly |

## 4. Positioning statement (derived)

> The free, no-signup AI practice gym: short lessons and real exercises that teach anyone to prompt,
> verify, research and work with AI — across every model, with feedback that explains *why*.

Verification status of this file: live-fetched rows re-checked 2026-09-19; desk rows flagged (D). Refresh
quarterly + immediately before launch.
