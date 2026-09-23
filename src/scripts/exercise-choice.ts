// Client controller for choice-family exercises (pick-better-prompt, model-choice).
// Progressive enhancement: the server renders the full exercise; this only adds grading, feedback and
// device-local progress recording. No network calls — grading is deterministic and local (brief §18).

import { gradeChoice, type ChoiceOption } from '../lib/exercise/grade';
import { EXERCISE_XP, load, recordExerciseAttempt, save, type StorageLike } from '../lib/progress';
import { afterProgress } from './feedback';
import { t } from '../i18n/client';

interface ExerciseConfig {
  id: string;
  options: ChoiceOption[];
}

function getStorage(): StorageLike | null {
  try {
    const storage = window.localStorage;
    const probe = '__aip_probe__';
    storage.setItem(probe, '1');
    storage.removeItem(probe);
    return storage;
  } catch {
    return null;
  }
}

export function initChoiceExercises(): void {
  const cards = document.querySelectorAll<HTMLElement>('[data-exercise]');
  if (cards.length === 0) return;

  const storage = getStorage();
  for (const card of cards) {
    if (!card.querySelector('input[type="radio"][data-choice-input]')) continue;
    if (card.dataset.wired === 'true') continue;
    wire(card, storage);
    card.dataset.wired = 'true';
  }
}

function wire(card: HTMLElement, storage: StorageLike | null): void {
  const id = card.dataset.exerciseId ?? '';
  const configEl = card.querySelector<HTMLScriptElement>('script[data-exercise-config]');
  const checkBtn = card.querySelector<HTMLButtonElement>('[data-check]');
  const feedback = card.querySelector<HTMLElement>('[data-feedback]');
  const explanation = card.querySelector<HTMLDetailsElement>('[data-explanation]');
  const xpNote = card.querySelector<HTMLElement>('[data-xp]');
  if (!id || !configEl?.textContent || !checkBtn || !feedback || !explanation) return;

  let config: ExerciseConfig;
  try {
    config = JSON.parse(configEl.textContent) as ExerciseConfig;
  } catch {
    return;
  }

  checkBtn.addEventListener('click', () => {
    const selected = card.querySelector<HTMLInputElement>('input[type="radio"]:checked');
    if (!selected) {
      showFeedback(feedback, 'none', t().chooseOneOption, '');
      card.querySelector<HTMLInputElement>('input[type="radio"]')?.focus();
      return;
    }

    const result = gradeChoice(config.options, selected.value);
    showFeedback(
      feedback,
      result.correct ? 'correct' : 'incorrect',
      result.correct ? t().correct : t().notQuite,
      result.correct ? result.feedback : `${result.feedback} ${t().tryAnotherOption}`,
    );

    explanation.hidden = false;
    explanation.open = true;

    // Device-local, idempotent: XP is granted once, on the first solve.
    const previous = load(storage);
    const attempt = recordExerciseAttempt(previous, config.id, result.correct);
    save(storage, attempt.state);
    if (attempt.gained > 0) afterProgress(previous.xp, attempt.state.xp);
    if (xpNote && attempt.gained > 0) {
      xpNote.hidden = false;
      xpNote.textContent = t().xpSaved(EXERCISE_XP);
    }
  });
}

function showFeedback(el: HTMLElement, state: 'none' | 'correct' | 'incorrect', verdict: string, detail: string): void {
  el.dataset.state = state;
  el.hidden = false;
  el.replaceChildren();

  const heading = document.createElement('p');
  heading.className = 'verdict';
  heading.textContent = verdict;
  el.append(heading);

  if (detail) {
    const body = document.createElement('p');
    body.textContent = detail;
    el.append(body);
  }
}
