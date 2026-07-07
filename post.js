/* post.js — reads ?id= from URL, fetches posts.json, renders the post */

function formatDate(str) {
  const d = new Date(str);
  return d.toLocaleDateString('en-SG', { year: 'numeric', month: 'long', day: 'numeric' });
}

function renderPost(item) {
  document.title = `${item.title} — Winfield Chiew`;

  const isProject = item.type === 'project';
  const meta = isProject
    ? `<span class="post-category-badge">${item.category}</span><span class="post-date-label">${item.year}</span>`
    : `<span class="post-category-badge">${item.category}</span><span class="post-date-label">${formatDate(item.date)}</span>`;

  const container = document.getElementById('post-container');
  container.innerHTML = `
    <article class="post-page">
      <header class="post-header">
        <a href="index.html${isProject ? '#work' : '#writing'}" class="post-back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          ${isProject ? 'Back to work' : 'Back to writing'}
        </a>
        <div class="post-meta">${meta}</div>
        <h1 class="post-heading">${item.title}</h1>
        <p class="post-excerpt-lede">${item.excerpt}</p>
        <div class="post-divider"></div>
      </header>
      <div class="post-body" id="post-body"></div>
    </article>
  `;

  const bodyEl = document.getElementById('post-body');
  if (window.marked) {
    bodyEl.innerHTML = marked.parse(item.content);
  } else {
    bodyEl.textContent = item.content;
  }
}

function renderError(msg) {
  document.getElementById('post-container').innerHTML = `
    <div class="post-page">
      <a href="index.html" class="post-back">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Back home
      </a>
      <div class="post-error">
        <h2 class="post-error-title">Post not found</h2>
        <p class="post-error-desc">${msg}</p>
        <a href="index.html" class="btn-primary">Go home</a>
      </div>
    </div>
  `;
}

/* ── Theme (shared with main site) ──────────────────────────────── */

const sunSVG  = `<svg class="icon-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const moonSVG = `<svg class="icon-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  const icon = document.getElementById('theme-icon');
  if (icon) icon.innerHTML = dark ? sunSVG : moonSVG;
}

function initTheme() {
  const saved       = localStorage.getItem('wc-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved !== null ? saved === 'dark' : prefersDark);

  const btn = document.getElementById('theme-toggle');
  if (btn) btn.addEventListener('click', () => {
    const nowDark = document.documentElement.getAttribute('data-theme') === 'dark';
    applyTheme(!nowDark);
    localStorage.setItem('wc-theme', !nowDark ? 'dark' : 'light');
  });
}

function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
}

function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Boot ────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  setFooterYear();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    renderError('No post ID was provided in the URL.');
    return;
  }

  fetch('content.json')
    .then(r => {
      if (!r.ok) throw new Error('Could not load posts.');
      return r.json();
    })
    .then(posts => {
      const post = posts.find(p => p.id === id);
      if (!post) {
        renderError(`No post with id "${id}" was found.`);
        return;
      }
      renderPost(post);
    })
    .catch(err => renderError(err.message));
});
