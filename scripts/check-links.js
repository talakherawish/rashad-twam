// Checks every publication link and writes the result to broken-links.md.
//
//   node scripts/check-links.js
//
// Run it now and then, or after adding links, and commit broken-links.md so
// the list of dead links stays in the repo. "Dead" means the site answered
// that the page is gone (404/410) or the domain no longer exists. "Unsure"
// means the site blocked the check or didn't answer; open those by hand.

const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '..');
const pubs = JSON.parse(fs.readFileSync(path.join(base, 'publications.json'), 'utf8'));
const outFile = path.join(base, 'broken-links.md');

const TIMEOUT = 20000;
const PARALLEL = 8;
const HEADERS = { 'User-Agent': 'Mozilla/5.0 (link check for the Rashad Twam website)' };

async function check(url) {
  try {
    const res = await fetch(url, { headers: HEADERS, redirect: 'follow', signal: AbortSignal.timeout(TIMEOUT) });
    res.body?.cancel();
    if (res.ok) return { state: 'ok' };
    if (res.status === 404 || res.status === 410) return { state: 'dead', why: `HTTP ${res.status}` };
    return { state: 'unsure', why: `HTTP ${res.status}` };
  } catch (e) {
    const code = e.cause?.code || e.name;
    if (code === 'ENOTFOUND') return { state: 'dead', why: 'domain not found' };
    return { state: 'unsure', why: code === 'TimeoutError' ? 'no answer' : code };
  }
}

async function main() {
  const jobs = pubs.flatMap((p) => (p.links || []).map((url) => ({ p, url })));
  let next = 0;
  async function worker() {
    while (next < jobs.length) {
      const job = jobs[next++];
      Object.assign(job, await check(job.url));
    }
  }
  await Promise.all(Array.from({ length: PARALLEL }, worker));

  const row = ({ p, url, why }) => `| ${p.id} | ${p.title_en.replace(/\|/g, '/')} | ${url} | ${why} |`;
  const table = (list) => list.length
    ? ['| # | Publication | Link | Result |', '|---|---|---|---|', ...list.map(row)].join('\n')
    : 'None.';
  const dead = jobs.filter((j) => j.state === 'dead');
  const unsure = jobs.filter((j) => j.state === 'unsure');

  fs.writeFileSync(outFile, [
    '# Broken links',
    '',
    `Checked ${jobs.length} links on ${new Date().toISOString().slice(0, 10)} with \`node scripts/check-links.js\`.`,
    '',
    `## Dead (${dead.length})`,
    '',
    'The page is gone. Find a new link and update publications.json.',
    '',
    table(dead),
    '',
    `## Unsure (${unsure.length})`,
    '',
    'The site blocked the check or didn\'t answer. Usually fine; open them in a browser to be sure.',
    '',
    table(unsure),
    '',
  ].join('\n'));

  console.log(`${jobs.length} links: ${dead.length} dead, ${unsure.length} unsure. See broken-links.md`);
}

main();
