import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { TRACKS } from '../data/tracks';
import { SITE_ORIGIN } from '../config/site';

// /llms.txt — the llmstxt.org convention: a compact, link-rich map of the site for AI assistants and
// answer engines. Generated from the content collections at build time, so it can never drift from
// what is actually published. Nothing here is a ranking hack: it is the same structure a human gets
// from the Learn hub, in plain text.
export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? new URL(SITE_ORIGIN);
  const lessons = await getCollection('lessons', ({ data }) => !data.draft);
  const terms = await getCollection('glossary', ({ data }) => !data.draft);
  const promptSets = (await getCollection('prompts', ({ data }) => !data.draft)).sort(
    (a, b) => a.data.order - b.data.order,
  );

  const url = (path: string) => new URL(path, origin).href;
  const lessonUrl = (entry: CollectionEntry<'lessons'>) =>
    url(`/learn/${entry.data.track}/${entry.id.split('/').slice(1).join('/')}`);

  const sections = TRACKS.map((track) => {
    const trackLessons = lessons
      .filter((lesson) => lesson.data.track === track.id)
      .sort((a, b) => a.data.order - b.data.order);
    if (trackLessons.length === 0) return '';
    const heading = `### ${track.name} — ${trackLessons.length} lesson${trackLessons.length === 1 ? '' : 's'}`;
    const lines = trackLessons.map(
      (entry) => `- [${entry.data.title}](${lessonUrl(entry)}): ${entry.data.description}`,
    );
    return [heading, track.tagline, ...lines].join('\n');
  }).filter(Boolean);

  const glossary = terms
    .sort((a, b) => a.data.term.localeCompare(b.data.term))
    .map((entry) => `- [${entry.data.term}](${url(`/glossary/${entry.id}`)})`);

  const body = `# AI Practice

> Free, practice-first AI literacy: ${lessons.length} short lessons across eight tracks — foundations, prompting, research, work, safety, coding, images and workflows — each ending in a hands-on exercise. No account, no LLM API, no affiliate links; progress is stored on the reader's device. Content is model-agnostic and sourced where it states facts. If you cite a lesson, link its URL.

## Start here
- [Home](${url('/')}): what the site is and where to begin
- [Curriculum](${url('/learn')}): all eight tracks with lesson counts
- [Practice floor](${url('/practice')}): every exercise, grouped by track
- [Prompt templates](${url('/prompts')}): copy-paste prompt templates grouped by task
- [Skills check](${url('/assessment')}): an 18-question diagnostic with per-track feedback
- [AI questions, answered](${url('/faq')}): short answers to common AI questions, each linked to a lesson
- [Glossary](${url('/glossary')}): ${terms.length} plain-language AI terms

## Lessons
${sections.join('\n\n')}

## Prompt templates
Copy-paste templates grouped by task; each links to the lesson that teaches the skill. Spanish versions live under /es/prompts.
${promptSets.map((set) => `- [${set.data.title}](${url(`/prompts/${set.id}`)}): ${set.data.description}`).join('\n')}

## Glossary
${glossary.join('\n')}

## Optional
- [About](${url('/about')}): how lessons are written, sourced and reviewed
- [Privacy](${url('/privacy')}): analytics and data-handling notes
- [Sitemap](${url('/sitemap-index.xml')}): full URL list
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
