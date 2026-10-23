// Newest start date first.
const experience = [
  { ar: ['خبير قانوني انتخابي', 'Adam Smith International', '2026 – الآن'],
    en: ['Legal Electoral Expert', 'Adam Smith International', '2026 – present'] },
  { ar: ['المدير العام', 'مركز قرار لأبحاث الشأن العام، رام الله', 'ديسمبر 2025 – الآن'],
    en: ['General Director', 'Qarar Center for Public Affairs Research, Ramallah', 'Dec 2025 – present'] },
  { ar: ['مستشار قانوني للوزير', 'وزارة العدل، رام الله', '2014'],
    en: ['Legal Advisor to the Minister', 'Ministry of Justice, Ramallah', '2014'] },
  { ar: ['مستشار قانوني', 'المعهد القضائي الفلسطيني', '2013'],
    en: ['Legal Advisor', 'Palestinian Judicial Institute', '2013'] },
  { ar: ['منسق العيادة القانونية وعضو هيئة تدريس', 'جامعة الخليل', '2011 – 2013'],
    en: ['Legal Clinic Coordinator and Lecturer', 'Hebron University', '2011 – 2013'] },
  { ar: ['عضو هيئة تدريس وباحث', 'جامعة بيرزيت', '2008 – الآن'],
    en: ['Faculty member and researcher', 'Birzeit University', '2008 – present'] },
];

const education = [
  { ar: ['دكتوراه في القانون العام', 'جامعة تونس المنار', '2018'],
    en: ['PhD in Public Law', 'Tunis El-Manar University', '2018'] },
  { ar: ['ماجستير في الدراسات الدولية', 'جامعة بيرزيت', '2011'],
    en: ['MA in International Studies', 'Birzeit University', '2011'] },
  { ar: ['بكالوريوس في القانون', 'جامعة بيرزيت', '2008'],
    en: ['BA in Law', 'Birzeit University', '2008'] },
];

// Filters: key in i18n -> which `group` values belong to it
const filters = [
  ['tabBooks', ['books']],
  ['tabArticles', ['articles']],
  ['tabChapters', ['chapters']],
  ['tabPapers', ['papers']],
  ['tabTalks', ['talks']],
  ['tabTeaching', ['teaching', 'other']],
];

const FIRST_YEAR_AT_BIRZEIT = 2008;
const ALL_LIMIT = 10;
const CHECK_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

let pubs = [];
const selected = new Set(); // empty = all
let newestFirst = true;
let expanded = false;
let query = '';

document.addEventListener('langchange', () => {
  renderCv();
  renderSort();
  renderSearch();
  if (pubs.length) { renderFilters(); renderPubs(); }
});

/* ---------- Experience & education ---------- */

function renderCv() {
  for (const [id, items] of [['experience', experience], ['education', education]]) {
    $('#' + id).replaceChildren(...items.map((item) => {
      const [role, org, dates] = item[lang];
      return el('li', {},
        el('div', { class: 'dates' }, dates),
        el('div', { class: 'role' }, role),
        el('div', { class: 'org', dir: 'auto' }, ...linkOrgs(org)));
    }));
  }
}

/* ---------- Publications ---------- */

function groupsOf(key) {
  return filters.find(([k]) => k === key)[1];
}

function isShown(p) {
  if (!matchesQuery(p)) return false;
  if (!selected.size) return true;
  return [...selected].some((key) => groupsOf(key).includes(p.group));
}

/* ---------- Search ---------- */

const FOLD_LETTERS = { 'أ': 'ا', 'إ': 'ا', 'آ': 'ا', 'ٱ': 'ا', 'ى': 'ي', 'ة': 'ه', 'ؤ': 'و', 'ئ': 'ي' };
const DIACRITIC = /[ً-ٰٟـ]/;

// Folds case, Arabic diacritics and letter variants, so "اسرائيل" finds "إسرائيل".
// map[i] is the index in the original text of folded character i, for highlighting.
function foldMap(text) {
  let out = '';
  const map = [];
  const s = String(text);
  for (let i = 0; i < s.length; i++) {
    if (DIACRITIC.test(s[i])) continue;
    for (const c of FOLD_LETTERS[s[i]] || s[i].toLowerCase()) {
      out += c;
      map.push(i);
    }
  }
  return { out, map };
}

const fold = (text) => foldMap(text).out;

function queryWords() {
  return fold(query).split(/\s+/).filter(Boolean);
}

// Every field of a publication, both languages, links and DOIs included.
const searchText = new WeakMap();

function matchesQuery(p) {
  const words = queryWords();
  if (!words.length) return true;
  if (!searchText.has(p)) {
    const { id, group, ...fields } = p;
    searchText.set(p, fold(Object.values(fields).flat().join('\n')));
  }
  const text = searchText.get(p);
  return words.every((w) => text.includes(w));
}

// [start, end) ranges of the original text that match any word, merged.
function matchRanges(text, words) {
  const { out, map } = foldMap(text);
  const ranges = [];
  for (const w of words) {
    for (let at = out.indexOf(w); at !== -1; at = out.indexOf(w, at + 1)) {
      ranges.push([map[at], map[at + w.length - 1] + 1]);
    }
  }
  ranges.sort((a, b) => a[0] - b[0]);
  return ranges.reduce((merged, r) => {
    const last = merged[merged.length - 1];
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else merged.push(r);
    return merged;
  }, []);
}

// Plain text -> text and <mark>s, for el(...children).
function highlight(text, words = queryWords()) {
  text = String(text);
  if (!words.length) return [text];
  const parts = [];
  let pos = 0;
  for (const [start, end] of matchRanges(text, words)) {
    parts.push(text.slice(pos, start), el('mark', {}, text.slice(start, end)));
    pos = end;
  }
  parts.push(text.slice(pos));
  return parts.filter((part) => part !== '');
}

// Highlights inside linkOrgs(...) output too.
function highlightNodes(nodes) {
  return nodes.flatMap((node) => {
    if (typeof node === 'string') return highlight(node);
    node.replaceChildren(...highlight(node.textContent));
    return [node];
  });
}

// A short stretch of a long text around its first match.
function snippet(text, words) {
  text = String(text).replace(/\s+/g, ' ').trim();
  const [first] = matchRanges(text, words);
  if (!first || text.length <= 180) return highlight(text, words);
  let start = Math.max(0, first[0] - 60);
  let end = Math.min(text.length, first[1] + 120);
  // Cut at spaces, never through the match itself.
  if (start > 0) start = Math.min(first[0], text.indexOf(' ', start) + 1 || start);
  if (end < text.length) end = Math.max(first[1], text.lastIndexOf(' ', end));
  return [start > 0 ? '…' : '', ...highlight(text.slice(start, end), words), end < text.length ? '…' : '']
    .filter((part) => part !== '');
}

// Fields the list row doesn't show, in the order worth surfacing.
function hiddenFields(p) {
  const other = lang === 'ar' ? 'en' : 'ar';
  return [
    ['', p['title_' + other]],
    [t('abstract'), p['abstract_' + lang]],
    [t('abstract'), p['abstract_' + other]],
    [t('details'), p.details],
    [t('link'), (p.links || []).join(' ')],
    [t('venue'), p['venue_' + other]],
    ['', p['coauthors_' + other]],
    ['', [p['category_' + lang], p['category_' + other]].join(' · ')],
    [t('date'), [p['date_' + lang], p['date_' + other]].join(' · ')],
  ].filter(([, value]) => value);
}

// One line per hidden field holding a word the visible row doesn't.
function hitLines(p, visibleText) {
  const words = queryWords();
  const shown = fold(visibleText);
  let missing = words.filter((w) => !shown.includes(w));
  const lines = [];
  for (const [label, value] of hiddenFields(p)) {
    if (!missing.length) break;
    const folded = fold(value);
    const found = missing.filter((w) => folded.includes(w));
    if (!found.length) continue;
    missing = missing.filter((w) => !found.includes(w));
    lines.push(el('p', { class: 'hit' },
      label ? el('span', { class: 'hit-label' }, label + ': ') : null,
      el('span', { dir: 'auto' }, ...snippet(value, words))));
  }
  return lines;
}

// Forthcoming counts as the newest; ties keep the JSON order.
function sortPubs(list) {
  const rank = (p) => (p.status === 'Forthcoming' ? 9999 : p.year || 0);
  const dir = newestFirst ? -1 : 1;
  return list
    .map((p, i) => [p, i])
    .sort(([a, ai], [b, bi]) => dir * (rank(a) - rank(b)) || ai - bi)
    .map(([p]) => p);
}

function pubItem(p) {
  const soon = p.status === 'Forthcoming';
  // The title opens the publication's own page, which holds its links.
  const main = el('p', { class: 'main' },
    el('a', { href: pubPath(p) }, ...highlight(p['title_' + lang])));

  const when = soon ? t('forthcoming') : String(p.year || '');
  const meta = el('p', { class: 'meta' },
    el('span', { class: soon ? 'when soon' : 'when' }, ...highlight(when)),
    ' · ', ...highlightNodes(linkOrgs([p['venue_' + lang], peopleLine(p)].filter(Boolean).join(' · '))));

  const hits = query.trim() ? hitLines(p, main.textContent + ' ' + meta.textContent) : [];

  return el('li', { class: 'pub', 'data-year': soon ? 'soon' : String(p.year || '') },
    main,
    meta,
    ...hits);
}

function chip(label, count, pressed, onClick) {
  const b = el('button', { type: 'button', class: 'chip', 'aria-pressed': String(pressed) });
  if (pressed && label !== t('tabAll')) b.insertAdjacentHTML('beforeend', CHECK_ICON);
  b.append(label, el('span', { class: 'count' }, String(count)));
  b.addEventListener('click', onClick);
  return b;
}

function renderFilters() {
  const scroll = $('.filters').scrollLeft;
  const found = pubs.filter(matchesQuery);
  const chips = [chip(t('tabAll'), found.length, !selected.size, () => {
    selected.clear();
    update();
  })];
  for (const [key, groups] of filters) {
    const count = found.filter((p) => groups.includes(p.group)).length;
    chips.push(chip(t(key), count, selected.has(key), () => {
      selected.has(key) ? selected.delete(key) : selected.add(key);
      update();
    }));
  }
  $('.filters').replaceChildren(...chips);
  $('.filters').scrollLeft = scroll;
}

function renderSort() {
  $('.sort span').textContent = t(newestFirst ? 'newestFirst' : 'oldestFirst');
  $('.sort').setAttribute('aria-label', t(newestFirst ? 'newestFirst' : 'oldestFirst'));
}

function renderSearch() {
  const input = $('.search input');
  input.placeholder = t('searchPubs');
  input.setAttribute('aria-label', t('searchPubs'));
}

function renderPubs() {
  let list = sortPubs(pubs.filter(isShown));
  // A search shows every match.
  const limited = !selected.size && !query.trim() && !expanded && list.length > ALL_LIMIT;
  if (limited) list = list.slice(0, ALL_LIMIT);
  $('.pub-list').replaceChildren(...(list.length
    ? list.map(pubItem)
    : [el('li', { class: 'pub-error' }, t('noResults'))]));
  $('.show-all').hidden = !limited;

  // Start the counter on the list's first real year without rolling to it.
  const firstYear = list.find((p) => p.status !== 'Forthcoming' && p.year);
  if (firstYear) {
    odo.classList.add('instant');
    setDigits(String(firstYear.year));
    odo.offsetHeight; // apply before re-enabling the transition
    odo.classList.remove('instant');
  }
  updateYear();
}

function update() {
  renderFilters();
  renderPubs();
}

$('.sort').addEventListener('click', () => {
  newestFirst = !newestFirst;
  renderSort();
  renderPubs();
});

$('.search input').addEventListener('input', (e) => {
  query = e.target.value;
  update();
});

$('.search input').addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && e.target.value) {
    e.target.value = '';
    query = '';
    update();
  }
});

$('.show-all').addEventListener('click', () => {
  expanded = true;
  renderPubs();
});

/* ---------- Sticky year with rolling digits ---------- */

const odo = $('.odo');
const rail = $('.year-rail');
const digits = [0, 1, 2, 3].map(() => {
  const strip = el('span', { class: 'strip' },
    ...Array.from({ length: 10 }, (_, n) => el('span', {}, String(n))));
  odo.append(el('span', { class: 'digit' }, strip));
  return strip;
});

function setDigits(year) {
  [...year].forEach((d, i) => {
    digits[i].style.transform = `translateY(-${d}em)`;
  });
}

function showYear(value) {
  rail.classList.toggle('soon', value === 'soon');
  $('.year-note').textContent = t('forthcoming');
  if (/^\d{4}$/.test(value)) setDigits(value);
}

// The year of the first row still visible under the sticky year.
function updateYear() {
  const line = rail.getBoundingClientRect().bottom;
  const rows = document.querySelectorAll('.pub');
  let current = rows[0];
  for (const row of rows) {
    current = row;
    if (row.getBoundingClientRect().bottom > line) break;
  }
  if (current) showYear(current.dataset.year);
}

let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { updateYear(); ticking = false; });
}, { passive: true });
addEventListener('resize', updateYear);

/* ---------- Numbers band ---------- */

function renderStats() {
  const published = pubs.filter((p) => p.status === 'Published');
  const values = {
    published: published.length,
    peer: published.filter((p) => p.category_en === 'Peer-reviewed article').length,
    books: published.filter((p) => p.group === 'books').length,
    years: new Date().getFullYear() - FIRST_YEAR_AT_BIRZEIT,
  };
  const nums = [...document.querySelectorAll('[data-stat]')];
  // Final values stay in place until the count-up actually starts, so
  // anything reading the page early (or with no animation) sees the real numbers.
  nums.forEach((n) => { n.textContent = values[n.dataset.stat]; });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) return;

  const countUp = () => {
    const start = performance.now();
    const duration = 1500;
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      nums.forEach((n) => { n.textContent = Math.round(values[n.dataset.stat] * eased); });
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      observer.disconnect();
      countUp();
    }
  }, { threshold: 0.4 });
  observer.observe($('.stats'));
}

/* ---------- Email ---------- */

// Laptops often have no mail app set up, so mailto: does nothing there.
// Open Gmail's compose window instead, and copy the address for everyone else.
const EMAIL = 'rashad.twam@gmail.com';
const emailLink = $('a[data-label="email"]');
if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  emailLink.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + EMAIL;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    // Older or locked-down browsers: copy through a hidden text field.
    const field = el('textarea', { readonly: '', style: 'position:fixed;opacity:0' });
    field.value = text;
    document.body.append(field);
    field.select();
    const ok = document.execCommand('copy');
    field.remove();
    return ok;
  }
}

const toast = $('.toast');
emailLink.addEventListener('click', async () => {
  if (!(await copyText(EMAIL))) return;
  toast.replaceChildren(t('emailCopied') + ' ', el('span', { dir: 'ltr' }, EMAIL));
  toast.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => toast.classList.remove('show'), 3000);
});

/* ---------- Start ---------- */

setLang(initialLang());

fetch('publications.json')
  .then((r) => {
    if (!r.ok) throw new Error(r.status);
    return r.json();
  })
  .then((data) => {
    pubs = data;
    renderStats();
    update();
  })
  .catch(() => {
    $('.pub-list').replaceChildren(el('li', { class: 'pub-error' }, t('loadError')));
  });
