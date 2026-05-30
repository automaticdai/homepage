# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Research homepage for Dr. Xiaotian (Steven) Dai, built with [Hugo](https://gohugo.io/). The site is fully self-contained — all templates and styles live in this repo (no external Hugo theme). Deployed automatically to GitHub Pages on push to `master`.

## Commands

```bash
hugo server          # Local dev server with live reload (http://localhost:1313)
hugo                 # Build site to ./public/
hugo --minify        # Production build (used by CI)
```

## Architecture

### Content (`content/`)

Each `.md` file maps to a top-level page. Front matter controls menu weight, sidebar, TOC, and authorbox display. Pages:
- `_index.md` — Home: bio, background, and recent news items
- `publications.md` — Loads and renders publications client-side from JSON
- `lab.md` — ReFLEX Lab page with team members
- `news.md`, `research.md`, `teaching.md`, `services.md`, `opportunities.md`, `robots.md`
- `projects/` — Individual project pages (mocha, atas, scheme, deis)

### Publications System

Publications are stored in `static/data/publications.json` as a JSON array with fields: `id`, `year`, `type`, `title`, `authors`, `venue`, `venueShort`, `links`, `notes`. Valid `type` values: `journal`, `conference`, `workshop`, `chapter`, `wip`, `thesis`.

`static/js/publication-filter.js` fetches this JSON at runtime and renders a filterable, sortable publication list into `publications.md`'s placeholder `div#publications-container`. **To add a publication, edit `publications.json` only** — not the markdown file.

### Custom Shortcodes (`layouts/shortcodes/`)

- `{{<contact>}}` — renders the portrait + bio card on the homepage
- `{{< news "type" >}}` — inline colored label for news items; types: `paper`, `service`, `project`, `talk`
- `{{< bibtitle >}}`, `{{< bibauthors >}}` — publication title/author formatting
- `{{< tag-journal >}}`, `{{< tag-conference >}}`, `{{< tag-workshop >}}`, `{{< tag-chapter >}}`, `{{< tag-thesis >}}`, `{{< tag-wip >}}`, `{{< tag-preprint >}}` — publication type badges
- `{{< layout-twocolumn >}}`, `{{< layout-twocolumn-experience >}}`, `{{< layout-row >}}`, `{{< layout-column >}}` — multi-column layout helpers for page content

### Templates (`layouts/`)

The site is a self-contained "immersive app-shell": a persistent dark navigation rail with native View-Transitions page animations and a light/dark toggle. Key templates:
- `layouts/_default/baseof.html` — the app shell (`<head>` + sidebar rail + single `<main>` content block)
- `layouts/partials/head.html` — meta/OpenGraph, fonts, stylesheet links, theme-bootstrap script, Google Analytics (GA4: `G-Y1Y9XTF4J6`), and the conditional Publications JS
- `layouts/partials/sidebar.html` — the persistent rail: nav from `menu.main` (server-side active state), inline social SVGs, light/dark toggle, mobile hamburger
- `layouts/partials/mathjax.html` — conditional MathJax loader
- `layouts/index.html` — home hero (portrait, name, role, profile links) above the bio content
- `layouts/_default/single.html`, `list.html`, `404.html` — content / list / 404 pages, all inside the shell

### Styling (`static/css/`)

- `immersive.css` — the full design system: reset, CSS tokens (incl. `[data-theme="dark"]`), shell/rail layout, typography (Space Grotesk + Inter), prose, components, View Transitions, mobile drawer, reduced-motion
- `mystyle.css` — shortcode/component classes (contact card, `layout-*` helpers, project cards)
- `custom.css` — publication-list styles

`immersive.css` is linked first in `head.html`; `mystyle.css` / `custom.css` follow via the `config.toml` `customCss` param. The accent color is `#e22d30`; the light/dark toggle is handled by `static/js/theme-toggle.js`.

### Deployment

GitHub Actions workflow (`.github/workflows/`) triggers on push to `master`, builds with Hugo Extended 0.145.0, and deploys to GitHub Pages. `canonifyURLs = true` in config.toml handles URL rewriting for the Pages subdomain.
