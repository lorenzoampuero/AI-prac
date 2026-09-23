// Lesson page behaviors: visit tracking, “mark as learned”, reading progress.
// Boots on first load and after every client-side navigation; all bindings are idempotent.

import { completeLesson, LESSON_XP, load, save, toggleBookmark, touchVisit } from '../lib/progress';
import { afterProgress, getStorage, refreshHeaderWidget, syncBadges } from './feedback';
import { t } from '../i18n/client';

let readingBound = false;

function initReadingProgress(): void {
  const update = (): void => {
    const wrap = document.querySelector<HTMLElement>('.reading-progress');
    if (!wrap) return;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
    wrap.style.setProperty('--reading', String(progress));
    wrap.classList.toggle('is-active', window.scrollY > 24);
  };

  if (!readingBound) {
    readingBound = true;
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }
  update();
}

function initLesson(): void {
  const page = document.querySelector<HTMLElement>('[data-lesson-page]');
  if (!page) return;

  const lessonId = page.dataset.lessonId ?? '';
  const storage = getStorage();

  // Track the last visited lesson once per page view (continue-learning strip).
  if (lessonId && page.dataset.visited !== 'true') {
    page.dataset.visited = 'true';
    save(storage, touchVisit(load(storage), lessonId));
  }

  const card = document.querySelector<HTMLElement>('[data-lesson-complete]');
  const button = card?.querySelector<HTMLButtonElement>('[data-lesson-complete-btn]');
  const doneNote = card?.querySelector<HTMLElement>('[data-lesson-done]');
  const bookmarkBtn = card?.querySelector<HTMLButtonElement>('[data-bookmark-btn]');

  const render = (): void => {
    if (!card) return;
    const current = load(storage);
    const completed = Boolean(current.lessons[lessonId]);
    if (button) button.hidden = completed;
    if (doneNote) doneNote.hidden = !completed;
    if (bookmarkBtn) {
      const saved = current.bookmarks.includes(lessonId);
      bookmarkBtn.setAttribute('aria-pressed', String(saved));
      bookmarkBtn.textContent = saved ? t().bookmarkSaved : t().bookmarkSave;
    }
    card.dataset.completed = String(completed);
  };
  render();

  if (card && button && card.dataset.wired !== 'true') {
    card.dataset.wired = 'true';
    button.addEventListener('click', () => {
      const prev = load(storage);
      const result = completeLesson(prev, lessonId);
      if (!result.isNew) {
        render();
        return;
      }
      save(storage, result.state);
      afterProgress(prev.xp, result.state.xp);
      render();
    });
  }

  if (card && bookmarkBtn && card.dataset.bookmarkWired !== 'true') {
    card.dataset.bookmarkWired = 'true';
    bookmarkBtn.addEventListener('click', () => {
      save(storage, toggleBookmark(load(storage), lessonId));
      render();
    });
  }

  initReadingProgress();
  refreshHeaderWidget();
  syncBadges();
}

function boot(): void {
  initLesson();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
document.addEventListener('astro:page-load', boot);

export { LESSON_XP };
