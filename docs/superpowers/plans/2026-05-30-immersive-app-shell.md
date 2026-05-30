# Immersive App-Shell Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the Hugo + Mainroad research homepage into a site-wide, app-like interface: a persistent dark navigation rail, native View-Transitions page animations, modern typography, and a visitor light/dark toggle.

**Architecture:** Take over the page frame with project-level Hugo layout overrides (`baseof.html` + new partials), replacing Mainroad's wrapper. A new `static/css/immersive.css` provides the full design system (reset, tokens, shell, prose, components, transitions). Existing `mystyle.css`/`custom.css` are kept for shortcode/component classes and loaded after `immersive.css`. Transitions are CSS-only (`@view-transition`); everything degrades gracefully.

**Tech Stack:** Hugo (Extended 0.145.0 in CI; local 0.152), Mainroad theme (submodule, read-only), vanilla CSS + a tiny vanilla JS file. No new framework, no Node build.

---

## Domain note: verification without a unit-test harness

This is a static-site templating/CSS project — there is no pytest/jest. "Tests" in each task are concrete, objective checks:

- **Build check:** `cd /home/yfrl/projects/homepage && hugo --quiet && echo BUILD_OK` must print `BUILD_OK` with no `ERROR`/`WARN` template lines.
- **Output assertions:** `grep` the generated files under `public/` for expected markup.
- **Manual check (when noted):** `hugo server` and open the page at http://localhost:1313.

Work happens on the existing `immersive-app-shell` branch. Commit after every task.

## File structure (what each file owns)

| File | Responsibility |
|---|---|
| `static/css/immersive.css` | The whole design system: reset, CSS tokens (incl. light/dark), fonts, shell layout, rail/nav, content prose, hero, cards, news list, publications restyle, view transitions, responsive + mobile drawer, reduced-motion. |
| `static/js/theme-toggle.js` | Light/dark toggle (+ `localStorage`) and mobile nav-drawer open/close. Event-delegated, no per-element wiring. |
| `layouts/partials/head.html` | Everything in `<head>`: meta/title, OpenGraph, fonts, stylesheet links (immersive first, then customCss), theme-bootstrap inline script, GA4, favicon, conditional Publications JS. |
| `layouts/partials/sidebar.html` | The persistent dark rail: wordmark, role, primary nav (from `menu.main`, server-side active state), social icons, theme-toggle button, mobile top-bar + hamburger. |
| `layouts/_default/baseof.html` | The shell skeleton: `<html>`/`<body class="app">`, skip-link, sidebar partial, `<main id="content">` with the `main` block, scripts, MathJax. |
| `layouts/index.html` | Home page: hero (eyebrow, name, subtitle, CTAs) above the rendered `_index.md` content. |
| `layouts/_default/single.html` | Content pages inside the shell (title + lead + `.Content`); drops authorbox/pager/comments. |
| `layouts/_default/list.html` | Section/list pages inside the shell (title + content + child links). |
| `layouts/partials/header.html` | **Deleted** — GA moves to `head.html`; the shell has no Mainroad header. |
| `config.toml` | Unchanged for CSS (immersive.css is linked directly in `head.html`; `customCss` keeps mystyle/custom). |

---

## Task 1: Design system stylesheet (`immersive.css`)

**Files:**
- Create: `static/css/immersive.css`

This file is inert until Task 5 wires it in, so it can land first.

- [ ] **Step 1: Write the complete stylesheet**

Create `static/css/immersive.css` with exactly this content:

```css
/* ===== Immersive app-shell design system ===== */

/* Fonts are linked in head.html via Google Fonts. */

/* ---- reset ---- */
*,*::before,*::after{box-sizing:border-box;}
html{-webkit-text-size-adjust:100%;}
body{margin:0;}
img{max-width:100%;height:auto;display:block;}
a{color:inherit;}
h1,h2,h3,h4,p,ul,ol,figure,blockquote{margin:0;}

/* ---- tokens ---- */
:root{
  --accent:#e22d30;
  --rail-bg:#0f1115; --rail-fg:#ffffff; --rail-muted:#8a8f98; --rail-line:#23262d;
  --h:'Space Grotesk',system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
  --b:'Inter',system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
  --rail-w:248px;
  /* content tokens — light (default) */
  --bg:#ffffff; --fg:#0f1115; --muted:#5a5f6a; --line:#e6e8ec; --card:#ffffff; --soft:#f5f6f8; --eyebrow:#e22d30;
}
:root[data-theme="dark"]{
  --bg:#14171d; --fg:#f3f4f6; --muted:#9aa3b2; --line:#262b34; --card:#1a1e25; --soft:#1a1e25; --eyebrow:#ff6b6d;
}

/* ---- base ---- */
body.app{font-family:var(--b);color:var(--fg);background:var(--bg);min-height:100vh;}
h1,h2,h3,h4{font-family:var(--h);line-height:1.12;font-weight:600;color:var(--fg);}
a{text-decoration:none;color:var(--accent);}
a:hover{text-decoration:underline;}

.skip-link{position:absolute;left:-9999px;top:0;background:var(--accent);color:#fff;padding:10px 16px;z-index:999;}
.skip-link:focus{left:8px;top:8px;}

/* ---- shell layout ---- */
body.app{display:flex;}
.app-rail{
  position:fixed;top:0;left:0;bottom:0;width:var(--rail-w);background:var(--rail-bg);color:var(--rail-fg);
  display:flex;flex-direction:column;padding:30px 22px;z-index:50;view-transition-name:app-rail;
}
.content{margin-left:var(--rail-w);flex:1;min-width:0;min-height:100vh;}

/* ---- rail contents ---- */
.rail-brand{font-family:var(--h);font-weight:700;font-size:22px;color:#fff;text-decoration:none;}
.rail-brand span{color:var(--accent);}
.rail-role{color:var(--rail-muted);font-size:12.5px;line-height:1.5;margin-top:8px;}
.rail-nav{margin-top:34px;display:flex;flex-direction:column;gap:2px;}
.rail-link{color:var(--rail-muted);font-size:14.5px;font-weight:500;padding:10px 12px;border-radius:8px;text-decoration:none;transition:.15s;}
.rail-link:hover{color:#fff;background:rgba(127,131,140,.16);text-decoration:none;}
.rail-link.is-active{background:var(--accent);color:#fff;}
.rail-foot{margin-top:auto;display:flex;flex-direction:column;gap:16px;padding-top:24px;}
.rail-social{display:flex;gap:14px;align-items:center;}
.rail-social a{color:var(--rail-muted);display:inline-flex;}
.rail-social a:hover{color:#fff;}
.rail-social svg{width:18px;height:18px;fill:currentColor;}
.theme-toggle{display:inline-flex;align-items:center;gap:8px;background:transparent;border:1px solid var(--rail-line);color:var(--rail-muted);
  font-family:var(--b);font-size:12.5px;padding:8px 12px;border-radius:8px;cursor:pointer;width:max-content;}
.theme-toggle:hover{color:#fff;border-color:#3a3f49;}
.theme-toggle .ico-dark{display:none;}
:root[data-theme="dark"] .theme-toggle .ico-dark{display:inline;}
:root[data-theme="dark"] .theme-toggle .ico-light{display:none;}

/* ---- content width / prose ---- */
.page{padding:6vh 6vw 10vh;}
.prose{max-width:820px;}
.prose>*+*{margin-top:18px;}
.prose h2{font-size:clamp(24px,2.6vw,34px);margin-top:42px;}
.prose h3{font-size:clamp(19px,2vw,24px);margin-top:30px;}
.prose p,.prose li{font-size:16.5px;line-height:1.7;color:var(--fg);}
.prose a{color:var(--accent);}
.prose ul,.prose ol{padding-left:22px;}
.prose li+li{margin-top:6px;}
.prose hr{border:0;border-top:1px solid var(--line);margin:40px 0;}
.prose blockquote{border-left:3px solid var(--accent);padding:6px 18px;color:var(--muted);}
.prose img{border-radius:10px;margin-top:10px;}
.prose code{background:var(--soft);padding:.15em .4em;border-radius:4px;font-size:.9em;}
.prose pre{background:#0f1115;color:#f3f4f6;padding:16px;border-radius:10px;overflow:auto;}
.prose pre code{background:none;padding:0;}
.prose table{border-collapse:collapse;width:100%;}
.prose th,.prose td{border:1px solid var(--line);padding:8px 12px;text-align:left;}
.page-head h1{font-size:clamp(32px,4vw,52px);letter-spacing:-.02em;}
.page-head .lead{margin-top:14px;color:var(--muted);font-size:18px;max-width:760px;}

.eyebrow{font-family:var(--b);font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--eyebrow);font-weight:600;}

/* ---- home hero ---- */
.hero{padding:9vh 6vw 5vh;max-width:1000px;}
.hero h1{font-size:clamp(40px,6.5vw,86px);letter-spacing:-.03em;font-weight:700;margin-top:16px;}
.hero .sub{margin-top:20px;font-size:clamp(16px,1.6vw,21px);color:var(--muted);max-width:640px;line-height:1.5;}
.hero .cta{margin-top:30px;display:flex;gap:14px;flex-wrap:wrap;}
.btn{font-family:var(--h);font-weight:600;font-size:14px;padding:13px 22px;border-radius:9px;cursor:pointer;text-decoration:none;display:inline-block;}
.btn:hover{text-decoration:none;}
.btn-pri{background:var(--accent);color:#fff;}
.btn-sec{border:1px solid var(--line);color:var(--fg);}

/* ---- cards ---- */
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;}
.card{border:1px solid var(--line);background:var(--card);border-radius:12px;padding:22px;transition:.18s;}
.card:hover{border-color:var(--accent);transform:translateY(-3px);box-shadow:0 12px 30px rgba(15,17,21,.08);}

/* ---- publications restyle (output of publication-filter.js) ---- */
.topic-tag{border-radius:6px;}
.paper-item{padding-bottom:1rem;border-bottom:1px solid var(--line);}

/* ---- mobile top bar (hidden on desktop) ---- */
.rail-bar{display:none;}

/* ---- view transitions ---- */
@view-transition{navigation:auto;}
::view-transition-old(root){animation:vt-out .16s ease both;}
::view-transition-new(root){animation:vt-in .26s ease both;}
@keyframes vt-in{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}
@keyframes vt-out{from{opacity:1;}to{opacity:0;}}

/* ---- responsive ---- */
@media (max-width:880px){
  body.app{display:block;}
  .app-rail{
    position:fixed;top:0;left:0;right:0;bottom:auto;width:auto;height:100vh;
    transform:translateX(-100%);transition:transform .25s ease;padding-top:64px;
  }
  body.nav-open .app-rail{transform:none;}
  .content{margin-left:0;padding-top:56px;}
  .rail-bar{
    display:flex;align-items:center;gap:12px;position:fixed;top:0;left:0;right:0;height:56px;z-index:60;
    background:var(--rail-bg);color:#fff;padding:0 16px;
  }
  .rail-bar .rail-brand{font-size:18px;}
  .nav-toggle{margin-left:auto;background:transparent;border:0;color:#fff;cursor:pointer;padding:8px;}
  .nav-toggle svg{width:24px;height:24px;fill:currentColor;}
}

/* ---- reduced motion ---- */
@media (prefers-reduced-motion:reduce){
  .card,.app-rail{transition:none;}
  ::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none !important;}
}
```

- [ ] **Step 2: Build check**

Run: `cd /home/yfrl/projects/homepage && hugo --quiet && echo BUILD_OK`
Expected: `BUILD_OK` (the file is static; build is unaffected). Confirm `public/css/immersive.css` exists: `test -f public/css/immersive.css && echo CSS_PRESENT` → `CSS_PRESENT`.

- [ ] **Step 3: Commit**

```bash
git add static/css/immersive.css
git commit -m "feat(immersive): add design-system stylesheet"
```

---

## Task 2: Toggle + drawer script (`theme-toggle.js`)

**Files:**
- Create: `static/js/theme-toggle.js`

- [ ] **Step 1: Write the script**

Create `static/js/theme-toggle.js` with exactly this content:

```javascript
(function () {
  var root = document.documentElement;

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    var btn = document.querySelector('[data-theme-toggle]');
    if (btn) { btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false'); }
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-theme-toggle]')) {
      var cur = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      apply(cur === 'dark' ? 'light' : 'dark');
      return;
    }
    if (e.target.closest('[data-nav-toggle]')) {
      document.body.classList.toggle('nav-open');
      return;
    }
    if (e.target.closest('.app-rail a')) {
      document.body.classList.remove('nav-open');
    }
  });
})();
```

- [ ] **Step 2: Build check**

Run: `cd /home/yfrl/projects/homepage && hugo --quiet && test -f public/js/theme-toggle.js && echo OK`
Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add static/js/theme-toggle.js
git commit -m "feat(immersive): add theme-toggle and nav-drawer script"
```

---

## Task 3: Head partial (`head.html`)

**Files:**
- Create: `layouts/partials/head.html`

Ports the essential `<head>` from the theme's `baseof.html` (OpenGraph, favicon, title) but swaps the font/stylesheet set and adds GA4 + the theme-bootstrap script. Inert until Task 5.

- [ ] **Step 1: Write the partial**

Create `layouts/partials/head.html` with exactly this content:

```go-html-template
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{ if not .IsHome }}{{ .Title }} - {{ end }}{{ .Site.Title }}</title>
<meta name="description" content="{{ if .IsHome }}{{ .Site.Params.description }}{{ else }}{{ .Params.Description }}{{ end }}">

{{- if .Site.Params.opengraph }}{{ template "_internal/opengraph.html" . }}{{ end }}

{{/* theme bootstrap: set stored theme before first paint to avoid FOUC */}}
<script>(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="{{ "css/immersive.css" | relURL }}">
{{- range .Site.Params.customCss }}
<link rel="stylesheet" href="{{ . | relURL }}">
{{- end }}

<link rel="shortcut icon" href="{{ "favicon.ico" | relURL }}">

{{/* Google Analytics 4 */}}
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Y1Y9XTF4J6"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-Y1Y9XTF4J6');
</script>

{{- if eq .Title "Publications" }}
<script defer src="{{ "js/publication-filter.js" | relURL }}"></script>
{{- end }}
```

- [ ] **Step 2: Build check**

Run: `cd /home/yfrl/projects/homepage && hugo --quiet && echo BUILD_OK`
Expected: `BUILD_OK`, no template errors. (Partial is unused until Task 5, so output is unchanged.)

- [ ] **Step 3: Commit**

```bash
git add layouts/partials/head.html
git commit -m "feat(immersive): add head partial (fonts, css, GA, theme bootstrap)"
```

---

## Task 4: Sidebar rail partial (`sidebar.html`)

**Files:**
- Create: `layouts/partials/sidebar.html`

Renders nav from `menu.main` with server-side active state, reuses the theme's SVG partials for social icons, and includes the mobile top bar + hamburger. Inert until Task 5.

- [ ] **Step 1: Write the partial**

Create `layouts/partials/sidebar.html` with exactly this content:

```go-html-template
<div class="rail-bar">
  <a class="rail-brand" href="{{ "/" | relURL }}">Steven <span>Dai</span></a>
  <button class="nav-toggle" data-nav-toggle aria-label="Toggle navigation">
    <svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>
  </button>
</div>

<aside class="app-rail">
  <a class="rail-brand" href="{{ "/" | relURL }}">Steven <span>Dai</span></a>
  <div class="rail-role">Lecturer · Computer Science<br>University of York · ReFLEX Lab</div>

  <nav class="rail-nav" aria-label="Primary">
    {{- range .Site.Menus.main }}
    {{- $active := or ($.IsMenuCurrent "main" .) ($.HasMenuCurrent "main" .) }}
    <a class="rail-link{{ if $active }} is-active{{ end }}" href="{{ .URL | relLangURL }}"{{ if $active }} aria-current="page"{{ end }}>{{ .Name }}</a>
    {{- end }}
  </nav>

  <div class="rail-foot">
    <div class="rail-social">
      <a href="https://www.linkedin.com/in/{{ .Site.Params.widgets.social.linkedin }}/" aria-label="LinkedIn" target="_blank" rel="noopener">{{ partial "svg/linkedin.svg" (dict "class" "") }}</a>
      <a href="https://github.com/{{ .Site.Params.widgets.social.github }}" aria-label="GitHub" target="_blank" rel="noopener">{{ partial "svg/github.svg" (dict "class" "") }}</a>
      <a href="mailto:{{ .Site.Params.widgets.social.email }}" aria-label="Email">{{ partial "svg/email.svg" (dict "class" "") }}</a>
    </div>
    <button class="theme-toggle" data-theme-toggle aria-pressed="false" aria-label="Toggle light or dark theme">
      <span class="ico-light">◐ Dark</span><span class="ico-dark">◑ Light</span>
    </button>
  </div>
</aside>
```

- [ ] **Step 2: Build check**

Run: `cd /home/yfrl/projects/homepage && hugo --quiet && echo BUILD_OK`
Expected: `BUILD_OK`. If a `svg/*.svg` partial errors on the `dict` arg, that is the signal to confirm the partial name; all three (`linkedin`, `github`, `email`) exist under `themes/Mainroad/layouts/partials/svg/`.

- [ ] **Step 3: Commit**

```bash
git add layouts/partials/sidebar.html
git commit -m "feat(immersive): add persistent rail sidebar partial"
```

---

## Task 5: Shell skeleton (`baseof.html`) — flips the site into the shell

**Files:**
- Create: `layouts/_default/baseof.html`

This override replaces the theme `baseof` for **every** page. After this task the whole site renders inside the rail (content pages use the theme's existing `single.html`/`list.html`/`index.html` `main` blocks until Tasks 6–8 refine them).

- [ ] **Step 1: Write the file**

Create `layouts/_default/baseof.html` with exactly this content:

```go-html-template
<!DOCTYPE html>
<html lang="{{ .Site.Language.Lang }}">
<head>{{ partial "head.html" . }}</head>
<body class="app">
  <a class="skip-link" href="#content">Skip to content</a>
  {{ partial "sidebar.html" . }}
  <main id="content" class="content">
    {{ block "main" . }}
      <div class="page"><div class="prose">{{ .Content }}</div></div>
    {{ end }}
  </main>
  <script defer src="{{ "js/theme-toggle.js" | relURL }}"></script>
  {{- partial "mathjax.html" . -}}
</body>
</html>
```

- [ ] **Step 2: Build + output assertions**

Run:
```bash
cd /home/yfrl/projects/homepage && hugo --quiet && echo BUILD_OK \
 && grep -q 'class="app-rail"' public/index.html && echo RAIL_OK \
 && grep -q 'css/immersive.css' public/index.html && echo CSS_OK \
 && grep -q 'view-transition\|app-rail' public/css/immersive.css && echo VT_OK
```
Expected: `BUILD_OK`, `RAIL_OK`, `CSS_OK`, `VT_OK`.

- [ ] **Step 3: Manual check**

Run `hugo server`, open http://localhost:1313 and 2–3 other pages (`/research/`, `/publications/`, `/lab/`). Confirm: dark rail on the left, nav present, active item highlighted, content readable on the right, theme toggle flips light/dark and survives a reload, page-to-page navigation animates in Chrome.

- [ ] **Step 4: Commit**

```bash
git add layouts/_default/baseof.html
git commit -m "feat(immersive): replace theme baseof with app-shell"
```

---

## Task 6: Home hero (`index.html`)

**Files:**
- Create: `layouts/index.html`

- [ ] **Step 1: Write the file**

Create `layouts/index.html` with exactly this content:

```go-html-template
{{ define "main" }}
<section class="hero">
  <div class="eyebrow">University of York · ReFLEX Lab</div>
  <h1>Xiaotian<br>(Steven) Dai</h1>
  <p class="sub">{{ .Site.Params.subtitle }}</p>
  <div class="cta">
    <a class="btn btn-pri" href="{{ "/research/" | relURL }}">View research</a>
    <a class="btn btn-sec" href="{{ "/publications/" | relURL }}">Publications</a>
  </div>
</section>
<div class="page"><div class="prose">
  {{ .Content }}
</div></div>
{{ end }}
```

- [ ] **Step 2: Build + assertion**

Run:
```bash
cd /home/yfrl/projects/homepage && hugo --quiet \
 && grep -q 'class="hero"' public/index.html && echo HERO_OK
```
Expected: `HERO_OK`. Manually confirm the homepage shows the hero above the existing About/Background/News content.

- [ ] **Step 3: Commit**

```bash
git add layouts/index.html
git commit -m "feat(immersive): home hero above bio content"
```

---

## Task 7: Content pages (`single.html`)

**Files:**
- Create: `layouts/_default/single.html` (replaces the existing project override, which only defined a `footer` block now obsolete)

- [ ] **Step 1: Remove the obsolete override and write the new one**

Overwrite `layouts/_default/single.html` with exactly this content:

```go-html-template
{{ define "main" }}
<article class="page">
  <header class="page-head">
    <h1>{{ .Title }}</h1>
    {{- with .Params.lead }}<p class="lead">{{ . }}</p>{{ end }}
  </header>
  <div class="prose">
    {{ .Content }}
  </div>
</article>
{{ end }}
```

(The old Publications `<script>` injection is now handled in `head.html`, so it is intentionally dropped here.)

- [ ] **Step 2: Build + assertions**

Run:
```bash
cd /home/yfrl/projects/homepage && hugo --quiet \
 && grep -q 'class="page-head"' public/research/index.html && echo SINGLE_OK \
 && grep -q 'js/publication-filter.js' public/publications/index.html && echo PUBJS_OK
```
Expected: `SINGLE_OK` and `PUBJS_OK`.

- [ ] **Step 3: Manual check**

`hugo server`; open `/publications/` and confirm the filter chips render and filtering/sorting still works; open a page with math (if any) and confirm MathJax typesets.

- [ ] **Step 4: Commit**

```bash
git add layouts/_default/single.html
git commit -m "feat(immersive): content single template in shell"
```

---

## Task 8: List/section pages (`list.html`)

**Files:**
- Create: `layouts/_default/list.html`

Covers any section index (e.g. `/projects/`) so it renders in the shell instead of falling back to the theme template.

- [ ] **Step 1: Write the file**

Create `layouts/_default/list.html` with exactly this content:

```go-html-template
{{ define "main" }}
<section class="page">
  <header class="page-head"><h1>{{ .Title }}</h1></header>
  {{- with .Content }}<div class="prose">{{ . }}</div>{{ end }}
  {{- with .Pages }}
  <div class="cards" style="margin-top:30px">
    {{- range . }}
    <a class="card" href="{{ .RelPermalink }}">
      <h3>{{ .Title }}</h3>
      {{- with .Params.lead }}<p style="color:var(--muted);margin-top:8px">{{ . }}</p>{{ end }}
    </a>
    {{- end }}
  </div>
  {{- end }}
</section>
{{ end }}
```

- [ ] **Step 2: Build check**

Run: `cd /home/yfrl/projects/homepage && hugo --quiet && echo BUILD_OK`
Expected: `BUILD_OK`. If `public/projects/index.html` exists, confirm it contains `class="page-head"`.

- [ ] **Step 3: Commit**

```bash
git add layouts/_default/list.html
git commit -m "feat(immersive): list template in shell"
```

---

## Task 9: Retire the old header override + trim wrapper CSS

**Files:**
- Delete: `layouts/partials/header.html`
- Modify: `static/css/mystyle.css`

- [ ] **Step 1: Delete the obsolete GA/header override**

```bash
git rm layouts/partials/header.html
```

(GA4 now lives in `head.html`; the shell does not render a Mainroad header.)

- [ ] **Step 2: Neutralise conflicting wrapper rules in `mystyle.css`**

In `static/css/mystyle.css`, delete these four now-unused Mainroad wrapper rules (they target `.body`, `.container`, `.container--outer`, `.flex` — classes the shell no longer uses, and `.container`'s `max-width:1000px` would fight the shell if reintroduced). Remove exactly:

```css
.body {
    background: #ffff;
}

.container {
	position: relative;
	width: 100%;
	max-width: 1000px;
	margin: 0 auto;
}

.container--outer {
	margin: 25px auto;
	box-shadow: 0 0 0px rgba(50, 50, 50, .17);
}

.flex {
  padding-left: 1%;
  padding-right: 5%;
}
```

Keep everything else in `mystyle.css` (`.flex-container`, `.circular-img`, `.container-twocolumn`, `.column-2-*`, `.row`, `.col-md`, `.large-text`, `.project-card*`) — these are used by the `contact`, `layout-*`, and `project-card` shortcodes.

- [ ] **Step 3: Build + assertions**

Run:
```bash
cd /home/yfrl/projects/homepage && hugo --quiet && echo BUILD_OK \
 && grep -q 'G-Y1Y9XTF4J6' public/index.html && echo GA_OK \
 && ! grep -q 'max-width: 1000px' public/css/mystyle.css && echo TRIM_OK
```
Expected: `BUILD_OK`, `GA_OK`, `TRIM_OK`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore(immersive): retire header override, trim wrapper CSS"
```

---

## Task 10: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Clean build with no warnings**

Run: `cd /home/yfrl/projects/homepage && rm -rf public && hugo --gc 2>&1 | tee /tmp/hugobuild.txt && ! grep -iE 'error|warn' /tmp/hugobuild.txt && echo CLEAN`
Expected: page count printed, then `CLEAN`.

- [ ] **Step 2: Per-page rail + active-state assertions**

Run:
```bash
cd /home/yfrl/projects/homepage
for p in index research/index publications/index services/index lab/index opportunities/index teaching/index news/index; do
  grep -q 'class="app-rail"' "public/$p.html" && echo "$p rail-ok" || echo "$p MISSING-RAIL";
done
grep -c 'aria-current="page"' public/research/index.html   # expect 1
```
Expected: every page prints `rail-ok`; research prints `1`.

- [ ] **Step 3: Manual matrix (`hugo server`, http://localhost:1313)**

Confirm and check off:
- [ ] Every nav page loads in the shell; active item highlighted correctly on each.
- [ ] Chrome/Edge: content animates on navigation; rail stays put. Firefox: instant navigation, no breakage.
- [ ] Mobile (DevTools ≤880px): top bar + hamburger; drawer opens/closes; tapping a link closes it.
- [ ] Light/dark toggle flips content, persists across reload + navigation, no flash on load.
- [ ] Publications: filter chips + sorting work; type badges styled.
- [ ] A page with `$…$` math typesets via MathJax.
- [ ] GA: `public/*/index.html` contains `G-Y1Y9XTF4J6`.
- [ ] JS disabled: all pages navigable and readable (real `<a href>` links; toggle simply inert).

- [ ] **Step 4: Final commit (if any manual fixes were made)**

```bash
git add -A && git commit -m "fix(immersive): verification-pass adjustments" || echo "nothing to commit"
```

---

## Self-review (completed by plan author)

- **Spec coverage:** Persistent rail (T4/T5) ✓; site-wide shell (T5) ✓; dark-rail theme + tokens (T1) ✓; light/dark toggle + persistence/no-FOUC (T1/T2/T3) ✓; Space Grotesk + Inter (T1/T3) ✓; native View Transitions + reduced-motion (T1) ✓; nav from `menu.main` in weight order with server-side active state (T4) ✓; News/Robotics left out of rail by design ✓; home hero (T6) ✓; Publications filter preserved + restyled (T3/T7/T1) ✓; other pages restyled (T7) ✓; shortcode classes preserved (T9) ✓; GA/MathJax/OpenGraph ported (T3/T5) ✓; mobile drawer (T1/T2/T4) ✓; accessibility: skip-link, focus, aria-current, toggle label (T1/T4/T5) ✓; file plan + retire header + trim CSS (T9) ✓; verification (T10) ✓.
- **Placeholder scan:** none — every step has concrete file content or exact commands.
- **Type/name consistency:** `data-theme` attribute, `data-theme-toggle`, `data-nav-toggle`, `.app-rail`, `.rail-link.is-active`, `.nav-open`, `view-transition-name:app-rail`, and `customCss` param are used identically across T1–T9.
