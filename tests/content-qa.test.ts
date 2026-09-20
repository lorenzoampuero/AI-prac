// Gate 7 content QA — automated checks for docs/CONTENT_STANDARDS.md §2 (banned phrases), §7 (internal
// linking contract), §9 (review dates) and §10 (per-lesson audit prerequisites). Reads content straight
// from disk, like the registry tests. Verdicts are recorded per unit in docs/CONTENT_QA.md.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { parse as parseYaml } from 'yaml';
import { TRACK_IDS } from '../src/data/tracks';

const root = fileURLToPath(new URL('..', import.meta.url));
const lessonsRoot = join(root, 'src', 'content', 'lessons');
const exercisesRoot = join(root, 'src', 'content', 'exercises');
const glossaryRoot = join(root, 'src', 'content', 'glossary');

const BANNED_PHRASES = [
  'revolutionizing',
  'game-changer',
  'unlock the power',
  'fast-paced world',
  'the future is here',
  '10x your productivity',
  'simply just',
];

function listFiles(dir: string, extension: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full, extension));
    else if (entry.name.endsWith(extension)) out.push(full);
  }
  return out;
}

function read(file: string): string {
  return readFileSync(file, 'utf8');
}

function parseFrontmatter(raw: string): Record<string, unknown> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const yaml = match?.[1];
  if (!yaml) throw new Error('missing frontmatter');
  return parseYaml(yaml) as Record<string, unknown>;
}

function body(raw: string): string {
  return raw.replace(/^---[\r\n]+[\s\S]*?[\r\n]+---/, '').replace(/^import .*$/gm, '');
}

function wordCount(raw: string): number {
  return body(raw)
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

const normalise = (path: string) => path.split(/[\\/]/).join('/');

interface LessonFile {
  id: string;
  raw: string;
}

const lessonFiles: LessonFile[] = listFiles(lessonsRoot, '.mdx').map((file) => ({
  id: normalise(file.slice(lessonsRoot.length + 1).replace(/\.mdx$/, '')),
  raw: read(file),
}));
const exerciseFiles = listFiles(exercisesRoot, '.json');
const glossaryFiles = listFiles(glossaryRoot, '.md');

const publishedLessons = lessonFiles.filter((lesson) => parseFrontmatter(lesson.raw).draft !== true);
const publishedExercises = exerciseFiles.filter(
  (file) => (JSON.parse(read(file)) as Record<string, unknown>).draft !== true,
);

const lessonIds = new Set(publishedLessons.map((lesson) => lesson.id));
const exerciseIds = new Set(
  publishedExercises.map((file) => normalise(file.slice(exercisesRoot.length + 1).replace(/\.json$/, ''))),
);
const termIds = new Set(
  glossaryFiles
    .map((file) => normalise(file.slice(glossaryRoot.length + 1).replace(/\.md$/, '')))
    .filter((id) => parseFrontmatter(read(join(glossaryRoot, `${id}.md`))).draft !== true),
);

function extractLinks(raw: string): string[] {
  const links: string[] = [];
  for (const match of body(raw).matchAll(/\]\((\/[^)\s]*)\)/g)) {
    if (match[1]) links.push(match[1]);
  }
  return links;
}

function resolveLink(href: string): boolean {
  const clean = href.replace(/\/$/, '') || '/';
  if (['', '/', '/learn', '/practice', '/glossary', '/assessment', '/about'].includes(clean)) return true;

  const learnMatch = clean.match(/^\/learn\/([a-z-]+)(?:\/(.+))?$/);
  if (learnMatch) {
    const [, track, slug] = learnMatch;
    if (!slug) return [...TRACK_IDS].includes(track as (typeof TRACK_IDS)[number]);
    return lessonIds.has(`${track}/${slug}`);
  }

  const glossaryMatch = clean.match(/^\/glossary\/([a-z0-9-]+)$/);
  if (glossaryMatch) return termIds.has(glossaryMatch[1] as string);

  const practiceMatch = clean.match(/^\/practice\/([a-z0-9-]+)$/);
  if (practiceMatch) return exerciseIds.has(practiceMatch[1] as string);

  return false;
}

describe('content QA — banned phrases (standards §2)', () => {
  it('no published lesson, exercise or glossary entry uses showbiz phrasing', () => {
    const files = [
      ...publishedLessons.map((lesson) => lesson.raw),
      ...publishedExercises.map((file) => read(file)),
      ...glossaryFiles.map((file) => read(file)),
    ];
    for (const raw of files) {
      const lower = raw.toLowerCase();
      for (const phrase of BANNED_PHRASES) {
        expect(lower.includes(phrase), `banned phrase "${phrase}" found in a published file`).toBe(false);
      }
    }
  });
});

describe('content QA — lesson structure (standards §7, §10)', () => {
  it('every published lesson embeds at least one of its exercises in a Practice section', () => {
    for (const lesson of publishedLessons) {
      const raw = lesson.raw;
      const declared = Array.isArray(parseFrontmatter(raw).exercises)
        ? (parseFrontmatter(raw).exercises as string[])
        : [];
      expect(declared.length, lesson.id).toBeGreaterThan(0);
      expect(raw.includes('## Practice'), `${lesson.id} missing Practice section`).toBe(true);
      expect(/<ExerciseCard id="/.test(raw), `${lesson.id} embeds no ExerciseCard`).toBe(true);
      const embedded = [...raw.matchAll(/<ExerciseCard id="([^"]+)"/g)].map((match) => match[1]);
      for (const id of embedded) {
        expect(declared, `${lesson.id} embeds undeclared exercise ${id}`).toContain(id);
      }
    }
  });

  it('every published lesson links its next step and at least two glossary entries', () => {
    for (const lesson of publishedLessons) {
      const raw = lesson.raw;
      expect(raw.includes('## Next'), `${lesson.id} missing Next section`).toBe(true);
      const links = extractLinks(raw);
      expect(links.length, `${lesson.id} has no outbound links`).toBeGreaterThan(0);
      const glossaryLinks = links.filter((href) => href.startsWith('/glossary/'));
      expect(glossaryLinks.length, `${lesson.id} has fewer than 2 glossary links`).toBeGreaterThanOrEqual(2);
    }
  });

  it('keeps lesson bodies inside the useful size band (exercise-heavy leeway, standards §1)', () => {
    for (const lesson of publishedLessons) {
      const words = wordCount(lesson.raw);
      expect(words, `${lesson.id} is shorter than 350 words`).toBeGreaterThanOrEqual(350);
      expect(words, `${lesson.id} is longer than 1400 words`).toBeLessThanOrEqual(1400);
    }
  });

  it('marks current lessons with a review date and keeps evergreen lessons free of fake freshness', () => {
    for (const lesson of publishedLessons) {
      const data = parseFrontmatter(lesson.raw);
      if (data.class === 'current') {
        expect(data.lastReviewed, `${lesson.id} is current but has no lastReviewed`).toBeTruthy();
      } else {
        expect(data.lastReviewed, `${lesson.id} is evergreen but declares lastReviewed`).toBeFalsy();
      }
    }
  });
});

describe('content QA — link integrity (standards §7)', () => {
  it('every internal link in a published lesson resolves to a real page', () => {
    for (const lesson of publishedLessons) {
      for (const href of extractLinks(lesson.raw)) {
        expect(resolveLink(href), `${lesson.id} links to unresolved ${href}`).toBe(true);
      }
    }
  });

  it('every glossary entry link resolves (related lesson/exercise references included)', () => {
    for (const file of glossaryFiles) {
      const data = parseFrontmatter(read(file));
      if (data.draft === true) continue;
      const lessons = Array.isArray(data.relatedLessons) ? (data.relatedLessons as string[]) : [];
      const exercises = Array.isArray(data.relatedExercises) ? (data.relatedExercises as string[]) : [];
      for (const ref of lessons) expect(lessonIds.has(ref), `${file} references missing lesson ${ref}`).toBe(true);
      for (const ref of exercises) {
        expect(exerciseIds.has(ref), `${file} references missing exercise ${ref}`).toBe(true);
      }
    }
  });
});

describe('content QA — teaching blocks (standards §11)', () => {
  const TEACHING_BLOCKS = [
    'CheckUnderstanding',
    'PromptCompare',
    'StepReveal',
    'NextTokenDemo',
    'TokenSplit',
    'ContextMeter',
    'DiffusionStrip',
  ];

  it('every published lesson ships at least one interactive teaching block', () => {
    for (const lesson of publishedLessons) {
      const hasBlock = TEACHING_BLOCKS.some((block) => lesson.raw.includes(`<${block}`));
      expect(hasBlock, `${lesson.id} has no teaching block (§11)`).toBe(true);
    }
  });

  it('every published lesson closes with KeyTakeaways before the Next section', () => {
    for (const lesson of publishedLessons) {
      const raw = lesson.raw;
      const takeawaysAt = raw.indexOf('<KeyTakeaways');
      const nextAt = raw.lastIndexOf('## Next');
      expect(takeawaysAt, `${lesson.id} has no KeyTakeaways (§11)`).toBeGreaterThan(-1);
      expect(takeawaysAt, `${lesson.id} places KeyTakeaways after the Next section`).toBeLessThan(nextAt);
    }
  });
});
