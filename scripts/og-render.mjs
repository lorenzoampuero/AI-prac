// Renders public/og.png (1200x630 social card) from scripts/og-card.html using the locally installed
// Edge/Chrome via playwright-core — no browser downloads. Run:
//   npm i --no-save playwright-core
//   node scripts/og-render.mjs
import { chromium } from 'playwright-core';
import { fileURLToPath } from 'node:url';

const cardUrl = new URL('./og-card.html', import.meta.url).href;
const outPath = fileURLToPath(new URL('../public/og.png', import.meta.url));

const channels = ['msedge', 'chrome'];
let browser = null;
for (const channel of channels) {
  try {
    browser = await chromium.launch({ channel, headless: true });
    break;
  } catch {
    // try next channel
  }
}
if (!browser) {
  console.error('No local Chromium-based browser found (tried msedge, chrome).');
  process.exit(1);
}

const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(cardUrl);
await page.waitForTimeout(300);
await page.locator('.card').screenshot({ path: outPath });
await browser.close();
console.log('og.png written to', outPath);
