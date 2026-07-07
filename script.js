/* ── Data ────────────────────────────────────────────────────────── */

const PROJECTS_SHOWN = 3;
const POSTS_SHOWN    = 3;
const CERTS_SHOWN    = 4;

// projects and posts loaded from content.json
let projects = [];
let posts = [];

const certifications = [
  { name: 'Associate Developer (ODC)',          issuer: 'OutSystems',                  date: 'Sep 2025', status: 'active',  verifyUrl: 'https://www.outsystems.com/profile/e5vit2r4ax/achievements/' },
  { name: 'Google Project Management: Specialization',   issuer: 'Google / Coursera',           date: 'Aug 2025', status: 'active',  verifyUrl: 'https://coursera.org/share/9454b781b1c93bfcf322a8979c855536' },
  { name: 'iInnovate: New Edition',                  issuer: 'Singapore Pools',  date: 'Oct 2025', status: 'active',  verifyUrl: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fwww.credly.com%2Fbadges%2Fa39f12e7-89bc-4b21-90ef-c3ff07dac514%2Fpublic_url&urlhash=nESQ&mt=nX-28NLM1fUMRKfp6ZaNuCCWdSjdUFP8KXHDYQHrk874QxpBLZBAHNiqF4dU0--O2xBYUecKl4sd9nqiHOIaL2K1RZY&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BQDXgUUixRl6Mw8sdhTA5qw%3D%3D' },
  { name: 'Programming with JavaScript',           issuer: 'Meta / Coursera',               date: 'May 2024', status: 'active',  verifyUrl: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fwww.coursera.org%2Faccount%2Faccomplishments%2Frecords%2FXBZP7YRBXFU6&urlhash=MObA&mt=2l9gdUFURhrBRg1sXXLz8JKfqnw_rm4V0R4HtjRok1zbPNMVN0VcgqcLm07N7zQhTVvuQp8d8aLb1g8LOmrbpCZ36Yo&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BQDXgUUixRl6Mw8sdhTA5qw%3D%3D' },
  { name: 'SAS - Asia Pacific University of Technology and Innovation Joint Certificate in Computer Science and Data Analytics',           issuer: 'SAS',               date: 'Dec 2023', status: 'active',  verifyUrl: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fwww.credly.com%2Fbadges%2F1ee96604-3226-4c9c-b1e1-a70097e725a5%2Flinked_in_profile&urlhash=bWZu&mt=gaKs7KII_67chEsPt9p1JmgsKIJhx6wA5vTBTjezQ10dahuCb674Nl4TXNetcqAd66ZNHRr0CdgZC_yGHG6rgTfgq0Y&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BW7BKdn3kQWu7PXknDepW2A%3D%3D' }
];

const experience = [
  {
    role: 'Digital Solutions, Data & AI',
    company: 'TOUCH Community Services Limited',
    period: 'Nov 2025 – Present',
    type: 'Full-time',
    country: 'Singapore',
    desc: "Work across a broad scope within the Technology, Infrastructure & Digitalisation Department, spanning IT support, software development, data analytics, and AI. Build and maintain data dashboards and reports to support decision-making across the organisation. Develop and manage solutions on the Microsoft Power Platform, including CRM systems on Dynamics 365. Explore and implement AI tooling to improve internal workflows and processes. Also take on project management responsibilities, coordinating cross-functional initiatives and supporting digital transformation efforts across the organisation.",
    tags: ['OutSystems', 'Power Platform', 'Power BI', 'Power Automate', 'Dynamics 365', 'Business Central', 'Data Analytics', 'AI', 'Project Management']
  },
  {
    role: 'BI Developer & IT Analyst',
    company: 'Synergy House Berhad',
    period: 'Nov 2023 – Apr 2025',
    type: 'Full Time',
    country: 'Malaysia',
    desc: 'Wore multiple hats across business intelligence, system administration, and IT support. Designed and maintained Power BI dashboards and data models that improved reporting efficiency and decision-making across departments. Managed Microsoft Dynamics 365 Business Central as administrator, overseeing system migration and configuration. Also drove automation in project workflows, led internal training sessions, and provided day-to-day technical support.',
    tags: ['Power BI', 'Business Central', 'Data Analytics', 'System Administration', 'Technical Support']
  },
  {
    role: 'Data Analyst',
    company: 'StatWorks Group',
    period: 'Aug 2022 – Nov 2022',
    type: 'Intern',
    country: 'Malaysia',
    desc: 'Gained hands-on experience across data analytics and business intelligence during this internship. Built Power BI dashboards for both internal and client-facing use, supporting faster and more informed decision-making. Conducted web scraping and data aggregation to assist with competitive market analysis. Also explored HCL Volt MX for mobile and web application development, and contributed to documentation for tender and project bidding processes.',
    tags: ['Power BI', 'Web Scrapping', 'Market Analysis', 'HCL Volt MX']
  }
];

const education = [
  {
    degree: 'Bachelor of Computer Science with Specialism in Data Analytics',
    institution: 'Asia Pacific University of Technology & Innovation',
    period: '2020 – 2023',
    desc: '[Brief description or notable achievements. Replace with your actual education.]'
  }
];

const courses = [
  { title: 'Machine Learning Specialization',         provider: 'Coursera / DeepLearning.AI', status: 'completed',   year: '2024' },
  { title: 'CS50: Introduction to Computer Science',  provider: 'Harvard / edX',              status: 'completed',   year: '2023' },
  { title: 'Building AI Applications with LangChain', provider: 'Udemy',                      status: 'in-progress', year: '2025' }
];

const skills = [
  { category: 'Programming',                  desc: 'Languages I reach for when building tools, pipelines, and automations.',       items: ['Python', 'JavaScript', 'AL', 'HTML/CSS', 'SQL'] },
  { category: 'Analytics & BI',               desc: 'Turning raw data into dashboards and stories stakeholders can act on.',        items: ['Power BI', 'Power Query', 'Microsoft Fabric', 'SSRS'] },
  { category: 'Cloud & DevOps',               desc: 'Deploying and maintaining systems that stay up when it matters.',              items: ['Microsoft Azure', 'Git', 'DigitalOcean VPS', 'Nginx', 'GitHub Actions CI/CD'] },
  { category: 'AI & ML',                      desc: 'Building with large language models and applied machine learning techniques.', items: ['LangChain', 'OpenAI API', 'Prompt Engineering', 'RAG Systems'] },
  { category: 'Domains',                      desc: 'The problem spaces I understand deeply from years of hands-on work.',          items: ['OutSystems', 'Dynamic 365 CRM', 'Business Central', 'Power Apps', 'Power Automate']},
  { category: 'People, Vendors & Delivery',   desc: 'Coordinating the humans, partners, and processes that turn tech into outcomes',items: ['IT Business Partnering', 'Systems Integration', 'Vendor Coordination', 'Stakeholder Management']}
];

/* ── Theme ───────────────────────────────────────────────────────── */

const sunSVG  = `<svg class="icon-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const moonSVG = `<svg class="icon-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

function applyTheme(dark) {
  const app = document.getElementById('app');
  app.classList.toggle('dark', dark);
  const icon = document.getElementById('theme-icon');
  if (icon) icon.innerHTML = dark ? sunSVG : moonSVG;
}

function initTheme() {
  const saved       = localStorage.getItem('wc-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark = saved !== null ? saved === 'dark' : prefersDark;
  applyTheme(dark);

  document.getElementById('theme-toggle').addEventListener('click', () => {
    const nowDark = document.getElementById('app').classList.contains('dark');
    applyTheme(!nowDark);
    localStorage.setItem('wc-theme', !nowDark ? 'dark' : 'light');
  });
}

/* ── Nav scroll ──────────────────────────────────────────────────── */

function initNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 48);
  }, { passive: true });
}

/* ── Hero stagger ────────────────────────────────────────────────── */

function initHero() {
  setTimeout(() => {
    document.querySelectorAll('.hg').forEach(el => el.classList.add('visible'));
    const cue = document.querySelector('.scroll-cue');
    if (cue) cue.classList.add('visible');
  }, 50);
}

/* ── Scroll reveal ───────────────────────────────────────────────── */

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── Render helpers ──────────────────────────────────────────────── */

function svgExternal() {
  return `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
}

function renderExperience() {
  const el = document.getElementById('experience-list');
  if (!el) return;
  el.innerHTML = experience.map(exp => `
    <div class="exp-item">
      <div>
        <p class="exp-period">${exp.period}</p>
        <span class="exp-type">${exp.type}</span>
      </div>
      <div>
        <h3 class="exp-role">${exp.role}</h3>
        <p class="exp-company">${exp.company}${exp.country ? ` · ${exp.country}` : ''}</p>
        <p class="exp-desc">${exp.desc}</p>
        <div class="tag-list">${exp.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
    </div>
  `).join('') + `<div class="exp-border-bottom"></div>`;
}

function renderEducation() {
  const el = document.getElementById('education-list');
  if (!el) return;
  el.innerHTML = education.map(edu => `
    <div class="edu-card">
      <p class="edu-period">${edu.period}</p>
      <h4 class="edu-degree">${edu.degree}</h4>
      <p class="edu-institution">${edu.institution}</p>
      <p class="edu-desc">${edu.desc}</p>
    </div>
  `).join('');
}

function renderCourses() {
  const el = document.getElementById('courses-list');
  if (!el) return;
  el.innerHTML = courses.map(c => `
    <div class="course-card">
      <div>
        <h4 class="course-title">${c.title}</h4>
        <p class="course-provider">${c.provider}</p>
      </div>
      <div class="course-meta">
        <span class="course-year">${c.year}</span>
        ${c.status === 'in-progress'
          ? `<span class="badge-progress">In Progress</span>`
          : `<span class="badge-done">Completed</span>`}
      </div>
    </div>
  `).join('');
}

function renderCerts() {
  const grid    = document.getElementById('certs-grid');
  const badge   = document.getElementById('cert-count-badge');
  const moreRow = document.getElementById('certs-more');
  if (!grid) return;

  badge.textContent = certifications.length;
  const shown = certifications.slice(0, CERTS_SHOWN);

  grid.innerHTML = shown.map(c => `
    <div class="cert-card">
      <div class="cert-header">
        <div style="flex:1">
          <h3 class="cert-name">${c.name}</h3>
          <p class="cert-issuer">${c.issuer}</p>
        </div>
        <span class="${c.status === 'active' ? 'cert-status-active' : 'cert-status-expired'}">${c.status === 'active' ? 'Active' : 'Expired'}</span>
      </div>
      <div class="cert-footer">
        <p class="cert-date">Earned ${c.date}</p>
        ${c.verifyUrl ? `<a href="${c.verifyUrl}" target="_blank" rel="noopener" class="cert-verify">Verify ${svgExternal()}</a>` : ''}
      </div>
    </div>
  `).join('');

  if (certifications.length > CERTS_SHOWN && moreRow) {
    moreRow.style.display = 'block';
    const link = moreRow.querySelector('a');
    link.textContent = `See all ${certifications.length} certifications →`;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      grid.innerHTML = certifications.map(c => `
        <div class="cert-card">
          <div class="cert-header">
            <div style="flex:1">
              <h3 class="cert-name">${c.name}</h3>
              <p class="cert-issuer">${c.issuer}</p>
            </div>
            <span class="${c.status === 'active' ? 'cert-status-active' : 'cert-status-expired'}">${c.status === 'active' ? 'Active' : 'Expired'}</span>
          </div>
          <div class="cert-footer">
            <p class="cert-date">Earned ${c.date}</p>
            ${c.verifyUrl ? `<a href="${c.verifyUrl}" target="_blank" rel="noopener" class="cert-verify">Verify ${svgExternal()}</a>` : ''}
          </div>
        </div>
      `).join('');
      link.textContent = '← Show less';
      link.addEventListener('click', (e2) => {
        e2.preventDefault();
        renderCerts();
      }, { once: true });
    }, { once: true });
  }
}

function renderSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;
  grid.innerHTML = skills.map(grp => `
    <div class="skill-card">
      <div>
        <div class="skill-cat-row">
          <p class="skill-category">${grp.category}</p>
          <span class="skill-count">${grp.items.length}</span>
        </div>
        <p class="skill-desc">${grp.desc}</p>
      </div>
      <div class="chips">
        ${grp.items.map((label, i) =>
          `<span class="chip ${i === 0 ? 'chip-primary' : 'chip-default'}">${label}</span>`
        ).join('')}
      </div>
    </div>
  `).join('');
}

function projectCard(p) {
  return `
    <a href="post.html?id=${p.id}" class="proj-card">
      <div class="proj-top">
        <span class="proj-category">${p.category}</span>
        <span class="proj-year">${p.year}</span>
      </div>
      <h3 class="proj-title">${p.title}</h3>
      <p class="proj-desc">${p.excerpt}</p>
      <div class="proj-tags">${p.tags.map(t => `<span class="proj-tag">${t}</span>`).join('')}</div>
    </a>
  `;
}

function renderProjects() {
  const grid  = document.getElementById('projects-grid');
  const badge = document.getElementById('project-count-badge');
  const more  = document.getElementById('projects-more');
  if (!grid) return;

  const sorted = [...projects].sort((a, b) => new Date(b.date || b.year) - new Date(a.date || a.year));

  if (sorted.length === 0) {
    badge.textContent = 'Coming soon';
    grid.innerHTML = `
      <div class="writing-empty" style="grid-column:1/-1">
        <div class="writing-empty-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-subtle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>
          </svg>
        </div>
        <h3 class="writing-empty-title">Coming soon</h3>
        <p class="writing-empty-desc">Projects and work samples are on their way. Check back soon.</p>
      </div>`;
    return;
  }

  badge.textContent = sorted.length;
  grid.innerHTML = sorted.slice(0, PROJECTS_SHOWN).map(projectCard).join('');

  if (sorted.length > PROJECTS_SHOWN && more) {
    more.style.display = 'block';
    const link = more.querySelector('a');
    link.textContent = `See all ${sorted.length} projects →`;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      grid.innerHTML = sorted.map(projectCard).join('');
      link.textContent = '← Show less';
      link.addEventListener('click', (e2) => {
        e2.preventDefault();
        renderProjects();
      }, { once: true });
    }, { once: true });
  }
}

function renderWriting() {
  const el    = document.getElementById('writing-content');
  const badge = document.getElementById('writing-badge');
  if (!el) return;

  if (posts.length === 0) {
    badge.textContent = 'Coming soon';
    el.innerHTML = `
      <div class="writing-empty">
        <div class="writing-empty-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-subtle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
        </div>
        <h3 class="writing-empty-title">Coming soon</h3>
        <p class="writing-empty-desc">Thoughts on technology, social innovation, and building things that matter. I'm working on it.</p>
      </div>`;
    return;
  }

  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  badge.textContent = String(sorted.length);
  const shown = sorted.slice(0, POSTS_SHOWN);

  const postsGrid = document.createElement('div');
  postsGrid.className = 'posts-grid';
  postsGrid.innerHTML = shown.map(post => `
    <a href="post.html?id=${post.id}" class="post-card">
      <p class="post-date">${formatDate(post.date)}</p>
      <h3 class="post-title">${post.title}</h3>
      <p class="post-excerpt">${post.excerpt}</p>
    </a>
  `).join('');
  el.innerHTML = '';
  el.appendChild(postsGrid);

  if (sorted.length > POSTS_SHOWN) {
    const moreRow = document.createElement('div');
    moreRow.className = 'see-all-row';
    const link = document.createElement('a');
    link.href = '#';
    link.className = 'see-all-link';
    link.textContent = `See all ${sorted.length} posts →`;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      postsGrid.innerHTML = sorted.map(post => `
        <a href="post.html?id=${post.id}" class="post-card">
          <p class="post-date">${formatDate(post.date)}</p>
          <h3 class="post-title">${post.title}</h3>
          <p class="post-excerpt">${post.excerpt}</p>
        </a>
      `).join('');
      moreRow.remove();
    });
    moreRow.appendChild(link);
    el.appendChild(moreRow);
  }
}

function formatDate(str) {
  const d = new Date(str);
  return d.toLocaleDateString('en-SG', { year: 'numeric', month: 'short', day: 'numeric' });
}

/* ── Contact form ────────────────────────────────────────────────── */

function initForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const btn     = document.getElementById('submit-btn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const res = await fetch('https://winfieldchiew.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    document.getElementById('form-name').value,
          email:   document.getElementById('form-email').value,
          message: document.getElementById('form-message').value,
        }),
      });

      if (res.ok) {
        success.style.display = 'flex';
        form.reset();
        btn.textContent = 'Sent ✓';
        setTimeout(() => {
          success.style.display = 'none';
          btn.textContent = 'Send message';
          btn.disabled = false;
        }, 5000);
      } else {
        btn.textContent = 'Failed — try again';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Failed — try again';
      btn.disabled = false;
    }
  });
}

/* ── Footer year ─────────────────────────────────────────────────── */

function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Init ────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  initHero();
  initReveal();
  initForm();
  setFooterYear();
  renderExperience();
  renderEducation();
  renderCourses();
  renderCerts();
  renderSkills();

  fetch('content.json')
    .then(r => r.json())
    .then(all => {
      projects = all.filter(item => item.type === 'project');
      posts    = all.filter(item => item.type === 'post');
      renderProjects();
      renderWriting();
    })
    .catch(() => {
      renderProjects();
      renderWriting();
    });
});
