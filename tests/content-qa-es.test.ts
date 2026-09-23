// ES (i18n wave 1) content contract — the mirror of tests/content-qa.test.ts for the translated
// surface. It reads src/content/lessons-es/** from disk, so it runs in plain vitest like the EN suite.
// Scope: every PUBLISHED ES lesson must be publishable quality (word band, practice, next, glossary
// links, teaching blocks); every ES cross-reference must resolve inside the ES collections.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { parse as parseYaml } from 'yaml';

const root = fileURLToPath(new URL('..', import.meta.url));
const lessonsRoot = join(root, 'src', 'content', 'lessons-es');
const exercisesRoot = join(root, 'src', 'content', 'exercises-es');
const glossaryRoot = join(root, 'src', 'content', 'glossary-es');

function listFiles(dir: string, extension: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full, extension));
    else if (entry.name.endsWith(extension)) out.push(full);
  }
  return out;
}

const normalise = (path: string) => path.split(/[\\/]/).join('/');

interface EsLesson {
  id: string;
  file: string;
  body: string;
  title: string;
  description: string;
  seoTitle: string;
  exercises: string[];
  draft: boolean;
}

function parseFrontmatter(file: string): Record<string, unknown> {
  const raw = readFileSync(file, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const yaml = match?.[1];
  if (!yaml) throw new Error(`missing frontmatter: ${file}`);
  return parseYaml(yaml) as Record<string, unknown>;
}

/** Prose word count — strips frontmatter, imports, JSX blocks and markdown punctuation. */
function wordCount(body: string): number {
  const withoutJsx = body.replace(/<[^>]+>/g, ' ').replace(/\{[^}]*\}/g, ' ');
  const words = withoutJsx
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/\s+/)
    .filter((word) => /[a-záéíóúñü]/i.test(word));
  return words.length;
}

const esLessons: EsLesson[] = listFiles(lessonsRoot, '.mdx').map((file) => {
  const raw = readFileSync(file, 'utf8');
  const data = parseFrontmatter(file);
  const id = normalise(file.slice(lessonsRoot.length + 1).replace(/\.mdx$/, ''));
  const seo = (data.seo ?? {}) as { title?: unknown };
  return {
    id,
    file: normalise(file),
    body: raw.replace(/^---\r?\n[\s\S]*?\r?\n---/, ''),
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    seoTitle: String(seo.title ?? ''),
    exercises: Array.isArray(data.exercises) ? (data.exercises as string[]) : [],
    draft: data.draft === true,
  };
});

const published = esLessons.filter((lesson) => !lesson.draft);

const esExercises = listFiles(exercisesRoot, '.json').map((file) => {
  const data = JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;
  return {
    id: normalise(file.slice(exercisesRoot.length + 1).replace(/\.json$/, '')),
    draft: data.draft === true,
  };
});

const esTerms = listFiles(glossaryRoot, '.md').map((file) => {
  const data = parseFrontmatter(file);
  return {
    id: normalise(file.slice(glossaryRoot.length + 1).replace(/\.md$/, '')),
    relatedLessons: Array.isArray(data.relatedLessons) ? (data.relatedLessons as string[]) : [],
    relatedExercises: Array.isArray(data.relatedExercises) ? (data.relatedExercises as string[]) : [],
  };
});

describe('ES curriculum — published lesson quality', () => {
  it('ships at least the wave-1 batch (12 lessons) across the core tracks', () => {
    expect(published.length).toBeGreaterThanOrEqual(12);
  });

  it('every published ES lesson has a keyword-first seo.title within SERP width', () => {
    const titles = new Set<string>();
    for (const lesson of published) {
      expect(lesson.seoTitle.length, `${lesson.id} seo.title missing`).toBeGreaterThanOrEqual(15);
      expect(lesson.seoTitle.length, `${lesson.id} seo.title too long`).toBeLessThanOrEqual(50);
      expect(titles.has(lesson.seoTitle), `duplicate seo.title in ${lesson.id}`).toBe(false);
      titles.add(lesson.seoTitle);
    }
  });

  it('every published ES lesson has a 50–180 char description', () => {
    for (const lesson of published) {
      expect(lesson.description.length, lesson.id).toBeGreaterThanOrEqual(50);
      expect(lesson.description.length, lesson.id).toBeLessThanOrEqual(180);
    }
  });

  it('every published ES lesson ends in practice and a next step', () => {
    for (const lesson of published) {
      expect(lesson.body, lesson.id).toContain('## Práctica');
      expect(lesson.body, lesson.id).toContain('<ExerciseCard id=');
      expect(lesson.body, lesson.id).toContain('## Next');
      expect(lesson.exercises.length, lesson.id).toBeGreaterThan(0);
    }
  });

  it('every published ES lesson links at least two glossary entries and keeps prose in the band', () => {
    for (const lesson of published) {
      const glossaryLinks = lesson.body.match(/\/es\/glossary\/[a-z0-9-]+/g) ?? [];
      expect(glossaryLinks.length, `${lesson.id} needs >=2 ES glossary links`).toBeGreaterThanOrEqual(2);
      const words = wordCount(lesson.body);
      expect(words, `${lesson.id} prose is ${words} words`).toBeGreaterThanOrEqual(350);
      expect(words, `${lesson.id} prose is ${words} words`).toBeLessThanOrEqual(1400);
    }
  });

  it('every published ES lesson includes the house teaching blocks', () => {
    for (const lesson of published) {
      expect(lesson.body, lesson.id).toContain('<CheckUnderstanding');
      expect(lesson.body, lesson.id).toContain('<KeyTakeaways');
    }
  });

  it('all ES cross-references resolve inside the ES collections', () => {
    const lessonIds = new Set(esLessons.map((lesson) => lesson.id));
    const exerciseIds = new Set(esExercises.map((exercise) => exercise.id));
    const termIds = new Set(esTerms.map((term) => term.id));

    for (const lesson of published) {
      for (const ref of lesson.exercises) {
        expect(exerciseIds.has(ref), `${lesson.id} references missing ES exercise ${ref}`).toBe(true);
      }
      for (const link of lesson.body.matchAll(/\/es\/glossary\/([a-z0-9-]+)/g)) {
        const term = link[1] ?? '';
        expect(termIds.has(term), `${lesson.id} links missing ES term ${term}`).toBe(true);
      }
      for (const link of lesson.body.matchAll(/\/es\/learn\/([a-z-]+)\/([a-z0-9-]+)/g)) {
        const lessonRef = `${link[1] ?? ''}/${link[2] ?? ''}`;
        if (lessonRef === lesson.id) continue;
        expect(lessonIds.has(lessonRef), `${lesson.id} links missing ES lesson ${lessonRef}`).toBe(true);
      }
    }

    for (const term of esTerms) {
      for (const ref of term.relatedLessons) {
        expect(lessonIds.has(ref), `ES term ${term.id} references missing lesson ${ref}`).toBe(true);
      }
      for (const ref of term.relatedExercises) {
        expect(exerciseIds.has(ref), `ES term ${term.id} references missing exercise ${ref}`).toBe(true);
      }
    }
  });

  it('every published ES lesson has an EN counterpart with the same slug (hreflang parity)', () => {
    const enLessonsRoot = join(root, 'src', 'content', 'lessons');
    const enIds = new Set(
      listFiles(enLessonsRoot, '.mdx').map((file) => normalise(file.slice(enLessonsRoot.length + 1).replace(/\.mdx$/, ''))),
    );
    for (const lesson of published) {
      expect(enIds.has(lesson.id), `ES lesson ${lesson.id} has no EN counterpart`).toBe(true);
    }
  });
});
