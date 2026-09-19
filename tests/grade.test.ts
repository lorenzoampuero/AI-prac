import { describe, expect, it } from 'vitest';
import {
  assertSingleCorrect,
  gradeChoice,
  gradeFindProblem,
  isChoiceFamily,
  isFixPrompt,
  isImplementedEngine,
  isUsableSubmission,
  toOptions,
  type FindProblem,
  type ModelChoice,
  type PickBetterPrompt,
} from '../src/lib/exercise/grade';

const pickBetter: PickBetterPrompt = {
  engine: 'pick-better-prompt',
  promptA: 'Summarize this report.',
  promptB: 'Summarize the attached report in exactly three bullets for a manager.',
  better: 'B',
  feedback: { a: 'Too vague to evaluate.', b: 'Specific and checkable.' },
};

const modelChoice: ModelChoice = {
  engine: 'model-choice',
  options: [
    { text: 'Turn these notes into three paragraphs.', correct: true, feedback: 'Transformations fit.' },
    { text: 'What is the exchange rate right now?', correct: false, feedback: 'Needs live data.' },
    { text: 'What is the exact VAT on 8,432.19 at 21%?', correct: false, feedback: 'Needs exact computation.' },
  ],
};

describe('choice engines — option mapping', () => {
  it('maps pick-better-prompt to two options with the correct flag on the better one', () => {
    const options = toOptions(pickBetter);
    expect(options.map((o) => o.id)).toEqual(['A', 'B']);
    expect(options[0]?.correct).toBe(false);
    expect(options[1]?.correct).toBe(true);
    expect(options[1]?.feedback).toBe('Specific and checkable.');
  });

  it('maps model-choice items to lettered options', () => {
    const options = toOptions(modelChoice);
    expect(options.map((o) => o.id)).toEqual(['A', 'B', 'C']);
    expect(options.filter((o) => o.correct)).toHaveLength(1);
    expect(options[2]?.label).toBe('Option C');
  });

  it('rejects malformed choice data — zero or two correct options', () => {
    expect(() =>
      assertSingleCorrect([
        { id: 'A', label: 'A', text: 'x', correct: false, feedback: 'a' },
        { id: 'B', label: 'B', text: 'y', correct: false, feedback: 'b' },
      ]),
    ).toThrow(/exactly one correct/);

    expect(() =>
      assertSingleCorrect([
        { id: 'A', label: 'A', text: 'x', correct: true, feedback: 'a' },
        { id: 'B', label: 'B', text: 'y', correct: true, feedback: 'b' },
      ]),
    ).toThrow(/exactly one correct/);
  });
});

describe('choice engines — grading', () => {
  it('grades a correct pick and returns its feedback', () => {
    const options = toOptions(pickBetter);
    const grade = gradeChoice(options, 'B');
    expect(grade.correct).toBe(true);
    expect(grade.feedback).toBe('Specific and checkable.');
  });

  it('grades an incorrect pick and returns the chosen option feedback', () => {
    const options = toOptions(modelChoice);
    const grade = gradeChoice(options, 'C');
    expect(grade.correct).toBe(false);
    expect(grade.feedback).toBe('Needs exact computation.');
  });

  it('throws on an unknown option id', () => {
    const options = toOptions(pickBetter);
    expect(() => gradeChoice(options, 'Z')).toThrow(/unknown option/);
  });

  it('classifies engines correctly', () => {
    expect(isChoiceFamily({ engine: 'pick-better-prompt' })).toBe(true);
    expect(isChoiceFamily({ engine: 'model-choice' })).toBe(true);
    expect(isChoiceFamily({ engine: 'find-the-problem' })).toBe(false);
    expect(isImplementedEngine({ engine: 'find-the-problem' })).toBe(true);
    expect(isImplementedEngine({ engine: 'order-steps' })).toBe(false);
  });
});

describe('find-the-problem engine — grading', () => {
  const exercise: FindProblem = {
    engine: 'find-the-problem',
    response: 'A response with claims of mixed verifiability.',
    claims: [
      { id: 'c1', text: 'Generic, uncontroversial statement.', problematic: false, feedback: 'Broad and safe.' },
      { id: 'c2', text: 'Precise statistic with no source.', problematic: true, feedback: 'Verify or discard.' },
      { id: 'c3', text: 'Colourful quote from an unverifiable person.', problematic: true, feedback: 'Quotes are a classic fabrication.' },
    ],
  };

  it('marks a complete, precise selection as correct', () => {
    const grade = gradeFindProblem(exercise.claims, ['c2', 'c3']);
    expect(grade.correct).toBe(true);
    expect(grade.results.map((r) => r.status)).toEqual(['correctly-left', 'caught', 'caught']);
  });

  it('flags missed claims and over-flagging as incorrect', () => {
    const missed = gradeFindProblem(exercise.claims, ['c2']);
    expect(missed.correct).toBe(false);
    expect(missed.results[2]?.status).toBe('missed');

    const over = gradeFindProblem(exercise.claims, ['c1', 'c2', 'c3']);
    expect(over.correct).toBe(false);
    expect(over.results[0]?.status).toBe('over-flagged');
  });

  it('is recognized as an implemented engine', () => {
    expect(isImplementedEngine({ engine: 'find-the-problem' })).toBe(true);
    expect(isImplementedEngine({ engine: 'real-challenge' })).toBe(false);
  });
});

describe('fix-prompt engine', () => {
  it('is classified and registered as implemented', () => {
    expect(isFixPrompt({ engine: 'fix-prompt' })).toBe(true);
    expect(isFixPrompt({ engine: 'build-prompt' })).toBe(false);
    expect(isImplementedEngine({ engine: 'fix-prompt' })).toBe(true);
  });

  it('only accepts submissions with real content', () => {
    expect(isUsableSubmission('')).toBe(false);
    expect(isUsableSubmission('   \n  ')).toBe(false);
    expect(isUsableSubmission('make it better')).toBe(false);
    expect(isUsableSubmission('Write a five-sentence update email to my manager about Project Atlas.')).toBe(true);
  });
});
