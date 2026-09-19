// Registry contract tests — the anti-doorway and integrity contract from research/SEO_INTENT_MAP.md.
// They read the content files straight from disk (no Astro runtime needed), so they run in plain vitest.
//
// These tests are intentionally strict for PUBLISHED content: drafts may be incomplete, published
// entries must be coherent (unique intent, resolvable references, implemented engines).

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { parse as parseYaml } from 'yaml';
import { TRACK_IDS } from '../src/data/tracks';
import { isImplementedEngine } from '../src/lib/exercise/grade';

const root = fileURLToPath(new URL('..', import.meta.url));
const lessonsRoot = join(root, 'src', 'content', 'lessons');
const exercisesRoot = join(root, 'src', 'content', 'exercises');
const glossaryRoot = join(root, 'src', 'content', 'glossary');

interface LessonMeta {
  id: string;
  track: string;
  slug: string;
  draft: boolean;
  title: string;
  seoIntent: string;
  exercises: string[];
}

interface ExerciseMeta {
  id: string;
  engine: string;
  draft: boolean;
  lessonRefs: string[];
}

interface TermMeta {
  id: string;
  draft: boolean;
  relatedLessons: string[];
}

function listFiles(dir: string, extension: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full, extension));
    else if (entry.name.endsWith(extension)) out.push(full);
  }
  return out;
}

function parseFrontmatter(file: string): Record<string, unknown> {
  const raw = readFileSync(file, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const yaml = match?.[1];
  if (!yaml) throw new Error(`missing frontmatter: ${file}`);
  return parseYaml(yaml) as Record<string, unknown>;
}

const normalise = (path: string) => path.split(/[\\/]/).join('/');

const lessons: LessonMeta[] = listFiles(lessonsRoot, '.mdx').map((file) => {
  const data = parseFrontmatter(file);
  const id = normalise(file.slice(lessonsRoot.length + 1).replace(/\.mdx$/, ''));
  const segments = id.split('/');
  const seo = (data.seo ?? {}) as { intent?: unknown };
  return {
    id,
    track: String(data.track ?? ''),
    slug: segments.slice(1).join('/'),
    draft: data.draft === true,
    title: String(data.title ?? ''),
    seoIntent: String(seo.intent ?? '').trim().toLowerCase(),
    exercises: Array.isArray(data.exercises) ? (data.exercises as string[]) : [],
  };
});

const exercises: ExerciseMeta[] = listFiles(exercisesRoot, '.json').map((file) => {
  const data = JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;
  const id = normalise(file.slice(exercisesRoot.length + 1).replace(/\.json$/, ''));
  return {
    id,
    engine: String(data.engine ?? ''),
    draft: data.draft === true,
    lessonRefs: Array.isArray(data.lessonRefs) ? (data.lessonRefs as string[]) : [],
  };
});

const terms: TermMeta[] = listFiles(glossaryRoot, '.md').map((file) => {
  const data = parseFrontmatter(file);
  const id = normalise(file.slice(glossaryRoot.length + 1).replace(/\.md$/, ''));
  return {
    id,
    draft: data.draft === true,
    relatedLessons: Array.isArray(data.relatedLessons) ? (data.relatedLessons as string[]) : [],
  };
});

const publishedLessons = lessons.filter((lesson) => !lesson.draft);
const publishedExercises = exercises.filter((exercise) => !exercise.draft);
const publishedTerms = terms.filter((term) => !term.draft);

describe('curriculum registry — structure', () => {
  it('every lesson belongs to a known track and uses a kebab-case slug', () => {
    for (const lesson of lessons) {
      expect([...TRACK_IDS], lesson.id).toContain(lesson.track);
      expect(lesson.slug, lesson.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('enforces the anti-doorway policy on slugs', () => {
    for (const lesson of lessons) {
      expect(lesson.slug, lesson.id).not.toMatch(/-(for|para)-(lawyers|doctors|teachers|realtors|plumbers)$/);
      expect(lesson.slug, lesson.id).not.toMatch(/^\d+-prompts?/);
    }
  });
});

describe('curriculum registry — published content integrity', () => {
  it('published lessons declare a unique primary SEO intent and at least one exercise', () => {
    const intents = new Set<string>();
    for (const lesson of publishedLessons) {
      expect(lesson.seoIntent, lesson.id).not.toBe('');
      expect(intents.has(lesson.seoIntent), `duplicate intent "${lesson.seoIntent}" in ${lesson.id}`).toBe(false);
      intents.add(lesson.seoIntent);
      expect(lesson.exercises.length, lesson.id).toBeGreaterThan(0);
    }
  });

  it('lesson → exercise and exercise → lesson references resolve between published entries', () => {
    const lessonIds = new Set(publishedLessons.map((lesson) => lesson.id));
    const exerciseById = new Map(exercises.map((exercise) => [exercise.id, exercise]));

    for (const lesson of publishedLessons) {
      for (const ref of lesson.exercises) {
        const exercise = exerciseById.get(ref);
        expect(exercise, `${lesson.id} references missing exercise ${ref}`).toBeDefined();
        expect(exercise?.draft, `${lesson.id} references draft exercise ${ref}`).toBe(false);
      }
    }

    for (const exercise of publishedExercises) {
      for (const ref of exercise.lessonRefs) {
        expect(lessonIds.has(ref), `${exercise.id} references missing or draft lesson ${ref}`).toBe(true);
      }
    }
  });

  it('published exercises use an implemented engine (no phantom UI ships)', () => {
    for (const exercise of publishedExercises) {
      expect(
        isImplementedEngine({ engine: exercise.engine }),
        `${exercise.id} uses an engine with no implemented UI: ${exercise.engine}`,
      ).toBe(true);
    }
  });

  it('published glossary terms reference existing lessons', () => {
    const lessonIds = new Set(lessons.map((lesson) => lesson.id));
    for (const term of publishedTerms) {
      for (const ref of term.relatedLessons) {
        expect(lessonIds.has(ref), `${term.id} references missing lesson ${ref}`).toBe(true);
      }
    }
  });
});
