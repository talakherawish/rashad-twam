// One publication's page. The page itself is a stub generated from
// templates/publication.html; everything shown here comes from publications.json.

const root = document.body.dataset.root || '';
const pubId = Number(document.body.dataset.pub || new URLSearchParams(location.search).get('id'));
let pub = null;
let failed = false;

function fact(label, ...value) {
  return [el('dt', {}, label), el('dd', { dir: 'auto' }, ...value)];
}

// Abstracts may hold several paragraphs separated by blank lines.
function paragraphs(text, textLang) {
  return String(text).split(/\n\s*\n/).map((para) =>
    el('p', { lang: textLang, dir: textLang === 'ar' ? 'rtl' : 'ltr' }, para.trim()));
}

function renderPub() {
  $('.back').href = root + (lang === 'en' ? '?lang=en' : '') + '#pubs-h';

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

  $('.facts').replaceChildren(
    ...fact(t('venue'), ...linkOrgs(pub['venue_' + lang])),
    ...fact(t('date'), soon ? t('forthcoming') : pub['date_' + lang]),
    ...(pub.details ? fact(t('details'), pub.details) : []));

  // abstract_ar / abstract_en come from the publications sheet. Many exist
  // in Arabic only; show that rather than nothing.
  const other = lang === 'ar' ? 'en' : 'ar';
  const abstractLang = pub['abstract_' + lang] ? lang : pub['abstract_' + other] ? other : null;
  $('.abstract').hidden = !abstractLang;
  $('.abstract-text').replaceChildren(...(abstractLang
    ? paragraphs(pub['abstract_' + abstractLang], abstractLang) : []));

  const links = pub.links || [];
  $('.pub-links').replaceChildren(...links.map((href, i) =>
    externalLink(href, i ? `${t('link')} ${i + 1}` : t('openPublication'),
      { class: i ? 'pub-link' : 'pub-link primary' })));
}

document.addEventListener('langchange', renderPub);

/* ---------- Start ---------- */

setLang(initialLang());

fetch(root + 'publications.json')
  .then((r) => {
    if (!r.ok) throw new Error(r.status);
    return r.json();
  })
  .then((data) => {
    pub = data.find((p) => p.id === pubId) || null;
    failed = !pub;
    renderPub();
  })
  .catch(() => {
    failed = true;
    renderPub();
  });
