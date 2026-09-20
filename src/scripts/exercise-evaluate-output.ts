// Client controller for evaluate-output exercises (compare two outputs, commit to a verdict).
// Deterministic by design: the rubric guides the process, but only the verdict is graded — against the
// expected better output. No network calls (master brief §18/§19).

import { gradeEvaluateOutput } from '../lib/exercise/grade';
import { EXERCISE_XP, load, recordExerciseAttempt, save, type StorageLike } from '../lib/progress';
import { afterProgress } from './feedback';

interface EvaluateOutputConfig {
  id: string;
  kind: 'evaluate-output';
  verdict: { better: 'A' | 'B'; reasoning: string };
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

export function initEvaluateOutputExercises(): void {
  const cards = document.querySelectorAll<HTMLElement>('[data-exercise]');
  if (cards.length === 0) return;

  const storage = getStorage();
  for (const card of cards) {
    if (!card.querySelector('input[data-evaluate-input]')) continue;
    if (card.dataset.eoWired === 'true') continue;
    wire(card, storage);
    card.dataset.eoWired = 'true';
  }
}

function wire(card: HTMLElement, storage: StorageLike | null): void {
  const configEl = card.querySelector<HTMLScriptElement>('script[data-exercise-config]');
  const checkBtn = card.querySelector<HTMLButtonElement>('[data-check]');
  const feedback = card.querySelector<HTMLElement>('[data-feedback]');
  const explanation = card.querySelector<HTMLDetailsElement>('[data-explanation]');
  const xpNote = card.querySelector<HTMLElement>('[data-xp]');
  if (!configEl?.textContent || !checkBtn || !feedback || !explanation) return;

  let config: EvaluateOutputConfig;
  try {
    config = JSON.parse(configEl.textContent) as EvaluateOutputConfig;
    if (config.kind !== 'evaluate-output') return;
  } catch {
    return;
  }

  checkBtn.addEventListener('click', () => {
    const selected = card.querySelector<HTMLInputElement>('input[data-evaluate-input]:checked');
    if (!selected) {
      showFeedback(
        feedback,
        'none',
        'Pick a verdict first.',
        'Work through every rubric question for both outputs, then decide.',
      );
      card.querySelector<HTMLInputElement>('input[data-evaluate-input]')?.focus();
      return;
    }

    const result = gradeEvaluateOutput(config.verdict, selected.value as 'A' | 'B');
    showFeedback(
      feedback,
      result.correct ? 'correct' : 'incorrect',
      result.correct ? 'Correct.' : 'Not quite.',
      result.feedback,
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

function showFeedback(
  el: HTMLElement,
  state: 'none' | 'correct' | 'incorrect',
  verdict: string,
  detail: string,
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
