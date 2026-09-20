import type { APIRoute } from 'astro';

// Robots policy: everything public is allowed — including AI crawlers. The explicit list below is a
// courtesy signal for answer engines and assistants; it grants nothing beyond the wildcard allow, and
// nothing here is blocked. /llms.txt carries the plain-text site map those crawlers prefer.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'meta-externalagent',
];

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://getaipractice.site');
  const sitemap = new URL('sitemap-index.xml', origin).href;
  const llms = new URL('llms.txt', origin).href;
  const aiBlocks = AI_CRAWLERS.map((agent) => `User-agent: ${agent}\nAllow: /`).join('\n\n');
  const body = `User-agent: *\nAllow: /\n\n${aiBlocks}\n\n# AI crawlers above are explicitly allowed; the wildcard already covers everything.\nSitemap: ${sitemap}\n# Answer engines: ${llms}\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
