const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const htmlEl = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('bb-theme');
const preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  if (toggleBtn) {
    const checked = theme === 'light';
    toggleBtn.setAttribute('aria-checked', checked ? 'true' : 'false');
    toggleBtn.setAttribute('title', checked ? 'Switch to dark mode' : 'Switch to light mode');
  }
}

applyTheme(savedTheme || (preferredDark ? 'dark' : 'light'));

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const next = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('bb-theme', next);
  });
}

const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
}
