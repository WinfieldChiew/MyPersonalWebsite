/* ============================================
   Main script — render page, interactions, tweaks
   ============================================ */

(function () {
  const C = window.CONTENT;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") n.className = v;
      else if (k === "html") n.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) n.setAttribute(k, v);
    }
    for (const kid of kids.flat()) {
      if (kid == null || kid === false) continue;
      n.append(kid.nodeType ? kid : document.createTextNode(kid));
    }
    return n;
  };

  const icon = (name) => {
    const paths = {
      arrowRight: '<path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
      arrowDown: '<path d="M12 5v14M5 13l7 7 7-7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
      sun: '<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>',
      moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/>',
      sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>',
      menu: '<path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>',
      github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
      linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-.001 4.001A2 2 0 0 1 4 2z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/>',
      mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M22 6l-10 7L2 6" stroke="currentColor" stroke-width="1.8" fill="none"/>',
      external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
      code: '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
      award: '<circle cx="12" cy="8" r="6" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.11" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/>',
      send: '<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/>',
      check: '<path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
      tools: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/>',
      terminal: '<path d="M4 17l6-6-6-6M12 19h8" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
      database: '<ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke="currentColor" stroke-width="1.8" fill="none"/>',
      compass: '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/>',
    };
    return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">${paths[name] || ""}</svg>`;
  };

  const placeholderSvg = (hue, label) => {
    const h1 = hue;
    const h2 = (hue + 30) % 360;
    return `<svg class="placeholder-bg" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="g${hue}${label.length}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="oklch(0.28 0.08 ${h1})" />
          <stop offset="1" stop-color="oklch(0.18 0.05 ${h2})" />
        </linearGradient>
        <pattern id="p${hue}${label.length}" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="18" stroke="oklch(0.65 0.18 ${h1} / 0.15)" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="400" height="250" fill="url(#g${hue}${label.length})"/>
      <rect width="400" height="250" fill="url(#p${hue}${label.length})"/>
      <circle cx="320" cy="60" r="80" fill="oklch(0.7 0.22 ${h1} / 0.35)" filter="blur(20px)"/>
      <circle cx="80" cy="200" r="60" fill="oklch(0.7 0.22 ${h2} / 0.28)" filter="blur(20px)"/>
    </svg>`;
  };

  function renderNav() {
    const nav = el("nav", { class: "nav", id: "nav" });
    nav.innerHTML = `
      <a href="#top" class="nav-brand">
        <span class="nav-brand-mark">${C.initials}</span>
        <span>${C.name}</span>
      </a>
      <div class="nav-links">
        <a href="#about" data-section="about">About</a>
        <a href="#experience" data-section="experience">Experience</a>
        <a href="#skills" data-section="skills">Skills</a>
        <a href="#projects" data-section="projects">Projects</a>
        <a href="#blog" data-section="blog">Blog</a>
        <a href="#contact" data-section="contact">Contact</a>
      </div>
      <div class="nav-cta">
        <button class="nav-toggle" id="mode-toggle" title="Toggle light/dark">${icon("moon")}</button>
      </div>
    `;
    return nav;
  }

  function renderHero() {
    const section = el("section", { id: "top", class: "hero" });
    section.innerHTML = `
      <div class="hero-bg" id="hero-bg"></div>
      <div class="container hero-inner">
        <div class="hero-text">
          <div class="hero-status reveal">
            <span class="pulse"></span>
            <span>${C.availability} · ${C.location}</span>
          </div>
          <h1 class="reveal d1">
            <span class="line-1">Hi, I'm</span>
            <span class="line-2">${C.name}.</span>
          </h1>
          <div class="hero-role reveal d2">
            <span class="prompt">~$</span>
            <span class="typed" id="typed"></span><span class="cursor"></span>
          </div>
          <p class="hero-tag reveal d3">
            ${C.tagline}
          </p>
          <div class="hero-actions reveal d3">
            <a href="#projects" class="btn btn-primary">View My Work ${icon("arrowRight")}</a>
            <a href="#contact" class="btn btn-ghost">Contact Me ${icon("mail")}</a>
          </div>
          <div class="hero-meta reveal d4">
            ${C.stats.map(s => `<div><strong>${s.v}</strong><span>${s.k}</span></div>`).join("")}
          </div>
        </div>
        <div class="hero-visual reveal d2">
          <div class="hero-card">
            <img src="assets/winfield.jpeg" alt="${C.name}" />
            <div class="hero-card-badge">
              <div>
                <p class="name">${C.name}</p>
                <p class="sub">${C.role}</p>
              </div>
              <span class="hero-card-chip">● AVAILABLE</span>
            </div>
          </div>
          <div class="hero-float f1">
            <span class="hero-float-dot"></span>
            <span>shipping v2.0</span>
          </div>
          <div class="hero-float f2">
            <span class="hero-float-dot"></span>
            <span>uptime: 99.98%</span>
          </div>
        </div>
      </div>
      <div class="scroll-cue">SCROLL</div>
    `;
    return section;
  }

  function initTyping() {
    const node = $("#typed");
    if (!node) return;
    const roles = C.roles;
    let ri = 0, ci = 0, deleting = false;
    const tick = () => {
      const cur = roles[ri];
      if (!deleting) {
        node.textContent = cur.slice(0, ++ci);
        if (ci === cur.length) { deleting = true; setTimeout(tick, 1600); return; }
      } else {
        node.textContent = cur.slice(0, --ci);
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
      }
      setTimeout(tick, deleting ? 40 : 70);
    };
    tick();
  }

  function setHeroBg(kind) {
    const bg = $("#hero-bg");
    if (!bg) return;
    bg.className = "hero-bg " + kind;
    bg.innerHTML = "";
    if (kind === "particles") {
      const wrap = el("div", { class: "particles" });
      for (let i = 0; i < 40; i++) {
        const p = el("div", { class: "particle" });
        p.style.left = Math.random() * 100 + "%";
        p.style.bottom = "-5px";
        p.style.animationDuration = (14 + Math.random() * 12) + "s";
        p.style.animationDelay = (-Math.random() * 20) + "s";
        p.style.setProperty("--dx", (Math.random() * 80 - 40) + "px");
        const size = 1 + Math.random() * 2;
        p.style.width = size + "px";
        p.style.height = size + "px";
        wrap.appendChild(p);
      }
      bg.appendChild(wrap);
    }
  }

  function renderAbout() {
    const section = el("section", { id: "about", class: "about" });
    section.innerHTML = `
      <div class="container">
        <div class="eyebrow reveal">01 · ABOUT</div>
        <h2 class="section-title reveal d1">A generalist, <span class="accent">by design.</span></h2>
        <div class="about-grid">
          <div class="reveal d2" style="position: relative;">
            <div class="about-decor"></div>
            <div class="about-photo">
              <img src="assets/winfield.jpeg" alt="${C.name}" />
            </div>
          </div>
          <div class="about-content reveal d3">
            ${C.about.paragraphs.map(p => `<p>${p}</p>`).join("")}
            <div class="values-grid">
              ${C.about.values.map(v => `
                <div class="value-card">
                  <div class="k">${v.k}</div>
                  <p>${v.p}</p>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `;
    return section;
  }

  function renderExperience() {
    const section = el("section", { id: "experience" });
    section.innerHTML = `
      <div class="container">
        <div class="eyebrow reveal">02 · EXPERIENCE</div>
        <h2 class="section-title reveal d1">Eight years of <span class="accent">making tech useful.</span></h2>
        <p class="section-lede reveal d2">A chronological tour through the roles that shaped how I think about tech, people, and impact.</p>
        <div class="timeline">
          ${C.experience.map((x, i) => `
            <div class="tl-item reveal ${x.current ? "current" : ""}" style="transition-delay: ${i * 100 + 100}ms">
              <div class="tl-card">
                <div class="tl-meta">
                  <span>${x.period}</span>
                  <span class="dot"></span>
                  <span class="tag">${x.tag}</span>
                  ${x.current ? '<span class="dot"></span><span>● Current</span>' : ""}
                </div>
                <h3>${x.role}</h3>
                <p class="company"><span>${x.company}</span> · ${x.companyNote}</p>
                <ul>
                  ${x.bullets.map(b => `<li>${b}</li>`).join("")}
                </ul>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
    return section;
  }

  function renderEduCert() {
    const section = el("section", { id: "education" });
    const certIcons = ["award", "award", "compass", "database", "tools", "terminal"];
    section.innerHTML = `
      <div class="container">
        <div class="eyebrow reveal">03 · LEARNING</div>
        <h2 class="section-title reveal d1">Formal education, <span class="accent">continuous learning.</span></h2>
        <p class="section-lede reveal d2">The degree was the start; the certifications are how I keep the edges sharp.</p>
        <div class="edu-cert-grid">
          <div class="reveal d2">
            <div class="edu-card">
              <div class="edu-year">${C.education.year}</div>
              <h3>${C.education.degree}</h3>
              <p class="edu-school">${C.education.school}</p>
              <div class="edu-extras">
                ${C.education.extras.map(e => `<div><span>${e.k}</span><span>${e.v}</span></div>`).join("")}
              </div>
            </div>
          </div>
          <div class="reveal d3">
            <div class="cert-grid">
              ${C.certifications.map((c, i) => `
                <div class="cert-card">
                  <div class="cert-icon">${icon(certIcons[i % certIcons.length])}</div>
                  <div class="cert-name">${c.name}</div>
                  <div class="cert-meta">
                    <span class="issuer">${c.issuer}</span>
                    <span>${c.year}</span>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `;
    return section;
  }

  function renderSkills() {
    const section = el("section", { id: "skills" });
    const skillIcons = ["tools", "code", "database", "compass"];
    section.innerHTML = `
      <div class="container">
        <div class="eyebrow reveal">04 · SKILLS</div>
        <h2 class="section-title reveal d1">A T-shaped toolkit, <span class="accent">deepening in AI & data.</span></h2>
        <p class="section-lede reveal d2">Grouped by how I'd bill the hour. Primary areas marked in magenta.</p>
        <div class="skills-groups">
          ${C.skills.map((g, i) => `
            <div class="skill-group reveal" style="transition-delay: ${i * 80 + 100}ms">
              <div class="skill-head">
                <div class="skill-icon">${icon(skillIcons[i % skillIcons.length])}</div>
                <h3>${g.group}</h3>
              </div>
              <p class="sub">${g.sub}</p>
              <div class="skill-tags">
                ${g.tags.map(t => `<span class="tag ${g.primary.includes(t) ? "primary" : ""}">${t}</span>`).join("")}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
    return section;
  }

  function renderProjects() {
    const section = el("section", { id: "projects" });
    const cats = ["All", ...new Set(C.projects.map(p => p.cat))];
    section.innerHTML = `
      <div class="container">
        <div class="projects-head">
          <div class="reveal">
            <div class="eyebrow">05 · PROJECTS</div>
            <h2 class="section-title">Selected work, <span class="accent">from ops to AI.</span></h2>
          </div>
          <div class="projects-filters reveal d2">
            ${cats.map((c, i) => `<button class="filter-btn ${i === 0 ? "active" : ""}" data-cat="${c}">${c}</button>`).join("")}
          </div>
        </div>
        <div class="projects-grid" id="projects-grid">
          ${C.projects.map((p, i) => `
            <article class="project-card reveal" data-cat="${p.cat}" style="transition-delay: ${i * 60 + 100}ms">
              <div class="project-visual">
                ${placeholderSvg(p.accent, p.name)}
                <div class="project-vis-glow"></div>
                <span class="project-vis-label">[ project visual ]</span>
              </div>
              <div class="project-body">
                <span class="project-cat">${p.cat}</span>
                <h3>${p.name}</h3>
                <p class="project-desc">${p.desc}</p>
                <div class="project-tech">
                  ${p.tech.map(t => `<span class="tag">${t}</span>`).join("")}
                </div>
                <div class="project-links">
                  <a href="${p.links.demo}">${icon("external")} Live Demo</a>
                  <a href="${p.links.github}">${icon("github")} GitHub</a>
                </div>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    `;
    setTimeout(() => {
      $$(".filter-btn", section).forEach(btn => {
        btn.addEventListener("click", () => {
          $$(".filter-btn", section).forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          const cat = btn.dataset.cat;
          $$(".project-card", section).forEach(card => {
            const show = cat === "All" || card.dataset.cat === cat;
            card.style.display = show ? "" : "none";
          });
        });
      });
    }, 0);
    return section;
  }

  function renderBlog() {
    const section = el("section", { id: "blog" });
    section.innerHTML = `
      <div class="container">
        <div class="eyebrow reveal">06 · BLOG</div>
        <h2 class="section-title reveal d1">Notes from the <span class="accent">workbench.</span></h2>
        <p class="section-lede reveal d2">Short-form write-ups on things I've recently figured out — mostly for future-me.</p>
        <div class="blog-grid">
          ${C.blog.map((b, i) => `
            <article class="blog-card ${b.feature ? "feature" : ""} reveal" style="transition-delay: ${i * 80 + 100}ms">
              <div class="blog-visual">
                ${placeholderSvg(b.accent, b.title)}
                <span class="blog-visual-tag">${b.tag}</span>
              </div>
              <div class="blog-body">
                <div class="blog-meta">
                  <span>${b.date}</span>
                  <span class="dot"></span>
                  <span>${b.read}</span>
                </div>
                <h3>${b.title}</h3>
                <p class="blog-excerpt">${b.excerpt}</p>
                <span class="blog-read">Read more ${icon("arrowRight")}</span>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    `;
    return section;
  }

  function renderContact() {
    const section = el("section", { id: "contact", class: "contact" });
    section.innerHTML = `
      <div class="container">
        <div class="eyebrow reveal">07 · CONTACT</div>
        <div class="contact-wrap">
          <div class="contact-info reveal d1">
            <h2>Let's build <span class="accent" style="background: var(--grad-text); -webkit-background-clip: text; background-clip: text; color: transparent;">something useful.</span></h2>
            <p>Whether it's a collaboration, a speaking invite, or just a chat about nonprofit tech — I reply to almost everything within 48 hours.</p>
            <div class="contact-channels">
              <a href="mailto:${C.contact.email}" class="contact-channel">
                <div class="contact-channel-icon">${icon("mail")}</div>
                <div>
                  <div class="label">Email</div>
                  <div class="val">${C.contact.email}</div>
                </div>
              </a>
              <a href="https://${C.contact.linkedin}" class="contact-channel">
                <div class="contact-channel-icon">${icon("linkedin")}</div>
                <div>
                  <div class="label">LinkedIn</div>
                  <div class="val">${C.contact.linkedin}</div>
                </div>
              </a>
              <a href="https://${C.contact.github}" class="contact-channel">
                <div class="contact-channel-icon">${icon("github")}</div>
                <div>
                  <div class="label">GitHub</div>
                  <div class="val">${C.contact.github}</div>
                </div>
              </a>
            </div>
          </div>
          <form class="contact-form reveal d2" id="contact-form" novalidate>
            <div class="form-row">
              <div class="field">
                <label for="f-name">Name</label>
                <input id="f-name" type="text" placeholder="Your name" required />
              </div>
              <div class="field">
                <label for="f-email">Email</label>
                <input id="f-email" type="email" placeholder="you@domain.com" required />
              </div>
            </div>
            <div class="field">
              <label for="f-subject">Subject</label>
              <input id="f-subject" type="text" placeholder="What's this about?" required />
            </div>
            <div class="field">
              <label for="f-message">Message</label>
              <textarea id="f-message" placeholder="A few sentences on what you're thinking..." required></textarea>
            </div>
            <div class="form-submit">
              <span class="form-note">No spam, ever. Messages go straight to my inbox.</span>
              <button type="submit" class="btn btn-primary">Send message ${icon("send")}</button>
            </div>
            <div id="form-feedback"></div>
          </form>
        </div>
      </div>
    `;
    return section;
  }

  function initContactForm() {
    const form = $("#contact-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#f-name").value.trim();
      const email = $("#f-email").value.trim();
      const subject = $("#f-subject").value.trim();
      const message = $("#f-message").value.trim();
      const fb = $("#form-feedback");
      if (!name || !email || !subject || !message) {
        fb.innerHTML = `<div class="form-success" style="background: oklch(0.3 0.15 25 / 0.2); border-color: oklch(0.6 0.2 25 / 0.4); color: oklch(0.85 0.15 25);">${icon("code")} Please fill out every field before sending.</div>`;
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        fb.innerHTML = `<div class="form-success" style="background: oklch(0.3 0.15 25 / 0.2); border-color: oklch(0.6 0.2 25 / 0.4); color: oklch(0.85 0.15 25);">${icon("code")} That email address doesn't look right.</div>`;
        return;
      }
      fb.innerHTML = `<div class="form-success">${icon("check")} Thanks, ${name.split(" ")[0]}! Your message has landed — I'll reply within 48 hours.</div>`;
      form.reset();
    });
  }

  function renderFooter() {
    const f = el("footer", { class: "footer" });
    f.innerHTML = `
      <div class="container">
        <div class="footer-inner">
          <div class="footer-brand">
            <div class="logo"><span class="nav-brand-mark">${C.initials}</span><span>${C.name}</span></div>
            <p>Building useful technology for mission-driven teams. Based in ${C.location}, open to interesting conversations.</p>
          </div>
          <div class="footer-cols">
            <div class="footer-col">
              <h4>Navigate</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>More</h4>
              <ul>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#">Resume (PDF)</a></li>
                <li><a href="#">RSS feed</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Elsewhere</h4>
              <ul>
                <li><a href="mailto:${C.contact.email}">Email</a></li>
                <li><a href="https://${C.contact.linkedin}">LinkedIn</a></li>
                <li><a href="https://${C.contact.github}">GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${C.name}. Built with care, HTML & curiosity.</span>
          <div class="social-row">
            <a href="mailto:${C.contact.email}" class="social-icon" aria-label="Email">${icon("mail")}</a>
            <a href="https://${C.contact.linkedin}" class="social-icon" aria-label="LinkedIn">${icon("linkedin")}</a>
            <a href="https://${C.contact.github}" class="social-icon" aria-label="GitHub">${icon("github")}</a>
          </div>
        </div>
      </div>
    `;
    return f;
  }

  function initReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach(n => io.observe(n));
  }

  function initNavScroll() {
    const nav = $("#nav");
    const sections = ["about", "experience", "skills", "projects", "blog", "contact"];
    const onScroll = () => {
      if (window.scrollY > 40) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
      let active = null;
      for (const id of sections) {
        const s = document.getElementById(id);
        if (!s) continue;
        const r = s.getBoundingClientRect();
        if (r.top <= 120 && r.bottom > 120) { active = id; break; }
      }
      $$(".nav-links a").forEach(a => {
        a.classList.toggle("active", a.dataset.section === active);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initMode() {
    const btn = $("#mode-toggle");
    const apply = (mode) => {
      document.documentElement.setAttribute("data-mode", mode);
      btn.innerHTML = mode === "light" ? icon("moon") : icon("sun");
      localStorage.setItem("pw-mode", mode);
    };
    const saved = localStorage.getItem("pw-mode") || "dark";
    apply(saved);
    btn.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-mode") || "dark";
      apply(cur === "dark" ? "light" : "dark");
    });
  }

  function initTweaks() {
    const defaults = window.TWEAK_DEFAULTS || { theme: "nebula", heroBg: "aurora" };
    document.documentElement.setAttribute("data-theme", defaults.theme);
    setHeroBg(defaults.heroBg);

    const panel = el("div", { class: "tweaks", id: "tweaks" });
    panel.innerHTML = `
      <h4>Tweaks <span class="close" id="tweaks-close">×</span></h4>
      <div class="sub">Live-preview design directions</div>
      <div class="tweak-group">
        <label>Theme</label>
        <div class="tweak-swatches" id="theme-swatches">
          <div class="tweak-swatch" data-theme="nebula" style="background: linear-gradient(135deg, oklch(0.68 0.22 295), oklch(0.72 0.22 320));"><span class="sw-label">NEBULA</span></div>
          <div class="tweak-swatch" data-theme="cyber" style="background: linear-gradient(135deg, oklch(0.82 0.15 200), oklch(0.75 0.18 230));"><span class="sw-label">CYBER</span></div>
          <div class="tweak-swatch" data-theme="noir" style="background: linear-gradient(135deg, oklch(0.2 0.005 270), oklch(0.72 0.24 355));"><span class="sw-label">NOIR</span></div>
        </div>
      </div>
      <div class="tweak-group">
        <label>Hero background</label>
        <div class="tweak-options" id="bg-opts">
          <button class="tweak-opt" data-bg="aurora">aurora</button>
          <button class="tweak-opt" data-bg="grid">grid</button>
          <button class="tweak-opt" data-bg="particles">particles</button>
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    const updateActive = () => {
      const theme = document.documentElement.getAttribute("data-theme") || "nebula";
      $$("[data-theme]", panel).forEach(s => s.classList.toggle("active", s.dataset.theme === theme));
      const bg = ($("#hero-bg")?.className.split(" ").filter(c => c !== "hero-bg")[0]) || "aurora";
      $$("[data-bg]", panel).forEach(b => b.classList.toggle("active", b.dataset.bg === bg));
    };
    updateActive();

    $$("[data-theme]", panel).forEach(s => s.addEventListener("click", () => {
      document.documentElement.setAttribute("data-theme", s.dataset.theme);
      updateActive();
    }));
    $$("[data-bg]", panel).forEach(b => b.addEventListener("click", () => {
      setHeroBg(b.dataset.bg);
      updateActive();
    }));

    $("#tweaks-close").addEventListener("click", () => panel.classList.remove("open"));

    window.addEventListener("message", (e) => {
      const d = e.data;
      if (!d || !d.type) return;
      if (d.type === "__activate_edit_mode") panel.classList.add("open");
      if (d.type === "__deactivate_edit_mode") panel.classList.remove("open");
    });
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
  }

  function boot() {
    const app = $("#app");
    app.append(
      renderNav(),
      renderHero(),
      renderAbout(),
      renderExperience(),
      renderEduCert(),
      renderSkills(),
      renderProjects(),
      renderBlog(),
      renderContact(),
      renderFooter(),
    );
    initTyping();
    initReveal();
    initNavScroll();
    initMode();
    initContactForm();
    initTweaks();
  }
  document.addEventListener("DOMContentLoaded", boot);
})();
