// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// `site` = production origin (canonical URLs, sitemap, robots). `PUBLIC_SITE_URL` overrides it for
// staging/preview builds. Final domain decided in Gate 0 brand research — no purchases yet.
const SITE_ORIGIN =
  (process.env.PUBLIC_SITE_URL ?? '').trim().replace(/\/+$/, '') || 'https://ai-practice.invalid';

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
    sitemap(),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
