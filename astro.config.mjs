// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// `site` = production origin (canonical URLs, sitemap, robots). `PUBLIC_SITE_URL` overrides it for
// staging/preview builds. The default is the host Vercel serves (www — the apex 308-redirects to it);
// keep it equal to SITE_ORIGIN in src/config/site.ts.
const SITE_ORIGIN =
  (process.env.PUBLIC_SITE_URL ?? '').trim().replace(/\/+$/, '') || 'https://www.getaipractice.site';

export default defineConfig({
  site: SITE_ORIGIN,
  output: 'static',
  compressHTML: true,
  trailingSlash: 'never',
  devToolbar: { enabled: false },
  // EN at the root, ES under /es (wave 1: core pages + translated lessons/exercises/glossary).
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    mdx(),
    // Only generated (published) pages reach the build — drafts are filtered in getStaticPaths, so they
    // cannot leak into the sitemap. Indexability policy is audited at the SEO gate (docs/SEO_PAGE_REGISTRY.md).
    sitemap({
      // hreflang alternates for the EN/ES pairs (reciprocity is enforced by tests/seo-i18n.test.ts).
      i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } },
      // /progress is a device-local dashboard (noindex) — keep it out of the sitemap.
      filter: (page) => !page.endsWith('/progress') && !page.endsWith('/progress/'),
      // No synthetic `lastmod`: stamping every URL with the build date is a false freshness signal.
      // Honest per-URL dates would need content access the config does not have (docs/SEO_PAGE_REGISTRY.md).
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
