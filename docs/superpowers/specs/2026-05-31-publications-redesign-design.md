# Publications Visualisation Redesign — Design Spec

- **Date:** 2026-05-31
- **Author:** Xiaotian (Steven) Dai (with Claude)
- **Status:** Approved design, pending spec review
- **Topic:** Redesign the Publications page list — refined, theme-aware, build-time rendered.

## 1. Overview & Goals

Redesign the `/publications/` list from a JS-built, inline-styled, dark-mode-broken text list into a
**refined, theme-aware, build-time-rendered** publication list with a clean filter toolbar.

Goals:

1. **Accent-rail entries** — each paper a row with a type-coloured left rail, rounded type chip, bold
   title, muted author/venue lines, and outlined link pills.
2. **Theme-aware** — all styling via CSS tokens in `immersive.css`; correct in light *and* dark mode
   (the current page hardcodes `#000`/`#f5f5f5`/`#666` and breaks in dark mode).
3. **Refined 6-hue type palette** — every publication type visually distinct.
4. **Build-time rendering** — the full list is in the HTML (crawlable, works with JS off); JS only
   filters/sorts the existing DOM.
5. **Restyled toolbar** — search, year, type, sort, reset, with a live count.
6. Remove the **drag-to-reorder** feature and all **inline styles**.

## 2. Locked Decisions

| Decision | Choice |
|---|---|
| Direction | Refined list (not charts/timeline/dashboard) |
| Entry style | Accent-rail rows |
| Toolbar | Restyled one-row toolbar — search + year + type + sort + reset (all kept) |
| Type palette | Refined 6 distinct hues |
| Rendering | Build-time (Hugo) render + lightweight client-side filter/sort JS |
| Drag-to-reorder | Removed |

## 3. Non-Goals

- No charts, timelines, citation graphs, or co-author networks.
- No change to the publication data schema (`id`, `year`, `type`, `title`, `authors`, `venue`,
  `venueShort`, `links`, `notes`).
- No external JS/CSS libraries.

## 4. Architecture & Data Flow

1. **Data move:** `static/data/publications.json` → **`data/publications.json`**, so Hugo exposes it
   as `site.Data.publications` (an array). The JS no longer `fetch()`es it.
2. **Build-time render:** a new shortcode `{{< publications >}}` ranges over `site.Data.publications`
   and emits: the toolbar (with real `<select>` options for the years/types present) and the
   year-grouped list of entries. This is the no-JS, crawlable view and the default.
3. **Client-side interactivity:** the rewritten `publication-filter.js` reads the already-rendered
   `.publication-item` elements and only **shows/hides and reorders** them for search/filter/sort.
   No fetching, no HTML generation.

## 5. Files to Create / Modify

| File | Action |
|---|---|
| `data/publications.json` | **move** from `static/data/` (data source) |
| `static/data/publications.json` | **delete** (moved) |
| `layouts/shortcodes/publications.html` | **create** — renders toolbar + year-grouped entries |
| `content/publications.md` | **modify** — replace placeholder divs + inline `<style>` with `{{< publications >}}` |
| `static/js/publication-filter.js` | **rewrite** — filter/sort/reset over existing DOM; drag code removed |
| `static/css/immersive.css` | **modify** — add publications design-system styles (tokens + components) |
| `layouts/partials/head.html` | **unchanged** — still loads the JS when `.Title == "Publications"` |
| `CLAUDE.md` | **modify** — update the Publications-System note (data path + render model) |

## 6. Rendered Markup (shortcode output)

```html
<div id="publications">
  <div id="publication-filters" class="pub-toolbar"> … controls (see §8) … </div>
  <div id="publications-list">
    <section class="pub-year" data-year="2026">
      <h2 class="pub-year__head">2026</h2>
      <ul class="pub-list">
        <li class="publication-item" data-year="2026" data-type="conference"
            data-search="when memory matters… yingyi kuang … itsc'26 …">
          <span class="pub-tag pub-tag--conference">conference</span>
          <h3 class="pub-title">When Memory Matters: An Evaluation of LSTM-Based Multi-Agent …</h3>
          <p class="pub-authors">Yingyi Kuang, George Vogiatzis, <span class="pub-me">Xiaotian Dai</span>, Maria Chli</p>
          <p class="pub-venue"><strong>(ITSC'26)</strong> IEEE International Conference on … · 2026</p>
          <p class="pub-note"><em>Outstanding Paper Award</em></p>   <!-- only if notes -->
          <p class="pub-links">
            <a class="pub-link" href="…">Paper</a>
            <a class="pub-link" href="…">Code</a>
          </p>
        </li>
        …
      </ul>
    </section>
    …
  </div>
</div>
```

Rendering rules (in the shortcode):

- **Years:** unique `year` values, sorted descending; one `<section class="pub-year">` each.
- **`data-search`:** lowercased `"{title} {authors} {venue} {venueShort} {notes}"` for substring search.
- **Author emphasis:** replace `Xiaotian Dai` with `<span class="pub-me">Xiaotian Dai</span>`
  (Hugo `replace` + `safeHTML`).
- **venueShort:** strip leading/trailing `*` (`replaceRE "^\\*+|\\*+$" ""`). If present, render
  `<strong>(venueShort)</strong> venue`, else just `venue`.
- **Links:** render in a fixed preferred order — **Paper, Slides, Video, Code, Thesis**, then any
  other labels alphabetically. Each label rendered **as authored** in the JSON (no `Code`→`GitHub`
  remap). `&` in URLs escaped to `&amp;`.
- **Type label text:** `journal`→"journal", `conference`→"conference", `workshop`→"workshop",
  `chapter`→"book chapter", `wip`→"WiP paper", `thesis`→"thesis"; unknown types fall back to the raw
  type string.

## 7. Styling & Type Palette (`immersive.css`)

Add a `/* ---- publications ---- */` block. All colours via tokens; **no inline styles**.

Refined type palette (define in `:root`, white chip text):

```css
:root{
  --pub-journal:#2f5fe0; --pub-conference:#e22d30; --pub-workshop:#0d9488;
  --pub-chapter:#b4690e;  --pub-wip:#64748b;        --pub-thesis:#7c4dff;
}
:root[data-theme="dark"]{   /* lightened for contrast on dark content bg */
  --pub-journal:#5b82f5; --pub-conference:#ff5a5c; --pub-workshop:#2dd4bf;
  --pub-chapter:#e0962f;  --pub-wip:#94a3b8;        --pub-thesis:#a78bfa;
}
```

Component styling:

- `.pub-year__head` — uses the existing prose `h2` scale; a hairline `--line` divider below.
- `.publication-item` — `border-left:3px solid` set per type via
  `.publication-item[data-type="journal"]{border-left-color:var(--pub-journal)}` (one rule per type);
  padding-left; vertical rhythm; bottom hairline between items; subtle hover background `--soft`.
- `.pub-tag` — rounded pill, white text, `background` set per type via
  `.pub-tag--journal{background:var(--pub-journal)}` etc.
- `.pub-title` — `--fg`, bold, ~17px, `font-family` body.
- `.pub-authors`, `.pub-venue`, `.pub-note` — `--muted`; `.pub-me` emphasised (bold, `--fg` colour);
  `.pub-note` italic.
- `.pub-link` — outlined pill: `1px solid var(--line)`, accent text, hover fills accent bg/white text.
- `.pub-toolbar` — flex row, wraps on mobile; inputs/`select` use `--line` borders, `--card`/`--bg`
  background, `--fg` text, rounded; `.pub-count` is `--muted`, small.

## 8. Toolbar & Filter JS (`publication-filter.js`)

The shortcode renders the controls; the JS only wires them. Behaviour:

- **Search** (`#filter-search`): on input, hide items whose `data-search` doesn't include the
  lowercased query.
- **Year** (`#filter-year`, options rendered server-side incl. "All Years"): hide non-matching items.
- **Type** (`#filter-type`, options server-side incl. "All Types"): hide non-matching items.
- **Empty groups:** after any filter, hide a `.pub-year` section whose items are all hidden.
- **Count** (`#publication-count`): "N of M publications", updated on every change.
- **Sort** (`#sort-order`): `year-desc` (default) / `year-asc` reorder the `.pub-year` sections (DOM
  move); `title-asc` / `title-desc` switch to a **flattened** view — year headings hidden, all
  *visible* items moved into a single list ordered by title — restored to grouped view when a year
  sort is reselected.
- **Reset** (`#reset-filters`): clear search, set year/type to "all", sort to `year-desc`, restore
  grouped order, show everything.
- **No drag-to-reorder**, no `localStorage`.
- Guard every lookup (`if (!el) return`) so the script is a no-op on other pages.

## 9. `content/publications.md`

Replace the body (the intro line + the two placeholder `<div>`s + the inline `<style>`) so it reads:

```markdown
For a full list of publications, please visit my [Google Scholar](…) | [dblp](…).

---

{{< publications >}}
```

Front matter unchanged (keeps `layout: wide`, `menu: main`, `weight: 3`).

## 10. Verification

1. `hugo` build is clean (no errors/warnings).
2. **No-JS view:** `public/publications/index.html` contains the full year-grouped list and the
   toolbar markup (grep for `publication-item`, year `<h2>`s, all type chips).
3. With `hugo server`: search narrows live; year and type selects filter; empty year groups hide;
   the count updates; all four sort modes behave per §8; reset restores.
4. **Dark mode:** toggle the site theme — text, chips, rails, toolbar all legible; the six type
   colours remain distinct.
5. Type chips show the correct labels (incl. "book chapter", "WiP paper").
6. Link pills show labels as authored (a "Code" link reads "Code").
7. No inline styles remain on the page; no console errors; the JS is inert on non-Publications pages.

## 11. Risks & Mitigations

- **Hugo map key ordering for `links`:** ranging a map sorts keys alphabetically; mitigated by the
  fixed preferred-order rendering in §6.
- **Data path change:** confirm nothing else references `static/data/publications.json` before
  deleting it (only `publication-filter.js` did, and it no longer fetches).
- **Title-sort DOM flattening:** the one piece of non-trivial JS; covered by the §10.3 checks.

## 12. Open Questions

None blocking.
