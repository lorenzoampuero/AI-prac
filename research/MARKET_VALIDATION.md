# MARKET VALIDATION — practical AI literacy practice platform

**Gate 0 artifact · Date: 2026-09-19**

**Method & honesty rules:** 8 products were fetched live this session (marked F); traffic figures marked
"(brief)" were supplied by the operator from Semrush summaries and are **not independently verified**; user
counts are **vendor self-reported**. Nothing in this file is fabricated. No search-volume API was used.

---

## 1. The question

Is there a large, durable market for a **free, practice-first, model-agnostic** platform that teaches
practical AI literacy — and is the competition's model attackable?

## 2. Evidence gathered

| Product | Signal | Value | Source | Confidence |
|---|---|---|---|---|
| Coddy | Registered users (self-reported) | **5,263,448** "codders" | coddy.tech (F, 2026-09-19) | Medium (self-reported, plausibly precise) |
| Coddy | Monthly visits (Semrush) | ~2.58M visits, ~272.5k organic | Operator brief ("brief") | Medium (estimate, unverified here) |
| Coddy | Interactive prompt course enrollments | "21,000+ enrolled" | Brief | Low (unverified) |
| DeepLearning.AI | Learners (self-reported) | **7M+** | deeplearning.ai (F) | Medium (self-reported) |
| DeepLearning.AI | Monthly visits (Semrush) | ~2.75M | Brief | Medium (estimate, unverified) |
| Learn Prompting | Learners (self-reported) | **3,000,000+** | learnprompting.org (F) | Medium (self-reported) |
| Anthropic tutorial | GitHub stars | **38.2k stars, 4.2k forks** | github.com (F) | High (public metric) |
| TinkerLLM | Exercise catalog | 176 exercises, 23 units; 50 free; ₹499 (~$9) one-time | tinkerllm.com (F) | High (on-page pricing) |
| GeraQuest | Product scope | 6 game modes, 200+ topics, free, account-walled | geraquest.com (F) | High (on-page) |
| OpenAI Academy | Launch + ongoing investment | Free education product, live events, 4 audience tracks | academy.openai.com (F) | High (on-page) |

## 3. Interpretation

**The category is validated — four independent business models coexist and invest concurrently:**

1. **Gamified practice** (Coddy — 5.26M users; GeraQuest — free, leaderboards) → people return for loops, not lectures.
2. **Video courses + labs** (DeepLearning.AI — 7M learners; Coursera-style) → the incumbent "serious" model.
3. **Reference/community** (Learn Prompting — 3M+ learners + certifications; DAIR.AI Guide) → SEO/influence play.
4. **Vendor academies** (OpenAI Academy; Anthropic's 38.2k-star tutorial) → free official education is now strategic for model vendors.

**Two conclusions matter for our thesis:**

- **Demand for practical AI education is large and durable** (multiple 3–7M-user properties; a vendor-funded academy; a 38.2k-star interactive tutorial).
- **"Intro AI content" is being commoditized by the vendors themselves.** The defensible position is not
  "another course" or "more prompt lists" — it is **practice, verification judgement, tool selection, and
  model-agnostic neutrality**, which none of the verified leaders combine in a free, zero-friction product.

## 4. Competitive timing

- **TinkerLLM is the closest embodiment of our thesis** (exercise playground, teaches failure modes) — but it
  requires a **BYO Gemini API key**, is Gemini-only, developer-leaning, and content-complete paywalled at ₹499.
- **GeraQuest is the closest gamification play** — but requires an **account**, and its scored challenges
  consume real model calls per attempt (cost + latency + nondeterminism).
- Neither offers: zero-signup deterministic practice, breadth across work/research/verification/safety, or
  model-agnostic framing. That is our lane: **zero-friction practice for the non-expert knowledge worker.**

**Note (branding input):** TinkerLLM uses "Learn AI by doing." as its tagline. Our homepage H1 must differ
(see BRAND_OPTIONS.md — positioning must avoid looking derivative).

## 5. Monetization evidence (qualitative — no RPM promises)

| Player | Model | Signal |
|---|---|---|
| TinkerLLM | One-time ₹499 / $9 | Willingness to pay for pure practice |
| Learn Prompting | Enterprise training + masterclass + certifications | B2B education demand |
| DeepLearning.AI | Paid specializations via Coursera + sponsorships | Course market mature |
| Coddy | Free + certificates/affiliate; apps | Scale play, monetized beyond courses |
| GeraQuest | Free, no ads, no paywalls | Ecosystem/attention play (Gera Systems) |

Our audience (people learning to work with AI software) sits adjacent to high-value advertising categories
(AI software, productivity, education, B2B services). AdSense is a **possible** later layer — deliberately
not part of the MVP, per the master brief.

## 6. Verdict

**GO — build the MVP as planned (30–40 excellent lessons + 30+ deterministic exercises + glossary +
assessment), under four conditions:**

1. Practice-first in every lesson (no lesson without an exercise).
2. Verification/research/safety depth as core differentiation, not an afterthought.
3. Zero-friction entry (no account, no API key, first exercise < 60 s).
4. Model-agnostic, evergreen framing; product-specific facts sourced + dated.

## 7. Limitations & re-validation

- No SERP/volume API was available; keyword demand is mapped qualitatively in `KEYWORD_UNIVERSE.md` and must
  be re-validated with Search Console data after indexing.
- Vendor user counts are self-reported; treat absolute numbers as directionally useful only.
- Competitive set moves fast (TinkerLLM, GeraQuest, vendor academies): **refresh this file quarterly** and
  immediately before launch.
