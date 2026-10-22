// Shared by the home page (main.js) and the publication pages (publication.js).

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
    allPublications: 'جميع المنشورات',
    openPublication: 'فتح المنشور',
    abstract: 'الملخص',
    venue: 'جهة النشر',
    date: 'التاريخ',
    details: 'تفاصيل',
    pubNotFound: 'تعذّر العثور على هذا المنشور.',
    showAll: 'عرض جميع المنشورات',
    loadError: 'تعذّر تحميل قائمة المنشورات.',
    experience: 'الخبرة',
    education: 'التعليم',
    contact: 'تواصل',
    email: 'البريد الإلكتروني',
    emailCopied: 'تم نسخ البريد الإلكتروني:',
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
    allPublications: 'All publications',
    openPublication: 'Open publication',
    abstract: 'Abstract',
    venue: 'Published in',
    date: 'Date',
    details: 'Details',
    pubNotFound: 'This publication could not be found.',
    showAll: 'Show all publications',
    loadError: 'The publications list could not be loaded.',
    experience: 'Experience',
    education: 'Education',
    contact: 'Contact',
    email: 'Email',
    emailCopied: 'Email address copied:',
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

let lang = 'ar';

const $ = (sel) => document.querySelector(sel);
const t = (key) => i18n[lang][key];

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

// Pages listen for 'langchange' to re-render their own parts.
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
  document.dispatchEvent(new Event('langchange'));
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

// A publication's own page, relative to the site root (built by scripts/build-pages.js).
function pubPath(p) {
  return `p/${p.id}/` + (lang === 'en' ? '?lang=en' : '');
}

/* ---------- Language switch ---------- */

document.querySelectorAll('.lang-pill button').forEach((b) => {
  b.addEventListener('click', () => setLang(b.dataset.lang));
});

// Every external link in the static HTML opens in a new tab.
document.querySelectorAll('a[href^="http"]').forEach((a) => {
  a.target = '_blank';
  a.rel = 'noopener';
});
