// SEO/GEO discovery assets — the answer-engine surface: /llms.txt, the FAQ hub and the robots policy
// for AI crawlers. These files are cheap to break and expensive to notice missing, so the test pins
// their essentials (mirrors the Gate 8–10 SEO checks in docs/SEO_A11Y_PERF.md).

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = (path: string) => readFileSync(join(root, path), 'utf8');

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
