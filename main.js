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
    tabArticles: 'دراسات ومقالات محكّمة',
    tabChapters: 'فصول ومداخل موسوعية',
    tabPapers: 'أوراق عمل',
    tabTalks: 'مداخلات وبودكاست ومقالات صحفية',
    tabTeaching: 'مواد تعليمية وتقارير وغيرها',
    forthcoming: 'قيد النشر',
    with: 'مع',
    foreword: 'تقديم',
    link: 'رابط',
    showAll: 'عرض جميع المنشورات',
    loadError: 'تعذّر تحميل قائمة المنشورات.',
    experience: 'الخبرة',
    education: 'التعليم',
    contact: 'تواصل',
    whatsapp: 'واتساب',
    cvAr: 'السيرة الذاتية (عربي)',
    cvEn: 'CV (English)',
    qarar: 'مركز قرار',
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
    tabArticles: 'Peer-reviewed & journal articles',
    tabChapters: 'Chapters & encyclopedia entries',
    tabPapers: 'Working papers',
    tabTalks: 'Talks, podcasts & press',
    tabTeaching: 'Teaching, reports & other',
    forthcoming: 'Forthcoming',
    with: 'with',
    foreword: 'Foreword by',
    link: 'Link',
    showAll: 'Show all publications',
    loadError: 'The publications list could not be loaded.',
    experience: 'Experience',
    education: 'Education',
    contact: 'Contact',
    whatsapp: 'WhatsApp',
    cvAr: 'Arabic CV',
    cvEn: 'English CV',
    qarar: 'Qarar Center',
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

// Filter tabs: key in i18n -> which `group` values belong to it (null = all)
const tabs = [
  ['tabAll', null],
  ['tabBooks', ['books']],
  ['tabArticles', ['articles']],
  ['tabChapters', ['chapters']],
  ['tabPapers', ['papers']],
  ['tabTalks', ['talks']],
  ['tabTeaching', ['teaching', 'other']],
];

const FIRST_YEAR_AT_BIRZEIT = 2008;
const ALL_TAB_LIMIT = 10;

let lang = 'ar';
let pubs = [];
let activeTab = 'tabAll';
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
  document.querySelectorAll('.lang-switch button').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
  });

  try { localStorage.setItem('lang', lang); } catch (e) { /* storage blocked */ }
  const url = new URL(location.href);
  if (lang === 'en') url.searchParams.set('lang', 'en'); else url.searchParams.delete('lang');
  history.replaceState(null, '', url);

  renderCv();
  if (pubs.length) { renderTabs(); renderPubs(); }
}

/* ---------- Experience & education ---------- */

function renderCv() {
  for (const [id, items] of [['experience', experience], ['education', education]]) {
    $('#' + id).replaceChildren(...items.map((item) => {
      const [role, org, dates] = item[lang];
      return el('li', {},
        el('div', { class: 'role' }, role),
        el('div', { class: 'org', dir: 'auto' }, org),
        el('div', { class: 'dates' }, dates));
    }));
  }
}

/* ---------- Publications ---------- */

function inTab(p, key) {
  const groups = tabs.find(([k]) => k === key)[1];
  return !groups || groups.includes(p.group);
}

// Forthcoming first, then newest year first; ties keep the JSON order.
function sortPubs(list) {
  return list
    .map((p, i) => [p, i])
    .sort(([a, ai], [b, bi]) => {
      const af = a.status === 'Forthcoming', bf = b.status === 'Forthcoming';
      if (af !== bf) return af ? -1 : 1;
      return (b.year || 0) - (a.year || 0) || ai - bi;
    })
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

  const meta = el('p', { class: 'meta' }, [p['venue_' + lang], peopleLine(p)].filter(Boolean).join(' · '));
  links.slice(1).forEach((href, i) => {
    meta.append(externalLink(href, `${t('link')} ${i + 2}`, { class: 'extra' }));
  });

  return el('li', { class: 'pub' },
    el('div', { class: soon ? 'year soon' : 'year' }, soon ? t('forthcoming') : String(p.year || '')),
    el('div', {},
      main,
      altTitle ? el('p', { class: 'alt', lang: other(), dir: other() === 'ar' ? 'rtl' : 'ltr' }, altTitle) : null,
      meta));
}

function renderTabs() {
  $('.tabs').replaceChildren(...tabs.map(([key]) => {
    const count = pubs.filter((p) => inTab(p, key)).length;
    const b = el('button', { type: 'button', 'aria-pressed': String(key === activeTab) },
      t(key) + ' ', el('span', { class: 'count' }, `(${count})`));
    b.addEventListener('click', () => {
      activeTab = key;
      renderTabs();
      renderPubs();
    });
    return b;
  }));
}

function renderPubs() {
  let list = sortPubs(pubs.filter((p) => inTab(p, activeTab)));
  const limited = activeTab === 'tabAll' && !expanded && list.length > ALL_TAB_LIMIT;
  if (limited) list = list.slice(0, ALL_TAB_LIMIT);
  $('.pub-list').replaceChildren(...list.map(pubItem));
  $('.show-all').hidden = !limited;
}

$('.show-all').addEventListener('click', () => {
  expanded = true;
  renderPubs();
});

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

document.querySelectorAll('.lang-switch button').forEach((b) => {
  b.addEventListener('click', () => setLang(b.dataset.lang));
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
    renderTabs();
    renderPubs();
  })
  .catch(() => {
    $('.pub-list').replaceChildren(el('li', { class: 'pub-error' }, t('loadError')));
  });
