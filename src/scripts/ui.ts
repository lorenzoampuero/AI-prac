// Global UI behaviors shared by every page. Loaded once per session as a module: Astro runs module
// scripts only on the first page load, so binding happens here AND on every `astro:page-load`
// (client-side navigation with ClientRouter). All bindings are idempotent.

let revealObserver: IntersectionObserver | null = null;

function initReveals(): void {
  const targets = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)');
  if (targets.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    for (const el of targets) el.classList.add('is-visible');
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver?.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
  }

  for (const el of targets) revealObserver.observe(el);
}

/** Re-apply the theme after client-side navigation (ClientRouter may reset <html> attributes). */
function applyStoredTheme(): void {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem('aip:theme');
  } catch {
    saved = null;
  }
  if (saved === 'light' || saved === 'dark') {
    document.documentElement.dataset.theme = saved;
    return;
  }
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  document.documentElement.dataset.theme = mq.matches ? 'dark' : 'light';
}

function initThemeToggle(): void {
  const button = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
  if (!button) return;

  const sync = (): void => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    button.setAttribute('aria-pressed', String(isDark));
  };
  sync();

  if (button.dataset.wired === 'true') return;
  button.dataset.wired = 'true';

  button.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('aip:theme', next);
    } catch {
      // Non-persistent is fine — the toggle still works for this session.
    }
    sync();
  });
}

function boot(): void {
  applyStoredTheme();
  initThemeToggle();
  initReveals();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
document.addEventListener('astro:page-load', boot);
