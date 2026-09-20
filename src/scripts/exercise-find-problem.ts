// Client controller for find-the-problem exercises (multi-select: flag every untrustworthy claim).
// Progressive enhancement only — the server renders everything; this adds grading, feedback and
// device-local progress. No network calls; grading is deterministic (brief §18).

import { gradeFindProblem, type ClaimResult, type FindProblemClaim } from '../lib/exercise/grade';
import { EXERCISE_XP, load, recordExerciseAttempt, save, type StorageLike } from '../lib/progress';
import { afterProgress } from './feedback';

interface FindProblemConfig {
  id: string;
  kind: 'find-problem';
  response: string;
  claims: FindProblemClaim[];
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

export function initFindProblemExercises(): void {
  const cards = document.querySelectorAll<HTMLElement>('[data-exercise]');
  if (cards.length === 0) return;

  const storage = getStorage();
  for (const card of cards) {
    if (!card.querySelector('input[type="checkbox"][data-claim-input]')) continue;
    if (card.dataset.fpWired === 'true') continue;
    wire(card, storage);
    card.dataset.fpWired = 'true';
  }
}

const STATUS_LABELS: Record<ClaimResult['status'], string> = {
  caught: 'Good catch',
  missed: 'Missed one',
  'over-flagged': 'Not a problem',
  'correctly-left': 'Fine as-is',
};

function wire(card: HTMLElement, storage: StorageLike | null): void {
  const configEl = card.querySelector<HTMLScriptElement>('script[data-exercise-config]');
  const checkBtn = card.querySelector<HTMLButtonElement>('[data-check]');
  const feedback = card.querySelector<HTMLElement>('[data-feedback]');
  const explanation = card.querySelector<HTMLDetailsElement>('[data-explanation]');
  const xpNote = card.querySelector<HTMLElement>('[data-xp]');
  if (!configEl?.textContent || !checkBtn || !feedback || !explanation) return;

  let config: FindProblemConfig;
  try {
    config = JSON.parse(configEl.textContent) as FindProblemConfig;
    if (config.kind !== 'find-problem') return;
  } catch {
    return;
  }

  checkBtn.addEventListener('click', () => {
    const selected = [...card.querySelectorAll<HTMLInputElement>('input[data-claim-input]:checked')].map(
      (input) => input.value,
    );

    if (selected.length === 0) {
      renderFeedback(feedback, false, [], 'Select at least one part of the answer first.');
      return;
    }

    const result = gradeFindProblem(config.claims, selected);
    renderFeedback(
      feedback,
      result.correct,
      result.results,
      result.correct
        ? 'Correct — you flagged exactly the parts that needed verification.'
        : 'Not quite — compare your picks with the breakdown below.',
    );

    explanation.hidden = false;
    explanation.open = true;

    const previous = load(storage);
    const attempt = recordExerciseAttempt(previous, config.id, result.correct);
    save(storage, attempt.state);
    if (attempt.gained > 0) afterProgress(previous.xp, attempt.state.xp);
    if (xpNote && attempt.gained > 0) {
      xpNote.hidden = false;
      xpNote.textContent = `+${EXERCISE_XP} XP — saved on this device.`;
    }
  });
}

function renderFeedback(el: HTMLElement, correct: boolean, results: ClaimResult[], verdict: string): void {
  el.dataset.state = results.length === 0 ? 'none' : correct ? 'correct' : 'incorrect';
  el.hidden = false;
  el.replaceChildren();

  const heading = document.createElement('p');
  heading.className = 'verdict';
  heading.textContent = verdict;
  el.append(heading);

  if (results.length > 0) {
    const list = document.createElement('ul');
    list.className = 'claim-results';
    for (const result of results) {
      const item = document.createElement('li');
      const label = document.createElement('strong');
      label.textContent = `${STATUS_LABELS[result.status]}: `;
      item.append(label);
      item.append(document.createTextNode(result.feedback));
      list.append(item);
    }
    el.append(list);
  }
}
