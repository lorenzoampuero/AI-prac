// Verifies the PUBLIC_SITE_URL mechanism for the production dry-run (Gate 11).
// Usage: node scripts/check-origin.mjs preview.example.test
import { readFileSync } from 'node:fs';

const expected = process.argv[2];
if (!expected) {
  console.error('usage: node scripts/check-origin.mjs <expected-substring>');
  process.exit(2);
}

const home = readFileSync('dist/index.html', 'utf8');
const sitemap = readFileSync('dist/sitemap-0.xml', 'utf8');
const canonical = home.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? '(none)';
const firstLoc = sitemap.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '(none)';

const canonicalOk = canonical.includes(expected);
const sitemapOk = sitemap.includes(expected) && firstLoc.includes(expected);

console.log('canonical:', canonical);
console.log('sitemap first loc:', firstLoc);
console.log('canonical uses override:', canonicalOk);
console.log('sitemap uses override:', sitemapOk);
process.exitCode = canonicalOk && sitemapOk ? 0 : 1;
