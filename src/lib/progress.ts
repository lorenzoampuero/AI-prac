// Device-local progress store — framework-free and storage-injected, so it is testable in Node and safe
// on the server (no window access at import time).
//
// Product rules (master brief §20/§22): learning works without an account; progress lives on this device
// only; XP and streaks are light encouragements — no freezes, no punishment, no fake scarcity.
//
// The key is versioned (`aip:progress:v1`). Unknown or corrupt payloads reset to a fresh state — stored
// progress must never crash the lesson UI.

export const STORAGE_KEY = 'aip:progress:v1';
export const LESSON_XP = 10;
export const EXERCISE_XP = 15;

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface ProgressState {
  version: 1;
  lessons: Record<string, { completedAt: string }>;
  exercises: Record<string, { completedAt: string; attempts: number }>;
  bookmarks: string[];
  xp: number;
  streak: { count: number; lastDay: string | null };
  lastUpdated: string;
}

export interface CompletionResult {
  state: ProgressState;
  gained: number;
  isNew: boolean;
}

export function emptyState(): ProgressState {
  return {
    version: 1,
    lessons: {},
    exercises: {},
    bookmarks: [],
    xp: 0,
    streak: { count: 0, lastDay: null },
    lastUpdated: '',
  };
}

/** Local-time day key (YYYY-MM-DD) — streaks are about the learner's days, not UTC boundaries. */
export function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const asRecord = (v: unknown): Record<string, unknown> | null =>
  typeof v === 'object' && v !== null && !Array.isArray(v) ? (v as Record<string, unknown>) : null;

/** Parse + sanitize stored JSON. Garbage in, fresh state out — never throws. */
export function parseState(raw: string | null): ProgressState {
  if (!raw) return emptyState();

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return emptyState();
  }

  const o = asRecord(parsed);
  if (!o || o.version !== 1) return emptyState();

  const state = emptyState();
  if (typeof o.xp === 'number' && Number.isFinite(o.xp) && o.xp > 0) state.xp = Math.floor(o.xp);
  if (typeof o.lastUpdated === 'string') state.lastUpdated = o.lastUpdated;
  if (Array.isArray(o.bookmarks)) {
    state.bookmarks = o.bookmarks.filter((b): b is string => typeof b === 'string');
  }

  const lessons = asRecord(o.lessons);
  if (lessons) {
    for (const [id, v] of Object.entries(lessons)) {
      const rec = asRecord(v);
      if (rec && typeof rec.completedAt === 'string') state.lessons[id] = { completedAt: rec.completedAt };
    }
  }

  const exercises = asRecord(o.exercises);
  if (exercises) {
    for (const [id, v] of Object.entries(exercises)) {
      const rec = asRecord(v);
      if (rec && typeof rec.completedAt === 'string') {
        const attempts = typeof rec.attempts === 'number' && rec.attempts > 0 ? Math.floor(rec.attempts) : 1;
        state.exercises[id] = { completedAt: rec.completedAt, attempts };
      }
    }
  }

  const streak = asRecord(o.streak);
  if (streak) {
    const count = typeof streak.count === 'number' && streak.count > 0 ? Math.floor(streak.count) : 0;
    const lastDay = typeof streak.lastDay === 'string' ? streak.lastDay : null;
    state.streak = { count, lastDay };
  }

  return state;
}

export function load(storage: StorageLike | null): ProgressState {
  if (!storage) return emptyState();
  try {
    return parseState(storage.getItem(STORAGE_KEY));
  } catch {
    return emptyState();
  }
}

export function save(storage: StorageLike | null, state: ProgressState): void {
  if (!storage) return;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Private mode or quota exceeded: the learner keeps learning; progress just is not persisted.
  }
}

function bumpStreak(streak: ProgressState['streak'], now: Date): ProgressState['streak'] {
  const today = dayKey(now);
  if (streak.lastDay === today) return streak;
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (streak.lastDay === dayKey(yesterday)) return { count: streak.count + 1, lastDay: today };
  return { count: 1, lastDay: today };
}

/** Completing the same lesson twice is a no-op for XP (revisiting is normal, farming is not). */
export function completeLesson(state: ProgressState, lessonId: string, now: Date = new Date()): CompletionResult {
  if (state.lessons[lessonId]) return { state, gained: 0, isNew: false };
  const stamp = now.toISOString();
  const next: ProgressState = {
    ...state,
    lessons: { ...state.lessons, [lessonId]: { completedAt: stamp } },
    xp: state.xp + LESSON_XP,
    streak: bumpStreak(state.streak, now),
    lastUpdated: stamp,
  };
  return { state: next, gained: LESSON_XP, isNew: true };
}

/** Records an attempt; XP is granted once, on the first solve. */
export function recordExerciseAttempt(
  state: ProgressState,
  exerciseId: string,
  solved: boolean,
  now: Date = new Date(),
): CompletionResult {
  const prev = state.exercises[exerciseId];
  const prevCompletedAt = prev?.completedAt ?? '';
  const wasSolved = prevCompletedAt !== '';
  const completedAt = wasSolved ? prevCompletedAt : solved ? now.toISOString() : '';
  const gained = solved && !wasSolved ? EXERCISE_XP : 0;

  const next: ProgressState = {
    ...state,
    exercises: {
      ...state.exercises,
      [exerciseId]: { completedAt, attempts: (prev?.attempts ?? 0) + 1 },
    },
    xp: state.xp + gained,
    streak: bumpStreak(state.streak, now),
    lastUpdated: now.toISOString(),
  };
  return { state: next, gained, isNew: solved && !wasSolved };
}

export function toggleBookmark(state: ProgressState, id: string, now: Date = new Date()): ProgressState {
  const has = state.bookmarks.includes(id);
  return {
    ...state,
    bookmarks: has ? state.bookmarks.filter((b) => b !== id) : [...state.bookmarks, id],
    lastUpdated: now.toISOString(),
  };
}

export function exportProgress(state: ProgressState): string {
  return JSON.stringify(state, null, 2);
}

/** Garbage or foreign payloads come back as a fresh state — callers can safely persist the result. */
export function importProgress(raw: string): ProgressState {
  return parseState(raw);
}
