// Hydrates /progress from the device-local store. Everything is client-side and deterministic; the
// page ships as an empty shell (noindex) and fills itself on load and after every client-side visit.

import { TRACKS } from '../data/tracks';
import { exportProgress, importProgress, load, save, STORAGE_KEY, LEGACY_STORAGE_KEY } from '../lib/progress';
import { badgeCatalog, earnedBadges, levelStatus, overallStats, trackStats } from '../lib/gamification';
import { getStorage, readAssessment, readSiteMeta } from './feedback';

function pick<T extends HTMLElement>(selector: string): T | null {
  return document.querySelector<T>(selector);
}

function setText(selector: string, text: string): void {
  const node = document.querySelector<HTMLElement>(selector);
  if (node) node.textContent = text;
}

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

function render(): void {
  const root = pick<HTMLElement>('[data-progress-root]');
  const meta = readSiteMeta();
  const storage = getStorage();
  if (!root || !meta || !storage) return;

  const state = load(storage);
  const stats = overallStats(state, meta);
  const level = levelStatus(state.xp);

  setText('[data-lc-level]', `Level ${level.current.level}`);
  setText('[data-lc-name]', level.current.name);
  setText('[data-lc-xp]', String(state.xp));
  setText(
    '[data-lc-next]',
    level.next ? `${level.next.minXp - state.xp} XP to ${level.next.name}` : 'Top level reached — nice.',
  );
  setText('[data-lc-streak]', String(state.streak.count));
  const bar = pick<HTMLElement>('[data-lc-bar]');
  if (bar) {
    requestAnimationFrame(() => {
      bar.style.transform = `scaleX(${level.progress.toFixed(4)})`;
    });
  }

  const statsEl = pick<HTMLElement>('[data-progress-stats]');
  if (statsEl) {
    statsEl.replaceChildren();
    const items: [string, string][] = [
      [`${stats.lessonsDone}/${stats.lessonsTotal}`, 'lessons completed'],
      [`${stats.exercisesDone}/${stats.exercisesTotal}`, 'exercises solved'],
      [stats.accuracy === null ? '—' : `${Math.round(stats.accuracy * 100)}%`, 'first-try accuracy'],
      [String(state.streak.count), 'day streak'],
    ];
    for (const [value, label] of items) {
      const li = document.createElement('li');
      const valueEl = document.createElement('span');
      valueEl.className = 'stat-value';
      valueEl.textContent = value;
      const labelEl = document.createElement('span');
      labelEl.className = 'stat-label';
      labelEl.textContent = label;
      li.append(valueEl, labelEl);
      statsEl.append(li);
    }
  }

  const tracksEl = pick<HTMLElement>('[data-track-progress]');
  if (tracksEl) {
    tracksEl.replaceChildren();
    for (const track of TRACKS) {
      const statsForTrack = trackStats(state, track.id, meta);
      if (statsForTrack.lessonsTotal === 0 && statsForTrack.exercisesTotal === 0) continue;

      const row = document.createElement('div');
      row.className = 'track-row';
      row.style.setProperty('--track-color', `var(--track-${track.id})`);

      const head = document.createElement('div');
      head.className = 'track-row-head';
      const dot = document.createElement('span');
      dot.className = 'track-dot';
      dot.setAttribute('aria-hidden', 'true');
      const name = document.createElement('strong');
      name.textContent = track.name;
      const detail = document.createElement('span');
      detail.className = 'meta-line';
      const accuracy =
        statsForTrack.accuracy === null ? '—' : `${Math.round(statsForTrack.accuracy * 100)}% first-try`;
      detail.textContent = `${statsForTrack.lessonsDone}/${statsForTrack.lessonsTotal} lessons · ${statsForTrack.exercisesDone}/${statsForTrack.exercisesTotal} exercises · ${accuracy}`;
      head.append(dot, name, detail);

      const barEl = document.createElement('div');
      barEl.className = 'xp-bar';
      const fill = document.createElement('span');
      const ratio = statsForTrack.lessonsTotal > 0 ? statsForTrack.lessonsDone / statsForTrack.lessonsTotal : 0;
      fill.style.transform = `scaleX(${ratio.toFixed(4)})`;
      barEl.append(fill);

      row.append(head, barEl);
      tracksEl.append(row);
    }
  }

  const badgesEl = pick<HTMLElement>('[data-badges]');
  if (badgesEl) {
    badgesEl.replaceChildren();
    const catalog = badgeCatalog(meta);
    const earned = new Set(earnedBadges({ state, meta, assessment: readAssessment() }));
    for (const badge of catalog) {
      const got = earned.has(badge.id);
      const item = document.createElement('div');
      item.className = `badge ${got ? 'is-earned' : 'is-locked'}`;

      const name = document.createElement('p');
      name.className = 'badge-name';
      name.textContent = badge.name;
      const desc = document.createElement('p');
      desc.className = 'badge-desc';
      desc.textContent = badge.description;
      item.append(name, desc);

      const earnedAt = state.badges[badge.id];
      if (got && earnedAt) {
        const when = document.createElement('p');
        when.className = 'badge-date';
        when.textContent = `Earned ${fmtDate(earnedAt)}`;
        item.append(when);
      }
      badgesEl.append(item);
    }
    setText('[data-badges-count]', `${earned.size} of ${catalog.length} earned`);
  }

  const activityEl = pick<HTMLElement>('[data-activity]');
  if (activityEl) {
    activityEl.replaceChildren();
    const rows: { at: string; text: string }[] = [];
    for (const [id, entry] of Object.entries(state.lessons)) {
      rows.push({ at: entry.completedAt, text: `Lesson completed — ${meta.lessonTitles[id] ?? id}` });
    }
    for (const [id, entry] of Object.entries(state.exercises)) {
      if (!entry.completedAt) continue;
      rows.push({
        at: entry.completedAt,
        text: `Exercise solved — ${id}${entry.attempts > 1 ? ` · ${entry.attempts} attempts` : ' · first try'}`,
      });
    }
    rows.sort((a, b) => (a.at < b.at ? 1 : -1));
    if (rows.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No activity yet — solve your first exercise to start the log.';
      activityEl.append(li);
    }
    for (const row of rows.slice(0, 8)) {
      const li = document.createElement('li');
      const when = document.createElement('span');
      when.className = 'meta-line';
      when.textContent = `${fmtDate(row.at)} · `;
      li.append(when, row.text);
      activityEl.append(li);
    }
  }

  const bookmarksEl = pick<HTMLElement>('[data-bookmarks]');
  if (bookmarksEl) {
    bookmarksEl.replaceChildren();
    if (state.bookmarks.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'Nothing bookmarked yet.';
      bookmarksEl.append(li);
    }
    for (const id of state.bookmarks) {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = `/learn/${id}`;
      link.textContent = meta.lessonTitles[id] ?? id;
      li.append(link);
      bookmarksEl.append(li);
    }
  }

  initDataIO(state);
}

function initDataIO(state: ReturnType<typeof load>): void {
  const storage = getStorage();
  const box = pick<HTMLTextAreaElement>('[data-io-box]');
  const io = pick<HTMLElement>('[data-io]');
  const status = pick<HTMLElement>('[data-io-status]');
  if (!storage || !box || !io) return;

  const exportBtn = pick<HTMLButtonElement>('[data-export]');
  if (exportBtn && exportBtn.dataset.wired !== 'true') {
    exportBtn.dataset.wired = 'true';
    exportBtn.addEventListener('click', () => {
      io.hidden = false;
      box.value = exportProgress(load(storage));
      box.focus();
      box.select();
      if (status) status.textContent = 'Copy this somewhere safe.';
    });
  }

  const importToggle = pick<HTMLButtonElement>('[data-import-toggle]');
  if (importToggle && importToggle.dataset.wired !== 'true') {
    importToggle.dataset.wired = 'true';
    importToggle.addEventListener('click', () => {
      io.hidden = false;
      box.value = '';
      box.focus();
      if (status) status.textContent = 'Paste an exported progress JSON here.';
    });
  }

  const applyBtn = pick<HTMLButtonElement>('[data-import-apply]');
  if (applyBtn && applyBtn.dataset.wired !== 'true') {
    applyBtn.dataset.wired = 'true';
    applyBtn.addEventListener('click', () => {
      const imported = importProgress(box.value.trim());
      save(storage, imported);
      if (status) status.textContent = 'Imported — this device now shows the imported progress.';
      render();
    });
  }

  const resetBtn = pick<HTMLButtonElement>('[data-reset]');
  if (resetBtn && resetBtn.dataset.wired !== 'true') {
    resetBtn.dataset.wired = 'true';
    resetBtn.addEventListener('click', () => {
      const confirmed = window.confirm('Reset all progress on this device? This cannot be undone.');
      if (!confirmed) return;
      try {
        storage.removeItem(STORAGE_KEY);
        storage.removeItem(LEGACY_STORAGE_KEY);
      } catch {
        // Best effort; already-reset state below still renders.
      }
      if (status) status.textContent = '';
      render();
    });
  }
  void state;
}

function boot(): void {
  if (!document.querySelector('[data-progress-root]')) return;
  render();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
document.addEventListener('astro:page-load', boot);
