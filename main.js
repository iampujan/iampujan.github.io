/* ============================================================
   main.js — Portfolio Renderer
   Reads content.json and builds the entire page dynamically.
   ============================================================ */

const SVG = {
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12.014c0 4.43 2.864 8.163 6.838 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12.014C22 6.477 17.523 2 12 2z" clip-rule="evenodd"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>`,
  twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>`,
  medium: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>`,
  email: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/></svg>`,
  external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>`,
  location: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.556 6.326 3.5 8.327a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/></svg>`,
};

const SOCIAL_LABELS = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  twitter: 'Twitter / X',
  medium: 'Medium',
};

const PROJECT_ICONS = {
  'AI/ML': '🤖',
  'NLP': '💬',
  'Data': '📊',
  'Web': '🌐',
  'default': '⚡',
};

// ── Typewriter Effect ────────────────────────────────────────
function startTypewriter(el, texts, opts = {}) {
  const speed = opts.speed || 90;
  const pause = opts.pause || 2200;
  let ti = 0, ci = 0, deleting = false;
  const tick = () => {
    const cur = texts[ti];
    if (deleting) {
      el.textContent = cur.slice(0, --ci);
    } else {
      el.textContent = cur.slice(0, ++ci);
    }
    let delay = deleting ? speed / 2 : speed;
    if (!deleting && ci === cur.length) { delay = pause; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; ti = (ti + 1) % texts.length; delay = 400; }
    setTimeout(tick, delay);
  };
  tick();
}

// ── Theme ────────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('pt-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'dark');
  applyTheme(theme);
}
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('pt-theme', theme);
  const sun = document.getElementById('theme-sun');
  const moon = document.getElementById('theme-moon');
  if (sun) sun.style.display = theme === 'light' ? 'none' : 'block';
  if (moon) moon.style.display = theme === 'light' ? 'block' : 'none';
}
function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(cur === 'dark' ? 'light' : 'dark');
}

// ── Scroll Reveal ─────────────────────────────────────────────
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// ── Active Nav Link ───────────────────────────────────────────
function initNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`);
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => io.observe(s));
}

// ── Nav Hide-on-scroll ────────────────────────────────────────
function initNavScroll() {
  const nav = document.getElementById('navbar');
  let last = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 20);
    nav.classList.toggle('hide', y > last + 60 && y > 200);
    if (y < last || y < 200) nav.classList.remove('hide');
    last = y;
  }, { passive: true });
}

// ── Mobile Menu ───────────────────────────────────────────────
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
    });
  });
}

// ── Tabs ──────────────────────────────────────────────────────
function initTabs(container) {
  const btns = container.querySelectorAll('.tab-btn');
  const panels = container.querySelectorAll('.tab-panel');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = container.querySelector(`#${btn.dataset.tab}`);
      if (target) target.classList.add('active');
    });
  });
}

// ── Project Filter ────────────────────────────────────────────
function initFilter(container) {
  const btns = container.querySelectorAll('.filter-btn');
  const cards = container.querySelectorAll('.project-card');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.setAttribute('data-hidden', match ? 'false' : 'true');
        card.style.display = match ? '' : 'none';
      });
    });
  });
}

// ── Render Helpers ────────────────────────────────────────────
function socialLinks(social, className = 'hero-social-link') {
  return Object.entries(social).map(([key, url]) => {
    if (!url) return '';
    return `<a href="${url}" class="${className}" target="_blank" rel="noopener" aria-label="${SOCIAL_LABELS[key] || key}">${SVG[key] || ''}</a>`;
  }).join('');
}

function tags(arr, cls = 'tag') {
  return arr.map(t => `<span class="${cls}">${t}</span>`).join('');
}

// ── Section Builders ──────────────────────────────────────────
function buildHero(d) {
  const { personal, stats } = d;
  const s = personal.social;

  return `
  <section class="hero" id="hero">
    <div class="hero-bg">
      <div class="hero-grid-lines"></div>
      <div class="hero-blob hero-blob-1"></div>
      <div class="hero-blob hero-blob-2"></div>
      <div class="hero-blob hero-blob-3"></div>
    </div>
    <div class="hero-container">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="hero-badge-dot"></span>
          Available for Research &amp; Collaboration
        </div>
        <h1 class="hero-name">${personal.name.split(' ')[0]} <span>${personal.name.split(' ').slice(1).join(' ')}</span></h1>
        <div class="hero-role-wrapper">
          <span class="hero-role-prefix">I'm a&thinsp;</span>
          <span class="hero-role-text" id="hero-role"></span><span class="hero-cursor"></span>
        </div>
        <p class="hero-bio">${personal.bio}</p>
        <div class="hero-actions">
          <a href="${personal.cv}" download class="btn-primary">${SVG.download} Download CV</a>
          <a href="#contact" class="btn-secondary">${SVG.arrow} Get in Touch</a>
        </div>
        <div class="hero-stats">
          ${stats.map(s => `
          <div class="hero-stat">
            <div class="hero-stat-value">${s.value}</div>
            <div class="hero-stat-label">${s.label}</div>
          </div>`).join('')}
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-photo-wrap">
          <div class="hero-photo-ring-outer"></div>
          <div class="hero-photo-ring-inner"></div>
          <div class="hero-photo-orbit"></div>
          <div class="hero-photo-orbit-2"></div>
          <img src="${personal.photo}" alt="Portrait of ${personal.name}" class="hero-photo"
               onerror="this.src='https://placehold.co/400x400/0b1628/38bdf8?text=PT'">
        </div>
        <div class="hero-social">
          ${Object.entries(s).map(([k, url]) => url
            ? `<a href="${url}" class="hero-social-link" target="_blank" rel="noopener" aria-label="${SOCIAL_LABELS[k] || k}">${SVG[k] || ''}</a>`
            : '').join('')}
        </div>
      </div>
    </div>
  </section>`;
}

function buildSkills(data) {
  const { skills } = data;
  return `
  <div class="section-divider"></div>
  <section class="section" id="skills">
    <div class="section-inner">
      <div class="section-header reveal">
        <div class="section-label">Expertise</div>
        <h2 class="section-title">Skills &amp; <em>Technologies</em></h2>
        <p class="section-subtitle">A toolkit built across research, industry, and personal projects.</p>
      </div>
      <div class="skills-grid">
        ${skills.map((cat, i) => `
        <div class="skill-card reveal reveal-delay-${i + 1}">
          <div class="skill-card-title">${cat.category}</div>
          <div class="skill-tags">
            ${cat.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
}

function buildResearch(data) {
  const { research } = data;
  const pubs = research.publications;
  const ongoing = research.ongoing;
  const interests = research.interests;

  const pubsHTML = pubs.length === 0
    ? `<div class="no-publications">Publications in progress — check back soon.</div>`
    : pubs.map(p => `
      <div class="research-card">
        <div class="research-card-header">
          <h3 class="research-card-title">${p.title}</h3>
          ${p.year ? `<span class="research-status">${p.year}</span>` : ''}
        </div>
        ${p.venue ? `<div class="research-venue">${p.venue}</div>` : ''}
        <p class="research-desc">${p.description || ''}</p>
        ${p.tags ? `<div class="research-tags">${tags(p.tags)}</div>` : ''}
      </div>`).join('');

  const ongoingHTML = ongoing.map(r => `
    <div class="research-card">
      <div class="research-card-header">
        <h3 class="research-card-title">${r.title}</h3>
        <span class="research-status">${r.status}</span>
      </div>
      ${r.venue ? `<div class="research-venue">${r.venue}</div>` : ''}
      <p class="research-desc">${r.description}</p>
      ${r.tags ? `<div class="research-tags">${tags(r.tags)}</div>` : ''}
    </div>`).join('');

  const interestsHTML = `
    <div class="research-interests-grid">
      ${interests.map(it => `<div class="research-interest-item">${it}</div>`).join('')}
    </div>`;

  return `
  <div class="section-divider"></div>
  <section class="section" id="research">
    <div class="section-inner">
      <div class="section-header reveal">
        <div class="section-label">Academic Work</div>
        <h2 class="section-title">Research &amp; <em>Publications</em></h2>
        <p class="section-subtitle">Contributions to the scientific community and ongoing investigations.</p>
      </div>
      <div id="research-tabs" class="reveal">
        <div class="tabs">
          <button class="tab-btn active" data-tab="tab-ongoing">Ongoing Work</button>
          <button class="tab-btn" data-tab="tab-publications">Publications</button>
          <button class="tab-btn" data-tab="tab-interests">Research Interests</button>
        </div>
        <div id="tab-ongoing" class="tab-panel active">${ongoingHTML}</div>
        <div id="tab-publications" class="tab-panel">${pubsHTML}</div>
        <div id="tab-interests" class="tab-panel">${interestsHTML}</div>
      </div>
    </div>
  </section>`;
}

function buildProjects(data) {
  const { projects } = data;
  const categories = ['all', ...new Set(projects.map(p => p.category.toLowerCase()))];

  const filterBtns = categories.map(c =>
    `<button class="filter-btn${c === 'all' ? ' active' : ''}" data-filter="${c}">${c === 'all' ? 'All Projects' : c.toUpperCase()}</button>`
  ).join('');

  const cards = projects.map(p => {
    const icon = PROJECT_ICONS[p.category] || PROJECT_ICONS.default;
    const statusClass = p.status === 'Completed' ? 'status-completed' : 'status-progress';
    const demoLink = p.demo ? `<a href="${p.demo}" class="project-link" target="_blank" rel="noopener">${SVG.external} Live Demo</a>` : '';
    const sourceLink = p.source ? `<a href="${p.source}" class="project-link" target="_blank" rel="noopener">${SVG.github} Source</a>` : '';
    return `
    <div class="project-card" data-category="${p.category.toLowerCase()}">
      <div class="project-card-top">
        <div class="project-icon">${icon}</div>
        <span class="project-status ${statusClass}">${p.status}</span>
      </div>
      <div>
        <div class="project-title">${p.title}</div>
        <div class="project-subtitle">${p.subtitle}</div>
      </div>
      <p class="project-desc">${p.description}</p>
      <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
      ${(demoLink || sourceLink) ? `<div class="project-links">${demoLink}${sourceLink}</div>` : ''}
    </div>`;
  }).join('');

  return `
  <div class="section-divider"></div>
  <section class="section" id="projects">
    <div class="section-inner">
      <div class="section-header reveal">
        <div class="section-label">Portfolio</div>
        <h2 class="section-title">Featured <em>Projects</em></h2>
        <p class="section-subtitle">Selected work spanning AI research, data engineering, and full-stack development.</p>
      </div>
      <div id="projects-section" class="reveal">
        <div class="filter-bar">${filterBtns}</div>
        <div class="projects-grid">${cards}</div>
      </div>
    </div>
  </section>`;
}

function buildExperience(data) {
  const { experience } = data;
  const items = experience.map((exp, i) => `
    <div class="timeline-item reveal reveal-delay-${(i % 4) + 1}">
      <div class="timeline-dot"></div>
      <div class="timeline-meta">
        <span class="timeline-period">${exp.period}</span>
        <span class="timeline-type">${exp.type}</span>
        <span class="timeline-location">📍 ${exp.location}</span>
      </div>
      <div class="timeline-role">${exp.role}</div>
      <div class="timeline-company">${exp.company}</div>
      <p class="timeline-desc">${exp.description}</p>
      <div class="timeline-tags">${exp.tags.map(t => `<span class="timeline-tag">${t}</span>`).join('')}</div>
    </div>`).join('');

  return `
  <div class="section-divider"></div>
  <section class="section" id="experience">
    <div class="section-inner">
      <div class="section-header reveal">
        <div class="section-label">Career</div>
        <h2 class="section-title">Work <em>Experience</em></h2>
        <p class="section-subtitle">5+ years building production ML systems and data-intensive applications.</p>
      </div>
      <div class="timeline">${items}</div>
    </div>
  </section>`;
}

function buildEducation(data) {
  const { education } = data;
  const cards = education.map((edu, i) => `
    <div class="edu-card reveal reveal-delay-${i + 1}">
      <div class="edu-period">${edu.period}</div>
      <div class="edu-degree">${edu.degree}</div>
      <div class="edu-institution">${edu.institution}</div>
      <div class="edu-location">📍 ${edu.location}</div>
      <p class="edu-desc">${edu.description}</p>
      <div class="edu-highlights">${edu.highlights.map(h => `<span class="edu-highlight">${h}</span>`).join('')}</div>
    </div>`).join('');

  return `
  <div class="section-divider"></div>
  <section class="section" id="education">
    <div class="section-inner">
      <div class="section-header reveal">
        <div class="section-label">Academic Background</div>
        <h2 class="section-title">Education &amp; <em>Training</em></h2>
      </div>
      <div class="edu-grid">${cards}</div>
    </div>
  </section>`;
}

function buildContact(data) {
  const { personal, interests } = data;
  const s = personal.social;

  const socialLinks = Object.entries(s).map(([k, url]) => {
    if (!url) return '';
    return `<a href="${url}" class="contact-social-link" target="_blank" rel="noopener">${SVG[k] || ''}${SOCIAL_LABELS[k] || k}</a>`;
  }).join('');

  return `
  <div class="section-divider"></div>
  <section class="section" id="contact">
    <div class="section-inner">
      <div class="contact-grid">
        <div class="contact-content reveal">
          <div class="section-label">Let's Connect</div>
          <h2 class="section-title">Get in <em>Touch</em></h2>
          <p class="contact-text">I'm always open to discussing research collaborations, new projects, or opportunities to build intelligent systems. Whether you have a question or just want to say hello — my inbox is open.</p>
          <a href="mailto:${personal.email}" class="contact-email-link">${SVG.email}&nbsp;${personal.email}</a>
          <div class="contact-social">${socialLinks}</div>
        </div>
        <div class="contact-visual reveal reveal-delay-2">
          <div class="contact-info-card">
            <div class="contact-info-label">Location</div>
            <div class="contact-info-value">${personal.location}</div>
          </div>
          <div class="contact-info-card">
            <div class="contact-info-label">Professional Interests</div>
            <div class="contact-info-value">
              <div class="edu-highlights" style="margin-top:8px">${interests.professional.map(i => `<span class="edu-highlight">${i}</span>`).join('')}</div>
            </div>
          </div>
          <div class="contact-info-card">
            <div class="contact-info-label">Personal</div>
            <div class="contact-info-value">
              <div class="skill-tags" style="margin-top:8px">
                ${interests.personal.map(i => `<span class="skill-tag">${i}</span>`).join('')}
              </div>
            </div>
          </div>
          <div class="contact-availability">
            <div class="availability-dot"></div>
            <span class="availability-text">Open to research &amp; collaboration opportunities</span>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

// ── Build Footer ──────────────────────────────────────────────
function buildFooter(data) {
  const { personal } = data;
  const year = new Date().getFullYear();

  const footerSocial = document.getElementById('footer-social');
  const footerCopy = document.getElementById('footer-copy');
  if (footerSocial) {
    footerSocial.innerHTML = Object.entries(personal.social).map(([k, url]) => url
      ? `<a href="${url}" class="footer-social-link" target="_blank" rel="noopener" aria-label="${SOCIAL_LABELS[k] || k}">${SVG[k] || ''}</a>`
      : '').join('');
  }
  if (footerCopy) {
    footerCopy.textContent = `© ${year} ${personal.name}. All rights reserved.`;
  }

  const cvLink = document.getElementById('nav-cv-link');
  if (cvLink) cvLink.href = personal.cv;
}

// ── Main ──────────────────────────────────────────────────────
async function init() {
  initTheme();
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
  initMobileMenu();
  initNavScroll();

  let data;
  try {
    const res = await fetch(`content.json?v=${Date.now()}`);
    if (!res.ok) throw new Error('Failed to load content.json');
    data = await res.json();
  } catch (err) {
    document.getElementById('root').innerHTML = `
      <div style="min-height:50vh;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;padding:40px;text-align:center">
        <p style="font-size:18px;color:var(--text-2)">Failed to load portfolio content.</p>
        <p style="font-size:14px;color:var(--text-3);font-family:var(--ff-mono)">${err.message}</p>
      </div>`;
    document.getElementById('loader').classList.add('hidden');
    return;
  }

  // Update meta
  if (data.meta) {
    document.title = `${data.meta.siteTitle} — AI/ML Engineer & PhD Student`;
  }

  // Render all sections
  document.getElementById('root').innerHTML = [
    buildHero(data),
    buildSkills(data),
    buildResearch(data),
    buildProjects(data),
    buildExperience(data),
    buildEducation(data),
    buildContact(data),
  ].join('');

  buildFooter(data);

  // Typewriter
  const roleEl = document.getElementById('hero-role');
  if (roleEl && data.personal.roles) {
    startTypewriter(roleEl, data.personal.roles, { speed: 80, pause: 2000 });
  }

  // Interactivity
  initReveal();
  initNavSpy();

  const researchTabs = document.getElementById('research-tabs');
  if (researchTabs) initTabs(researchTabs);

  const projectsSection = document.getElementById('projects-section');
  if (projectsSection) initFilter(projectsSection);

  // Close mobile menu on nav clicks
  document.querySelectorAll('.mobile-menu a, .nav-link').forEach(a => {
    a.addEventListener('click', () => {
      document.getElementById('mobile-menu-btn')?.classList.remove('open');
      document.getElementById('mobile-menu')?.classList.remove('open');
    });
  });

  // Hide loader
  setTimeout(() => {
    document.getElementById('loader')?.classList.add('hidden');
  }, 900);
}

document.addEventListener('DOMContentLoaded', init);
