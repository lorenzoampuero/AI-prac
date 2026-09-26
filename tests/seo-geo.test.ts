// SEO/GEO discovery assets — the answer-engine surface: /llms.txt, the FAQ hub and the robots policy
// for AI crawlers. These files are cheap to break and expensive to notice missing, so the test pins
// their essentials (mirrors the Gate 8–10 SEO checks in docs/SEO_A11Y_PERF.md).

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = (path: string) => readFileSync(join(root, path), 'utf8');
const listFiles = (dir: string): string[] =>
  readdirSync(join(root, dir), { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => join(entry.parentPath, entry.name).slice(root.length));

describe('discovery assets — AI answer engines', () => {
  it('ships a build-time generated llms.txt built from the content collections', () => {
    const source = read('src/pages/llms.txt.ts');
    expect(source).toContain("getCollection('lessons'");
    expect(source).toContain("getCollection('glossary'");
    expect(source).toContain('## Lessons');
  });

  it('the FAQ hub answers at least ten questions and emits FAQPage structured data', () => {
    const source = read('src/pages/faq.astro');
    const questions = [...source.matchAll(/^\s{4}id: '/gm)].length;
    expect(questions).toBeGreaterThanOrEqual(10);
    expect(source).toContain('faqJsonLd');
  });

  it('robots.txt explicitly allows the major AI crawlers and advertises llms.txt', () => {
    const source = read('src/pages/robots.txt.ts');
    for (const agent of ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']) {
      expect(source, `robots.txt is missing an allow entry for ${agent}`).toContain(`'${agent}'`);
    }
    expect(source).toContain('llms.txt');
  });
});

describe('production origin — canonical must equal the served host', () => {
  // Vercel serves www and 308-redirects the apex. A canonical/sitemap on the apex points Google at a
  // redirect ("Page with redirect") and blocks indexing, so every origin default must be the www host.
  const SERVED = 'https://www.getaipractice.site';

  it('SITE_ORIGIN and the astro.config default are the served www host', () => {
    expect(read('src/config/site.ts')).toContain(`export const SITE_ORIGIN = '${SERVED}';`);
    expect(read('astro.config.mjs')).toContain(`|| '${SERVED}'`);
    expect(read('scripts/indexnow.mjs')).toContain(`?? '${SERVED}'`);
  });

  it('no source file hardcodes the redirecting apex origin', () => {
    const offenders = listFiles('src').filter((path) =>
      /https:\/\/getaipractice\.site/.test(read(path)),
    );
    expect(offenders).toEqual([]);
  });
});
