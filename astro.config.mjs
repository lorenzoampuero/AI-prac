// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// `site` = production origin (canonical URLs, sitemap, robots). `PUBLIC_SITE_URL` overrides it for
// staging/preview builds. Domain decided 2026-09-20: getaipractice.site (registrar purchase pending).
const SITE_ORIGIN =
  (process.env.PUBLIC_SITE_URL ?? '').trim().replace(/\/+$/, '') || 'https://getaipractice.site';

export default defineConfig({
  site: SITE_ORIGIN,
  output: 'static',
  compressHTML: true,
  trailingSlash: 'never',
  devToolbar: { enabled: false },
  integrations: [
    mdx(),
    // Only generated (published) pages reach the build — drafts are filtered in getStaticPaths, so they
    // cannot leak into the sitemap. Indexability policy is audited at the SEO gate (docs/SEO_PAGE_REGISTRY.md).
    sitemap({
      // /progress is a device-local dashboard (noindex) — keep it out of the sitemap.
      filter: (page) => !page.endsWith('/progress') && !page.endsWith('/progress/'),
      // Stamped at build time: every deploy republishes the whole site, so each URL is genuinely fresh.
      lastmod: new Date(),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
