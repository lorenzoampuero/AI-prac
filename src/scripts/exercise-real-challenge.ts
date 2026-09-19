// Client controller for real-challenge exercises (open judgment tasks, self-assessed).
// The learner writes how they would handle a real scenario, self-checks against a rubric, then reveals
// a model answer. Deterministic by design: the only gated rule is that a real submission exists — this
// is explicitly self-assessment, never machine grading (master brief §19).

import { isUsableSubmission } from '../lib/exercise/grade';
import { EXERCISE_XP, load, recordExerciseAttempt, save, type StorageLike } from '../lib/progress';

interface RealChallengeConfig {
  id: string;
  kind: 'real-challenge';
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

export function initRealChallengeExercises(): void {
  const cards = document.querySelectorAll<HTMLElement>('[data-exercise]');
  if (cards.length === 0) return;

  const storage = getStorage();
  for (const card of cards) {
    if (!card.querySelector('textarea[data-challenge-input]')) continue;
    if (card.dataset.rcWired === 'true') continue;
    wire(card, storage);
    card.dataset.rcWired = 'true';
  }
}

function wire(card: HTMLElement, storage: StorageLike | null): void {
  const configEl = card.querySelector<HTMLScriptElement>('script[data-exercise-config]');
  const checkBtn = card.querySelector<HTMLButtonElement>('[data-check]');
  const feedback = card.querySelector<HTMLElement>('[data-feedback]');
  const textarea = card.querySelector<HTMLTextAreaElement>('textarea[data-challenge-input]');
  const solution = card.querySelector<HTMLDetailsElement>('[data-solution]');
  const explanation = card.querySelector<HTMLDetailsElement>('[data-explanation]');
  const xpNote = card.querySelector<HTMLElement>('[data-xp]');
  if (!configEl?.textContent || !checkBtn || !feedback || !textarea) return;

  let config: RealChallengeConfig;
  try {
    config = JSON.parse(configEl.textContent) as RealChallengeConfig;
    if (config.kind !== 'real-challenge') return;
  } catch {
    return;
  }

  checkBtn.addEventListener('click', () => {
    if (!isUsableSubmission(textarea.value)) {
      setFeedback(feedback, 'none', 'Write your plan first — even bullet points are enough.');
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
      'Good — now compare your plan with the model answer below.',
      'This is self-assessment: nothing was graded by a machine. Check your plan against each line of the model answer.',
    );

    const attempt = recordExerciseAttempt(load(storage), config.id, true);
    save(storage, attempt.state);
    if (xpNote && attempt.gained > 0) {
      xpNote.hidden = false;
      xpNote.textContent = `+${EXERCISE_XP} XP — saved on this device.`;
    }
  });
}

function setFeedback(el: HTMLElement, state: 'none' | 'done', verdict: string, detail = ''): void {
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
