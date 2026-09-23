// Client controller for fix-prompt exercises (open-ended rewriting, self-assessed).
// The learner writes an improved prompt, self-checks against criteria, then reveals a strong version.
// Deterministic by design: the only gated rule is that a real submission exists — this is explicitly
// self-assessment, never machine grading (master brief §19).

import { isUsableSubmission } from '../lib/exercise/grade';
import { EXERCISE_XP, load, recordExerciseAttempt, save, type StorageLike } from '../lib/progress';
import { afterProgress } from './feedback';
import { t } from '../i18n/client';

interface FixPromptConfig {
  id: string;
  kind: 'fix-prompt';
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

export function initFixPromptExercises(): void {
  const cards = document.querySelectorAll<HTMLElement>('[data-exercise]');
  if (cards.length === 0) return;

  const storage = getStorage();
  for (const card of cards) {
    if (!card.querySelector('textarea[data-fix-input]')) continue;
    if (card.dataset.fxWired === 'true') continue;
    wire(card, storage);
    card.dataset.fxWired = 'true';
  }
}

function wire(card: HTMLElement, storage: StorageLike | null): void {
  const configEl = card.querySelector<HTMLScriptElement>('script[data-exercise-config]');
  const checkBtn = card.querySelector<HTMLButtonElement>('[data-check]');
  const feedback = card.querySelector<HTMLElement>('[data-feedback]');
  const textarea = card.querySelector<HTMLTextAreaElement>('textarea[data-fix-input]');
  const solution = card.querySelector<HTMLDetailsElement>('[data-solution]');
  const explanation = card.querySelector<HTMLDetailsElement>('[data-explanation]');
  const xpNote = card.querySelector<HTMLElement>('[data-xp]');
  if (!configEl?.textContent || !checkBtn || !feedback || !textarea) return;

  let config: FixPromptConfig;
  try {
    config = JSON.parse(configEl.textContent) as FixPromptConfig;
    if (config.kind !== 'fix-prompt') return;
  } catch {
    return;
  }

  checkBtn.addEventListener('click', () => {
    if (!isUsableSubmission(textarea.value)) {
      setFeedback(feedback, 'none', t().writeFirst);
      textarea.focus();
      return;
    }

    if (solution) {
      solution.hidden = false;
      solution.open = true;
    }
    if (explanation) {
      explanation.hidden = false;
      explanation.open = true;
    }

    setFeedback(
      feedback,
      'done',
      t().fixGood,
      t().fixNote,
    );

    const previous = load(storage);
    const attempt = recordExerciseAttempt(previous, config.id, true);
    save(storage, attempt.state);
    if (attempt.gained > 0) afterProgress(previous.xp, attempt.state.xp);
    if (xpNote && attempt.gained > 0) {
      xpNote.hidden = false;
      xpNote.textContent = t().xpSaved(EXERCISE_XP);
    }
  });
}

function setFeedback(
  el: HTMLElement,
  state: 'none' | 'done',
  verdict: string,
  detail = '',
): void {
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
