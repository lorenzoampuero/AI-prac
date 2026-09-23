// Shared client feedback — XP toasts, level-up celebration, badge unlocks, header widget refresh.
// All DOM work is created here (never innerHTML with user data) and every function is safe to call
// on pages without the relevant elements.

import { load, save, type ProgressState, type StorageLike } from '../lib/progress';
import {
  badgeCatalog,
  earnedBadges,
  levelStatus,
  type AssessmentSummary,
  type SiteMeta,
} from '../lib/gamification';
import { t } from '../i18n/client';

const ASSESSMENT_KEY = 'aip:assessment:v1';

export function getStorage(): StorageLike | null {
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

export function readSiteMeta(): SiteMeta | null {
  const el = document.querySelector<HTMLScriptElement>('script[data-site-meta]');
  if (!el?.textContent) return null;
  try {
    return JSON.parse(el.textContent) as SiteMeta;
  } catch {
    return null;
  }
}

export function readAssessment(): AssessmentSummary | null {
  const storage = getStorage();
  if (!storage) return null;
  try {
    const raw = storage.getItem(ASSESSMENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { taken?: number; correctCount?: number; total?: number };
    return {
      taken: (parsed.taken ?? 0) > 0,
      correct: parsed.correctCount ?? 0,
      total: parsed.total ?? 18,
    };
  } catch {
    return null;
  }
}

function ensureStack(): HTMLElement {
  let stack = document.querySelector<HTMLElement>('.toast-stack');
  if (!stack) {
    stack = document.createElement('div');
    stack.className = 'toast-stack';
    stack.setAttribute('role', 'status');
    stack.setAttribute('aria-live', 'polite');
    document.body.appendChild(stack);
  }
  return stack;
}

function pushToast(build: (item: HTMLElement) => void): void {
  const stack = ensureStack();
  const item = document.createElement('div');
  item.className = 'toast-item';
  build(item);
  stack.appendChild(item);
  requestAnimationFrame(() => item.classList.add('is-shown'));
  item.addEventListener('animationend', () => item.remove());
}

export function showXpToast(amount: number): void {
  pushToast((item) => {
    const strong = document.createElement('strong');
    strong.className = 'xp-amount';
    strong.textContent = `+${amount} XP`;
    item.append(strong, document.createTextNode(t().xpToastSaved));
  });
}

function showBadgeToast(name: string, description: string): void {
  pushToast((item) => {
    const strong = document.createElement('strong');
    strong.textContent = name;
    item.append(t().badgeUnlocked, strong, ` · ${description}`);
  });
}

export function showLevelUp(level: number, name: string): void {
  const card = document.createElement('div');
  card.className = 'levelup-card';
  const eyebrow = document.createElement('p');
  eyebrow.className = 'lu-eyebrow';
  eyebrow.textContent = t().levelLabel(level);
  const title = document.createElement('p');
  title.className = 'lu-name';
  title.textContent = name;
  card.append(eyebrow, title);
  document.body.appendChild(card);
  requestAnimationFrame(() => card.classList.add('is-shown'));
  card.addEventListener('animationend', () => card.remove());
}

export function refreshHeaderWidget(state?: ProgressState): void {
  const widget = document.querySelector<HTMLElement>('[data-level-widget]');
  if (!widget) return;
  const current = state ?? load(getStorage());
  const status = levelStatus(current.xp);
  const nameEl = widget.querySelector<HTMLElement>('[data-lw-name]');
  const xpEl = widget.querySelector<HTMLElement>('[data-lw-xp]');
  if (nameEl) nameEl.textContent = t().levelChip(status.current.level, status.current.name);
  if (xpEl) xpEl.textContent = `${current.xp} XP`;
  widget.hidden = false;
}

/** Evaluates badges against the current store and celebrates any newly earned ones. */
export function syncBadges(): void {
  const meta = readSiteMeta();
  const storage = getStorage();
  if (!meta || !storage) return;

  const state = load(storage);
  const earned = earnedBadges({ state, meta, assessment: readAssessment() });
  const fresh = earned.filter((id) => !(id in state.badges));
  if (fresh.length === 0) return;

  const now = new Date().toISOString();
  const badges = { ...state.badges };
  for (const id of fresh) badges[id] = now;
  save(storage, { ...state, badges });

  const catalog = badgeCatalog(meta);
  for (const id of fresh) {
    const def = catalog.find((badge) => badge.id === id);
    if (def) showBadgeToast(def.name, def.description);
  }
}

/** Post-solve/post-completion celebration + housekeeping. Call right after saving progress. */
export function afterProgress(prevXp: number, nextXp: number): void {
  const gained = nextXp - prevXp;
  if (gained > 0) showXpToast(gained);

  const before = levelStatus(prevXp).current.level;
  const after = levelStatus(nextXp).current;
  if (after.level > before) showLevelUp(after.level, after.name);

  syncBadges();
  refreshHeaderWidget();
}
