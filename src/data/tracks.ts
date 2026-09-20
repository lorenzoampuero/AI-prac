// Track registry — display data for the 8 curriculum tracks (docs/CURRICULUM_MAP.md).
// Content files reference track ids via src/content.config.ts; contract tests (Gate 8) will assert that
// this registry, the schema enum and the curriculum map stay in sync.

/** Single source of truth for track ids — imported by the content schema and asserted by contract tests. */
export const TRACK_IDS = [
  'ai-foundations',
  'prompting',
  'ai-research',
  'ai-for-work',
  'ai-safety',
  'ai-coding',
  'ai-images',
  'ai-workflows',
] as const;

export type TrackId = (typeof TRACK_IDS)[number];

export interface TrackInfo {
  id: TrackId;
  name: string;
  tagline: string;
}

/** Display order is curated (MVP tracks first), not alphabetical. */
export const TRACKS: TrackInfo[] = [
  { id: 'ai-foundations', name: 'AI Foundations', tagline: 'What AI is, what it does, and where it fails.' },
  { id: 'prompting', name: 'Prompting', tagline: 'Ask clearly, set constraints, iterate without guessing.' },
  { id: 'ai-research', name: 'AI Research & Verification', tagline: 'Check claims, sources and numbers before trusting them.' },
  { id: 'ai-for-work', name: 'AI for Work', tagline: 'Meetings, email, documents and spreadsheets you can actually use.' },
  { id: 'ai-safety', name: 'AI Safety & Privacy', tagline: 'What not to paste, when not to rely on AI.' },
  { id: 'ai-coding', name: 'AI Coding', tagline: 'Describe, vet, never blind-run.' },
  { id: 'ai-images', name: 'AI Images', tagline: 'Subject, light and composition — describe precisely, then iterate.' },
  { id: 'ai-workflows', name: 'AI Workflows & Agents', tagline: 'From single prompts to reliable multi-step flows.' },
];

export function getTrack(id: string): TrackInfo | undefined {
  return TRACKS.find((t) => t.id === id);
}
