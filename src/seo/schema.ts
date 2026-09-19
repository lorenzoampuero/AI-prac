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
  input: { name: string; description: string; path: string; minutes: number },
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
    learningResourceType: 'Lesson',
    timeRequired: `PT${input.minutes}M`,
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
