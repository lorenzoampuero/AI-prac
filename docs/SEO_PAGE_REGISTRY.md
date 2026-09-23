# SEO Page Registry

Canonical indexability and metadata registry for every URL pattern the site can emit.
Referenced by `astro.config.mjs` (sitemap filter rationale). Update this file whenever a page
type, its title source or its indexability changes.

Legend: **Indexable** = may appear in search results; **Title source** = where the `<title>` text
comes from (BaseLayout appends ` · AI Practice` unless noted).

## Rules

- One URL = one primary intent. No two pages may share a primary intent (`tests/registry.test.ts`).
- Lesson `seo.title` values: 15–50 chars, keyword-first, unique repo-wide (test-enforced).
- Rendered titles should stay ≤ ~63 chars (50 + brand suffix) so SERPs and cards do not truncate.
- Descriptions must read as complete sentences — use `clipAtSentence()` (`src/lib/seo-text.ts`),
  never `slice()`.
- No doorway pages, no fabricated volumes, no name-swapped duplicates (research/SEO_INTENT_MAP.md).

## Page types

| Page type | URL pattern | Title source | Description source | Indexable | Structured data |
|---|---|---|---|---|---|
| Home | `/` | literal in `src/pages/index.astro` (`suffix={false}`) | literal in `index.astro` | yes | WebSite, Organization |
| Learn hub | `/learn` | literal in `learn/index.astro` | literal | yes | BreadcrumbList |
| Track hub | `/learn/{track}` | `seoTitle` in `src/data/tracks.ts` | `seoDescription` in `tracks.ts` | yes | BreadcrumbList, Course (+hasPart) |
| Lesson | `/learn/{track}/{slug}` | frontmatter `seo.title` | frontmatter `description` | yes | BreadcrumbList, LearningResource (+dateModified) |
| Practice floor | `/practice` | literal (includes live exercise count) | literal | yes | BreadcrumbList |
| Exercise | `/practice/{id}` | `AI exercise: {title}` (template) | `task` + `scenario` via `clipAtSentence(155)` | yes | BreadcrumbList |
| Glossary index | `/glossary` | literal | literal | yes | BreadcrumbList |
| Glossary term | `/glossary/{id}` | `What is {term}?` (template) | `clipAtSentence(definition, 155)` | yes | BreadcrumbList, DefinedTerm |
| FAQ | `/faq` | literal | literal | yes | BreadcrumbList, FAQPage |
| Assessment | `/assessment` | literal | literal | yes | BreadcrumbList |
| About | `/about` | literal | literal | yes | (none yet) |
| Privacy | `/privacy` | literal | literal | yes | BreadcrumbList |
| Progress | `/progress` | literal | literal | **no** (`noindex`) | — |
| 404 | `/404` | literal | literal | **no** (`noindex`) | — |

## Sources of truth

- Lesson intent → `seo.intent` in each `.mdx` frontmatter (unique, lowercase; drives nothing
  visible). Lesson `<title>` → `seo.title` (this is what search engines read).
- Track metadata (names, taglines, SEO titles/descriptions) → `src/data/tracks.ts` (EN + ES fields).
- Sitemap: every indexable URL above, minus `/progress` (see filter in `astro.config.mjs`).
- `robots.txt` allows all crawlers incl. the named AI agents; `/llms.txt` is generated from the
  collections.

## Spanish surface (i18n wave 1)

- ES pages live under the same patterns with an `/es` prefix: `/es/…` mirrors every row above.
- ES titles/descriptions come from the ES collections (`lessonsEs`, `exercisesEs`, `glossaryEs`) and
  the `*Es` fields in `src/data/tracks.ts`; slugs are identical to EN so hreflang pairs are mechanical.
- `BaseLayout` emits `hreflang` es/en/x-default **only when the ES counterpart exists** (computed from
  the ES collections + the static set in `src/layouts/BaseLayout.astro`). New ES lessons automatically
  join the pair set; new static ES pages must be added to `ES_STATIC_PATHS`.
- Partial translation is intentional: untranslated lessons simply have no ES page and no alternates.

## When adding a wave of content

1. Add `seo.intent` + `seo.title` (≤50) to each new lesson — the registry test fails otherwise.
2. Search Console: submit the updated `sitemap-index.xml` and request indexing for the new URLs.
3. Run `npm run indexnow` after the deploy (Bing/Yandex; Google discovers via sitemap + links).
