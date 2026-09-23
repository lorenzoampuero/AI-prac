// One-shot build audit for Gates 8–10: page sizes, breadcrumbs, JSON-LD coverage, asset weights.
// Run: node scripts/audit-dist.mjs
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );

const all = walk('dist');
const html = all.filter((file) => file.endsWith('.html') && !file.includes('sitemap'));
console.log('HTML pages:', html.length);

html.sort((a, b) => statSync(b).size - statSync(a).size);
console.log('\nLargest pages:');
for (const file of html.slice(0, 6)) {
  console.log(`  ${(statSync(file).size / 1024).toFixed(1)}KB  ${file}`);
}

console.log('\nCoverage (breadcrumb + JSON-LD types):');
const samples = [
  'dist/index.html',
  'dist/learn/index.html',
  'dist/learn/ai-foundations/index.html',
  'dist/learn/ai-foundations/what-generative-ai-is/index.html',
  'dist/practice/index.html',
  'dist/practice/pick-the-tier/index.html',
  'dist/glossary/index.html',
  'dist/glossary/token/index.html',
  'dist/assessment/index.html',
  'dist/about/index.html',
  'dist/es/index.html',
  'dist/es/learn/ai-research/cross-check-answers/index.html',
  'dist/404.html',
];
for (const key of samples) {
  try {
    const text = readFileSync(key, 'utf8');
    const types = [...new Set([...text.matchAll(/"@type":\s*"([^"]+)"/g)].map((m) => m[1]))];
    const alternates = (text.match(/rel="alternate"/g) ?? []).length;
    console.log(`  ${key.replace('dist/', '')} | crumb: ${text.includes('aria-label="Breadcrumb"')} | hreflang: ${alternates} | ld: ${types.join(',') || '-'}`);
  } catch {
    console.log(`  ${key} MISSING`);
  }
}

const sum = (list) => (list.reduce((n, file) => n + statSync(file).size, 0) / 1024).toFixed(1);
console.log('\nAssets:');
console.log(`  JS total:   ${sum(all.filter((f) => f.endsWith('.js')))} KB`);
console.log(`  CSS total:  ${sum(all.filter((f) => f.endsWith('.css')))} KB`);
console.log(`  woff2:      ${sum(all.filter((f) => f.endsWith('.woff2')))} KB`);
console.log(`  html total: ${sum(html)} KB`);
