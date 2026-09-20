// Interactive teaching blocks used inside lessons: the inline micro-quiz (CheckUnderstanding) and the
// progressive steps (StepReveal). Boots on first load and after client-side navigation; idempotent.

interface CuConfig {
  correct: boolean;
  feedback: string;
}

function initCheckUnderstanding(): void {
  for (const block of document.querySelectorAll<HTMLElement>('[data-check-understanding]')) {
    if (block.dataset.wired === 'true') continue;
    block.dataset.wired = 'true';

    const configEl = block.querySelector<HTMLScriptElement>('script[data-cu-config]');
    const feedback = block.querySelector<HTMLElement>('[data-cu-feedback]');
    if (!configEl?.textContent || !feedback) continue;

    let config: CuConfig[];
    try {
      config = JSON.parse(configEl.textContent) as CuConfig[];
    } catch {
      continue;
    }

    for (const input of block.querySelectorAll<HTMLInputElement>('input[data-cu-input]')) {
      input.addEventListener('change', () => {
        const option = config[Number(input.value)];
        if (!option) return;
        block.dataset.answered = 'true';
        feedback.hidden = false;
        feedback.dataset.state = option.correct ? 'correct' : 'incorrect';
        feedback.textContent = option.correct
          ? `Correct. ${option.feedback}`.trim()
          : `Not quite. ${option.feedback} Try another option — this one is free practice.`.trim();
      });
    }
  }
}

function initStepReveal(): void {
  for (const block of document.querySelectorAll<HTMLElement>('[data-step-reveal]')) {
    if (block.dataset.wired === 'true') continue;
    block.dataset.wired = 'true';

    const steps = block.querySelectorAll<HTMLElement>('[data-step-index]');
    const button = block.querySelector<HTMLButtonElement>('[data-sr-next]');
    if (steps.length <= 1 || !button) continue;

    let revealed = 1;
    const render = (): void => {
      steps.forEach((step, index) => {
        step.hidden = index >= revealed;
      });
      button.hidden = revealed >= steps.length;
      button.textContent = revealed >= steps.length - 1 ? 'Reveal final step' : `Reveal step ${revealed + 1}`;
    };
    render();

    button.addEventListener('click', () => {
      revealed += 1;
      render();
    });
  }
}

function boot(): void {
  initCheckUnderstanding();
  initStepReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
document.addEventListener('astro:page-load', boot);
