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

// ---------------------------------------------------------------------------------------------------
// find-the-problem — multi-select: flag every claim that should not be trusted as-is.

export interface FindProblemClaim {
  id: string;
  text: string;
  problematic: boolean;
  feedback: string;
}

export interface FindProblem {
  engine: 'find-the-problem';
  response: string;
  claims: FindProblemClaim[];
}

export function isFindProblem(value: { engine: string }): value is FindProblem {
  return value.engine === 'find-the-problem';
}

export type ClaimStatus = 'caught' | 'missed' | 'over-flagged' | 'correctly-left';

export interface ClaimResult {
  id: string;
  text: string;
  status: ClaimStatus;
  feedback: string;
}

/** Correct = every problematic claim selected AND no non-problematic claim selected. */
export function gradeFindProblem(
  claims: FindProblemClaim[],
  selectedIds: string[],
): { correct: boolean; results: ClaimResult[] } {
  const selected = new Set(selectedIds);
  const results = claims.map((claim) => {
    const isSelected = selected.has(claim.id);
    const status: ClaimStatus = claim.problematic
      ? isSelected
        ? 'caught'
        : 'missed'
      : isSelected
        ? 'over-flagged'
        : 'correctly-left';
    return { id: claim.id, text: claim.text, status, feedback: claim.feedback };
  });
  const correct = results.every((result) => result.status === 'caught' || result.status === 'correctly-left');
  return { correct, results };
}

// ---------------------------------------------------------------------------------------------------
// fix-prompt — open-ended editing, self-assessed: the learner rewrites a weak prompt, checks their own
// draft against criteria, then compares with a strong version. Nothing here claims machine grading;
// the only deterministic rule is that a usable submission exists (brief §19).

export interface FixPromptCriterion {
  id: string;
  label: string;
  hint: string;
}

export interface FixPrompt {
  engine: 'fix-prompt';
  weakPrompt: string;
  criteria: FixPromptCriterion[];
  sampleSolution: string;
}

export function isFixPrompt(value: { engine: string }): value is FixPrompt {
  return value.engine === 'fix-prompt';
}

/** Minimal deterministic gate so “Compare” only fires when something was actually written. */
export function isUsableSubmission(text: string): boolean {
  return text.trim().length >= 15;
}

// ---------------------------------------------------------------------------------------------------
// order-steps — arrange workflow stages in a workable order. The canonical order is the content; the UI
// presents a fixed scrambled rotation so the answer is never visible before interaction.

export interface OrderSteps {
  engine: 'order-steps';
  steps: string[];
}

export function isOrderSteps(value: { engine: string }): value is OrderSteps {
  return value.engine === 'order-steps';
}

export interface OrderGrade {
  correct: boolean;
  misplaced: number[];
}

/** `submitted` holds original step indices in the learner's current order; canonical is [0, 1, 2, …]. */
export function gradeOrderSteps(submitted: number[]): OrderGrade {
  const misplaced = submitted
    .map((original, position) => (original === position ? -1 : position))
    .filter((position) => position >= 0);
  return { correct: misplaced.length === 0, misplaced };
}

// ---------------------------------------------------------------------------------------------------
// build-prompt — guided composition: the learner fills named fields and a live preview assembles the
// prompt they would actually send. Open-ended by design, so the only deterministic rule is that every
// required field holds a real attempt before the strong example is revealed (self-assessment, §19).

export interface BuildPromptField {
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
}

export interface BuildPrompt {
  engine: 'build-prompt';
  fields: BuildPromptField[];
  sampleSolution: string;
}

export function isBuildPrompt(value: { engine: string }): value is BuildPrompt {
  return value.engine === 'build-prompt';
}

export const MIN_FIELD_CHARS = 10;

/** Every required field must contain a real attempt before the example is revealed. */
export function isBuildPromptReady(values: Record<string, string>, fields: BuildPromptField[]): boolean {
  return fields.every((field) => !field.required || (values[field.id] ?? '').trim().length >= MIN_FIELD_CHARS);
}

/** Assembles the learner's fields into a prompt preview — plain text, in field order, no API (§19). */
export function assemblePrompt(values: Record<string, string>, fields: BuildPromptField[]): string {
  return fields
    .map((field) => (values[field.id] ?? '').trim())
    .filter((text) => text.length > 0)
    .join('\n\n');
}

// ---------------------------------------------------------------------------------------------------
// evaluate-output — judgement training: two outputs for the same ask, a rubric to compare them, and a
// verdict. The rubric is the process (not graded); only the verdict is deterministic.

export interface EvaluateOutput {
  engine: 'evaluate-output';
  outputA: string;
  outputB: string;
  rubric: { id: string; label: string }[];
  verdict: { better: 'A' | 'B'; reasoning: string };
}

export function isEvaluateOutput(value: { engine: string }): value is EvaluateOutput {
  return value.engine === 'evaluate-output';
}

export interface EvaluateGrade {
  correct: boolean;
  feedback: string;
}

export function gradeEvaluateOutput(
  verdict: { better: 'A' | 'B'; reasoning: string },
  selected: 'A' | 'B',
): EvaluateGrade {
  const correct = selected === verdict.better;
  return {
    correct,
    feedback: correct ? verdict.reasoning : 'Re-read both outputs against the rubric, then try again — attempts are free.',
  };
}

// ---------------------------------------------------------------------------------------------------
// Engine registry — every engine with a working UI must be listed here; the content contract tests
// refuse to publish exercises whose engine is missing (no phantom UI ships).

export function isImplementedEngine(value: { engine: string }): boolean {
  return (
    isChoiceFamily(value) ||
    isFindProblem(value) ||
    isFixPrompt(value) ||
    isOrderSteps(value) ||
    isBuildPrompt(value) ||
    isEvaluateOutput(value)
  );
}
