# Pujan Thapa — Portfolio Website

A fully revamped personal portfolio for a PhD Student and AI/ML Engineer. Features a striking dark-academic design, dynamic content management via a built-in CMS (no git commands needed to update content), and advanced animations.

**Live site:** [iampujan.github.io](https://iampujan.github.io)

---

## Features

- **Dark-first design** with light mode toggle — elegant Cormorant Garamond serif + Outfit sans + JetBrains Mono
- **Animated hero** — typewriter role animation, orbital photo decoration, animated gradient blobs
- **Content-driven** — all portfolio data lives in `content.json`; the site renders from it dynamically
- **Built-in CMS** — edit any section at `/admin.html` using the GitHub API; changes go live in ~1 minute without touching git
- **Filterable projects** — filter by category (AI/ML, NLP, Data, etc.)
- **Tabbed research section** — Ongoing Work / Publications / Research Interests
- **Timeline experience** — animated vertical timeline
- **Scroll reveal animations** — smooth staggered fade-ins
- **Fully responsive** — mobile-first, works on all screen sizes
- **Zero build step** — pure HTML + CSS + vanilla JS, hosted directly on GitHub Pages

---

## Project Structure

```
/
├── index.html        # Portfolio shell (content rendered by main.js)
├── style.css         # Full design system — CSS variables, layout, animations
├── main.js           # Reads content.json and renders all sections
├── content.json      # ← All portfolio data lives here (edit via admin panel)
├── admin.html        # CMS admin panel UI
├── admin.js          # Admin logic — GitHub API integration
├── My_CV.pdf         # Your CV file
├── assets/
│   └── pujan.jpg     # Profile photo
└── README.md
```

---

## Running Locally

No build step required. Just serve the files with any static server:

```bash
# Option 1 — Python (built-in)
cd iampujan.github.io
python3 -m http.server 8000
# Open http://localhost:8000

# Option 2 — Node.js (npx)
npx serve .
# Open the printed URL

# Option 3 — VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

> **Important:** Open via a server URL (http://localhost:...), not by double-clicking `index.html`. The `fetch('content.json')` call requires HTTP to work — file:// URLs block it.

---

## Updating Content

### Method 1 — Admin Panel (Recommended, no git needed)

1. Open `https://iampujan.github.io/admin.html`
2. On first visit, you'll see the setup screen:
   - Go to **GitHub → Settings → Developer Settings → Personal Access Tokens → Fine-grained tokens**
   - Create a token with **Contents: Read & Write** permission for `iampujan/iampujan.github.io`
   - Paste the token, confirm repo owner (`iampujan`), repo name (`iampujan.github.io`), branch (`main`)
   - Click **Connect & Open Admin**
3. Use the sidebar to navigate sections: Personal Info, Skills, Projects, Experience, etc.
4. Edit fields and click **⬆ Publish Changes**
5. GitHub Pages deploys in ~60 seconds — your live site updates automatically

Your token is stored only in your browser's `localStorage` — never sent anywhere except the official GitHub API.

### Method 2 — Direct file edit

Open `content.json` and edit the data directly, then commit and push:

```bash
git add content.json
git commit -m "update portfolio content"
git push
```

---

## Adding a New Project

**Via Admin Panel:**
1. Go to Admin → Projects
2. Click **+ Add Project**
3. Fill in title, category, description, tags, links
4. Click **Publish Changes**

**Via `content.json`:**
```json
{
  "id": "my-project",
  "title": "My Project",
  "subtitle": "Short tagline",
  "status": "Completed",
  "category": "AI/ML",
  "description": "What the project does and why it matters.",
  "tags": ["Python", "PyTorch", "FastAPI"],
  "demo": "https://demo-link.com",
  "source": "https://github.com/iampujan/my-project",
  "featured": true
}
```

Project categories available for filtering: `AI/ML`, `NLP`, `Data`, `Web` (or any custom string).

---

## Adding a Publication

In `content.json`, under `research.publications`:

```json
{
  "title": "My Paper Title",
  "year": "2026",
  "venue": "NeurIPS 2026",
  "description": "Abstract or short summary of the paper.",
  "tags": ["Computer Vision", "Object Detection"],
  "url": "https://arxiv.org/..."
}
```

---

## Deploying to GitHub Pages

This site is deployed via GitHub Pages from the `main` branch root.

**Initial setup (already done):**
- Repo must be named `iampujan.github.io` for a personal Pages site
- Go to **Settings → Pages → Source → Deploy from branch → main / (root)**
- The site is live at `https://iampujan.github.io`

**Every push to `main` auto-deploys** — typically takes 1–2 minutes.

---

## Customization

| What to change | Where |
|---|---|
| Colors, fonts, spacing | `style.css` — edit CSS variables at top of file |
| Sections layout/order | `main.js` — reorder `buildHero`, `buildSkills`, etc. calls |
| Nav links | `index.html` — `<nav>` section |
| All content | `content.json` or via admin panel |
| Profile photo | Replace `assets/pujan.jpg` |
| CV | Replace `My_CV.pdf` at root |

---

## Technologies

- **HTML5 / CSS3** — semantic markup, CSS custom properties, CSS Grid, Flexbox
- **Vanilla JavaScript** — zero dependencies, no build step
- **GitHub Pages** — free static hosting
- **GitHub Contents API** — powers the admin CMS (no backend needed)
- **Google Fonts** — Cormorant Garamond, Outfit, JetBrains Mono

---

## License

MIT — feel free to fork and adapt for your own portfolio.
