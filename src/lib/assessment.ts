// Scoring for the AI Skills Assessment — deterministic, framework-free, browser-local (Gate 5).
// The client script renders from these results; tests cover perfect, partial and empty answer sets.

import { TRACKS, type TrackId } from '../data/tracks';
import type { AssessmentItem } from '../data/assessment';

export interface ItemResult {
  id: string;
  answered: boolean;
  correct: boolean;
}

export interface TrackResult {
  track: TrackId;
  name: string;
  correct: number;
  total: number;
}

export interface AssessmentResult {
  correctCount: number;
  total: number;
  items: ItemResult[];
  tracks: TrackResult[];
}

/** `answers` maps item id → chosen option index. Missing entries count as unanswered (incorrect). */
export function scoreAssessment(items: AssessmentItem[], answers: Record<string, number>): AssessmentResult {
  const itemResults: ItemResult[] = items.map((item) => {
    const chosen = answers[item.id];
    const answered = typeof chosen === 'number' && chosen >= 0 && chosen < item.options.length;
    const correct = answered && item.options[chosen]?.correct === true;
    return { id: item.id, answered, correct };
  });

  const tracks: TrackResult[] = TRACKS.filter((track) => items.some((item) => item.track === track.id)).map(
    (track) => {
      const trackItems = items.filter((item) => item.track === track.id);
      const correct = trackItems.filter(
        (item) => itemResults.find((result) => result.id === item.id)?.correct === true,
      ).length;
      return { track: track.id, name: track.name, correct, total: trackItems.length };
    },
  );

  return {
    correctCount: itemResults.filter((result) => result.correct).length,
    total: itemResults.length,
    items: itemResults,
    tracks,
  };
}

/** Honest, band-based summary copy — no certificate language, no flattery. */
export function resultBand(correctCount: number, total: number): string {
  const ratio = total === 0 ? 0 : correctCount / total;
  if (ratio >= 0.9) {
    return 'Strong across the board — keep it sharp on the practice floor.';
  }
  if (ratio >= 0.6) {
    return 'A solid base. The tracks below list what to revisit first.';
  }
  return 'A good starting map — work through the tracks below at your own pace.';
}
