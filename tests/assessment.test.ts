import { describe, expect, it } from 'vitest';
import { ASSESSMENT_ITEMS } from '../src/data/assessment';
import { resultBand, scoreAssessment } from '../src/lib/assessment';
import type { TrackId } from '../src/data/tracks';

const MVP_TRACKS: TrackId[] = ['ai-foundations', 'prompting', 'ai-research', 'ai-for-work', 'ai-coding', 'ai-safety'];

describe('assessment content', () => {
  it('has 15–20 items with unique ids', () => {
    expect(ASSESSMENT_ITEMS.length).toBeGreaterThanOrEqual(15);
    expect(ASSESSMENT_ITEMS.length).toBeLessThanOrEqual(20);
    const ids = ASSESSMENT_ITEMS.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('covers all six MVP tracks', () => {
    const tracks = new Set(ASSESSMENT_ITEMS.map((item) => item.track));
    for (const track of MVP_TRACKS) {
      expect(tracks.has(track)).toBe(true);
    }
  });

  it('gives every item exactly one correct option and real feedback throughout', () => {
    for (const item of ASSESSMENT_ITEMS) {
      expect(item.options.filter((option) => option.correct)).toHaveLength(1);
      expect(item.options.length).toBeGreaterThanOrEqual(3);
      expect(item.explanation.length).toBeGreaterThanOrEqual(40);
      for (const option of item.options) {
        expect(option.feedback.length).toBeGreaterThanOrEqual(20);
      }
    }
  });
});

describe('assessment scoring', () => {
  const allCorrect = (): Record<string, number> => {
    const answers: Record<string, number> = {};
    for (const item of ASSESSMENT_ITEMS) {
      answers[item.id] = item.options.findIndex((option) => option.correct);
    }
    return answers;
  };

  it('scores a perfect run with full per-track marks', () => {
    const result = scoreAssessment(ASSESSMENT_ITEMS, allCorrect());
    expect(result.correctCount).toBe(ASSESSMENT_ITEMS.length);
    expect(result.tracks.every((track) => track.correct === track.total)).toBe(true);
    expect(result.tracks.every((track) => track.total === 3)).toBe(true);
  });

  it('counts wrong and unanswered items as incorrect, with a per-track breakdown', () => {
    const answers = allCorrect();
    const first = ASSESSMENT_ITEMS[0]!;
    const second = ASSESSMENT_ITEMS[1]!;
    answers[first.id] = first.options.findIndex((option) => !option.correct);
    delete answers[second.id];

    const result = scoreAssessment(ASSESSMENT_ITEMS, answers);
    expect(result.correctCount).toBe(ASSESSMENT_ITEMS.length - 2);
    expect(result.items.find((item) => item.id === first.id)?.correct).toBe(false);
    expect(result.items.find((item) => item.id === second.id)?.answered).toBe(false);

    const foundation = result.tracks.find((track) => track.track === 'ai-foundations');
    expect(foundation?.correct).toBe(1);
    expect(foundation?.total).toBe(3);
  });

  it('returns honest band copy for each range', () => {
    expect(resultBand(18, 18)).toMatch(/Strong/);
    expect(resultBand(12, 18)).toMatch(/solid base/i);
    expect(resultBand(5, 18)).toMatch(/starting map/i);
  });
});
