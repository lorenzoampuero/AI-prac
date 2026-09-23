# DISTRIBUTION — getting the site in front of people (honest playbook)

**Date: 2026-09-23.** Companion to `docs/POST_LAUNCH_LOOP.md` (discovery/indexing) and
`research/KEYWORD_UNIVERSE.md` (demand). This file answers one question: apart from waiting for
Google, how does a free practice-first site actually get visitors?

## Principles (non-negotiable)

1. **Value first, link second.** Answer the question in the community's own space; link the *lesson*
   that goes deeper, never the homepage. One honest, useful mention beats ten promotional ones.
2. **Never spam.** No mass posting, no link-dropping in unrelated threads, no bought backlinks,
   no doorways. The domain's reputation is the asset being built.
3. **Only where it genuinely helps.** If the site does not answer the thread's question better than
   the existing replies, do not post.
4. **Measure everything.** Weekly: Search Console (impressions/clicks per query) + Vercel Analytics
   referrers. Monthly: compare real queries against the keyword universe and choose the next wave.

## Step 0 — measurement is blocking (owner, 15 minutes)

Follow `docs/LAUNCH_READINESS.md` §SEO discovery unblock: Search Console domain property (DNS TXT),
submit `sitemap-index.xml`, Request Indexing for the 10 URLs listed there, and set the apex as the
primary domain in Vercel. Without this, every other tactic is blind.

## Step 1 — content waves (the engine, weeks 1–6+)

- Ship **one wave every 1–2 weeks**, each backed by demand evidence (autocomplete pulls now;
  Search Console queries once available).
- Queue after WK13/SF05: ES translations of the highest-demand lessons, PR12–15/17–20, RS09–12,
  WF03+, SF06–09, CD03–10, WK15 — all mapped in `docs/CURRICULUM_MAP.md`.
- Every new lesson is a new entrance door; ~100 units are planned, 64 live.

## Step 2 — distribution channels

### Communities (weeks 1–4)

- **Reddit** — `r/ChatGPT`, `r/OpenAI`, `r/PromptEngineering`, `r/artificial`. Etiquette: give 10–20
  genuinely useful answers before ever linking; then link only when the lesson is the best answer in
  the thread. Flair and self-promo rules per subreddit; when in doubt, answer without the link.
- **Quora (ES + EN)** — the 12 FAQ questions are written exactly for this: paste the full answer,
  close with "to practise it: [lesson]". Two per week is plenty.
- **Hacker News — "Show HN"** — the angle: free, no account, no API keys, progress stays local,
  deterministic exercises. Post a weekday morning (ET), be present in the thread all day.
  **Or Product Hunt** — pick one, not both: both audiences punish diluted attention.
- **LinkedIn (ES, weeks 2+)** — 2 posts/week, format: concrete tip + tiny example + lesson link.
  Example: "Tu IA se equivoca con los números. Así lo detectas en 30 segundos → [lección]".

### Directories & lists (week 1, easy backlinks + discovery)

- **Futurepedia**, **There's An AI For That** — submit as a free education resource.
- **OER Commons**, **MERLOT** — open educational resources; a free, source-dated AI-literacy course
  fits their catalogs exactly.
- GitHub `awesome-*` lists (AI learning, free education): submit a PR only where the list's rules
  clearly allow a free practice-first course.

### Newsletters (week 3)

Pitch 5–10 AI newsletters with a one-paragraph blurb (below). Many run a "free resources" section.
Offer the site, ask for nothing but a look.

## Step 3 — GEO: getting cited by answer engines (weeks 2–6+)

- `/llms.txt` is generated at build; `/faq` ships FAQPage schema; robots allows GPTBot, OAI-SearchBot,
  ClaudeBot, PerplexityBot and friends. The plumbing is done.
- Monthly ritual: ask ChatGPT/Perplexity the 5 target questions ("how to verify AI answers",
  "plantillas de prompts para chatgpt", …) and log whether the site is mentioned. Citations follow
  mentions in forums and communities — feed step 2.
- Expect AI-answer traffic to arrive as direct visits; Vercel Analytics cannot label it as "AI".

## Step 4 — backlinks (months 2–6, the slow variable)

- Every well-answered community thread is a potential link.
- One collaboration per month: guest post or resource mention on productivity/education/work blogs.
- Email 10 educators/trainers who teach AI literacy; offer the free resource with no ask. Educational
  links accrue naturally.
- Dev.to / Medium: short adaptations with `rel=canonical` pointing at the lesson.

## Step 5 — retention (the quiet multiplier)

Gamification (XP, levels, streaks) already brings people back. The planned `/daily` exercise feature
is the next retention lever; revisit it once traffic is measurable.

## Never do

Bought backlinks or link farms · mass/spam posting · doorway or near-duplicate pages · cloned product
tutorials · paid ads before conversion is validated.

## 30-day starter plan

| Week | Actions |
|---|---|
| 1 | Search Console + apex + Request Indexing · 3 genuinely useful Reddit/LinkedIn answers · submit to Futurepedia, TAAFT, OER Commons, MERLOT |
| 2 | Show HN **or** Product Hunt (one) · start LinkedIn 2×/week |
| 3 | Quora: top 5 FAQ questions (ES + EN) · pitch 5 AI newsletters |
| 4 | Review Search Console (first impressions) → choose the next content wave with data |

## Draft copy (adapt freely, keep honest)

**25-word blurb (EN):** "Free AI-literacy practice: short lessons and hands-on exercises on
verifying answers, prompting and privacy. No account, no API keys — progress stays on your device."

**Blurb ES (25 palabras):** "Práctica gratuita de alfabetización en IA: lecciones cortas y
ejercicios sobre verificar respuestas, prompts y privacidad. Sin cuenta — tu progreso se queda en
tu dispositivo."

**100-word blurb (EN):** "AI Practice is a free, practice-first AI-literacy site. Instead of videos
and prompt lists, every lesson ends in a deterministic exercise graded in your browser: no account,
no API keys, nothing sent anywhere. The curriculum spans foundations, prompting, verification, work,
safety, coding, images and workflows — 64 lessons in English and a growing Spanish section at /es.
Product-specific facts carry a source and a review date. Built as an independent project; the
standards and the corrections process are public on the about page."

**LinkedIn post template (ES):**
> «[Consejo concreto en una frase.]\n> [Mini-ejemplo: mal → bien.]\n> Lo practicas aquí (gratis, sin
> cuenta): [enlace a la lección].»

**Reddit comment shape:** answer in full inside the comment (steps, example), close with one line:
"If you want to practise this, there's a free exercise here: [lesson link]" — only when relevant.
