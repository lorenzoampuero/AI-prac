// Client controller for build-prompt exercises (guided composition with a live preview).
// The learner fills named fields; the preview assembles exactly what they would paste into the chat.
// Deterministic by design: the only gated rule is that every required field holds a real attempt —
// this is explicitly self-assessment, never machine grading (master brief §19).

import {
  MIN_FIELD_CHARS,
  assemblePrompt,
  isBuildPromptReady,
  type BuildPromptField,
} from '../lib/exercise/grade';
import { EXERCISE_XP, load, recordExerciseAttempt, save, type StorageLike } from '../lib/progress';
import { afterProgress } from './feedback';

interface BuildPromptConfig {
  id: string;
  kind: 'build-prompt';
  fields: BuildPromptField[];
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

export function initBuildPromptExercises(): void {
  const cards = document.querySelectorAll<HTMLElement>('[data-exercise]');
  if (cards.length === 0) return;

  const storage = getStorage();
  for (const card of cards) {
    if (!card.querySelector('textarea[data-build-input]')) continue;
    if (card.dataset.bpWired === 'true') continue;
    wire(card, storage);
    card.dataset.bpWired = 'true';
  }
}

function wire(card: HTMLElement, storage: StorageLike | null): void {
  const configEl = card.querySelector<HTMLScriptElement>('script[data-exercise-config]');
  const checkBtn = card.querySelector<HTMLButtonElement>('[data-check]');
  const feedback = card.querySelector<HTMLElement>('[data-feedback]');
  const solution = card.querySelector<HTMLDetailsElement>('[data-solution]');
  const explanation = card.querySelector<HTMLDetailsElement>('[data-explanation]');
  const xpNote = card.querySelector<HTMLElement>('[data-xp]');
  const preview = card.querySelector<HTMLElement>('[data-prompt-preview]');
  const textareas = Array.from(card.querySelectorAll<HTMLTextAreaElement>('textarea[data-build-input]'));
  if (!configEl?.textContent || !checkBtn || !feedback || textareas.length === 0) return;

  let config: BuildPromptConfig;
  try {
    config = JSON.parse(configEl.textContent) as BuildPromptConfig;
    if (config.kind !== 'build-prompt') return;
  } catch {
    return;
  }

  const readValues = (): Record<string, string> => {
    const values: Record<string, string> = {};
    for (const area of textareas) {
      const fieldId = area.dataset.fieldId;
      if (fieldId) values[fieldId] = area.value;
    }
    return values;
  };

  const refresh = (): void => {
    if (!preview) return;
    preview.textContent = assemblePrompt(readValues(), config.fields);
  };

  for (const area of textareas) area.addEventListener('input', refresh);
  refresh();

  checkBtn.addEventListener('click', () => {
    const values = readValues();
    if (!isBuildPromptReady(values, config.fields)) {
      setFeedback(feedback, 'none', 'Fill every required field first — a rough line is enough.');
      const firstIncomplete = config.fields.find(
        (field) => field.required && (values[field.id] ?? '').trim().length < MIN_FIELD_CHARS,
      );
      if (firstIncomplete) {
        textareas.find((area) => area.dataset.fieldId === firstIncomplete.id)?.focus();
      }
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
      'Good — compare your assembled prompt with the strong example below.',
      'This is self-assessment: nothing was graded by a machine. Check your version against each move in the example.',
    );

    const previous = load(storage);
    const attempt = recordExerciseAttempt(previous, config.id, true);
    save(storage, attempt.state);
    if (attempt.gained > 0) afterProgress(previous.xp, attempt.state.xp);
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
