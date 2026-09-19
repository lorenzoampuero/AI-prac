import { describe, expect, it } from 'vitest';
import {
  assertSingleCorrect,
  gradeChoice,
  isChoiceFamily,
  toOptions,
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
    expect(isChoiceFamily({ engine: 'real-challenge' })).toBe(false);
  });
});
