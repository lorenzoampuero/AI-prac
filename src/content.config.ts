import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Content model — the single source of truth for every lesson, exercise and glossary term.
// Field rules live in docs/CONTENT_STANDARDS.md; curriculum units in docs/CURRICULUM_MAP.md.
// Invalid frontmatter fails `astro sync` / `astro check` / the build — drafts included, so authoring
// mistakes surface immediately (drafts are filtered from routes, not from validation).

const level = z.enum(['beginner', 'intermediate', 'advanced']);
const contentClass = z.enum(['evergreen', 'current']);
const track = z.enum([
  'ai-foundations',
  'prompting',
  'ai-research',
  'ai-for-work',
  'ai-safety',
  'ai-coding',
  'ai-images',
  'ai-workflows',
]);

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/lessons' }),
  schema: z.object({
    title: z.string().max(80),
    description: z.string().min(50).max(180),
    track,
    order: z.number().int().positive(),
    level,
    estimatedMinutes: z.number().int().min(3).max(20),
    skills: z.array(z.string()).min(1),
    prerequisites: z.array(z.string()).default([]),
    learningOutcome: z.string().max(140),
    class: contentClass,
    lastReviewed: z.coerce.date().optional(),
    sources: z.array(z.object({ title: z.string(), url: z.string() })).default([]),
    seo: z.object({ intent: z.string(), cluster: z.string().optional() }),
    exercises: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const exerciseBase = {
  title: z.string().max(90),
  scenario: z.string().min(40),
  task: z.string().min(20),
  skills: z.array(z.string()).min(1),
  difficulty: level,
  lessonRefs: z.array(z.string()).min(1),
  hints: z.array(z.string()).max(4).default([]),
  explanation: z.string().min(80),
  draft: z.boolean().default(false),
};

// One schema per practice engine (docs/CURRICULUM_MAP.md legend). Deterministic grading only — no API,
// no LLM judge; open-ended tasks are rubric self-assessment with a model answer.
const exercises = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/exercises' }),
  schema: z.discriminatedUnion('engine', [
    z.object({
      engine: z.literal('pick-better-prompt'),
      ...exerciseBase,
      promptA: z.string(),
      promptB: z.string(),
      better: z.enum(['A', 'B']),
      feedback: z.object({ a: z.string(), b: z.string() }),
    }),
    z.object({
      engine: z.literal('find-the-problem'),
      ...exerciseBase,
      response: z.string(),
      claims: z
        .array(
          z.object({
            id: z.string(),
            text: z.string(),
            problematic: z.boolean(),
            feedback: z.string(),
          }),
        )
        .min(2),
    }),
    z.object({
      engine: z.literal('order-steps'),
      ...exerciseBase,
      steps: z.array(z.string()).min(3), // canonical order; the UI shuffles deterministically
    }),
    z.object({
      engine: z.literal('model-choice'),
      ...exerciseBase,
      options: z.array(z.object({ text: z.string(), correct: z.boolean(), feedback: z.string() })).min(2),
    }),
    z.object({
      engine: z.literal('fix-prompt'),
      ...exerciseBase,
      weakPrompt: z.string(),
      criteria: z.array(z.object({ id: z.string(), label: z.string(), hint: z.string() })).min(2),
      sampleSolution: z.string(),
    }),
    z.object({
      engine: z.literal('build-prompt'),
      ...exerciseBase,
      fields: z
        .array(z.object({ id: z.string(), label: z.string(), placeholder: z.string(), required: z.boolean() }))
        .min(2),
      sampleSolution: z.string(),
    }),
    z.object({
      engine: z.literal('evaluate-output'),
      ...exerciseBase,
      outputA: z.string(),
      outputB: z.string(),
      rubric: z.array(z.object({ id: z.string(), label: z.string() })).min(2),
      verdict: z.object({ better: z.enum(['A', 'B']), reasoning: z.string() }),
    }),
    z.object({
      engine: z.literal('real-challenge'),
      ...exerciseBase,
      rubric: z.array(z.object({ id: z.string(), label: z.string() })).min(2),
      modelAnswer: z.string(),
    }),
  ]),
});

const glossary = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/glossary' }),
  schema: z.object({
    term: z.string().max(60),
    definition: z.string().min(40).max(1200),
    relatedLessons: z.array(z.string()).default([]),
    relatedExercises: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { lessons, exercises, glossary };
