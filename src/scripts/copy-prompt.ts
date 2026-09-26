// "Copy prompt" buttons on /prompts pages. Buttons ship hidden and are revealed only when the
// Clipboard API exists, so no-JS readers simply select the text. Bound on first load and on every
// `astro:page-load` (ClientRouter); binding is idempotent.

function wire(): void {
  if (!navigator.clipboard) return;
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-copy-target]')) {
    button.hidden = false;
    if (button.dataset.wired === 'true') continue;
    button.dataset.wired = 'true';
    const label = button.textContent?.trim() ?? '';
    button.addEventListener('click', async () => {
      const source = document.getElementById(button.dataset.copyTarget ?? '');
      if (!source) return;
      try {
        await navigator.clipboard.writeText(source.textContent ?? '');
        button.textContent = `✓ ${button.dataset.copiedLabel ?? ''}`;
        window.setTimeout(() => {
          button.textContent = label;
        }, 2000);
      } catch {
        // Permission denied or insecure context — the text stays selectable by hand.
      }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', wire, { once: true });
} else {
  wire();
}
document.addEventListener('astro:page-load', wire);
