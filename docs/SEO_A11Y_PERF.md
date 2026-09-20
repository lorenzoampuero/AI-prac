# SEO / A11Y / PERF — Gates 8–10 report

**Artifact date: 2026-09-19 · Evidence: `node scripts/audit-dist.mjs`, axe-core run over the preview build
(wcag2a · wcag2aa · wcag21a · wcag21aa), Playwright transfer measurements. Fixes ship in the same commit
as this report.**

## Gate 8 — SEO / GEO

| Item | Status | Evidence |
|---|---|---|
| Canonical + OG tags on every page | PASS | Emitted by `BaseLayout`; present in every built HTML file |
| Sitemap | PASS | 107 URLs, `/assessment` included, `404` excluded (verified in `dist/sitemap-0.xml`); `robots.txt` references the sitemap |
| Structured data coverage | **PASS after fixes** | Home → `WebSite` (was missing); `/learn` + `/assessment` → visible breadcrumbs + `BreadcrumbList` (both were missing any); track pages → `BreadcrumbList` (visible crumb existed, JSON-LD didn’t); lessons → `BreadcrumbList` + `LearningResource`; glossary terms → `BreadcrumbList` + `DefinedTerm` + `DefinedTermSet`; hubs → `BreadcrumbList`. `404` intentionally carries none (noindex) |
| Rich-result honesty | PASS | No ratings, no student counts, no “best AI” claims; every type emitted is semantic and verifiable. Revisit at launch with Search Console; DefinedTerm is emitted for meaning, not for a rich result |
| Anti-doorway / intent uniqueness | PASS | Enforced by `tests/registry.test.ts` (unique primary intent per page) |
| GEO (generative engines) | PASS | Answer-first openings (§3), static HTML content (grading enhances, never gates reading), stable URLs, clean heading structure; assessment questions fully crawlable |

## Gate 9 — Accessibility

**axe-core (WCAG A + AA) across 11 templates: 0 violations.**

Templates swept: home · `/learn` · track · lesson (with code blocks) · `/practice` · exercise page ·
`/glossary` · term page · `/assessment` · `/about` · plus the shared header/footer on each.
New interactive surfaces (quiz options, criterion checkboxes, summary panel with focus move, retake)
were included in the sweep. Fix carried from Gate 6: header nav wraps instead of overflowing at 390 px.

## Gate 10 — Performance

Measured against the local preview build (compressed transfer, cold navigation):

| Page | Document | CSS | JS | Font | Requests | Load |
|---|---|---|---|---|---|---|
| Home | 1.5 KB | inlined | inlined | 47.1 KB | 1 | 29 ms |
| Lesson (typical) | 3.8 KB | 3.0 KB | 3.4 KB | 47.1 KB | 3 | 49 ms |
| Exercise page | 2.5 KB | inlined | 3.4 KB | 47.1 KB | 2 | 47 ms |
| `/assessment` | 4.0 KB | 3.0 KB | 7.3 KB | 47.1 KB | 3 | 49 ms |

Raw (uncompressed) assets in `dist/`: HTML 753 KB total across 108 pages (largest single page 16.6 KB —
`/assessment`, 18 items); CSS 12.7 KB; JS 33.4 KB across all page scripts. Only **one font file loads**
(Inter Variable, latin subset — the other unicode-range subsets stay `unloaded`), so the 213 KB of shipped
woff2 never travels in full.

Notes: no images beyond the SVG favicon; no analytics, no third-party scripts, zero network calls at
runtime (grading is local). LCP/CLS: not measured in this environment; the page is text-only with no
late layout shifts by construction — re-verify with field data (Search Console / CrUX) after launch.
