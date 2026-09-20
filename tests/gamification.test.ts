import { describe, expect, it } from 'vitest';
import { completeLesson, emptyState, recordExerciseAttempt, type ProgressState } from '../src/lib/progress';
import {
  badgeCatalog,
  earnedBadges,
  levelStatus,
  overallStats,
  trackStats,
  type SiteMeta,
} from '../src/lib/gamification';
import { LEVELS } from '../src/data/levels';

const meta: SiteMeta = {
  totalLessons: 4,
  totalExercises: 4,
  lessonsTotalPerTrack: { 'ai-foundations': 2, prompting: 2 },
  exerciseTrack: { e1: 'ai-foundations', e2: 'prompting', e3: 'prompting', e4: 'ai-foundations' },
  lessonTitles: {
    'ai-foundations/a': 'A',
    'ai-foundations/b': 'B',
    'prompting/c': 'C',
    'prompting/d': 'D',
  },
};

function withSolvedFirstTry(count: number): ProgressState {
  const exercises: ProgressState['exercises'] = {};
  for (let i = 0; i < count; i += 1) {
    exercises[`x${i}`] = { completedAt: '2026-09-20T00:00:00.000Z', attempts: 1, firstTry: true };
  }
  return { ...emptyState(), exercises };
}

describe('levels', () => {
  it('thresholds are strictly increasing and start at zero', () => {
    expect(LEVELS[0]?.minXp).toBe(0);
    for (let i = 1; i < LEVELS.length; i += 1) {
      expect((LEVELS[i]?.minXp ?? 0) > (LEVELS[i - 1]?.minXp ?? 0), `level ${i + 1}`).toBe(true);
    }
  });

  it('maps XP to levels with progress toward the next', () => {
    expect(levelStatus(0).current.level).toBe(1);
    expect(levelStatus(59).current.level).toBe(1);
    expect(levelStatus(60).current.level).toBe(2);

    const mid = levelStatus(30);
    expect(mid.current.level).toBe(1);
    expect(mid.progress).toBeCloseTo(0.5, 5);

    const top = levelStatus(1200);
    expect(top.current.level).toBe(10);
    expect(top.next).toBeNull();
    expect(top.progress).toBe(1);
  });
});

describe('badges', () => {
  it('earns nothing from an empty state', () => {
    expect(earnedBadges({ state: emptyState(), meta, assessment: null })).toEqual([]);
  });

  it('earns lesson and exercise milestones from real activity', () => {
    let state = completeLesson(emptyState(), 'ai-foundations/a').state;
    let earned = earnedBadges({ state, meta, assessment: null });
    expect(earned).toContain('first-steps');
    expect(earned).not.toContain('hands-on');

    state = recordExerciseAttempt(state, 'e1', true).state;
    earned = earnedBadges({ state, meta, assessment: null });
    expect(earned).toContain('hands-on');
  });

  it('earns volume and first-try badges at their thresholds', () => {
    const ten = withSolvedFirstTry(10);
    const earnedTen = earnedBadges({ state: ten, meta, assessment: null });
    expect(earnedTen).toContain('getting-serious');
    expect(earnedTen).toContain('sharp-eye');
    expect(earnedTen).not.toContain('deep-practice');

    const thirty = withSolvedFirstTry(30);
    expect(earnedBadges({ state: thirty, meta, assessment: null })).toContain('deep-practice');
  });

  it('earns assessment badges only when taken (and perfect when perfect)', () => {
    const state = emptyState();
    expect(earnedBadges({ state, meta, assessment: { taken: true, correct: 10, total: 18 } })).toContain(
      'map-yourself',
    );
    expect(earnedBadges({ state, meta, assessment: { taken: true, correct: 10, total: 18 } })).not.toContain(
      'perfect-run',
    );
    expect(earnedBadges({ state, meta, assessment: { taken: true, correct: 18, total: 18 } })).toContain(
      'perfect-run',
    );
  });

  it('earns streak, bookmark, halfway and track badges', () => {
    const streaked = { ...emptyState(), streak: { count: 7, lastDay: '2026-09-20' } };
    expect(earnedBadges({ state: streaked, meta, assessment: null })).toContain('one-week-in');

    const bookmarked = { ...emptyState(), bookmarks: ['a', 'b', 'c', 'd', 'e'] };
    expect(earnedBadges({ state: bookmarked, meta, assessment: null })).toContain('curator');

    let halfway = completeLesson(emptyState(), 'ai-foundations/a').state;
    halfway = completeLesson(halfway, 'prompting/c').state;
    expect(earnedBadges({ state: halfway, meta, assessment: null })).toContain('halfway');

    const trackDone = completeLesson(
      completeLesson(emptyState(), 'ai-foundations/a').state,
      'ai-foundations/b',
    ).state;
    expect(earnedBadges({ state: trackDone, meta, assessment: null })).toContain('track-ai-foundations');
    expect(earnedBadges({ state: trackDone, meta, assessment: null })).not.toContain('track-prompting');
  });

  it('lists milestone + per-track badges in the catalog', () => {
    const ids = badgeCatalog(meta).map((badge) => badge.id);
    expect(ids).toContain('first-steps');
    expect(ids).toContain('track-ai-foundations');
    expect(ids).toContain('track-prompting');
    expect(ids).not.toContain('track-ai-images');
  });
});

describe('stats', () => {
  it('computes overall accuracy from first-try solves', () => {
    let state = recordExerciseAttempt(emptyState(), 'e1', true).state;
    state = recordExerciseAttempt(state, 'e2', false).state;
    state = recordExerciseAttempt(state, 'e2', true).state;
    const stats = overallStats(state, meta);
    expect(stats.exercisesDone).toBe(2);
    expect(stats.firstTryCount).toBe(1);
    expect(stats.accuracy).toBeCloseTo(0.5, 5);
  });

  it('computes per-track progress', () => {
    let state = completeLesson(emptyState(), 'ai-foundations/a').state;
    state = recordExerciseAttempt(state, 'e1', true).state;
    const stats = trackStats(state, 'ai-foundations', meta);
    expect(stats.lessonsDone).toBe(1);
    expect(stats.lessonsTotal).toBe(2);
    expect(stats.exercisesDone).toBe(1);
    expect(stats.exercisesTotal).toBe(2);
  });

  it('reports null accuracy before anything is solved', () => {
    expect(overallStats(emptyState(), meta).accuracy).toBeNull();
  });
});
