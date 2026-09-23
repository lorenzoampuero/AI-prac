// SEO text helpers — meta descriptions must never be cut mid-word.
// Search engines truncate around ~160 chars; a blind slice() reads as broken in SERP snippets,
// social cards and AI answer engines. These helpers keep the cut on a sentence or word boundary.

/**
 * Normalise whitespace, then return whole sentences up to `max` characters.
 * Falls back to a word boundary and appends an ellipsis when no sentence fits.
 */
export function clipAtSentence(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;

  const window = clean.slice(0, max + 1);
  const sentenceEnd = Math.max(
    window.lastIndexOf('. '),
    window.lastIndexOf('! '),
    window.lastIndexOf('? '),
  );
  if (sentenceEnd >= max * 0.4) return clean.slice(0, sentenceEnd + 1);

  const lastSpace = clean.lastIndexOf(' ', max);
  const cut = lastSpace > max * 0.4 ? lastSpace : max;
  return `${clean.slice(0, cut).replace(/[.,;:!?—-]+$/, '')}…`;
}
