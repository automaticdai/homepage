# Immersive App-Shell Redesign — Design Spec

- **Date:** 2026-05-29
- **Author:** Xiaotian (Steven) Dai (with Claude)
- **Status:** Approved design, pending spec review
- **Topic:** Convert the research homepage into a site-wide, app-like "full-page" interface.

## 1. Overview & Goals

Transform the existing Hugo + Mainroad homepage into an **immersive, app-like interface** with a
persistent navigation rail and animated, no-reload-feeling page transitions, applied **site-wide**.

Goals:

1. A persistent dark sidebar ("dark rail") that frames every page like an application chrome.
2. Content that animates in on navigation (View Transitions), so the site feels continuous rather
   than a set of separate documents.
3. A modern visual system (Space Grotesk + Inter, generous spacing, the existing red accent).
4. A visitor-facing light/dark toggle for the content area.
5. Keep everything on Hugo/GitHub Pages with **no new build framework** and minimal content churn.

## 2. Locked Decisions

| Decision | Choice |
|---|---|
| Direction | **C** — app-like persistent nav shell, content transitions in place |
| Scope | **Site-wide** — every page renders inside the shell |
| Theme | **Dark rail** — sidebar always `#0f1115`; content light by default |
| Light/dark toggle | **Yes** — visitor toggle flips the *content area*; sidebar stays dark; choice persisted |
| Typography | **Modern** — Space Grotesk (headings) + Inter (body) |
| Transition mechanism | **Native View Transitions API** (`@view-transition { navigation: auto }`), progressive enhancement |
| Platform | Hugo + Mainroad theme, via layout overrides (no rebuild, no JS framework) |

## 3. Non-Goals / Constraints

- No migration off Hugo or off the Mainroad theme; we override layouts at the same relative paths.
- No SPA router (Swup explicitly **not** chosen) — transitions are native VT with graceful fallback.
- Content `.md` files stay essentially unchanged; restyle lives in templates + CSS.
- Must preserve existing functionality: GA4 (`G-Y1Y9XTF4J6`), MathJax, the client-side Publications
  filter (`static/js/publication-filter.js`), and the custom shortcodes.
- Must remain fully navigable with JS disabled and on browsers without View Transitions support.

## 4. Architecture

We take over the page frame using Hugo layout overrides (the project already overrides
`layouts/_default/single.html` and `layouts/partials/header.html`).

### 4.1 Templates

- **`layouts/_default/baseof.html` (new)** — the app shell. Structure:
  ```
  <html data-theme="…">
    <head> {{ partial "head.html" . }} </head>
    <body class="app">
      {{ partial "sidebar.html" . }}
      <main id="content" class="content"> {{ block "main" . }}{{ end }} </main>
    </body>
  </html>
  ```
  Replaces Mainroad's own `baseof.html`.
- **`layouts/partials/head.html` (new)** — `<meta>`, Google Fonts (preconnect + Space Grotesk/Inter),
  `css/immersive.css`, the inline theme-bootstrap script (reads `localStorage` to set `data-theme`
  before paint, preventing FOUC), GA4 (moved here from the `header.html` override), MathJax, and the
  conditional `publication-filter.js` (loaded only on the Publications page).
- **`layouts/partials/sidebar.html` (new)** — the persistent dark rail (see §5).
- **`layouts/index.html` (new)** — the home page (hero + sections), filling the `main` block.
- **`layouts/_default/single.html` (update existing)** — render page content into the shell.
- **`layouts/_default/list.html` (new/override if needed)** — for any list pages, in the shell.
- The existing **`layouts/partials/header.html`** override is retired (its GA snippet moves to
  `head.html`; the shell no longer uses the Mainroad header/menu).

### 4.2 Transitions

- Opt in via CSS: `@view-transition { navigation: auto; }`.
- The sidebar element gets a stable `view-transition-name: app-rail;` so it is treated as a
  continuous element across navigations and does **not** crossfade — only the content animates.
- Define `::view-transition-old(root)` / `::view-transition-new(root)` for a subtle fade/slide of the
  content. Disable all of it under `@media (prefers-reduced-motion: reduce)`.
- No JavaScript required; browsers without support perform a normal (instant) navigation. Because
  each navigation is still a full document load, MathJax, the Publications filter, and GA pageviews
  continue to work with no re-hooking.

## 5. The Shell & Navigation

- **Left dark rail**, ~240px, fixed full-height, background `#0f1115`.
  - Wordmark: "Steven **Dai**" (accent on surname).
  - Role line: "Lecturer · Computer Science / University of York · ReFLEX Lab".
  - **Primary nav** mirrors the existing `menu = "main"` items in weight order:
    1. Home, 2. Research, 3. Publications, 4. Services, 5. ReFLEX Lab, 6. Opportunities, 7. Teaching.
  - Social icons (LinkedIn `xdai3`, GitHub `automaticdai`, email) near the bottom.
  - **Light/dark toggle** pinned at the bottom.
- **Active item** is highlighted server-side by Hugo (comparing the menu entry to the current page),
  so it is correct even without JS or transitions.
- **News (`news.md`) and Robotics (`robots.md`)** remain standalone pages (currently `menu = none`),
  reachable from in-page links (the home News section links to `/news`). Adding News to the rail
  later is a one-line menu change — flagged, not done.
- **Content area** scrolls independently of the rail. Reading width capped at ~820px for text-dense
  pages; hero and card grids may span the full content width.
- **Mobile (≤760px):** the rail collapses to a slim top bar with a hamburger that opens the nav as a
  drawer/overlay; the toggle moves into the drawer.

## 6. Page-by-Page Treatment (site-wide)

- **Home (`layouts/index.html` from `_index.md`):** hero (eyebrow, name, one-line subtitle, two CTAs)
  → About → Research (three cards) → recent News → quick links. Built from current `_index.md`
  content; the `{{<contact>}}` portrait is incorporated into the hero.
- **Publications:** keep the JSON-driven filterable list and `publication-filter.js` unchanged in
  behaviour; restyle the rendered output (type badges, filter chips, `.paper-item`) into the new
  system. Works under View Transitions because each navigation is a fresh load.
- **Research / ReFLEX Lab / Teaching / Services / Opportunities / Projects / News:** same content,
  restyled into the shell — section headings, cards, clean lists, red accent. Existing layout
  shortcodes (`layout-twocolumn`, `layout-row`, `layout-column`, `contact`, news/tag badges) are
  preserved; their supporting CSS classes are carried over (see §7.3).

## 7. Design System

### 7.1 Typography

- Headings: **Space Grotesk** (500/600/700). Body: **Inter** (400/500/600/700).
- Loaded via Google Fonts with `preconnect`; system-font fallbacks (`system-ui, sans-serif`).

### 7.2 Colour tokens (CSS custom properties)

- Rail (constant): `--rail-bg:#0f1115`, `--rail-fg:#fff`, `--rail-muted:#8a8f98`.
- Accent (constant): `--accent:#e22d30`.
- Content tokens switch on `:root[data-theme]`:
  - **Light (default):** `--bg:#ffffff`, `--fg:#0f1115`, `--muted:#5a5f6a`, `--line:#e6e8ec`,
    `--card:#ffffff`.
  - **Dark:** `--bg:#14171d`, `--fg:#f3f4f6`, `--muted:#9aa3b2`, `--line:#262b34`, `--card:#1a1e25`,
    accent eyebrow lightened to `#ff6b6d`.
- The toggle sets `data-theme` on `<html>` and writes to `localStorage`; an inline `<head>` script
  applies the stored value before first paint.

### 7.3 CSS / JS files

- **`static/css/immersive.css` (new):** the full design system (shell, rail, typography scale,
  tokens, cards, news list, publication list, transitions, responsive rules).
- **Fold in & retire:** migrate the still-used pieces of `mystyle.css`/`custom.css` —
  `.project-card*`, `.topic-tag`, `.paper-item`, and the shortcode layout helpers
  (`.container-twocolumn`, `.column-2-1/2-2`, `.row`, `.col-md`, `.circular-img`, `.large-text`).
  Retire the Mainroad wrapper-specific rules (`.container`, `.container--outer`, `.flex*`) that the
  shell replaces. Update `config.toml` `customCss` accordingly.
- **`static/js/theme-toggle.js` (new):** wires the toggle button to `data-theme` + `localStorage`.

### 7.4 Accessibility

- Skip-to-content link, visible keyboard focus states, semantic `<nav>`/`<main>`, `aria-current` on
  the active nav item, accessible name on the theme toggle.
- All animation disabled under `prefers-reduced-motion: reduce`.

## 8. Files to Create / Modify

| File | Action |
|---|---|
| `layouts/_default/baseof.html` | **create** — app shell |
| `layouts/partials/head.html` | **create** — fonts, CSS, theme bootstrap, GA, MathJax, conditional pub JS |
| `layouts/partials/sidebar.html` | **create** — persistent dark rail + nav + toggle |
| `layouts/index.html` | **create** — home hero + sections |
| `layouts/_default/single.html` | **update** — render content into shell |
| `layouts/_default/list.html` | **create if needed** — list pages in shell |
| `layouts/partials/header.html` | **retire** — GA moves to `head.html` |
| `static/css/immersive.css` | **create** — full design system |
| `static/css/mystyle.css`, `custom.css` | **trim/fold** — keep shortcode/pub classes, retire wrapper rules |
| `static/js/theme-toggle.js` | **create** — light/dark toggle |
| `static/js/publication-filter.js` | **keep**; restyle its output classes only |
| `config.toml` | **update** — `customCss` list; menu unchanged; Mainroad sidebar widgets no longer used |
| content `*.md` | **mostly unchanged** — minor front-matter/hero tweaks only if required |

## 9. Verification

Run `hugo server` and confirm:

1. Every page renders inside the shell; the rail and active-item highlight are correct on each.
2. Page-to-page navigation animates in Chrome/Edge; Firefox (no cross-document VT) falls back to a
   normal instant navigation with no breakage.
3. Mobile (≤760px): rail collapses to a top bar; hamburger opens/closes the nav drawer.
4. Light/dark toggle flips the content area and persists across reloads and navigations with no FOUC.
5. Publications page: filter chips and sorting still work; type badges render in the new style.
6. MathJax still typesets; GA4 still fires a pageview.
7. JS disabled: all pages remain fully navigable and readable.

## 10. Risks & Mitigations

- **Cross-document View Transitions browser support** (older Firefox): mitigated by graceful fallback
  to normal navigation — the site is fully functional without the animation.
- **Replacing Mainroad's `baseof`** could drop theme features we rely on (e.g. SEO/OpenGraph meta,
  MathJax wiring): mitigated by porting the needed `<head>` partials into our `head.html` and
  verifying meta/OpenGraph output during implementation.
- **CSS regressions** from retiring old classes: mitigated by auditing shortcode usage before
  removing any class and verifying each page visually.

## 11. Open Questions

None blocking. Optional follow-ups: whether to add News/Robotics to the rail later, and whether to
add per-page hero imagery on the content pages (deferred).
