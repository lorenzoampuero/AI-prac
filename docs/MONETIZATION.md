# MONETIZATION — Prompt Pack Pro, newsletter, AdSense

**Date: 2026-09-26.** Owner decisions: Lemon Squeezy for the paid pack (price set to **$9 launch**),
MailerLite for the newsletter, AdSense later. Every money/data surface on the site is gated by a value in
`src/config/site.ts`, so nothing appears until the account behind it exists.

| Surface | Config | Where it shows |
|---|---|---|
| Pack buy box | `PRO_PACK_URL`, `PRO_PACK_PRICE` | `/prompts`, every `/prompts/{set}` (EN + ES) |
| Newsletter box | `NEWSLETTER_URL` | `/prompts` pages and the end of every lesson (EN + ES) |
| Privacy section "Newsletter and purchases" | either URL set | `/privacy`, `/es/privacy` |
| Contact link | `CONTACT_EMAIL` | footer, `/about`, `/privacy` (EN + ES) |

## 1. Prompt Pack Pro (Lemon Squeezy)

**Product.** 100 templates per language: the 54 free ones on the site plus 46 pack-only templates
(marketing, social media, studying, writing, personal productivity), an 8-point verification checklist,
a "never paste" box and a licence page. Source: `product/prompt-pack/` (`exclusive-{en,es}.json` +
the site's `src/content/prompts*`). Build: `NODE_PATH=$(npm root -g) node product/prompt-pack/build.mjs`
→ `product/prompt-pack/dist/prompt-pack-{en,es}.pdf` (dist is git-ignored; A4, ~45 pages each).

**Price.** $9 one-time at launch (impulse range; the closest competitor sells pure practice at ~$9).
Raise to $12–14 once there are ~20 sales or the first reviews. Never show an invented "was $X" price.

**Owner setup (20 min).**
1. lemonsqueezy.com → create account + store (it is the merchant of record: it charges VAT/sales tax and
   pays out to you).
2. Products → New product → name `Prompt Pack Pro — 100 AI prompt templates (EN + ES)`, price $9,
   upload **both PDFs** as the downloadable files.
3. Paste the listing copy below. Publish.
4. Product → Share → copy the checkout link → set `PRO_PACK_URL` in `src/config/site.ts` → merge/deploy.

**Listing copy (EN).**
> 100 copy-paste prompt templates for ChatGPT, Claude and Gemini — for email, summaries, Excel, images,
> fact-checking, job search, presentations, customer support, meetings, marketing, social media,
> studying, writing and personal productivity. Each template has named [SLOTS] for what changes and
> fixed rules for what usually goes wrong: invented facts, lost numbers, promises you can't keep.
> Includes an 8-point checklist for verifying AI answers. English and Spanish PDFs. Instant download.

**Listing copy (ES).**
> 100 plantillas de prompts para copiar y pegar en ChatGPT, Claude y Gemini: email, resúmenes, Excel,
> imágenes, verificar respuestas, CV y empleo, presentaciones, atención al cliente, reuniones,
> marketing, redes sociales, estudio, escritura y productividad. Cada plantilla tiene [HUECOS] con
> nombre para lo que cambia y reglas fijas para lo que suele salir mal: datos inventados, cifras
> perdidas, promesas que no puedes cumplir. Incluye una lista de 8 puntos para verificar respuestas de
> IA. PDF en español e inglés. Descarga inmediata.

## 2. Newsletter (MailerLite)

1. mailerlite.com → free account (up to 1,000 subscribers) → verify the sending domain when prompted.
2. Create a group "AI Practice", then a **hosted landing page / form** with double opt-in.
3. Copy its public URL → `NEWSLETTER_URL` in `src/config/site.ts`.
4. Welcome automation: email 1 = thank-you + 3 best templates + link to `/prompts`; email 2 (day 3) =
   the verification checklist + a soft mention of the pack.
5. Weekly: one template + one exercise from the site (the promise on the signup box).

## 3. AdSense (after indexing — see the plan's Phase 4)

Prerequisites already in place: original content, privacy page, about page, contact (once
`CONTACT_EMAIL` is set). Still to build when the account exists: gated `AdSlot` + `ads.txt`, EEA consent
via AdSense "Privacy & messaging", privacy-page update. Ads never go inside exercises.
