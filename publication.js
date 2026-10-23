// One publication's page. The page itself is a stub generated from
// templates/publication.html; everything shown here comes from publications.json.

const root = document.body.dataset.root || '';
const pubId = Number(document.body.dataset.pub || new URLSearchParams(location.search).get('id'));
let pubs = [];
let pub = null;
let failed = false;
let abstractOpen = false;

// Abstracts longer than this start folded behind "Read more".
const FOLD_AT = 900;
const ARROW_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';
const CHEVRON_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';

function fact(label, ...value) {
  return [el('dt', {}, label), el('dd', { dir: 'auto' }, ...value)];
}

// Abstracts may hold several paragraphs separated by blank lines.
function paragraphs(text, textLang) {
  return String(text).split(/\n\s*\n/).map((para) =>
    el('p', { lang: textLang, dir: textLang === 'ar' ? 'rtl' : 'ltr' }, para.trim()));
}

const pubHref = (p) => root + pubPath(p);

// "Newer" points back toward the start of the line, "older" onward, as in the list.
function navLink(p, key) {
  const a = el('a', { class: 'pub-nav-link ' + key, href: pubHref(p) },
    el('span', { class: 'pub-nav-label' }, t(key)),
    el('span', { class: 'pub-nav-title', dir: 'auto' }, p['title_' + lang]));
  a.insertAdjacentHTML('afterbegin', CHEVRON_ICON);
  return a;
}

function renderAbstract() {
  // abstract_ar / abstract_en come from the publications sheet. Many exist
  // in Arabic only; show that rather than nothing, and say so.
  const other = lang === 'ar' ? 'en' : 'ar';
  const abstractLang = pub['abstract_' + lang] ? lang : pub['abstract_' + other] ? other : null;
  $('.abstract').hidden = !abstractLang;
  if (!abstractLang) return;

  const text = pub['abstract_' + abstractLang];
  $('.abstract h2').textContent = t(abstractLang === lang ? 'abstract' : 'abstractOther');
  $('.abstract-text').replaceChildren(...paragraphs(text, abstractLang));
  $('.abstract-text p')?.classList.add('lead');

  const long = text.length > FOLD_AT;
  $('.abstract-text').classList.toggle('folded', long && !abstractOpen);
  $('.read-more').hidden = !long;
  $('.read-more').textContent = t(abstractOpen ? 'readLess' : 'readMore');
  $('.read-more').setAttribute('aria-expanded', String(abstractOpen));
}

function renderNav() {
  const order = sortPubs(pubs);
  const at = order.indexOf(pub);
  const newer = order[at - 1];
  const older = order[at + 1];
  $('.pub-nav').replaceChildren(
    ...[newer && navLink(newer, 'newer'), older && navLink(older, 'older')].filter(Boolean));

  // Same kind, closest in time, leaving out the two neighbours already linked.
  const near = (p) => Math.abs((p.year || 9999) - (pub.year || 9999));
  const related = pubs
    .filter((p) => p !== pub && p !== newer && p !== older && p.group === pub.group)
    .sort((a, b) => near(a) - near(b))
    .slice(0, 3);
  $('.related').hidden = !related.length;
  $('.related-list').replaceChildren(...related.map((p) => el('li', {},
    el('a', { href: pubHref(p), dir: 'auto' }, p['title_' + lang]),
    el('p', { class: 'meta' },
      el('span', { class: 'when' }, p.status === 'Forthcoming' ? t('forthcoming') : String(p.year || '')),
      p['venue_' + lang] ? ' · ' + p['venue_' + lang] : ''))));
}

function renderPub() {
  $('.back').href = root + (lang === 'en' ? '?lang=en' : '') + '#pubs-h';
  $('.masthead .home').href = root + (lang === 'en' ? '?lang=en' : '');

  if (!pub) {
    if (failed) $('.pub-title').textContent = t('pubNotFound');
    return;
  }

  const soon = pub.status === 'Forthcoming';
  const title = pub['title_' + lang];
  document.title = `${title} · ${t('name')}`;
  $('meta[name="description"]').content = [title, pub['venue_' + lang]].filter(Boolean).join(' · ');

  $('.kicker').textContent = pub['category_' + lang];
  $('.pub-title').textContent = title;
  $('.byline').replaceChildren(...linkOrgs(peopleLine(pub)));
  $('.byline').hidden = !$('.byline').textContent;

  const links = pub.links || [];
  $('.pub-links').hidden = !links.length;
  $('.pub-links').replaceChildren(...links.map((href, i) => {
    const a = externalLink(href, i ? `${t('link')} ${i + 1}` : t('openPublication'),
      { class: i ? 'pub-link' : 'pub-link primary' });
    a.insertAdjacentHTML('beforeend', ARROW_ICON);
    return a;
  }));

  $('.facts-year').textContent = soon ? t('forthcoming') : String(pub.year || '');
  $('.facts-year').classList.toggle('soon', soon);
  $('.facts').replaceChildren(
    ...(pub['venue_' + lang] ? fact(t('venue'), ...linkOrgs(pub['venue_' + lang])) : []),
    ...(soon ? [] : fact(t('date'), pub['date_' + lang])),
    ...(pub.details ? fact(t('details'), pub.details) : []));

  renderAbstract();
  renderNav();
}

$('.read-more').addEventListener('click', () => {
  abstractOpen = !abstractOpen;
  renderAbstract();
  // Folding back up: bring the heading into view instead of leaving the reader far below.
  if (!abstractOpen) $('.abstract').scrollIntoView({ block: 'start' });
});

document.addEventListener('langchange', renderPub);

/* ---------- Start ---------- */

setLang(initialLang());

fetch(root + 'publications.json')
  .then((r) => {
    if (!r.ok) throw new Error(r.status);
    return r.json();
  })
  .then((data) => {
    pubs = data;
    pub = data.find((p) => p.id === pubId) || null;
    failed = !pub;
    renderPub();
  })
  .catch(() => {
    failed = true;
    renderPub();
  })
  .finally(() => {
    reveal(document.querySelectorAll(
      'article > :not([hidden]), .pub-nav, .related:not([hidden]), .contact h2, .icons li'));
  });
