// SSR UI strings for shared components — EN is the source of truth; ES is the wave-1 translation.
// Components pick the locale from Astro.currentLocale (set by the i18n routing config); the EN
// surface keeps the exact same copy as before. Client-side strings (exercise engines, toasts,
// bookmarks, assessment) live in src/i18n/client.ts.

export type Locale = 'en' | 'es';

export function localeOf(value: string | null | undefined): Locale {
  return value === 'es' ? 'es' : 'en';
}

export interface ExerciseCardStrings {
  legendChoose: string;
  checkAnswer: string;
  aiAnswer: string;
  legendClaims: string;
  weakPrompt: string;
  improvedLabel: string;
  improvedPlaceholder: string;
  selfCheckCriteria: string;
  compareStrongVersion: string;
  strongVersionSummary: string;
  checkOrder: string;
  correctOrderSummary: string;
  moveUp: string;
  moveDown: string;
  yourPromptAssembled: string;
  previewPlaceholder: string;
  compareStrongExample: string;
  strongExampleSummary: string;
  optionalSuffix: string;
  rubricIntro: string;
  whichOutput: string;
  shipThis: string;
  checkVerdict: string;
  yourPlan: string;
  planPlaceholder: string;
  selfCheckPlan: string;
  compareModel: string;
  modelSummary: string;
  hintSummary: string;
  explanationSummary: string;
}

export interface UiStrings {
  skipLink: string;
  themeToggle: string;
  levelChip: string;
  nav: { learn: string; practice: string; assessment: string; glossary: string; about: string };
  footer: {
    tagline: string;
    learnHeading: string;
    aboutHeading: string;
    curriculum: string;
    practice: string;
    skillsCheck: string;
    glossary: string;
    aiQuestions: string;
    myProgress: string;
    howItWorks: string;
    privacy: string;
  };
  /** Label for the language switcher pointing at the OTHER language. */
  langSwitch: string;
  langSwitchAria: string;
  callout: { tip: string; caution: string; why: string };
  takeawaysTitle: string;
  stepRevealTitle: string;
  stepRevealButton: (n: number) => string;
  stepRevealFinal: string;
  promptCompare: { aria: string; weakLabel: string; strongLabel: string; whyStronger: string };
  nextToken: { aria: string; caption: (token: string, pct: number) => string; sample: string; result: string };
  tokenSplit: { ariaPrefix: string; caption: (text: string, count: number) => string; replay: string };
  contextMeter: {
    aria: (capacity: string) => string;
    note: string;
    kinds: { you: string; ai: string; doc: string };
    caption: string;
    replay: string;
  };
  diffusion: {
    aria: string;
    caption: string;
    replay: string;
    noise: string;
    yourImage: string;
    pass: (n: number) => string;
    ariaFirst: string;
    ariaFinal: string;
    ariaPass: (n: number) => string;
  };
  exerciseCard: ExerciseCardStrings;
}

const en: UiStrings = {
  skipLink: 'Skip to content',
  themeToggle: 'Toggle dark mode',
  levelChip: 'Lv 1 · Curious',
  nav: { learn: 'Learn', practice: 'Practice', assessment: 'Assessment', glossary: 'Glossary', about: 'About' },
  footer: {
    tagline:
      'Practical AI skills, one exercise at a time. Free, no account — progress is stored on this device only.',
    learnHeading: 'Learn',
    aboutHeading: 'About',
    curriculum: 'Curriculum',
    practice: 'Practice',
    skillsCheck: 'Skills check',
    glossary: 'Glossary',
    aiQuestions: 'AI questions',
    myProgress: 'My progress',
    howItWorks: 'How it works',
    privacy: 'Privacy',
  },
  langSwitch: 'Español',
  langSwitchAria: 'Read this site in Spanish',
  callout: { tip: 'Tip', caution: 'Common mistake', why: 'Why it works' },
  takeawaysTitle: 'Key takeaways',
  stepRevealTitle: 'How it works, step by step',
  stepRevealButton: (n) => `Reveal step ${n}`,
  stepRevealFinal: 'Reveal final step',
  promptCompare: {
    aria: 'Prompt comparison',
    weakLabel: 'Weak prompt',
    strongLabel: 'Stronger prompt',
    whyStronger: 'Why the stronger one works',
  },
  nextToken: {
    aria: 'Next-token prediction, visualised',
    caption: (token, pct) =>
      `The model scores every plausible continuation — then picks one to continue the sentence. The most likely token (${token}, ${pct}%) is the usual pick, not the only possible one.`,
    sample: 'Sample the next token',
    result: 'Sample it a few times — a low-probability token can still win a round.',
  },
  tokenSplit: {
    ariaPrefix: 'Tokenisation example',
    caption: (text, count) =>
      `The sentence “${text}” is read as ${count} tokens — chunks, not letters. Punctuation, rare words and word-fragments each take their own piece (example tokenisation; exact cuts vary by model).`,
    replay: 'Replay the split',
  },
  contextMeter: {
    aria: (capacity) => `The context window (${capacity}), visualised as a sliding strip of messages`,
    note: 'everything the model can see right now',
    kinds: { you: 'You', ai: 'AI', doc: 'Doc' },
    caption:
      'New messages push in from the right — and the oldest text slides out of the window on the left. Outside the window there is nothing: the model cannot look it up later.',
    replay: 'Play it again',
  },
  diffusion: {
    aria: 'From noise to image, pass by pass',
    caption:
      'The same process drawn out: each pass nudges random noise toward the prompt. There is no draft hidden underneath — every pass refines what the last one produced.',
    replay: 'Replay the passes',
    noise: 'noise',
    yourImage: 'your image',
    pass: (n) => `pass ${n}`,
    ariaFirst: 'First pass: pure noise',
    ariaFinal: 'Final pass: the finished image',
    ariaPass: (n) => `Pass ${n}: partly refined noise`,
  },
  exerciseCard: {
    legendChoose: 'Choose one option',
    checkAnswer: 'Check answer',
    aiAnswer: 'The AI answer',
    legendClaims: 'Select every part that should not be trusted as-is',
    weakPrompt: 'The weak prompt',
    improvedLabel: 'Your improved version',
    improvedPlaceholder: 'Write the improved prompt here…',
    selfCheckCriteria: 'Self-check — does your version address these?',
    compareStrongVersion: 'Compare with a strong version',
    strongVersionSummary: 'A strong version (self-assessment — not machine-graded)',
    checkOrder: 'Check order',
    correctOrderSummary: 'Correct order',
    moveUp: 'Move step up',
    moveDown: 'Move step down',
    yourPromptAssembled: 'Your prompt, assembled',
    previewPlaceholder: 'Fill the fields above — this shows exactly what you would paste into the chat.',
    compareStrongExample: 'Compare with a strong example',
    strongExampleSummary: 'A strong example (self-assessment — not machine-graded)',
    optionalSuffix: ' — optional',
    rubricIntro: 'Rubric — answer each question for both outputs before deciding',
    whichOutput: 'Which output would you ship?',
    shipThis: 'This is the one I would ship.',
    checkVerdict: 'Check verdict',
    yourPlan: 'Your plan',
    planPlaceholder: 'Write your plan here — even bullet points are enough…',
    selfCheckPlan: 'Self-check — does your plan cover these?',
    compareModel: 'Compare with a model answer',
    modelSummary: 'A model answer (self-assessment — not machine-graded)',
    hintSummary: 'Hint',
    explanationSummary: 'Why this is the answer',
  },
};

const es: UiStrings = {
  skipLink: 'Saltar al contenido',
  themeToggle: 'Cambiar el tema claro/oscuro',
  levelChip: 'Nv 1 · Curioso',
  nav: { learn: 'Aprender', practice: 'Practicar', assessment: 'Evaluación', glossary: 'Glosario', about: 'Acerca de' },
  footer: {
    tagline:
      'Habilidades prácticas de IA, un ejercicio a la vez. Gratis, sin cuenta — tu progreso se guarda solo en este dispositivo.',
    learnHeading: 'Aprender',
    aboutHeading: 'Acerca de',
    curriculum: 'Currículo',
    practice: 'Práctica',
    skillsCheck: 'Test de nivel',
    glossary: 'Glosario',
    aiQuestions: 'Preguntas de IA',
    myProgress: 'Mi progreso',
    howItWorks: 'Cómo funciona',
    privacy: 'Privacidad',
  },
  langSwitch: 'English',
  langSwitchAria: 'Read this site in English',
  callout: { tip: 'Consejo', caution: 'Error común', why: 'Por qué funciona' },
  takeawaysTitle: 'Puntos clave',
  stepRevealTitle: 'Cómo funciona, paso a paso',
  stepRevealButton: (n) => `Mostrar el paso ${n}`,
  stepRevealFinal: 'Mostrar el paso final',
  promptCompare: {
    aria: 'Comparación de prompts',
    weakLabel: 'Prompt débil',
    strongLabel: 'Prompt sólido',
    whyStronger: 'Por qué funciona la versión sólida',
  },
  nextToken: {
    aria: 'Predicción del siguiente token, visualizada',
    caption: (token, pct) =>
      `El modelo puntúa cada continuación plausible y luego elige una para seguir la frase. El token más probable (${token}, ${pct}%) es la elección habitual, no la única posible.`,
    sample: 'Muestra el siguiente token',
    result: 'Pruébalo unas cuantas veces — un token poco probable también puede ganar una ronda.',
  },
  tokenSplit: {
    ariaPrefix: 'Ejemplo de tokenización',
    caption: (text, count) =>
      `La frase “${text}” se lee como ${count} tokens — trozos, no letras. La puntuación, las palabras raras y los fragmentos ocupan cada uno su pieza (tokenización de ejemplo; los cortes exactos varían según el modelo).`,
    replay: 'Reproducir la división',
  },
  contextMeter: {
    aria: (capacity) => `La ventana de contexto (${capacity}), visualizada como una tira de mensajes que se desliza`,
    note: 'todo lo que el modelo puede ver ahora mismo',
    kinds: { you: 'Tú', ai: 'IA', doc: 'Doc' },
    caption:
      'Los mensajes nuevos entran por la derecha y el texto más antiguo sale de la ventana por la izquierda. Fuera de la ventana no hay nada: el modelo no podrá consultarlo después.',
    replay: 'Reproducir otra vez',
  },
  diffusion: {
    aria: 'Del ruido a la imagen, paso a paso',
    caption:
      'El mismo proceso, desplegado: cada pasada empuja el ruido aleatorio hacia el prompt. No hay un borrador escondido debajo — cada pasada refina lo que produjo la anterior.',
    replay: 'Reproducir las pasadas',
    noise: 'ruido',
    yourImage: 'tu imagen',
    pass: (n) => `pasada ${n}`,
    ariaFirst: 'Primera pasada: ruido puro',
    ariaFinal: 'Última pasada: la imagen terminada',
    ariaPass: (n) => `Pasada ${n}: ruido parcialmente refinado`,
  },
  exerciseCard: {
    legendChoose: 'Elige una opción',
    checkAnswer: 'Comprobar respuesta',
    aiAnswer: 'La respuesta de la IA',
    legendClaims: 'Marca cada parte que no deberías dar por buena',
    weakPrompt: 'El prompt débil',
    improvedLabel: 'Tu versión mejorada',
    improvedPlaceholder: 'Escribe aquí el prompt mejorado…',
    selfCheckCriteria: 'Autochequeo — ¿tu versión cubre esto?',
    compareStrongVersion: 'Comparar con una versión sólida',
    strongVersionSummary: 'Una versión sólida (autoevaluación — sin corrección automática)',
    checkOrder: 'Comprobar el orden',
    correctOrderSummary: 'Orden correcto',
    moveUp: 'Subir el paso',
    moveDown: 'Bajar el paso',
    yourPromptAssembled: 'Tu prompt, montado',
    previewPlaceholder: 'Rellena los campos de arriba — aquí verás exactamente lo que pegarías en el chat.',
    compareStrongExample: 'Comparar con un ejemplo sólido',
    strongExampleSummary: 'Un ejemplo sólido (autoevaluación — sin corrección automática)',
    optionalSuffix: ' — opcional',
    rubricIntro: 'Rúbrica — responde cada pregunta para las dos salidas antes de decidir',
    whichOutput: '¿Cuál de las salidas enviarías?',
    shipThis: 'Esta es la que enviaría.',
    checkVerdict: 'Comprobar veredicto',
    yourPlan: 'Tu plan',
    planPlaceholder: 'Escribe aquí tu plan — con viñetas basta…',
    selfCheckPlan: 'Autochequeo — ¿tu plan cubre esto?',
    compareModel: 'Comparar con la respuesta modelo',
    modelSummary: 'Una respuesta modelo (autoevaluación — sin corrección automática)',
    hintSummary: 'Pista',
    explanationSummary: 'Por qué esta es la respuesta',
  },
};

const STRINGS: Record<Locale, UiStrings> = { en, es };

export function uiStrings(locale: Locale): UiStrings {
  return STRINGS[locale];
}
