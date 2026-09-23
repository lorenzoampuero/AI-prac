// Client-side UI strings (exercise engines, toasts, bookmarks, assessment, resume strip).
// The runtime picks the language from <html lang> — the ES templates set it, the EN surface keeps
// its exact previous copy. Keep every EN value byte-identical to what shipped before the i18n pass.

import type { Locale } from './ui';

interface ClientStrings {
  // Choice / evaluate / shared verdicts
  chooseOneOption: string;
  correct: string;
  notQuite: string;
  tryAnotherOption: string;
  // XP + gamification feedback
  xpSaved: (n: number) => string;
  xpToastSaved: string;
  badgeUnlocked: string;
  levelLabel: (n: number) => string;
  levelChip: (n: number, name: string) => string;
  // Lesson chrome
  bookmarkSave: string;
  bookmarkSaved: string;
  resumeDefault: string;
  revealStep: (n: number) => string;
  revealFinal: string;
  // Find-the-problem
  selectSomething: string;
  findProblemCorrect: string;
  findProblemIncorrect: string;
  statusCaught: string;
  statusMissed: string;
  statusOverFlagged: string;
  statusCorrectlyLeft: string;
  // Fix prompt / build prompt / real challenge
  writeFirst: string;
  writeFirstPlan: string;
  fillRequired: string;
  fixGood: string;
  fixNote: string;
  buildGood: string;
  buildNote: string;
  realGood: string;
  realNote: string;
  // Order steps
  orderCorrect: string;
  orderWrong: (n: number) => string;
  // Evaluate output
  pickVerdict: string;
  workThroughRubric: string;
  // Assessment
  assessmentNoAnswer: string;
  assessmentTheAnswer: (text: string, feedback: string) => string;
  assessmentResult: string;
  assessmentScore: (correct: number, total: number) => string;
  assessmentRevisit: string;
  assessmentNote: string;
  assessmentPrevious: (correct: number, total: number) => string;
}

const en: ClientStrings = {
  chooseOneOption: 'Choose one option first.',
  correct: 'Correct.',
  notQuite: 'Not quite.',
  tryAnotherOption: 'Try another option — attempts are free.',
  xpSaved: (n) => `+${n} XP — saved on this device.`,
  xpToastSaved: ' — saved on this device',
  badgeUnlocked: 'Badge unlocked — ',
  levelLabel: (n) => `Level ${n}`,
  levelChip: (n, name) => `Lv ${n} · ${name}`,
  bookmarkSave: 'Save for later',
  bookmarkSaved: 'Saved ✓',
  resumeDefault: 'Pick up where you left off',
  revealStep: (n) => `Reveal step ${n}`,
  revealFinal: 'Reveal final step',
  selectSomething: 'Select at least one part of the answer first.',
  findProblemCorrect: 'Correct — you flagged exactly the parts that needed verification.',
  findProblemIncorrect: 'Not quite — compare your picks with the breakdown below.',
  statusCaught: 'Good catch',
  statusMissed: 'Missed one',
  statusOverFlagged: 'Not a problem',
  statusCorrectlyLeft: 'Fine as-is',
  writeFirst: 'Write your improved version first — even two lines is enough.',
  writeFirstPlan: 'Write your plan first — even bullet points are enough.',
  fillRequired: 'Fill every required field first — a rough line is enough.',
  fixGood: 'Good — now compare your version with the strong one below.',
  fixNote:
    'This is self-assessment: nothing was graded by a machine. Check your draft against each line of the strong version.',
  buildGood: 'Good — compare your assembled prompt with the strong example below.',
  buildNote:
    'This is self-assessment: nothing was graded by a machine. Check your version against each move in the example.',
  realGood: 'Good — now compare your plan with the model answer below.',
  realNote:
    'This is self-assessment: nothing was graded by a machine. Check your plan against each line of the model answer.',
  orderCorrect: 'Correct — the steps are in a workable order.',
  orderWrong: (n) => `Not quite — ${n} step${n === 1 ? '' : 's'} sit in the wrong position. Compare with the correct order below.`,
  pickVerdict: 'Pick a verdict first.',
  workThroughRubric: 'Work through every rubric question for both outputs, then decide.',
  assessmentNoAnswer: 'No answer selected — counted as incorrect.',
  assessmentTheAnswer: (text, feedback) => `The answer: “${text}” — ${feedback}`,
  assessmentResult: 'Your result',
  assessmentScore: (correct, total) => `${correct} of ${total} correct.`,
  assessmentRevisit: 'revisit this track',
  assessmentNote:
    'Scored in your browser and saved on this device only — nothing was sent anywhere. Retake any time; the assessment gates nothing.',
  assessmentPrevious: (correct, total) => `Previous result on this device: ${correct}/${total}.`,
};

const es: ClientStrings = {
  chooseOneOption: 'Elige una opción primero.',
  correct: 'Correcto.',
  notQuite: 'Casi — no exactamente.',
  tryAnotherOption: 'Prueba otra opción — los intentos son gratis.',
  xpSaved: (n) => `+${n} XP — guardado en este dispositivo.`,
  xpToastSaved: ' — guardado en este dispositivo',
  badgeUnlocked: 'Insignia desbloqueada — ',
  levelLabel: (n) => `Nivel ${n}`,
  levelChip: (n, name) => `Nv ${n} · ${name}`,
  bookmarkSave: 'Guardar para después',
  bookmarkSaved: 'Guardado ✓',
  resumeDefault: 'Continúa donde lo dejaste',
  revealStep: (n) => `Mostrar el paso ${n}`,
  revealFinal: 'Mostrar el paso final',
  selectSomething: 'Selecciona antes al menos una parte de la respuesta.',
  findProblemCorrect: 'Correcto — marcaste exactamente las partes que había que verificar.',
  findProblemIncorrect: 'Casi — compara tu selección con el desglose de abajo.',
  statusCaught: 'Buena observación',
  statusMissed: 'Se te escapó una',
  statusOverFlagged: 'No era un problema',
  statusCorrectlyLeft: 'Estaba bien así',
  writeFirst: 'Escribe primero tu versión mejorada — con dos líneas basta.',
  writeFirstPlan: 'Escribe primero tu plan — con viñetas basta.',
  fillRequired: 'Rellena primero todos los campos obligatorios — una línea aproximada basta.',
  fixGood: 'Bien — ahora compara tu versión con la sólida de abajo.',
  fixNote:
    'Esto es autoevaluación: nada lo corrigió una máquina. Repasa tu borrador contra cada línea de la versión sólida.',
  buildGood: 'Bien — compara tu prompt montado con el ejemplo sólido de abajo.',
  buildNote:
    'Esto es autoevaluación: nada lo corrigió una máquina. Repasa tu versión frente a cada movimiento del ejemplo.',
  realGood: 'Bien — ahora compara tu plan con la respuesta modelo de abajo.',
  realNote:
    'Esto es autoevaluación: nada lo corrigió una máquina. Repasa tu plan contra cada línea de la respuesta modelo.',
  orderCorrect: 'Correcto — los pasos están en un orden válido.',
  orderWrong: (n) => `Casi — ${n} paso${n === 1 ? ' está' : 's están'} en la posición incorrecta. Compáralo con el orden correcto de abajo.`,
  pickVerdict: 'Elige un veredicto primero.',
  workThroughRubric: 'Repasa cada pregunta de la rúbrica para las dos salidas y luego decide.',
  assessmentNoAnswer: 'Sin respuesta — cuenta como incorrecta.',
  assessmentTheAnswer: (text, feedback) => `La respuesta: “${text}” — ${feedback}`,
  assessmentResult: 'Tu resultado',
  assessmentScore: (correct, total) => `${correct} de ${total} correctas.`,
  assessmentRevisit: 'repasa esta sección',
  assessmentNote:
    'Corregido en tu navegador y guardado solo en este dispositivo — nada se ha enviado. Puedes repetirlo cuando quieras; la evaluación no bloquea nada.',
  assessmentPrevious: (correct, total) => `Resultado anterior en este dispositivo: ${correct}/${total}.`,
};

const STRINGS: Record<Locale, ClientStrings> = { en, es };

function detectLocale(): Locale {
  return typeof document !== 'undefined' && document.documentElement.lang.startsWith('es') ? 'es' : 'en';
}

/** The page's language — ES pages set <html lang="es">. */
export function currentLocale(): Locale {
  return detectLocale();
}

/** Client strings for the page's language. */
export function t(): ClientStrings {
  return STRINGS[detectLocale()];
}
