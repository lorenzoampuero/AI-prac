// Post-improvement checks: lesson word counts + built-HTML metadata (og:image, twitter, privacy link).
// Run: node scripts/check-improvements.mjs
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );

const lessons = walk('src/content/lessons').filter((file) => file.endsWith('.mdx'));
const rows = lessons
  .map((file) => {
    const raw = readFileSync(file, 'utf8');
    const body = raw
      .replace(/^---[\s\S]*?---/, '')
      .replace(/^import .*$/gm, '')
      .replace(/<[^>]+>/g, ' ');
    return { words: body.split(/\s+/).filter(Boolean).length, file: file.replace(/\\/g, '/') };
  })
  .sort((a, b) => a.words - b.words);
const min = rows[0].words;
const under460 = rows.filter((r) => r.words < 460).length;
const under500 = rows.filter((r) => r.words < 500).length;
console.log(`lessons: ${rows.length} | min words: ${min} | under 460: ${under460} | under 500: ${under500}`);
console.log('lowest 8:');
for (const row of rows.slice(0, 8)) {
  console.log(`  ${String(row.words).padStart(4)}  ${row.file.replace('src/content/lessons/', '')}`);
}

const home = readFileSync('dist/index.html', 'utf8');
console.log('og:image present:', home.includes('property="og:image"'));
console.log('og:image url:', home.match(/property="og:image" content="([^"]+)"/)?.[1] ?? '(none)');
console.log('twitter:card present:', home.includes('twitter:card'));
console.log('footer privacy link present:', home.includes('href="/privacy"'));
console.log('og.png exists:', readdirSync('public').includes('og.png'));

const sitemap = readFileSync('dist/sitemap-0.xml', 'utf8');
console.log('sitemap urls:', (sitemap.match(/<loc>/g) ?? []).length, '| has /privacy:', sitemap.includes('/privacy'));
