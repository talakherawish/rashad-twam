// All UI text, Arabic and English side by side.
const i18n = {
  ar: {
    pageTitle: 'د. رشاد توام',
    metaDescription: 'د. رشاد توام: مستشار قانوني، باحث وأستاذ جامعي. المدير العام لمركز قرار لأبحاث الشأن العام وعضو هيئة تدريس في جامعة بيرزيت.',
    photoAlt: 'د. رشاد توام',
    name: 'د. رشاد توام',
    title: 'مستشار قانوني · باحث · أستاذ جامعي',
    bio: 'متخصص في المقاربة القانونية متداخلة الحقول مع العلوم السياسية والعلاقات المدنية-العسكرية. المدير العام لمركز قرار لأبحاث الشأن العام، وعضو هيئة تدريس وباحث في جامعة بيرزيت منذ 2008. حاصل على الدكتوراه في القانون العام من جامعة تونس المنار (2018).',
    statPublished: 'عملاً منشوراً',
    statPeer: 'دراسة في مجلات محكّمة',
    statBooks: 'كتب تأليفاً وتحريراً',
    statYears: 'عاماً في جامعة بيرزيت',
    publications: 'المنشورات',
    tabAll: 'الكل',
    tabBooks: 'كتب',
    tabArticles: 'دراسات ومقالات',
    tabChapters: 'فصول ومداخل',
    tabPapers: 'أوراق عمل',
    tabTalks: 'مداخلات وإعلام',
    tabTeaching: 'تعليم وتقارير',
    newestFirst: 'الأحدث أولاً',
    oldestFirst: 'الأقدم أولاً',
    forthcoming: 'قيد النشر',
    with: 'مع',
    foreword: 'تقديم',
    link: 'رابط',
    showAll: 'عرض جميع المنشورات',
    loadError: 'تعذّر تحميل قائمة المنشورات.',
    experience: 'الخبرة',
    education: 'التعليم',
    contact: 'تواصل',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    copy: 'نسخ',
    copied: 'تم النسخ',
    whatsapp: 'واتساب',
    cvAr: 'السيرة الذاتية (عربي)',
    cvEn: 'السيرة الذاتية (إنجليزي)',
    qarar: 'مركز قرار',
    orcid: 'ORCID',
    academia: 'Academia',
    linkedin: 'LinkedIn',
    facebook: 'فيسبوك',
    youtube: 'يوتيوب',
  },
  en: {
    pageTitle: 'Dr. Rashad Twam',
    metaDescription: 'Dr. Rashad Twam: legal advisor, scholar and professor. General Director of Qarar Center for Public Affairs Research and faculty member at Birzeit University.',
    photoAlt: 'Dr. Rashad Twam',
    name: 'Dr. Rashad Twam',
    title: 'Legal Advisor · Scholar · Professor',
    bio: 'Specializing in interdisciplinary approaches to constitutional law, political science and civil-military relations. General Director of Qarar Center for Public Affairs Research and a faculty member and researcher at Birzeit University since 2008. PhD in Public Law, Tunis El-Manar University (2018).',
    statPublished: 'Published works',
    statPeer: 'Peer-reviewed articles',
    statBooks: 'Books, authored and edited',
    statYears: 'Years at Birzeit University',
    publications: 'Publications',
    tabAll: 'All',
    tabBooks: 'Books',
    tabArticles: 'Articles',
    tabChapters: 'Chapters & entries',
    tabPapers: 'Working papers',
    tabTalks: 'Talks & media',
    tabTeaching: 'Teaching & reports',
    newestFirst: 'Newest first',
    oldestFirst: 'Oldest first',
    forthcoming: 'Forthcoming',
    with: 'with',
    foreword: 'Foreword by',
    link: 'Link',
    showAll: 'Show all publications',
    loadError: 'The publications list could not be loaded.',
    experience: 'Experience',
    education: 'Education',
    contact: 'Contact',
    email: 'Email',
    phone: 'Phone',
    copy: 'Copy',
    copied: 'Copied',
    whatsapp: 'WhatsApp',
    cvAr: 'CV (Arabic)',
    cvEn: 'CV (English)',
    qarar: 'Qarar Center',
    orcid: 'ORCID',
    academia: 'Academia',
    linkedin: 'LinkedIn',
    facebook: 'Facebook',
    youtube: 'YouTube',
  },
};

const experience = [
  { ar: ['المدير العام', 'مركز قرار لأبحاث الشأن العام، رام الله', 'ديسمبر 2025 – الآن'],
    en: ['General Director', 'Qarar Center for Public Affairs Research, Ramallah', 'Dec 2025 – present'] },
  { ar: ['عضو هيئة تدريس وباحث', 'جامعة بيرزيت', '2008 – الآن'],
    en: ['Faculty member and researcher', 'Birzeit University', '2008 – present'] },
  { ar: ['مستشار قانوني للوزير', 'وزارة العدل، رام الله', '2014'],
    en: ['Legal Advisor to the Minister', 'Ministry of Justice, Ramallah', '2014'] },
  { ar: ['مستشار قانوني', 'المعهد القضائي الفلسطيني', '2013'],
    en: ['Legal Advisor', 'Palestinian Judicial Institute', '2013'] },
  { ar: ['منسق العيادة القانونية وعضو هيئة تدريس', 'جامعة الخليل', '2011 – 2013'],
    en: ['Legal Clinic Coordinator and Lecturer', 'Hebron University', '2011 – 2013'] },
  { ar: ['خبير قانوني انتخابي', 'Adam Smith International', '2026 – الآن'],
    en: ['Legal Electoral Expert', 'Adam Smith International', '2026 – present'] },
];

const education = [
  { ar: ['دكتوراه في القانون العام', 'جامعة تونس المنار', '2018'],
    en: ['PhD in Public Law', 'Tunis El-Manar University', '2018'] },
  { ar: ['ماجستير في الدراسات الدولية', 'جامعة بيرزيت', '2011'],
    en: ['MA in International Studies', 'Birzeit University', '2011'] },
  { ar: ['بكالوريوس في القانون', 'جامعة بيرزيت', '2008'],
    en: ['BA in Law', 'Birzeit University', '2008'] },
];

// Institutions: every mention in the bio, CV and publication venues links to its site.
const orgs = [
  ['https://qararcenter.org/', ['Qarar Center for Public Affairs Research', 'Qarar Center', 'مركز قرار لأبحاث الشأن العام', 'مركز قرار']],
  ['https://www.birzeit.edu/', ['Birzeit University', 'جامعة بيرزيت']],
  ['https://utm.rnu.tn/', ['Tunis El-Manar University', 'جامعة تونس المنار']],
  ['https://www.hebron.edu/', ['Hebron University', 'جامعة الخليل']],
  ['https://moj.pna.ps/', ['Ministry of Justice', 'وزارة العدل']],
  ['https://pji.pna.ps/', ['Palestinian Judicial Institute', 'المعهد القضائي الفلسطيني']],
  ['https://adamsmithinternational.com/', ['Adam Smith International']],
  ['https://84-13-77-162.sslip.io/', ['KARAMA Initiative', 'مبادرة كرامة']],
];

const orgUrl = new Map(orgs.flatMap(([url, names]) => names.map((n) => [n, url])));
// Longest names first so "Qarar Center for …" wins over "Qarar Center".
const orgPattern = new RegExp(
  '(' + [...orgUrl.keys()].sort((a, b) => b.length - a.length).join('|') + ')');

// Plain text -> text and links, for el(...children).
function linkOrgs(text) {
  return String(text).split(orgPattern).map((part, i) =>
    i % 2 ? externalLink(orgUrl.get(part), part, { class: 'org-link' }) : part);
}

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

let lang = 'ar';
let pubs = [];
const selected = new Set(); // empty = all
let newestFirst = true;
let expanded = false;

const $ = (sel) => document.querySelector(sel);
const t = (key) => i18n[lang][key];
const other = () => (lang === 'ar' ? 'en' : 'ar');

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v != null && v !== false) node.setAttribute(k, v);
  }
  node.append(...children.filter((c) => c != null && c !== ''));
  return node;
}

function externalLink(href, text, attrs = {}) {
  return el('a', { href, target: '_blank', rel: 'noopener', ...attrs }, text);
}

/* ---------- Language ---------- */

function initialLang() {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (fromUrl === 'ar' || fromUrl === 'en') return fromUrl;
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'ar' || saved === 'en') return saved;
  } catch (e) { /* storage blocked */ }
  return 'ar';
}

// Fill [data-both] once with both languages; CSS shows the active one.
document.querySelectorAll('[data-both]').forEach((node) => {
  const key = node.dataset.both;
  const fill = key === 'bio' ? linkOrgs : (text) => [text];
  node.replaceChildren(
    el('span', { lang: 'ar', dir: 'rtl' }, ...fill(i18n.ar[key])),
    el('span', { lang: 'en', dir: 'ltr' }, ...fill(i18n.en[key])));
});

function setLang(next) {
  lang = next;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = t('pageTitle');
  $('meta[name="description"]').content = t('metaDescription');
  const img = $('.photo img');
  if (img) img.alt = t('photoAlt');

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll('[data-label]').forEach((node) => {
    node.setAttribute('aria-label', t(node.dataset.label));
    node.title = t(node.dataset.label);
  });
  document.querySelectorAll('.lang-pill button').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
  });

  try { localStorage.setItem('lang', lang); } catch (e) { /* storage blocked */ }
  const url = new URL(location.href);
  if (lang === 'en') url.searchParams.set('lang', 'en'); else url.searchParams.delete('lang');
  history.replaceState(null, '', url);

  renderCv();
  renderSort();
  if (pubs.length) { renderFilters(); renderPubs(); }
}

/* ---------- Experience & education ---------- */

function renderCv() {
  for (const [id, items] of [['experience', experience], ['education', education]]) {
    $('#' + id).replaceChildren(...items.map((item) => {
      const [role, org, dates] = item[lang];
      return el('li', {},
        el('div', { class: 'role' }, role),
        el('div', { class: 'org', dir: 'auto' }, ...linkOrgs(org)),
        el('div', { class: 'dates' }, dates));
    }));
  }
}

/* ---------- Publications ---------- */

function groupsOf(key) {
  return filters.find(([k]) => k === key)[1];
}

function isShown(p) {
  if (!selected.size) return true;
  return [...selected].some((key) => groupsOf(key).includes(p.group));
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

// Turn the raw co-author field into "with …" / "Foreword by …" text.
function peopleLine(p) {
  let v = (p['coauthors_' + lang] || '').trim();
  if (!v) return '';
  if (/^(Foreword|تقديم)/.test(v)) {
    return t('foreword') + ' ' + v.replace(/^(Foreword|تقديم)\s*(بقلمي|بقلم)?\s*:?\s*/, '');
  }
  if (/^(Collective work|مؤلف جماعي)$/.test(v)) return v;
  v = v.replace(/^بالشراكة مع\s*/, '');
  return t('with') + ' ' + v;
}

function pubItem(p) {
  const soon = p.status === 'Forthcoming';
  const mainTitle = p['title_' + lang];
  const altTitle = p['title_' + other()];
  const links = p.links || [];

  const main = el('p', { class: 'main' },
    links[0] ? externalLink(links[0], mainTitle) : mainTitle);

  const meta = el('p', { class: 'meta' },
    el('span', { class: soon ? 'when soon' : 'when' }, soon ? t('forthcoming') : String(p.year || '')),
    ' · ', ...linkOrgs([p['venue_' + lang], peopleLine(p)].filter(Boolean).join(' · ')));
  links.slice(1).forEach((href, i) => {
    meta.append(externalLink(href, `${t('link')} ${i + 2}`, { class: 'extra' }));
  });

  return el('li', { class: 'pub', 'data-year': soon ? 'soon' : String(p.year || '') },
    main,
    altTitle ? el('p', { class: 'alt', lang: other(), dir: other() === 'ar' ? 'rtl' : 'ltr' }, altTitle) : null,
    meta);
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
  const chips = [chip(t('tabAll'), pubs.length, !selected.size, () => {
    selected.clear();
    update();
  })];
  for (const [key, groups] of filters) {
    const count = pubs.filter((p) => groups.includes(p.group)).length;
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

function renderPubs() {
  let list = sortPubs(pubs.filter(isShown));
  const limited = !selected.size && !expanded && list.length > ALL_LIMIT;
  if (limited) list = list.slice(0, ALL_LIMIT);
  $('.pub-list').replaceChildren(...list.map(pubItem));
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
  const showFinal = () => nums.forEach((n) => { n.textContent = values[n.dataset.stat]; });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) return showFinal();

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

/* ---------- Start ---------- */

document.querySelectorAll('.lang-pill button').forEach((b) => {
  b.addEventListener('click', () => setLang(b.dataset.lang));
});

document.querySelectorAll('.copy').forEach((b) => {
  b.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(b.dataset.copy);
    } catch (e) {
      // Older or locked-down browsers: copy through a hidden text field.
      const field = el('textarea', { readonly: '', style: 'position:fixed;opacity:0' });
      field.value = b.dataset.copy;
      document.body.append(field);
      field.select();
      const ok = document.execCommand('copy');
      field.remove();
      if (!ok) return; // the text is still on the page to select by hand
    }
    b.textContent = t('copied');
    b.classList.add('done');
    clearTimeout(b.timer);
    b.timer = setTimeout(() => {
      b.textContent = t('copy');
      b.classList.remove('done');
    }, 2000);
  });
});

// Every external link in the static HTML opens in a new tab.
document.querySelectorAll('a[href^="http"]').forEach((a) => {
  a.target = '_blank';
  a.rel = 'noopener';
});

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
