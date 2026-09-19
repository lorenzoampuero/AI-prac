// Exercise grading — deterministic, framework-free, no API calls (master brief §18/§19).
//
// The first implemented family is "choose the better option" (engines `pick-better-prompt` and
// `model-choice`). More families (fix-prompt, find-the-problem, order-steps, …) land with their waves;
// published exercises are guaranteed to use an implemented engine by the content contract tests.

export interface ChoiceOption {
  id: string;
  label: string;
  text: string;
  correct: boolean;
  feedback: string;
}

export interface PickBetterPrompt {
  engine: 'pick-better-prompt';
  promptA: string;
  promptB: string;
  better: 'A' | 'B';
  feedback: { a: string; b: string };
}

export interface ModelChoice {
  engine: 'model-choice';
  options: { text: string; correct: boolean; feedback: string }[];
}

export type ChoiceFamily = PickBetterPrompt | ModelChoice;

export function isChoiceFamily(value: { engine: string }): value is ChoiceFamily {
  return value.engine === 'pick-better-prompt' || value.engine === 'model-choice';
}

/** A choice exercise is only gradable if exactly one option is correct. */
export function assertSingleCorrect(options: ChoiceOption[]): void {
  const correct = options.filter((o) => o.correct).length;
  if (correct !== 1) {
    throw new Error(`choice exercise must have exactly one correct option (found ${correct})`);
  }
}

const letter = (index: number): string => String.fromCharCode(65 + index); // A, B, C…

export function toOptions(exercise: ChoiceFamily): ChoiceOption[] {
  const options: ChoiceOption[] =
    exercise.engine === 'pick-better-prompt'
      ? [
          { id: 'A', label: 'Prompt A', text: exercise.promptA, correct: exercise.better === 'A', feedback: exercise.feedback.a },
          { id: 'B', label: 'Prompt B', text: exercise.promptB, correct: exercise.better === 'B', feedback: exercise.feedback.b },
        ]
      : exercise.options.map((o, i) => ({
          id: letter(i),
          label: `Option ${letter(i)}`,
          text: o.text,
          correct: o.correct,
          feedback: o.feedback,
        }));

  assertSingleCorrect(options);
  return options;
}

export interface ChoiceGrade {
  correct: boolean;
  feedback: string;
}

export function gradeChoice(options: ChoiceOption[], selectedId: string): ChoiceGrade {
  const selected = options.find((o) => o.id === selectedId);
  if (!selected) throw new Error(`unknown option: ${selectedId}`);
  return { correct: selected.correct, feedback: selected.feedback };
}
