// Prompt-template library helpers shared by the EN (/prompts) and ES (/es/prompts) pages.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/ui';

export type PromptSet = CollectionEntry<'prompts'> | CollectionEntry<'promptsEs'>;

export async function getPromptSets(locale: Locale): Promise<PromptSet[]> {
  const sets: PromptSet[] =
    locale === 'es'
      ? await getCollection('promptsEs', ({ data }) => !data.draft)
      : await getCollection('prompts', ({ data }) => !data.draft);
  return sets.sort((a, b) => a.data.order - b.data.order);
}

export function promptSetPath(locale: Locale, slug: string): string {
  return `${locale === 'es' ? '/es' : ''}/prompts/${slug}`;
}

export interface LessonLink {
  href: string;
  title: string;
  /** True when an ES page has to link the EN lesson because no translation exists yet. */
  englishOnly: boolean;
}

/** The lesson that teaches the skill behind a set — the ES translation when it exists, else EN. */
export async function resolveLesson(locale: Locale, lessonId: string): Promise<LessonLink | undefined> {
  if (locale === 'es') {
    const es = (await getCollection('lessonsEs', ({ data }) => !data.draft)).find((l) => l.id === lessonId);
    if (es) return { href: `/es/learn/${lessonId}`, title: es.data.title, englishOnly: false };
  }
  const en = (await getCollection('lessons', ({ data }) => !data.draft)).find((l) => l.id === lessonId);
  return en ? { href: `/learn/${lessonId}`, title: en.data.title, englishOnly: locale === 'es' } : undefined;
}

/** The prompt set whose lesson is `lessonId` — used to link lessons back to their templates. */
export async function setForLesson(locale: Locale, lessonId: string): Promise<PromptSet | undefined> {
  return (await getPromptSets(locale)).find((set) => set.data.lesson === lessonId);
}
