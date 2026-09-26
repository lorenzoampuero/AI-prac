# AI Practice — learn AI by doing

Interactive, exercise-first platform for practical AI literacy: short lessons, hands-on
practice, a glossary and a skills assessment. Static-first site built with Astro + TypeScript.

Live at **https://www.getaipractice.site** (Vercel, auto-deploy from `main`). No ads, paid APIs or
new data collection without explicit owner approval.

## Status

Launched 2026-09-20; English at the root, Spanish under `/es`. Progress and gate evidence live in
`docs/PROJECT_STATUS.md`; post-launch cadence in `docs/POST_LAUNCH_LOOP.md`.

## Commands

```bash
npm ci            # clean install (Node >= 22.12; pinned in .nvmrc + package.json)
npm run dev       # dev server
npm run verify    # typecheck + astro check + unit tests + production build
npm test          # unit tests only
```

## Principles (enforced, not aspirational)

- **Learn by doing.** Lessons end in a real exercise; feedback explains *why*, not just *what*.
- **Evergreen transferable skills**, not prompt folklore. Product-specific facts carry a source
  and a review date.
- **Zero-friction.** No signup, no LLM API, no account required — progress lives on the device.
- **No doorway pages.** Every indexable URL must represent a real lesson, exercise or utility.
