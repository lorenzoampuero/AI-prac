# CURRENT FACTS REGISTRY

Product-specific claims shipped in `current`-class units (see `docs/CONTENT_STANDARDS.md` §4). Every row
lists the claim **as taught**, where it is used, its source and when it was last verified. Review window:
≤90 days. When a fact changes, update the lesson and this row together — never one without the other.

**Rule:** rows enumerate only claims actually shipped in lessons. No speculative or decorative facts.

| # | Claim as taught | Used in | Source | Verified | Review by |
|---|---|---|---|---|---|
| 1 | OpenAI's lineup spans a flagship tier (GPT-6 Astra, $10 in / $50 out per MTok), balanced and cost tiers (GPT-5.6 Terra $2/$12; GPT-5.6 Luna $0.20/$1.20), with reasoning effort adjustable per request. | FN07 *Fast vs reasoning models* | https://developers.openai.com/api/docs/models | 2026-09-19 | 2026-12-18 |
| 2 | Anthropic's Claude lineup spans Fable 5.1 (demanding reasoning; slower; $10/$50 per MTok), Sonnet 5 (speed + intelligence; $2/$10) and Haiku 4.5 (fastest; $1/$5); thinking is adaptive, steered by an effort setting. | FN07 *Fast vs reasoning models* | https://platform.claude.com/docs/en/docs/about-claude/models/overview | 2026-09-19 | 2026-12-18 |
| 3 | The same Claude models are documented across multiple platforms — Claude API, Amazon Bedrock, Google Cloud, Microsoft Foundry — with platform-specific IDs, regions and lifecycle terms. | FN06 *Models vs products* | https://platform.claude.com/docs/en/docs/about-claude/models/overview | 2026-09-19 | 2026-12-18 |
| 4 | OpenAI's image API separates *generation* (create an image from a scratch text prompt) from *edits* (modify an existing image with prompt guidance — partially via a mask, or entirely); current image models are `gpt-image-2.5-sunburst` and `gpt-image-2.5-flare`. | IM01 *How image generation works* | https://developers.openai.com/api/docs/guides/image-generation | 2026-09-20 | 2026-12-18 |
| 5 | Text rendering in image models has improved significantly, but the model can still struggle with precise text placement and clarity. | IM08 *Text inside images* | https://developers.openai.com/api/docs/guides/image-generation | 2026-09-20 | 2026-12-18 |

## Notes

- Prices and names change fast; lessons phrase these as "the shape of the market" and instruct readers to
  check current docs before deciding. If a row lapses past its review date, the lesson must either be
  refreshed or the specifics removed (the durable principle stays either way).
- Verified dates reflect the live fetch of the official documentation pages on that date.
