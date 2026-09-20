// IndexNow submitter — notifies Bing, Yandex and other participating engines about the site's URLs.
//
// Usage:  npm run indexnow
// Run it once the site is live (and the key file deployed), then after each CONTENT release.
// Not needed for docs-only deploys. Google has no ping API — indexing there flows through
// Search Console + the sitemap.
//
// The key file lives at public/<KEY>.txt and ships in every build; it is the ownership proof
// for IndexNow. Keep it.

const KEY = '5f3a9c1e7b2d4f8a6c0e2b9d1f7a3c5e';
const ORIGIN = process.env.INDEXNOW_ORIGIN ?? 'https://getaipractice.site';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function main() {
  // 1. Verify the key file is live (Vercel may still be deploying after a push).
  const keyRes = await fetch(`${ORIGIN}/${KEY}.txt`);
  const keyBody = keyRes.ok ? (await keyRes.text()).trim() : '';
  if (keyBody !== KEY) {
    throw new Error(
      `key file not live yet at ${ORIGIN}/${KEY}.txt (status ${keyRes.status}) — deploy first, then re-run`,
    );
  }

  // 2. Collect URLs from the live sitemap.
  const sitemapRes = await fetch(`${ORIGIN}/sitemap-0.xml`);
  if (!sitemapRes.ok) {
    throw new Error(`sitemap fetch failed: ${sitemapRes.status} ${sitemapRes.url}`);
  }
  const xml = await sitemapRes.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0) {
    throw new Error('no URLs found in the sitemap');
  }

  // 3. Submit (host + keyLocation must match the URLs' host).
  const host = new URL(ORIGIN).host;
  const payload = {
    host,
    key: KEY,
    keyLocation: `${ORIGIN}/${KEY}.txt`,
    urlList: urls,
  };
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  const body = (await res.text()).slice(0, 300);
  console.log(
    `IndexNow: submitted ${urls.length} URLs for ${host} -> ${res.status} (200/202 = accepted)`,
  );
  if (body) console.log(body);
  if (res.status !== 200 && res.status !== 202) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(`IndexNow failed: ${err.message}`);
  process.exitCode = 1;
});
