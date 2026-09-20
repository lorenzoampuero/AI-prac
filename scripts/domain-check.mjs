// Domain availability check via RDAP (registry data) — much stronger signal than DNS.
// 404 from rdap.org => domain not found in registry (very likely available to register).
// 200 => registered. Other statuses => inconclusive (rate limit, unsupported TLD).
// Run: node scripts/domain-check.mjs
const domains = [
  // Current brand: "AI Practice"
  'aipractice.com',
  'aipractice.app',
  'aipractice.dev',
  'aipractice.io',
  'aipractice.site',
  // Research finalists
  'aiskillslab.com',
  'aiskillslab.app',
  'ailiteracy.com',
  'promptgym.com',
  'promptgym.app',
  'aikata.com',
  'promptkata.com',
  'aidrills.com',
  'promptloop.com',
  'practicebench.com',
];

const HEADERS = {
  accept: 'application/rdap+json',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
};

function endpointsFor(domain) {
  const tld = domain.split('.').pop();
  const list = [];
  if (tld === 'com') list.push(`https://rdap.verisign.com/com/v1/domain/${domain}`);
  if (tld === 'app' || tld === 'dev') list.push(`https://www.registry.google/rdap/domain/${domain}`);
  if (tld === 'io' || tld === 'site') list.push(`https://rdap.identitydigital.services/rdap/domain/${domain}`);
  list.push(`https://rdap.org/domain/${domain}`);
  return list;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

for (const domain of domains) {
  let verdict = 'inconclusive';
  let detail = '';
  for (const url of endpointsFor(domain)) {
    try {
      const response = await fetch(url, { headers: HEADERS, redirect: 'follow' });
      if (response.status === 404) {
        verdict = 'AVAILABLE (not in registry)';
        detail = ` [via ${new URL(url).host}]`;
        break;
      }
      if (response.status === 200) {
        const data = await response.json().catch(() => null);
        const registrar = data?.entities
          ?.find((e) => e.roles?.includes('registrar'))
          ?.vcardArray?.[1]?.find((row) => row[0] === 'fn')?.[3];
        verdict = 'registered';
        detail = ` [via ${new URL(url).host}]${registrar ? ` (registrar: ${registrar})` : ''}`;
        break;
      }
      detail = ` (HTTP ${response.status} via ${new URL(url).host})`;
    } catch (error) {
      detail = ` (${error instanceof Error ? error.message : 'fetch failed'})`;
    }
    await sleep(250);
  }
  console.log(`${domain.padEnd(18)} ${verdict}${detail}`);
  await sleep(400);
}

console.log('\nNote: RDAP is a strong signal, not a guarantee. Confirm at a registrar and run a trademark screen before buying.');
