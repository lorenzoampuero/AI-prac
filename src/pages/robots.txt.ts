import type { APIRoute } from 'astro';

// Robots policy v0: everything public is allowed (including AI-search crawlers — no blanket blocking).
// The explicit crawler policy (GPTBot, OAI-SearchBot, etc.) is verified against current official docs
// and finalized at the SEO/GEO gate (master brief §57/§90). No hidden text, no fake GEO hacks.
export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://getaipractice.site');
  const sitemap = new URL('sitemap-index.xml', origin).href;
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
