/* ============================================================
   admin.js — Portfolio CMS
   Uses GitHub Contents API to read/write content.json
   ============================================================ */

const CONFIG_KEY = 'pt-admin-config';
const CONTENT_PATH = 'content.json';

let config = null;
let content = null;
let fileSha = null;
let currentSection = 'dashboard';
let hasUnsavedChanges = false;

// ── Utilities ─────────────────────────────────────────────────
const $ = (id) => document.getElementById(id);
const status = (msg, type = 'idle') => {
  const el = $('status-bar');
  if (!el) return;
  el.textContent = msg;
  el.className = `status-bar ${type}`;
};

function setUnsaved(val) {
  hasUnsavedChanges = val;
  const btn = $('publish-btn');
  if (btn) {
    btn.textContent = val ? '⬆ Publish Changes ●' : '⬆ Publish Changes';
    btn.style.opacity = val ? '1' : '0.8';
  }
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Config / Setup ────────────────────────────────────────────
function loadConfig() {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function saveConfig(cfg) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
}
function clearConfig() {
  localStorage.removeItem(CONFIG_KEY);
}

function showSetup() {
  $('setup-screen').style.display = '';
  $('main-app').style.display = 'none';
}
function showApp() {
  $('setup-screen').style.display = 'none';
  $('main-app').style.display = '';
}

// ── GitHub API ────────────────────────────────────────────────
async function ghFetch(path, opts = {}) {
  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${path}`;
  const res = await fetch(url, {
    ...opts,
    headers: {
      'Authorization': `Bearer ${config.token}`,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `GitHub API error: ${res.status}`);
  return data;
}

async function fetchContent() {
  status('Loading from GitHub…', 'loading');
  try {
    const data = await ghFetch(CONTENT_PATH);
    fileSha = data.sha;
    const decoded = JSON.parse(atob(data.content.replace(/\n/g, '')));
    content = decoded;
    status('Loaded', 'success');
    setTimeout(() => status('Idle', 'idle'), 2000);
    return decoded;
  } catch (err) {
    status(`Error: ${err.message}`, 'error');
    throw err;
  }
}

async function publishContent() {
  if (!content || !fileSha) { status('Nothing to publish', 'error'); return; }

  // Collect form data into content object
  collectFormData();

  status('Publishing…', 'loading');
  try {
    const body = JSON.stringify({
      message: `chore: update portfolio content [${new Date().toISOString().slice(0,10)}]`,
      content: btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2)))),
      sha: fileSha,
      branch: config.branch || 'main',
    });
    const res = await ghFetch(CONTENT_PATH, { method: 'PUT', body });
    fileSha = res.content.sha;
    setUnsaved(false);
    status('Published! Site updating…', 'success');
    setTimeout(() => status('Idle', 'idle'), 4000);
  } catch (err) {
    status(`Publish failed: ${err.message}`, 'error');
  }
}

// ── Form → Content Sync ────────────────────────────────────────
function collectFormData() {
  const getVal = (id) => {
    const el = $(id);
    return el ? el.value.trim() : undefined;
  };
  const getTagsVal = (id) => {
    const el = $(id);
    if (!el) return [];
    return Array.from(el.querySelectorAll('.tags-input-tag')).map(t => t.dataset.value);
  };

  if (currentSection === 'personal') {
    if (!content.personal) content.personal = {};
    content.personal.name = getVal('f-name') || content.personal.name;
    content.personal.tagline = getVal('f-tagline') || content.personal.tagline;
    content.personal.bio = getVal('f-bio') || content.personal.bio;
    content.personal.email = getVal('f-email') || content.personal.email;
    content.personal.location = getVal('f-location') || content.personal.location;
    content.personal.photo = getVal('f-photo') || content.personal.photo;
    content.personal.cv = getVal('f-cv') || content.personal.cv;
    if (!content.personal.social) content.personal.social = {};
    content.personal.social.github = getVal('f-github') || '';
    content.personal.social.linkedin = getVal('f-linkedin') || '';
    content.personal.social.twitter = getVal('f-twitter') || '';
    content.personal.social.medium = getVal('f-medium') || '';

    const rolesVal = getVal('f-roles');
    if (rolesVal) content.personal.roles = rolesVal.split('\n').map(r => r.trim()).filter(Boolean);
  }

  if (currentSection === 'skills') {
    const cats = document.querySelectorAll('[data-skill-cat]');
    const newSkills = [];
    cats.forEach(cat => {
      const catName = cat.dataset.skillCat;
      const items = getTagsVal(`tags-${cat.dataset.skillIdx}`);
      newSkills.push({ category: catName, items });
    });
    if (newSkills.length) content.skills = newSkills;
  }

  if (currentSection === 'interests') {
    const profVal = getVal('f-prof-interests');
    const persVal = getVal('f-pers-interests');
    if (!content.interests) content.interests = {};
    if (profVal) content.interests.professional = profVal.split('\n').map(r => r.trim()).filter(Boolean);
    if (persVal) content.interests.personal = persVal.split('\n').map(r => r.trim()).filter(Boolean);
  }

  if (currentSection === 'education') {
    const items = document.querySelectorAll('[data-edu-idx]');
    const newEdu = [];
    items.forEach(item => {
      const i = item.dataset.eduIdx;
      newEdu.push({
        degree: getVal(`edu-degree-${i}`) || '',
        institution: getVal(`edu-institution-${i}`) || '',
        location: getVal(`edu-location-${i}`) || '',
        period: getVal(`edu-period-${i}`) || '',
        description: getVal(`edu-desc-${i}`) || '',
        highlights: getTagsVal(`edu-tags-${i}`),
      });
    });
    if (newEdu.length) content.education = newEdu;
  }

  if (currentSection === 'experience') {
    const items = document.querySelectorAll('[data-exp-idx]');
    const newExp = [];
    items.forEach(item => {
      const i = item.dataset.expIdx;
      newExp.push({
        role: getVal(`exp-role-${i}`) || '',
        company: getVal(`exp-company-${i}`) || '',
        type: getVal(`exp-type-${i}`) || '',
        period: getVal(`exp-period-${i}`) || '',
        location: getVal(`exp-location-${i}`) || '',
        description: getVal(`exp-desc-${i}`) || '',
        tags: getTagsVal(`exp-tags-${i}`),
      });
    });
    if (newExp.length) content.experience = newExp;
  }

  if (currentSection === 'projects') {
    const items = document.querySelectorAll('[data-proj-idx]');
    const newProj = [];
    items.forEach(item => {
      const i = item.dataset.projIdx;
      newProj.push({
        id: getVal(`proj-id-${i}`) || `project-${i}`,
        title: getVal(`proj-title-${i}`) || '',
        subtitle: getVal(`proj-subtitle-${i}`) || '',
        status: getVal(`proj-status-${i}`) || 'Completed',
        category: getVal(`proj-category-${i}`) || 'AI/ML',
        description: getVal(`proj-desc-${i}`) || '',
        demo: getVal(`proj-demo-${i}`) || '',
        source: getVal(`proj-source-${i}`) || '',
        tags: getTagsVal(`proj-tags-${i}`),
        featured: true,
      });
    });
    if (newProj.length) content.projects = newProj;
  }

  if (currentSection === 'research') {
    if (!content.research) content.research = { publications: [], ongoing: [], interests: [] };
    const ongoingItems = document.querySelectorAll('[data-ongoing-idx]');
    const newOngoing = [];
    ongoingItems.forEach(item => {
      const i = item.dataset.ongoingIdx;
      newOngoing.push({
        title: getVal(`on-title-${i}`) || '',
        description: getVal(`on-desc-${i}`) || '',
        status: getVal(`on-status-${i}`) || 'In Progress',
        venue: getVal(`on-venue-${i}`) || '',
        tags: getTagsVal(`on-tags-${i}`),
      });
    });
    content.research.ongoing = newOngoing;

    const interestsVal = getVal('f-research-interests');
    if (interestsVal) content.research.interests = interestsVal.split('\n').map(r => r.trim()).filter(Boolean);
  }
}

// ── Tags Input Widget ─────────────────────────────────────────
function createTagsInput(id, initialTags = []) {
  const wrap = document.createElement('div');
  wrap.className = 'tags-input-wrap';
  wrap.id = id;

  const render = () => {
    const input = wrap.querySelector('.tags-input-field');
    const curVal = input ? input.value : '';
    wrap.innerHTML = '';
    const tags = wrap._tags || [];
    tags.forEach(tag => {
      const chip = document.createElement('span');
      chip.className = 'tags-input-tag';
      chip.dataset.value = tag;
      chip.innerHTML = `${escHtml(tag)}<button type="button" aria-label="Remove ${tag}">×</button>`;
      chip.querySelector('button').onclick = () => {
        wrap._tags = wrap._tags.filter(t => t !== tag);
        render();
        setUnsaved(true);
      };
      wrap.appendChild(chip);
    });
    const field = document.createElement('input');
    field.className = 'tags-input-field';
    field.placeholder = 'Add tag, press Enter';
    field.value = curVal;
    field.onkeydown = (e) => {
      if ((e.key === 'Enter' || e.key === ',') && field.value.trim()) {
        e.preventDefault();
        const val = field.value.trim().replace(/,$/, '');
        if (val && !wrap._tags.includes(val)) {
          wrap._tags.push(val);
          render();
          setUnsaved(true);
        }
      }
      if (e.key === 'Backspace' && !field.value && wrap._tags.length) {
        wrap._tags.pop();
        render();
        setUnsaved(true);
      }
    };
    wrap.appendChild(field);
    wrap.onclick = () => wrap.querySelector('.tags-input-field')?.focus();
  };

  wrap._tags = [...initialTags];
  render();
  return wrap;
}

// ── Section Renderers ─────────────────────────────────────────
function renderDashboard() {
  const p = content?.projects?.length || 0;
  const e = content?.experience?.length || 0;
  const ed = content?.education?.length || 0;
  const r = content?.research?.ongoing?.length || 0;

  return `
  <div class="dash-grid">
    <div class="dash-card"><div class="dash-card-value">${p}</div><div class="dash-card-label">Projects</div></div>
    <div class="dash-card"><div class="dash-card-value">${e}</div><div class="dash-card-label">Experience</div></div>
    <div class="dash-card"><div class="dash-card-value">${ed}</div><div class="dash-card-label">Education</div></div>
    <div class="dash-card"><div class="dash-card-value">${r}</div><div class="dash-card-label">Research Items</div></div>
  </div>
  <div class="dash-info">
    <h3>How to update your portfolio</h3>
    <p>
      1. Select a section in the sidebar.<br>
      2. Edit the fields.<br>
      3. Click <strong>⬆ Publish Changes</strong> — your edits are committed to GitHub and the live site updates in ~1 minute.<br><br>
      Content is stored in <code>content.json</code> in your repository. The admin uses the GitHub API to commit changes directly.<br><br>
      <strong>Connected to:</strong> <code>${config?.owner}/${config?.repo}</code> (branch: <code>${config?.branch || 'main'}</code>)
    </p>
  </div>`;
}

function renderPersonal() {
  const p = content.personal || {};
  const s = p.social || {};
  return `
  <div class="card">
    <div class="card-title">Basic Information</div>
    <div class="grid-2">
      <div class="field"><label>Full Name</label><input type="text" id="f-name" value="${escHtml(p.name || '')}"></div>
      <div class="field"><label>Email</label><input type="email" id="f-email" value="${escHtml(p.email || '')}"></div>
    </div>
    <div class="grid-2">
      <div class="field"><label>Location</label><input type="text" id="f-location" value="${escHtml(p.location || '')}"></div>
      <div class="field"><label>Photo Path</label><input type="text" id="f-photo" value="${escHtml(p.photo || '')}"></div>
    </div>
    <div class="field"><label>CV File Path</label><input type="text" id="f-cv" value="${escHtml(p.cv || '')}"></div>
    <div class="field"><label>Tagline</label><input type="text" id="f-tagline" value="${escHtml(p.tagline || '')}"></div>
    <div class="field">
      <label>Bio</label>
      <textarea id="f-bio" rows="4">${escHtml(p.bio || '')}</textarea>
    </div>
    <div class="field">
      <label>Roles (one per line, shown in typewriter effect)</label>
      <textarea id="f-roles" rows="5">${(p.roles || []).map(r => escHtml(r)).join('\n')}</textarea>
    </div>
  </div>
  <div class="card">
    <div class="card-title">Social Links</div>
    <div class="grid-2">
      <div class="field"><label>GitHub URL</label><input type="url" id="f-github" value="${escHtml(s.github || '')}"></div>
      <div class="field"><label>LinkedIn URL</label><input type="url" id="f-linkedin" value="${escHtml(s.linkedin || '')}"></div>
      <div class="field"><label>Twitter / X URL</label><input type="url" id="f-twitter" value="${escHtml(s.twitter || '')}"></div>
      <div class="field"><label>Medium URL</label><input type="url" id="f-medium" value="${escHtml(s.medium || '')}"></div>
    </div>
  </div>`;
}

function renderSkills() {
  const skills = content.skills || [];
  const container = document.createDocumentFragment();
  const wrapper = document.createElement('div');

  skills.forEach((cat, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-skill-cat', cat.category);
    card.setAttribute('data-skill-idx', i);
    card.innerHTML = `
      <div class="card-title">
        <span>${escHtml(cat.category)}</span>
      </div>
      <div class="field">
        <label>Category Name</label>
        <input type="text" id="skill-cat-name-${i}" value="${escHtml(cat.category)}">
      </div>
      <div class="field">
        <label>Skills (press Enter to add)</label>
      </div>`;
    const tagsWrap = createTagsInput(`tags-${i}`, cat.items || []);
    card.querySelector('.field:last-child').appendChild(tagsWrap);

    const catInput = card.querySelector(`#skill-cat-name-${i}`);
    catInput.addEventListener('input', () => {
      card.setAttribute('data-skill-cat', catInput.value);
      card.querySelector('.card-title span').textContent = catInput.value;
      setUnsaved(true);
    });
    wrapper.appendChild(card);
  });

  return wrapper;
}

function renderEducation() {
  const edu = content.education || [];
  const wrapper = document.createElement('div');

  const addEdu = (item, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-edu-idx', i);
    card.innerHTML = `
      <div class="card-title">
        <span>Education #${i + 1}</span>
        <div class="card-actions">
          <button class="btn btn-danger small remove-edu-btn">Remove</button>
        </div>
      </div>
      <div class="grid-2">
        <div class="field"><label>Degree</label><input type="text" id="edu-degree-${i}" value="${escHtml(item.degree || '')}"></div>
        <div class="field"><label>Institution</label><input type="text" id="edu-institution-${i}" value="${escHtml(item.institution || '')}"></div>
      </div>
      <div class="grid-2">
        <div class="field"><label>Location</label><input type="text" id="edu-location-${i}" value="${escHtml(item.location || '')}"></div>
        <div class="field"><label>Period (e.g. 2023 – 2025)</label><input type="text" id="edu-period-${i}" value="${escHtml(item.period || '')}"></div>
      </div>
      <div class="field"><label>Description</label><textarea id="edu-desc-${i}" rows="3">${escHtml(item.description || '')}</textarea></div>
      <div class="field"><label>Highlights / Tags (press Enter to add)</label></div>`;
    card.querySelector('.field:last-child').appendChild(createTagsInput(`edu-tags-${i}`, item.highlights || []));
    card.querySelector('.remove-edu-btn').onclick = () => { card.remove(); setUnsaved(true); reIndexEdu(); };
    wrapper.appendChild(card);
  };

  edu.forEach((item, i) => addEdu(item, i));

  const addBtn = document.createElement('button');
  addBtn.className = 'add-item-btn';
  addBtn.textContent = '+ Add Education';
  addBtn.onclick = () => {
    const newIdx = wrapper.querySelectorAll('[data-edu-idx]').length;
    addEdu({ degree: '', institution: '', location: '', period: '', description: '', highlights: [] }, newIdx);
    setUnsaved(true);
  };
  wrapper.appendChild(addBtn);
  return wrapper;
}

function reIndexEdu() {
  // Only update visual labels — do NOT change data-edu-idx, because input IDs
  // are keyed to the original index and collectFormData relies on that mapping.
  document.querySelectorAll('[data-edu-idx]').forEach((el, visIdx) => {
    el.querySelector('.card-title span').textContent = `Education #${visIdx + 1}`;
  });
}

function renderExperience() {
  const experience = content.experience || [];
  const wrapper = document.createElement('div');

  const addExp = (item, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-exp-idx', i);
    card.innerHTML = `
      <div class="card-title">
        <span>${escHtml(item.role || 'Experience')} @ ${escHtml(item.company || '#' + (i+1))}</span>
        <div class="card-actions">
          <button class="btn btn-danger small remove-exp-btn">Remove</button>
        </div>
      </div>
      <div class="grid-2">
        <div class="field"><label>Role / Position</label><input type="text" id="exp-role-${i}" value="${escHtml(item.role || '')}"></div>
        <div class="field"><label>Company</label><input type="text" id="exp-company-${i}" value="${escHtml(item.company || '')}"></div>
      </div>
      <div class="grid-3">
        <div class="field">
          <label>Type</label>
          <select id="exp-type-${i}">
            <option value="Full-time" ${item.type === 'Full-time' ? 'selected' : ''}>Full-time</option>
            <option value="Contract" ${item.type === 'Contract' ? 'selected' : ''}>Contract</option>
            <option value="Internship" ${item.type === 'Internship' ? 'selected' : ''}>Internship</option>
            <option value="Part-time" ${item.type === 'Part-time' ? 'selected' : ''}>Part-time</option>
          </select>
        </div>
        <div class="field"><label>Period</label><input type="text" id="exp-period-${i}" value="${escHtml(item.period || '')}"></div>
        <div class="field"><label>Location</label><input type="text" id="exp-location-${i}" value="${escHtml(item.location || '')}"></div>
      </div>
      <div class="field"><label>Description</label><textarea id="exp-desc-${i}" rows="4">${escHtml(item.description || '')}</textarea></div>
      <div class="field"><label>Tech Tags (press Enter to add)</label></div>`;
    card.querySelector('.field:last-child').appendChild(createTagsInput(`exp-tags-${i}`, item.tags || []));
    card.querySelector('.remove-exp-btn').onclick = () => { card.remove(); setUnsaved(true); };
    wrapper.appendChild(card);
  };

  experience.forEach((item, i) => addExp(item, i));

  const addBtn = document.createElement('button');
  addBtn.className = 'add-item-btn';
  addBtn.textContent = '+ Add Experience';
  addBtn.onclick = () => {
    const newIdx = wrapper.querySelectorAll('[data-exp-idx]').length;
    addExp({ role: '', company: '', type: 'Full-time', period: '', location: '', description: '', tags: [] }, newIdx);
    setUnsaved(true);
  };
  wrapper.appendChild(addBtn);
  return wrapper;
}

function renderProjects() {
  const projects = content.projects || [];
  const wrapper = document.createElement('div');

  const addProj = (item, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-proj-idx', i);
    card.innerHTML = `
      <div class="card-title">
        <span>${escHtml(item.title || 'Project #' + (i+1))}</span>
        <div class="card-actions">
          <button class="btn btn-danger small remove-proj-btn">Remove</button>
        </div>
      </div>
      <div class="grid-2">
        <div class="field"><label>Project ID (URL-friendly)</label><input type="text" id="proj-id-${i}" value="${escHtml(item.id || '')}"></div>
        <div class="field"><label>Title</label><input type="text" id="proj-title-${i}" value="${escHtml(item.title || '')}"></div>
      </div>
      <div class="grid-2">
        <div class="field"><label>Subtitle</label><input type="text" id="proj-subtitle-${i}" value="${escHtml(item.subtitle || '')}"></div>
        <div class="field">
          <label>Category</label>
          <input type="text" id="proj-category-${i}" placeholder="AI/ML, NLP, Data, Web…" value="${escHtml(item.category || '')}">
        </div>
      </div>
      <div class="grid-2">
        <div class="field">
          <label>Status</label>
          <select id="proj-status-${i}">
            <option value="Completed" ${item.status === 'Completed' ? 'selected' : ''}>Completed</option>
            <option value="In Progress" ${item.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
          </select>
        </div>
      </div>
      <div class="field"><label>Description</label><textarea id="proj-desc-${i}" rows="4">${escHtml(item.description || '')}</textarea></div>
      <div class="grid-2">
        <div class="field"><label>Live Demo URL</label><input type="url" id="proj-demo-${i}" value="${escHtml(item.demo || '')}"></div>
        <div class="field"><label>Source Code URL</label><input type="url" id="proj-source-${i}" value="${escHtml(item.source || '')}"></div>
      </div>
      <div class="field"><label>Tags (press Enter to add)</label></div>`;
    card.querySelector('.field:last-child').appendChild(createTagsInput(`proj-tags-${i}`, item.tags || []));
    card.querySelector('.remove-proj-btn').onclick = () => { card.remove(); setUnsaved(true); };
    wrapper.appendChild(card);
  };

  projects.forEach((item, i) => addProj(item, i));

  const addBtn = document.createElement('button');
  addBtn.className = 'add-item-btn';
  addBtn.textContent = '+ Add Project';
  addBtn.onclick = () => {
    const newIdx = wrapper.querySelectorAll('[data-proj-idx]').length;
    addProj({ id: '', title: '', subtitle: '', status: 'Completed', category: 'AI/ML', description: '', demo: '', source: '', tags: [] }, newIdx);
    setUnsaved(true);
  };
  wrapper.appendChild(addBtn);
  return wrapper;
}

function renderResearch() {
  const res = content.research || { publications: [], ongoing: [], interests: [] };
  const wrapper = document.createElement('div');

  // Ongoing
  const ongoingCard = document.createElement('div');
  ongoingCard.className = 'card';
  ongoingCard.innerHTML = '<div class="card-title">Ongoing Research</div>';
  const ongoingWrap = document.createElement('div');

  const addOngoing = (item, i) => {
    const div = document.createElement('div');
    div.className = 'repeater-item';
    div.setAttribute('data-ongoing-idx', i);
    div.innerHTML = `
      <div class="repeater-item-header">
        <span class="repeater-item-label">Research Item #${i + 1}</span>
        <button class="btn btn-danger small remove-ongoing-btn">Remove</button>
      </div>
      <div class="field"><label>Title</label><input type="text" id="on-title-${i}" value="${escHtml(item.title || '')}"></div>
      <div class="grid-2">
        <div class="field"><label>Status</label><input type="text" id="on-status-${i}" value="${escHtml(item.status || 'In Progress')}"></div>
        <div class="field"><label>Venue / Institution</label><input type="text" id="on-venue-${i}" value="${escHtml(item.venue || '')}"></div>
      </div>
      <div class="field"><label>Description</label><textarea id="on-desc-${i}" rows="4">${escHtml(item.description || '')}</textarea></div>
      <div class="field"><label>Tags</label></div>`;
    div.querySelector('.field:last-child').appendChild(createTagsInput(`on-tags-${i}`, item.tags || []));
    div.querySelector('.remove-ongoing-btn').onclick = () => { div.remove(); setUnsaved(true); };
    ongoingWrap.appendChild(div);
  };

  (res.ongoing || []).forEach((item, i) => addOngoing(item, i));

  const addOngoingBtn = document.createElement('button');
  addOngoingBtn.className = 'add-item-btn';
  addOngoingBtn.textContent = '+ Add Research Item';
  addOngoingBtn.onclick = () => {
    const newIdx = ongoingWrap.querySelectorAll('[data-ongoing-idx]').length;
    addOngoing({ title: '', description: '', status: 'In Progress', venue: '', tags: [] }, newIdx);
    setUnsaved(true);
  };

  ongoingCard.appendChild(ongoingWrap);
  ongoingCard.appendChild(addOngoingBtn);
  wrapper.appendChild(ongoingCard);

  // Research Interests
  const interestsCard = document.createElement('div');
  interestsCard.className = 'card';
  interestsCard.innerHTML = `
    <div class="card-title">Research Interests</div>
    <div class="field">
      <label>Interests (one per line)</label>
      <textarea id="f-research-interests" rows="8">${(res.interests || []).join('\n')}</textarea>
      <p class="field-hint">Each line becomes a separate interest item displayed on your site.</p>
    </div>`;
  wrapper.appendChild(interestsCard);

  return wrapper;
}

function renderInterests() {
  const int = content.interests || {};
  const prof = (int.professional || []).join('\n');
  const pers = (int.personal || []).join('\n');
  return `
  <div class="card">
    <div class="card-title">Professional Interests</div>
    <div class="field">
      <label>One interest per line</label>
      <textarea id="f-prof-interests" rows="7">${escHtml(prof)}</textarea>
    </div>
  </div>
  <div class="card">
    <div class="card-title">Personal Interests</div>
    <div class="field">
      <label>One interest per line</label>
      <textarea id="f-pers-interests" rows="7">${escHtml(pers)}</textarea>
    </div>
  </div>`;
}

// ── Navigate Sections ─────────────────────────────────────────
async function navigate(section) {
  if (hasUnsavedChanges && section !== currentSection) {
    const ok = confirm('You have unsaved changes. Navigate away without publishing?');
    if (!ok) return;
    setUnsaved(false);
  }

  currentSection = section;

  document.querySelectorAll('.sidebar-nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.section === section);
  });

  const titles = {
    dashboard: 'Dashboard',
    personal: 'Personal Information',
    skills: 'Skills & Technologies',
    education: 'Education',
    experience: 'Work Experience',
    projects: 'Projects',
    research: 'Research',
    interests: 'Interests',
  };
  $('topbar-title').textContent = titles[section] || section;

  const area = $('content-area');
  area.innerHTML = '<p style="color:var(--text-3);font-family:var(--mono);font-size:13px">Rendering…</p>';

  await new Promise(r => setTimeout(r, 10));

  if (section === 'dashboard') {
    area.innerHTML = renderDashboard();
    return;
  }
  if (section === 'personal') { area.innerHTML = renderPersonal(); return; }
  if (section === 'interests') { area.innerHTML = renderInterests(); return; }
  if (section === 'research') { area.innerHTML = ''; area.appendChild(renderResearch()); return; }
  if (section === 'skills') { area.innerHTML = ''; area.appendChild(renderSkills()); return; }
  if (section === 'education') { area.innerHTML = ''; area.appendChild(renderEducation()); return; }
  if (section === 'experience') { area.innerHTML = ''; area.appendChild(renderExperience()); return; }
  if (section === 'projects') { area.innerHTML = ''; area.appendChild(renderProjects()); return; }

  area.innerHTML = `<p style="color:var(--text-3)">Section "${section}" coming soon.</p>`;
}

// ── Init ──────────────────────────────────────────────────────
async function init() {
  config = loadConfig();

  // Setup save
  $('setup-save-btn')?.addEventListener('click', async () => {
    const token = $('setup-token')?.value.trim();
    const owner = $('setup-owner')?.value.trim();
    const repo = $('setup-repo')?.value.trim();
    const branch = $('setup-branch')?.value.trim() || 'main';
    if (!token || !owner || !repo) {
      alert('Please fill in all fields.');
      return;
    }
    config = { token, owner, repo, branch };
    saveConfig(config);
    showApp();
    await loadAndStart();
  });

  // Disconnect
  $('disconnect-btn')?.addEventListener('click', () => {
    if (confirm('Disconnect and clear stored token?')) {
      clearConfig();
      config = null;
      content = null;
      fileSha = null;
      showSetup();
    }
  });

  // Publish
  $('publish-btn')?.addEventListener('click', async () => {
    collectFormData();
    await publishContent();
  });

  // Refresh
  $('refresh-btn')?.addEventListener('click', async () => {
    await fetchContent();
    await navigate(currentSection);
  });

  // Sidebar nav
  document.getElementById('sidebar-nav')?.addEventListener('click', (e) => {
    const item = e.target.closest('.sidebar-nav-item');
    if (item) navigate(item.dataset.section);
  });

  // Mark unsaved on any input change
  $('main-app')?.addEventListener('input', () => setUnsaved(true));

  if (!config) {
    showSetup();
    return;
  }

  showApp();
  await loadAndStart();
}

async function loadAndStart() {
  try {
    await fetchContent();
    await navigate('dashboard');
  } catch (err) {
    $('content-area').innerHTML = `
      <div class="card">
        <div class="card-title" style="color:var(--red)">Connection Failed</div>
        <p style="color:var(--text-2);margin-bottom:16px">Could not connect to GitHub: <code style="font-family:var(--mono)">${escHtml(err.message)}</code></p>
        <p style="color:var(--text-3);font-size:13px">Check that your Personal Access Token has <strong>Contents: Read &amp; Write</strong> permission for the repository <code style="font-family:var(--mono)">${escHtml(config.owner)}/${escHtml(config.repo)}</code>.</p>
        <button class="btn btn-danger" style="margin-top:16px" onclick="clearConfig();location.reload()">Reset Connection</button>
      </div>`;
  }
}

document.addEventListener('DOMContentLoaded', init);
