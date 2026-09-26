// Prompt-template library contract: EN/ES parity (so hreflang pairs are real), resolvable lesson links,
// visible slots in every template and the anti-doorway rule (sets are tasks, never professions/tools).

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('..', import.meta.url));

interface Template {
  id: string;
  title: string;
  prompt: string;
  why: string;
}
interface PromptSet {
  order: number;
  seoTitle: string;
  lesson: string;
  templates: Template[];
  draft?: boolean;
}

const load = (dir: string): Map<string, PromptSet> =>
  new Map(
    readdirSync(join(root, dir))
      .filter((file) => file.endsWith('.json'))
      .map((file) => [
        file.replace(/\.json$/, ''),
        JSON.parse(readFileSync(join(root, dir, file), 'utf8')) as PromptSet,
      ]),
  );

const en = load('src/content/prompts');
const es = load('src/content/prompts-es');

describe('prompt library', () => {
  it('has at least eight task sets in each language', () => {
    expect(en.size).toBeGreaterThanOrEqual(8);
    expect(es.size).toBeGreaterThanOrEqual(8);
  });

  it('every EN set has an ES counterpart with the same slug, order, lesson and template ids', () => {
    expect([...es.keys()].sort()).toEqual([...en.keys()].sort());
    for (const [slug, set] of en) {
      const other = es.get(slug)!;
      expect(other.order, slug).toBe(set.order);
      expect(other.lesson, slug).toBe(set.lesson);
      expect(other.templates.map((t) => t.id), slug).toEqual(set.templates.map((t) => t.id));
    }
  });

  it('orders are unique and template ids are unique within a set', () => {
    const orders = [...en.values()].map((set) => set.order);
    expect(new Set(orders).size).toBe(orders.length);
    for (const [slug, set] of en) {
      const ids = set.templates.map((t) => t.id);
      expect(new Set(ids).size, slug).toBe(ids.length);
    }
  });

  it('each set links an existing EN lesson', () => {
    for (const [slug, set] of en) {
      expect(existsSync(join(root, 'src/content/lessons', `${set.lesson}.mdx`)), `${slug} → ${set.lesson}`).toBe(true);
    }
  });

  it('every template shows at least one visible [SLOT] and no unfinished markers', () => {
    for (const [lang, sets] of [['en', en], ['es', es]] as const) {
      for (const [slug, set] of sets) {
        for (const template of set.templates) {
          expect(template.prompt, `${lang}/${slug}#${template.id}`).toMatch(/\[[^\]]+\]/);
          expect(template.prompt + template.why, `${lang}/${slug}#${template.id}`).not.toMatch(/\bTODO\b|\bTBD\b|lorem ipsum/);
        }
      }
    }
  });

  it('sets are tasks, not professions or products (anti-doorway)', () => {
    const banned = /\b(for-(lawyers|teachers|doctors|marketers|developers)|chatgpt|claude|gemini|midjourney)\b/;
    for (const slug of en.keys()) expect(slug, slug).not.toMatch(banned);
  });
});
