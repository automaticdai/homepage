# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Research homepage for Dr. Xiaotian (Steven) Dai, built with [Hugo](https://gohugo.io/) and the [Mainroad theme](https://github.com/Vimux/Mainroad) (git submodule). Deployed automatically to GitHub Pages on push to `master`.

## Commands

```bash
hugo server          # Local dev server with live reload (http://localhost:1313)
hugo                 # Build site to ./public/
hugo --minify        # Production build (used by CI)
```

The Mainroad theme must be initialized as a submodule:
```bash
git submodule update --init --recursive
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

### Theme Overrides

Files in `layouts/` override the Mainroad theme at the same relative path. Currently overridden:
- `layouts/partials/header.html` — adds Google Analytics (GA4: `G-Y1Y9XTF4J6`)
- `layouts/_default/single.html` — custom single page template

### Styling (`static/css/`)

- `mystyle.css` — structural overrides (container width, flex layouts, circular portrait image)
- `custom.css` — additional customizations

Both are loaded via `config.toml` `customCss` param. The site accent color is `#e22d30`.

### Deployment

GitHub Actions workflow (`.github/workflows/`) triggers on push to `master`, builds with Hugo Extended 0.145.0, and deploys to GitHub Pages. `canonifyURLs = true` in config.toml handles URL rewriting for the Pages subdomain.
