// Animated teaching visuals (lesson diagrams): next-token bars, token split, context-window strip
// and the diffusion noise-to-image strip. Boots on first load and after client-side navigation;
// idempotent via dataset guards. Content is readable without JavaScript and without motion — the
// script only adds reveal choreography; prefers-reduced-motion skips straight to the final state.

function reducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Arm the element (hiding its animated parts in CSS) and run `onFirstView` when it first shows. */
function whenVisible(el: HTMLElement, onFirstView: () => void): void {
  el.classList.add('is-armed');
  const rect = el.getBoundingClientRect();
  const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
  if (inView) {
    requestAnimationFrame(() => {
      requestAnimationFrame(onFirstView);
    });
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          onFirstView();
          observer.disconnect();
        }
      }
    },
    { rootMargin: '0px 0px -6% 0px' },
  );
  observer.observe(el);
}

interface NextTokenOption {
  token: string;
  pct: number;
}

function initNextToken(): void {
  for (const demo of document.querySelectorAll<HTMLElement>('[data-nt-demo]')) {
    if (demo.dataset.wired === 'true') continue;
    demo.dataset.wired = 'true';

    const configEl = demo.querySelector<HTMLScriptElement>('script[data-nt-config]');
    const sampleBtn = demo.querySelector<HTMLButtonElement>('[data-nt-sample]');
    const result = demo.querySelector<HTMLElement>('[data-nt-result]');
    if (!configEl || !sampleBtn || !result) continue;

    let options: NextTokenOption[] = [];
    try {
      options = JSON.parse(configEl.textContent ?? '[]') as NextTokenOption[];
    } catch {
      options = [];
    }
    if (options.length === 0) continue;

    const items = [...demo.querySelectorAll<HTMLElement>('[data-nt-option]')];
    whenVisible(demo, () => demo.classList.add('is-in'));

    sampleBtn.addEventListener('click', () => {
      const total = options.reduce((sum, option) => sum + option.pct, 0);
      let roll = Math.random() * total;
      let pickedIndex = 0;
      for (let index = 0; index < options.length; index += 1) {
        roll -= options[index]!.pct;
        if (roll <= 0) {
          pickedIndex = index;
          break;
        }
      }
      const picked = options[pickedIndex]!;
      for (const item of items) item.classList.remove('is-picked');
      items[pickedIndex]?.classList.add('is-picked');
      result.textContent = `This round: “${picked.token}” (${picked.pct}%). Sample again — lower-probability tokens win sometimes, and that spread is why answers vary.`;
    });
  }
}

function initTokenSplit(): void {
  for (const figure of document.querySelectorAll<HTMLElement>('[data-ts-split]')) {
    if (figure.dataset.wired === 'true') continue;
    figure.dataset.wired = 'true';

    const replay = figure.querySelector<HTMLButtonElement>('[data-ts-replay]');
    const play = (): void => {
      figure.classList.remove('is-in');
      void figure.offsetWidth; // restart the staggered transitions
      figure.classList.add('is-in');
    };
    whenVisible(figure, play);
    replay?.addEventListener('click', () => {
      if (reducedMotion()) {
        figure.classList.add('is-in');
        return;
      }
      play();
    });
  }
}

function initContextMeter(): void {
  for (const meter of document.querySelectorAll<HTMLElement>('[data-cm-demo]')) {
    if (meter.dataset.wired === 'true') continue;
    meter.dataset.wired = 'true';

    const track = meter.querySelector<HTMLElement>('[data-cm-track]');
    if (!track) continue;
    const replay = meter.querySelector<HTMLButtonElement>('[data-cm-replay]');
    const dots = [...meter.querySelectorAll<HTMLElement>('.cm-dot')];
    const blocks = [...track.querySelectorAll<HTMLElement>('[data-cm-block]')];
    const visible = Number.parseInt(meter.dataset.cmVisible ?? '4', 10) || 4;
    const lastState = Math.max(0, blocks.length - visible);
    let timer: number | undefined;

    const setState = (state: number): void => {
      track.style.setProperty('--cm-index', String(state));
      blocks.forEach((block, index) => {
        block.classList.toggle('is-dropped', index < state);
      });
      dots.forEach((dot, index) => dot.classList.toggle('is-active', index === state));
    };

    const play = (): void => {
      if (timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
      if (lastState === 0) return;
      if (reducedMotion()) {
        setState(lastState);
        return;
      }
      setState(0);
      let state = 0;
      timer = window.setInterval(() => {
        state += 1;
        setState(state);
        if (state >= lastState) {
          window.clearInterval(timer);
          timer = undefined;
        }
      }, 1250);
    };

    whenVisible(meter, play);
    replay?.addEventListener('click', play);
  }
}

function initDiffusionStrip(): void {
  for (const strip of document.querySelectorAll<HTMLElement>('[data-ds-strip]')) {
    if (strip.dataset.wired === 'true') continue;
    strip.dataset.wired = 'true';

    const replay = strip.querySelector<HTMLButtonElement>('[data-ds-replay]');
    const play = (): void => {
      strip.classList.remove('is-in');
      void strip.offsetWidth; // restart the staggered transitions
      strip.classList.add('is-in');
    };
    whenVisible(strip, play);
    replay?.addEventListener('click', () => {
      if (reducedMotion()) {
        strip.classList.add('is-in');
        return;
      }
      play();
    });
  }
}

function boot(): void {
  initNextToken();
  initTokenSplit();
  initContextMeter();
  initDiffusionStrip();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
document.addEventListener('astro:page-load', boot);

export {};
