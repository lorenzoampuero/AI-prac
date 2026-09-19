// Client controller for order-steps exercises (arrange workflow stages with up/down controls).
// Keyboard-operable by design: each step has explicit Move up / Move down buttons; ordering is the only
// interaction. Grading is deterministic (position comparison) — no network, no API (brief §18).

import { gradeOrderSteps } from '../lib/exercise/grade';
import { EXERCISE_XP, load, recordExerciseAttempt, save, type StorageLike } from '../lib/progress';

interface OrderStepsConfig {
  id: string;
  kind: 'order-steps';
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

export function initOrderStepsExercises(): void {
  const cards = document.querySelectorAll<HTMLElement>('[data-exercise]');
  if (cards.length === 0) return;

  const storage = getStorage();
  for (const card of cards) {
    if (!card.querySelector('[data-step-list]')) continue;
    if (card.dataset.osWired === 'true') continue;
    wire(card, storage);
    card.dataset.osWired = 'true';
  }
}

function wire(card: HTMLElement, storage: StorageLike | null): void {
  const configEl = card.querySelector<HTMLScriptElement>('script[data-exercise-config]');
  const list = card.querySelector<HTMLOListElement>('[data-step-list]');
  const checkBtn = card.querySelector<HTMLButtonElement>('[data-check]');
  const feedback = card.querySelector<HTMLElement>('[data-feedback]');
  const solution = card.querySelector<HTMLDetailsElement>('[data-solution]');
  const explanation = card.querySelector<HTMLDetailsElement>('[data-explanation]');
  const xpNote = card.querySelector<HTMLElement>('[data-xp]');
  if (!configEl?.textContent || !list || !checkBtn || !feedback) return;

  let config: OrderStepsConfig;
  try {
    config = JSON.parse(configEl.textContent) as OrderStepsConfig;
    if (config.kind !== 'order-steps') return;
  } catch {
    return;
  }

  // Up/down moves — focus travels with the element, so the same button keeps working.
  list.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const button = target.closest<HTMLButtonElement>('[data-move]');
    if (!button) return;

    const item = button.closest('li');
    if (!item) return;

    if (button.dataset.move === 'up' && item.previousElementSibling) {
      list.insertBefore(item, item.previousElementSibling);
    } else if (button.dataset.move === 'down' && item.nextElementSibling) {
      list.insertBefore(item.nextElementSibling, item);
    }
  });

  checkBtn.addEventListener('click', () => {
    const submitted = [...list.querySelectorAll('li')].map((item) =>
      Number((item as HTMLElement).dataset.stepIndex ?? '-1'),
    );

    const result = gradeOrderSteps(submitted);
    renderFeedback(
      feedback,
      result.correct,
      result.correct
        ? 'Correct — the steps are in a workable order.'
        : `Not quite — ${result.misplaced.length} step${result.misplaced.length === 1 ? '' : 's'} sit in the wrong position. Compare with the correct order below.`,
    );

    if (solution) {
      solution.hidden = false;
      solution.open = true;
    }
    if (explanation) {
      explanation.hidden = false;
      explanation.open = true;
    }

    const attempt = recordExerciseAttempt(load(storage), config.id, result.correct);
    save(storage, attempt.state);
    if (xpNote && attempt.gained > 0) {
      xpNote.hidden = false;
      xpNote.textContent = `+${EXERCISE_XP} XP — saved on this device.`;
    }
  });
}

function renderFeedback(el: HTMLElement, correct: boolean, verdict: string): void {
  el.dataset.state = correct ? 'correct' : 'incorrect';
  el.hidden = false;
  el.replaceChildren();

  const heading = document.createElement('p');
  heading.className = 'verdict';
  heading.textContent = verdict;
  el.append(heading);
}
