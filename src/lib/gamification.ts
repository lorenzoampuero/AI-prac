// Gamification — pure functions over the progress store. No DOM, no storage: everything here is
// deterministic and unit-tested, so the UI layers (header widget, /progress page, toasts) stay thin.
//
// Honest by design: badges mark real milestones, never fake scarcity; a lapsed streak never removes a
// badge that was already earned; accuracy is “solved on the first try”, plainly labelled.

import { TRACKS } from '../data/tracks';
import { LEVELS, type LevelDef } from '../data/levels';
import type { ProgressState } from './progress';

export interface LevelStatus {
  current: LevelDef;
  next: LevelDef | null;
  /** 0–1 progress from the current level’s threshold to the next one. */
  progress: number;
}

export function levelStatus(xp: number): LevelStatus {
  let current = LEVELS[0] as LevelDef;
  for (const level of LEVELS) {
    if (xp >= level.minXp) current = level;
  }
  const index = LEVELS.indexOf(current);
  const next = LEVELS[index + 1] ?? null;
  const progress = next
    ? Math.min(1, Math.max(0, (xp - current.minXp) / (next.minXp - current.minXp)))
    : 1;
  return { current, next, progress };
}

/** Build-time facts the client scripts need (rendered into the layout as JSON). */
export interface SiteMeta {
  totalLessons: number;
  totalExercises: number;
  lessonsTotalPerTrack: Record<string, number>;
  exerciseTrack: Record<string, string>;
  lessonTitles: Record<string, string>;
}

export interface AssessmentSummary {
  taken: boolean;
  correct: number;
  total: number;
}

export interface BadgeDef {
  id: string;
  name: string;
  description: string;
}

/** Milestone badges — every condition is a real achievement from the progress store. */
export const BADGES: BadgeDef[] = [
  { id: 'first-steps', name: 'First Steps', description: 'Complete your first lesson.' },
  { id: 'hands-on', name: 'Hands On', description: 'Solve your first exercise.' },
  { id: 'getting-serious', name: 'Getting Serious', description: 'Solve 10 exercises.' },
  { id: 'deep-practice', name: 'Deep Practice', description: 'Solve 30 exercises.' },
  { id: 'sharp-eye', name: 'Sharp Eye', description: 'Solve 10 exercises on the first try.' },
  { id: 'halfway', name: 'Halfway There', description: 'Complete half of all lessons.' },
  { id: 'completionist', name: 'Completionist', description: 'Complete every lesson.' },
  { id: 'map-yourself', name: 'Map Yourself', description: 'Take the AI skills assessment.' },
  { id: 'perfect-run', name: 'Perfect Run', description: 'Score every point on the assessment.' },
  { id: 'one-week-in', name: 'One Week In', description: 'Practice 7 days in a row.' },
  { id: 'habit-formed', name: 'Habit Formed', description: 'Practice 30 days in a row.' },
  { id: 'curator', name: 'Curator', description: 'Bookmark 5 lessons.' },
];

export const TRACK_BADGE_PREFIX = 'track-';

export function trackBadge(trackId: string): BadgeDef | null {
  const track = TRACKS.find((t) => t.id === trackId);
  if (!track) return null;
  return {
    id: `${TRACK_BADGE_PREFIX}${trackId}`,
    name: `${track.name} — Complete`,
    description: `Finish every lesson in ${track.name}.`,
  };
}

export function badgeCatalog(meta: SiteMeta): BadgeDef[] {
  const trackBadges = TRACKS.filter((track) => (meta.lessonsTotalPerTrack[track.id] ?? 0) > 0)
    .map((track) => trackBadge(track.id))
    .filter((badge): badge is BadgeDef => badge !== null);
  return [...BADGES, ...trackBadges];
}

const solvedEntries = (state: ProgressState): [string, { completedAt: string; attempts: number; firstTry: boolean }][] =>
  Object.entries(state.exercises).filter(([, entry]) => entry.completedAt !== '');

export interface OverallStats {
  lessonsDone: number;
  lessonsTotal: number;
  exercisesDone: number;
  exercisesTotal: number;
  firstTryCount: number;
  /** Solved-on-first-try ratio among solved exercises; null until something is solved. */
  accuracy: number | null;
}

export function overallStats(state: ProgressState, meta: SiteMeta): OverallStats {
  const solved = solvedEntries(state);
  const firstTryCount = solved.filter(([, entry]) => entry.firstTry).length;
  return {
    lessonsDone: Object.keys(state.lessons).length,
    lessonsTotal: meta.totalLessons,
    exercisesDone: solved.length,
    exercisesTotal: meta.totalExercises,
    firstTryCount,
    accuracy: solved.length > 0 ? firstTryCount / solved.length : null,
  };
}

export interface TrackStats {
  lessonsDone: number;
  lessonsTotal: number;
  exercisesDone: number;
  exercisesTotal: number;
  accuracy: number | null;
}

export function trackStats(state: ProgressState, trackId: string, meta: SiteMeta): TrackStats {
  const lessonsTotal = meta.lessonsTotalPerTrack[trackId] ?? 0;
  const lessonsDone = Object.keys(state.lessons).filter((id) => id.startsWith(`${trackId}/`)).length;
  const exercisesTotal = Object.values(meta.exerciseTrack).filter((track) => track === trackId).length;
  const done = solvedEntries(state).filter(([id]) => meta.exerciseTrack[id] === trackId);
  const firstTry = done.filter(([, entry]) => entry.firstTry).length;
  return {
    lessonsDone,
    lessonsTotal,
    exercisesDone: done.length,
    exercisesTotal,
    accuracy: done.length > 0 ? firstTry / done.length : null,
  };
}

export interface BadgeContext {
  state: ProgressState;
  meta: SiteMeta;
  assessment: AssessmentSummary | null;
}

/** All badge ids currently earned. Idempotent; ordering is irrelevant to callers. */
export function earnedBadges(ctx: BadgeContext): string[] {
  const { state, meta, assessment } = ctx;
  const stats = overallStats(state, meta);
  const earned = new Set<string>();

  if (stats.lessonsDone >= 1) earned.add('first-steps');
  if (stats.exercisesDone >= 1) earned.add('hands-on');
  if (stats.exercisesDone >= 10) earned.add('getting-serious');
  if (stats.exercisesDone >= 30) earned.add('deep-practice');
  if (stats.firstTryCount >= 10) earned.add('sharp-eye');
  if (stats.lessonsTotal > 0 && stats.lessonsDone >= Math.ceil(stats.lessonsTotal / 2)) {
    earned.add('halfway');
  }
  if (stats.lessonsTotal > 0 && stats.lessonsDone >= stats.lessonsTotal) earned.add('completionist');
  if (assessment?.taken) earned.add('map-yourself');
  if (assessment?.taken && assessment.total > 0 && assessment.correct >= assessment.total) {
    earned.add('perfect-run');
  }
  if (state.streak.count >= 7) earned.add('one-week-in');
  if (state.streak.count >= 30) earned.add('habit-formed');
  if (state.bookmarks.length >= 5) earned.add('curator');

  for (const track of TRACKS) {
    const total = meta.lessonsTotalPerTrack[track.id] ?? 0;
    if (total === 0) continue;
    const done = Object.keys(state.lessons).filter((id) => id.startsWith(`${track.id}/`)).length;
    if (done >= total) earned.add(`${TRACK_BADGE_PREFIX}${track.id}`);
  }

  return [...earned];
}
