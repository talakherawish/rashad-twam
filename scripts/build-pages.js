// Builds one small page per publication: p/<id>/index.html.
//
//   node scripts/build-pages.js
//
// Run it after editing publications.json, then commit the p/ folder. Each page
// is templates/publication.html with that publication's title filled in, so
// link previews (WhatsApp, Facebook, search engines) show the right title.
// The visible content is drawn in the browser from publications.json, so
// fixing a typo there only needs a rebuild if the title or venue changed.

const fs = require('fs');
const path = require('path');

const SITE = 'https://talakherawish.github.io/rashad-twam/';
const base = path.join(__dirname, '..');
const template = fs.readFileSync(path.join(base, 'templates', 'publication.html'), 'utf8');
const pubs = JSON.parse(fs.readFileSync(path.join(base, 'publications.json'), 'utf8'));
const outDir = path.join(base, 'p');

const escape = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Start clean so deleted publications don't leave pages behind.
fs.rmSync(outDir, { recursive: true, force: true });

for (const p of pubs) {
  // Preview title in Arabic (the site's default language), description in
  // English, so a shared link reads well for either audience.
  const description = [p.title_en, p.venue_en].filter(Boolean).join(' · ');
  const values = {
    id: p.id,
    root: '../../',
    title: escape(p.title_ar || p.title_en),
    description: escape(description),
    url: `${SITE}p/${p.id}/`,
  };
  const html = template
    .replace(/<!-- Template for every publication page[\s\S]*?-->\n/, '')
    .replace(/\{\{(\w+)\}\}/g, (m, key) => (key in values ? values[key] : m));

  const dir = path.join(outDir, String(p.id));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

console.log(`Built ${pubs.length} publication pages in p/`);
