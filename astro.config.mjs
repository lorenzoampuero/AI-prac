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
    // The scaffold homepage is `noindex` until the real homepage ships in this phase; excluding it keeps
    // the sitemap honest. Refined with the real indexability policy at the SEO gate.
    sitemap({ filter: (page) => page !== `${SITE_ORIGIN}/` }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
