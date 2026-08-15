// Shared RU/EN helpers for bilingual pages (recipes, coffee, dutch).
// Load before the page script. Provides globals: lang, t(), setLang(), applyLang().
// A page re-renders via its own render() or fullRender(), and syncs the URL via updateURL().
let lang = localStorage.getItem('lang') || 'ru';

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-back-label]').forEach(function (el) {
    el.textContent = lang === 'ru' ? 'На главную' : 'Home';
  });
  document.querySelectorAll('[data-aria-ru]').forEach(function (el) {
    el.setAttribute('aria-label', lang === 'ru' ? el.dataset.ariaRu : (el.dataset.ariaEn || el.dataset.ariaRu));
  });
}

function setLang(l) {
  lang = l;
  localStorage.setItem('lang', l);
  applyLang();
  if (typeof render === 'function') render();
  else if (typeof fullRender === 'function') fullRender();
  if (typeof updateURL === 'function') updateURL();
}

function t(o) {
  if (!o) return '';
  if (typeof o === 'string') return o;
  return o[lang] || o.ru || o.en || '';
}

applyLang();
