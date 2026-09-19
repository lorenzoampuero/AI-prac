// Client controller for the AI Skills Assessment (/assessment).
// Deterministic and browser-local: scoring runs here, results render here, and the only persistence is
// one localStorage record on the visitor's device (§18 — no API, nothing sent anywhere).

import { ASSESSMENT_ITEMS } from '../data/assessment';
import { resultBand, scoreAssessment, type AssessmentResult } from '../lib/assessment';

const STORAGE_KEY = 'aip:assessment:v1';

interface StoredAssessment {
  version: 1;
  taken: number;
  correctCount: number;
  total: number;
  tracks: { track: string; correct: number; total: number }[];
  lastTakenAt: string;
}

function getStorage(): Storage | null {
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

function readStored(storage: Storage | null): StoredAssessment | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredAssessment) : null;
  } catch {
    return null;
  }
}

export function initAssessment(): void {
  const form = document.querySelector<HTMLFormElement>('[data-assessment-form]');
  if (!form) return;

  const submit = form.querySelector<HTMLButtonElement>('[data-assessment-submit]');
  const retake = form.querySelector<HTMLButtonElement>('[data-assessment-retake]');
  const summary = document.querySelector<HTMLElement>('[data-assessment-summary]');
  const lastLine = document.querySelector<HTMLElement>('[data-assessment-last]');
  if (!submit || !summary) return;

  const storage = getStorage();

  const previous = readStored(storage);
  if (lastLine && previous) {
    lastLine.hidden = false;
    lastLine.textContent = `Previous result on this device: ${previous.correctCount}/${previous.total}.`;
  }

  submit.addEventListener('click', () => {
    const answers: Record<string, number> = {};
    for (const item of ASSESSMENT_ITEMS) {
      const checked = form.querySelector<HTMLInputElement>(`input[name="q-${item.id}"]:checked`);
      if (checked) answers[item.id] = Number(checked.value);
    }

    const result = scoreAssessment(ASSESSMENT_ITEMS, answers);

    for (const itemResult of result.items) {
      const box = form.querySelector<HTMLElement>(`[data-item-feedback="${itemResult.id}"]`);
      const item = ASSESSMENT_ITEMS.find((candidate) => candidate.id === itemResult.id);
      if (!box || !item) continue;
      const chosenIndex = answers[item.id];
      const correctOption = item.options.find((option) => option.correct);

      box.hidden = false;
      box.dataset.state = itemResult.correct ? 'correct' : 'incorrect';
      box.replaceChildren();

      const heading = document.createElement('p');
      heading.className = 'verdict';
      box.append(heading);

      if (itemResult.correct && typeof chosenIndex === 'number') {
        heading.textContent = 'Correct.';
        const detail = document.createElement('p');
        detail.textContent = item.options[chosenIndex]?.feedback ?? '';
        box.append(detail);
      } else if (typeof chosenIndex === 'number') {
        heading.textContent = 'Not quite.';
        const detail = document.createElement('p');
        detail.textContent = item.options[chosenIndex]?.feedback ?? '';
        if (detail.textContent) box.append(detail);
        const answer = document.createElement('p');
        answer.textContent = `The answer: “${correctOption?.text ?? ''}” — ${correctOption?.feedback ?? ''}`;
        box.append(answer);
      } else {
        heading.textContent = 'No answer selected — counted as incorrect.';
        const answer = document.createElement('p');
        answer.textContent = `The answer: “${correctOption?.text ?? ''}” — ${correctOption?.feedback ?? ''}`;
        box.append(answer);
      }
    }

    renderSummary(summary, result);
    if (retake) retake.hidden = false;
    storeResult(storage, result);

    summary.hidden = false;
    summary.focus();
  });

  retake?.addEventListener('click', () => {
    form.reset();
    for (const box of form.querySelectorAll<HTMLElement>('[data-item-feedback]')) {
      box.hidden = true;
      delete box.dataset.state;
      box.replaceChildren();
    }
    summary.hidden = true;
    summary.replaceChildren();
    retake.hidden = true;
    form.scrollIntoView({ block: 'start' });
  });
}

function renderSummary(summary: HTMLElement, result: AssessmentResult): void {
  summary.replaceChildren();

  const heading = document.createElement('h2');
  heading.textContent = 'Your result';
  summary.append(heading);

  const score = document.createElement('p');
  score.className = 'quiz-score';
  score.textContent = `${result.correctCount} of ${result.total} correct.`;
  summary.append(score);

  const band = document.createElement('p');
  band.textContent = resultBand(result.correctCount, result.total);
  summary.append(band);

  const list = document.createElement('ul');
  list.className = 'quiz-tracks';
  for (const track of result.tracks) {
    const li = document.createElement('li');
    const label = document.createElement('strong');
    label.textContent = `${track.name}: `;
    li.append(label);
    li.append(document.createTextNode(`${track.correct}/${track.total}`));
    if (track.correct < track.total) {
      li.append(document.createTextNode(' — '));
      const link = document.createElement('a');
      link.href = `/learn/${track.track}`;
      link.textContent = 'revisit this track';
      li.append(link);
    }
    list.append(li);
  }
  summary.append(list);

  const note = document.createElement('p');
  note.className = 'meta-line';
  note.textContent =
    'Scored in your browser and saved on this device only — nothing was sent anywhere. Retake any time; the assessment gates nothing.';
  summary.append(note);
}

function storeResult(storage: Storage | null, result: AssessmentResult): void {
  if (!storage) return;
  try {
    const previous = readStored(storage);
    const record: StoredAssessment = {
      version: 1,
      taken: (previous?.taken ?? 0) + 1,
      correctCount: result.correctCount,
      total: result.total,
      tracks: result.tracks.map((track) => ({ track: track.track, correct: track.correct, total: track.total })),
      lastTakenAt: new Date().toISOString(),
    };
    storage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Saving is best-effort — the on-page result still renders.
  }
}
