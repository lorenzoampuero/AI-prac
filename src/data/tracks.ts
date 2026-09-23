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
  /** <title> tag — keyword-first, ≤50 chars; BaseLayout appends the brand suffix. */
  seoTitle: string;
  /** Meta description — unique per track, keyword-bearing (no shared boilerplate tail). */
  seoDescription: string;
  /** ES wave-1 display values (i18n) — kept beside EN so both stay in sync. */
  nameEs: string;
  taglineEs: string;
  seoTitleEs: string;
  seoDescriptionEs: string;
}

/** Display order is curated (MVP tracks first), not alphabetical. */
export const TRACKS: TrackInfo[] = [
  {
    id: 'ai-foundations',
    name: 'AI Foundations',
    tagline: 'What AI is, what it does, and where it fails.',
    seoTitle: 'AI Foundations: What AI Is and Where It Fails',
    seoDescription:
      'A beginner AI course in plain language: how models predict text, why they hallucinate, and what tokens, context windows and agents mean.',
    nameEs: 'Fundamentos de IA',
    taglineEs: 'Qué es la IA, qué hace y dónde falla.',
    seoTitleEs: 'Fundamentos de IA: qué es y dónde falla',
    seoDescriptionEs:
      'Un curso de IA para empezar en lenguaje claro: cómo predicen el texto los modelos, por qué alucinan y qué son los tokens, la ventana de contexto y los agentes.',
  },
  {
    id: 'prompting',
    name: 'Prompting',
    tagline: 'Ask clearly, set constraints, iterate without guessing.',
    seoTitle: 'AI Prompting Guide: Clear Instructions That Work',
    seoDescription:
      'Learn to write AI prompts that work: outcomes, context, constraints and iteration — plus a reusable template method, practiced with real exercises.',
    nameEs: 'Prompts',
    taglineEs: 'Pide claro, pon límites e itera sin adivinar.',
    seoTitleEs: 'Prompts: instrucciones claras para la IA',
    seoDescriptionEs:
      'Aprende a escribir prompts que funcionan: objetivo, contexto, límites e iteración — más un método de plantillas reutilizables, con ejercicios reales.',
  },
  {
    id: 'ai-research',
    name: 'AI Research & Verification',
    tagline: 'Check claims, sources and numbers before trusting them.',
    seoTitle: 'AI Research & Verification: Check Before You Trust',
    seoDescription:
      'Learn to verify AI answers: cross-check sources, inspect citations and recompute numbers before you rely on them. Hands-on exercises, no account.',
    nameEs: 'Investigación y verificación',
    taglineEs: 'Comprueba afirmaciones, fuentes y números antes de fiarte.',
    seoTitleEs: 'Verificar la IA: comprueba antes de fiarte',
    seoDescriptionEs:
      'Aprende a verificar respuestas de IA: cruza fuentes, revisa citas y recalcula números antes de fiarte de ellos. Ejercicios prácticos, sin cuenta.',
  },
  {
    id: 'ai-for-work',
    name: 'AI for Work',
    tagline: 'Meetings, email, documents and spreadsheets you can actually use.',
    seoTitle: 'AI for Work: Meetings, Email and Spreadsheets',
    seoDescription:
      'Use AI for meetings, email, documents and spreadsheets without losing accuracy — including an honest CV and cover-letter workflow.',
    nameEs: 'IA para el trabajo',
    taglineEs: 'Reuniones, correo, documentos y hojas de cálculo que puedes usar de verdad.',
    seoTitleEs: 'IA para el trabajo: reuniones, correo y Excel',
    seoDescriptionEs:
      'Usa la IA en reuniones, correo, documentos y hojas de cálculo sin perder precisión — incluido un flujo honesto para CV y cartas de presentación.',
  },
  {
    id: 'ai-safety',
    name: 'AI Safety & Privacy',
    tagline: 'What not to paste, when not to rely on AI.',
    seoTitle: 'AI Safety & Privacy: What Not to Paste Into AI',
    seoDescription:
      'Learn what not to paste into AI chats, how prompt injection hides in documents, and when relying on AI is too risky. Short lessons with real practice.',
    nameEs: 'Seguridad y privacidad',
    taglineEs: 'Qué no pegar y cuándo no fiarte de la IA.',
    seoTitleEs: 'Seguridad y privacidad en IA: qué no pegar',
    seoDescriptionEs:
      'Aprende qué no pegar en un chat de IA, cómo la inyección de prompts se esconde en documentos y cuándo es arriesgado fiarse. Lecciones cortas con práctica.',
  },
  {
    id: 'ai-coding',
    name: 'AI Coding',
    tagline: 'Describe, vet, never blind-run.',
    seoTitle: 'AI Coding: Describe, Vet, Never Blind-Run',
    seoDescription:
      'Learn to work with AI-generated code safely: realistic expectations, a vetting checklist and why you never run what you cannot explain.',
    nameEs: 'IA y código',
    taglineEs: 'Describe, revisa y nunca ejecutes a ciegas.',
    seoTitleEs: 'IA y código: describe y revisa antes de ejecutar',
    seoDescriptionEs:
      'Aprende a trabajar con código generado por IA sin sustos: expectativas realistas, una lista de revisión y por qué nunca ejecutes lo que no entiendes.',
  },
  {
    id: 'ai-images',
    name: 'AI Images',
    tagline: 'Subject, light and composition — describe precisely, then iterate.',
    seoTitle: 'AI Image Prompts: Subject, Light and Composition',
    seoDescription:
      'Learn to write AI image prompts like a recipe — subject, light, composition, consistency and edits — practiced with hands-on exercises.',
    nameEs: 'Imágenes con IA',
    taglineEs: 'Sujeto, luz y composición — describe con precisión y luego itera.',
    seoTitleEs: 'Prompts para imágenes de IA: sujeto, luz y estilo',
    seoDescriptionEs:
      'Aprende a escribir prompts de imagen como una receta — sujeto, luz, composición, coherencia y edición — con ejercicios prácticos.',
  },
  {
    id: 'ai-workflows',
    name: 'AI Workflows & Agents',
    tagline: 'From single prompts to reliable multi-step flows.',
    seoTitle: 'AI Workflows and Agents: Prompts to Reliable Flows',
    seoDescription:
      'Move from single prompts to workflows and agents: map inputs, steps, outputs and checks before you hand the loop to a machine.',
    nameEs: 'Flujos y agentes',
    taglineEs: 'De prompts sueltos a flujos fiables de varios pasos.',
    seoTitleEs: 'Flujos y agentes de IA: de prompt a proceso',
    seoDescriptionEs:
      'Pasa de prompts sueltos a flujos y agentes: define entradas, pasos, salidas y comprobaciones antes de soltar el volante.',
  },
];

export function getTrack(id: string): TrackInfo | undefined {
  return TRACKS.find((t) => t.id === id);
}
