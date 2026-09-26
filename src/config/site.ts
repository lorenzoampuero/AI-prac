// Site-level constants.
export const SITE_NAME = 'AI Practice';

// Production origin. It must be the host Vercel actually serves (the primary domain): canonical URLs,
// sitemap, hreflang, robots and JSON-LD all derive from it, and a canonical that redirects makes Google
// report "Page with redirect" instead of indexing. The apex `getaipractice.site` 308-redirects here.
// Keep in sync with the default in astro.config.mjs (tests/seo-geo.test.ts enforces it).
export const SITE_ORIGIN = 'https://www.getaipractice.site';

// Public contact address for corrections and privacy questions (also an AdSense prerequisite). Empty
// until the owner chooses one: the footer link and the contact sentences on /about and /privacy render
// only when it is set.
export const CONTACT_EMAIL = '';
