import { describe, expect, it } from 'vitest';
import {
  completeLesson,
  emptyState,
  EXERCISE_XP,
  LEGACY_STORAGE_KEY,
  LESSON_XP,
  load,
  parseState,
  recordExerciseAttempt,
  save,
  STORAGE_KEY,
  toggleBookmark,
  touchVisit,
  type StorageLike,
} from '../src/lib/progress';

function memoryStorage(): StorageLike & { dump(): Record<string, string> } {
  const data: Record<string, string> = {};
  return {
    getItem: (k) => (k in data ? (data[k] ?? null) : null),
    setItem: (k, v) => {
      data[k] = v;
    },
    removeItem: (k) => {
      delete data[k];
    },
    dump: () => data,
  };
}

const day = (y: number, m: number, d: number) => new Date(y, m - 1, d, 10, 0, 0);

describe('progress store — completion and XP', () => {
  it('starts empty and survives a save/load round trip', () => {
    const storage = memoryStorage();
    const empty = load(storage);
    expect(empty.xp).toBe(0);
    expect(empty.lessons).toEqual({});

    const done = completeLesson(empty, 'ai-foundations/what-generative-ai-is', day(2026, 9, 19));
    save(storage, done.state);

    const reloaded = load(storage);
    expect(reloaded.xp).toBe(LESSON_XP);
    expect(Object.keys(reloaded.lessons)).toHaveLength(1);
  });

  it('grants lesson XP once — revisiting is not farmable', () => {
    const first = completeLesson(emptyState(), 'lesson-a', day(2026, 9, 19));
    expect(first.isNew).toBe(true);
    expect(first.gained).toBe(LESSON_XP);

    const second = completeLesson(first.state, 'lesson-a', day(2026, 9, 19));
    expect(second.isNew).toBe(false);
    expect(second.gained).toBe(0);
    expect(second.state.xp).toBe(LESSON_XP);
  });

  it('grants exercise XP once, on the first solve, and counts every attempt', () => {
    let state = emptyState();
    const attempt1 = recordExerciseAttempt(state, 'ex-1', false, day(2026, 9, 19));
    expect(attempt1.gained).toBe(0);
    expect(attempt1.state.exercises['ex-1']?.attempts).toBe(1);

    const attempt2 = recordExerciseAttempt(attempt1.state, 'ex-1', true, day(2026, 9, 19));
    expect(attempt2.gained).toBe(EXERCISE_XP);
    expect(attempt2.state.exercises['ex-1']?.attempts).toBe(2);

    const attempt3 = recordExerciseAttempt(attempt2.state, 'ex-1', true, day(2026, 9, 19));
    expect(attempt3.gained).toBe(0);
    expect(attempt3.state.exercises['ex-1']?.attempts).toBe(3);
    expect(attempt3.state.xp).toBe(EXERCISE_XP);
  });
});

describe('progress store — streak', () => {
  it('counts consecutive days, tolerates same-day activity, resets after a gap', () => {
    const d1 = completeLesson(emptyState(), 'l1', day(2026, 9, 19));
    expect(d1.state.streak).toEqual({ count: 1, lastDay: '2026-09-19' });

    const sameDay = completeLesson(d1.state, 'l2', day(2026, 9, 19));
    expect(sameDay.state.streak.count).toBe(1);

    const nextDay = completeLesson(sameDay.state, 'l3', day(2026, 9, 20));
    expect(nextDay.state.streak).toEqual({ count: 2, lastDay: '2026-09-20' });

    const afterGap = completeLesson(nextDay.state, 'l4', day(2026, 9, 23));
    expect(afterGap.state.streak).toEqual({ count: 1, lastDay: '2026-09-23' });
  });
});

describe('progress store — bookmarks', () => {
  it('toggles on and off', () => {
    const on = toggleBookmark(emptyState(), 'lesson-a');
    expect(on.bookmarks).toEqual(['lesson-a']);
    const off = toggleBookmark(on, 'lesson-a');
    expect(off.bookmarks).toEqual([]);
  });
});

describe('progress store — robustness', () => {
  it('returns a fresh state for garbage, wrong versions or negative values', () => {
    expect(parseState(null).xp).toBe(0);
    expect(parseState('not json').xp).toBe(0);
    expect(parseState('{"version":99,"xp":50}').xp).toBe(0);

    const sanitized = parseState(
      JSON.stringify({
        version: 1,
        xp: -20,
        lessons: { ok: { completedAt: '2026-09-19T00:00:00.000Z' }, bad: { completedAt: 42 } },
        exercises: 'nope',
        bookmarks: ['a', 7, 'b'],
        streak: { count: -3, lastDay: 5 },
        lastUpdated: '2026-09-19T00:00:00.000Z',
      }),
    );
    expect(sanitized.xp).toBe(0);
    expect(Object.keys(sanitized.lessons)).toEqual(['ok']);
    expect(sanitized.exercises).toEqual({});
    expect(sanitized.bookmarks).toEqual(['a', 'b']);
    expect(sanitized.streak).toEqual({ count: 0, lastDay: null });
  });

  it('never throws when storage itself is broken', () => {
    const hostile: StorageLike = {
      getItem: () => {
        throw new Error('blocked by browser privacy settings');
      },
      setItem: () => {
        throw new Error('quota exceeded');
      },
      removeItem: () => undefined,
    };
    expect(load(hostile).xp).toBe(0);
    expect(() => save(hostile, emptyState())).not.toThrow();
  });

  it('writes to the versioned key only', () => {
    const storage = memoryStorage();
    save(storage, emptyState());
    expect(Object.keys(storage.dump())).toEqual([STORAGE_KEY]);
  });

  it('migrates v1 payloads without losing progress', () => {
    const storage = memoryStorage();
    const v1 = {
      version: 1,
      lessons: { 'ai-foundations/x': { completedAt: '2026-09-19T00:00:00.000Z' } },
      exercises: { ex1: { completedAt: '2026-09-19T00:00:00.000Z', attempts: 2 } },
      bookmarks: ['ai-foundations/x'],
      xp: 25,
      streak: { count: 3, lastDay: '2026-09-19' },
      lastUpdated: '2026-09-19T00:00:00.000Z',
    };
    storage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(v1));

    const migrated = load(storage);
    expect(migrated.version).toBe(2);
    expect(migrated.xp).toBe(25);
    expect(Object.keys(migrated.lessons)).toEqual(['ai-foundations/x']);
    expect(migrated.exercises['ex1']).toEqual({
      completedAt: '2026-09-19T00:00:00.000Z',
      attempts: 2,
      firstTry: false,
    });
    expect(migrated.badges).toEqual({});
    expect(migrated.lastVisited).toBeNull();
  });

  it('tracks first-try solves and never flips them later', () => {
    const firstTry = recordExerciseAttempt(emptyState(), 'ex', true, day(2026, 9, 19));
    expect(firstTry.state.exercises['ex']?.firstTry).toBe(true);
    const again = recordExerciseAttempt(firstTry.state, 'ex', true, day(2026, 9, 20));
    expect(again.state.exercises['ex']?.firstTry).toBe(true);

    const wrongFirst = recordExerciseAttempt(emptyState(), 'ex2', false, day(2026, 9, 19));
    const later = recordExerciseAttempt(wrongFirst.state, 'ex2', true, day(2026, 9, 19));
    expect(later.state.exercises['ex2']?.firstTry).toBe(false);
  });

  it('records the last visited lesson without granting XP', () => {
    const state = touchVisit(emptyState(), 'prompting/clear-instructions', day(2026, 9, 20));
    expect(state.lastVisited?.lessonId).toBe('prompting/clear-instructions');
    expect(state.xp).toBe(0);
  });

  it('sanitizes badge maps and lastVisited from v2 payloads', () => {
    const parsed = parseState(
      JSON.stringify({
        version: 2,
        badges: { ok: '2026-09-20T00:00:00.000Z', bad: 7 },
        lastVisited: { lessonId: 'a/b', at: '2026-09-20T00:00:00.000Z' },
      }),
    );
    expect(parsed.badges).toEqual({ ok: '2026-09-20T00:00:00.000Z' });
    expect(parsed.lastVisited).toEqual({ lessonId: 'a/b', at: '2026-09-20T00:00:00.000Z' });
  });
});
