// JSON-LD builders. Only schema.org types that are valid and genuinely useful are emitted; rich-result
// support for each type is verified against current search-engine documentation at the SEO gate
// (master brief §59). No fake ratings, student counts or credentials — ever.

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[], origin: URL): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, origin).href,
    })),
  };
}

export function learningResourceJsonLd(
  input: {
    name: string;
    description: string;
    path: string;
    minutes?: number;
    /** schema.org learningResourceType — 'Lesson' by default, 'Exercise' on practice pages. */
    resourceType?: string;
    teaches?: string;
    /** ISO date from frontmatter lastReviewed — real freshness instead of a build timestamp. */
    modifiedDate?: string;
    course?: { name: string; path: string };
  },
  origin: URL,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: input.name,
    description: input.description,
    url: new URL(input.path, origin).href,
    inLanguage: 'en',
    isAccessibleForFree: true,
    learningResourceType: input.resourceType ?? 'Lesson',
    ...(input.minutes ? { timeRequired: `PT${input.minutes}M` } : {}),
    ...(input.teaches ? { teaches: input.teaches } : {}),
    ...(input.modifiedDate ? { dateModified: input.modifiedDate } : {}),
    ...(input.course
      ? {
          isPartOf: {
            '@type': 'Course',
            name: input.course.name,
            url: new URL(input.course.path, origin).href,
          },
        }
      : {}),
  };
}

/** A track hub is honestly describable as a course: an ordered set of free lessons under one name. */
export function courseJsonLd(
  input: {
    name: string;
    description: string;
    path: string;
    lessons: { name: string; path: string }[];
  },
  origin: URL,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: input.name,
    description: input.description,
    url: new URL(input.path, origin).href,
    inLanguage: 'en',
    isAccessibleForFree: true,
    provider: {
      '@type': 'Organization',
      name: 'AI Practice',
      url: origin.href,
    },
    hasPart: input.lessons.map((lesson) => ({
      '@type': 'LearningResource',
      name: lesson.name,
      url: new URL(lesson.path, origin).href,
    })),
  };
}

export function definedTermJsonLd(
  input: { term: string; definition: string; path: string; setPath: string },
  origin: URL,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: input.term,
    description: input.definition,
    url: new URL(input.path, origin).href,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'AI glossary',
      url: new URL(input.setPath, origin).href,
    },
  };
}

export function websiteJsonLd(input: { name: string; description: string; path: string }, origin: URL): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: input.name,
    description: input.description,
    url: new URL(input.path, origin).href,
  };
}

/** Author node — one named person behind the site; no invented credentials. */
export function personJsonLd(
  input: { name: string; url: string; description: string },
  origin: URL,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: input.name,
    url: new URL(input.url, origin).href,
    description: input.description,
    worksFor: { '@type': 'Organization', name: 'AI Practice', url: origin.href },
  };
}

/** Publisher node — search engines expect an Organization behind the site. No fake credentials. */
export function organizationJsonLd(
  input: { name: string; description: string; logoPath: string },
  origin: URL,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: input.name,
    url: origin.href,
    description: input.description,
    logo: new URL(input.logoPath, origin).href,
  };
}

/** FAQ pages are genuinely question-shaped: every entry stands alone and links a lesson for depth. */
export function faqJsonLd(
  items: { question: string; answer: string }[],
  origin: URL,
  path = '/faq',
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
    url: new URL(path, origin).href,
  };
}
