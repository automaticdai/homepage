# Publications Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the JS-built, inline-styled, dark-mode-broken Publications list with a refined, theme-aware list that Hugo renders at build time (crawlable / works with JS off), where JavaScript only filters and sorts the existing DOM.

**Architecture:** Move the JSON into Hugo's `data/` dir; a new `{{< publications >}}` shortcode renders the toolbar + year-grouped accent-rail entries at build time; the rewritten `publication-filter.js` only show/hides and reorders those elements. All styling lives in `immersive.css` via CSS tokens.

**Tech Stack:** Hugo (Go templates, `site.Data`), vanilla JS, vanilla CSS. No libraries.

---

## Domain note: verification without a unit-test harness

Static-site project — there is no pytest/jest. Each task's "tests" are: a clean `hugo` build and `grep` assertions on generated files under `public/`. Use exactly the commands given. Do NOT run `hugo server` (long-running); use `hugo --quiet`/`hugo --gc`. Work on the `publications-redesign` branch. Commit after every task.

## File structure

| File | Responsibility |
|---|---|
| `data/publications.json` | Publication data (moved from `static/data/`); exposed as `site.Data.publications`. |
| `layouts/shortcodes/publications.html` | Build-time render of the toolbar + year-grouped entries. |
| `static/js/publication-filter.js` | Client-side filter/sort over the rendered DOM (no fetch, no HTML build, no drag). |
| `static/css/immersive.css` | Publications design-system styles (type tokens + components), scoped under `#publications`. |
| `content/publications.md` | Uses `{{< publications >}}`; no inline styles. |
| `CLAUDE.md` | Updated Publications-System note. |

---

## Task 1: Move data into Hugo's `data/` dir

**Files:**
- Create: `data/publications.json` (copy of `static/data/publications.json`)

Copy now (don't delete the original yet — the current page keeps working until Task 3 swaps the renderer).

- [ ] **Step 1: Copy the file**

```bash
cd /home/yfrl/projects/homepage
mkdir -p data
cp static/data/publications.json data/publications.json
```

- [ ] **Step 2: Verify Hugo exposes it as site data**

Run:
```bash
cd /home/yfrl/projects/homepage && hugo --quiet && echo BUILD_OK
test -f data/publications.json && echo DATA_OK
```
Expected: `BUILD_OK`, `DATA_OK`.

- [ ] **Step 3: Commit**

```bash
git add data/publications.json
git commit -m "data: add publications.json to Hugo data dir"
```

---

## Task 2: Publications styles in `immersive.css`

**Files:**
- Modify: `static/css/immersive.css` (append a publications block at the end)

Inert until Task 3 renders the markup. All component rules are scoped under `#publications` so they win over the `.prose` rules on the page (an id selector outranks `.prose x`).

- [ ] **Step 1: Append the block to `static/css/immersive.css`**

Add exactly this at the end of the file:

```css

/* ===== publications ===== */
:root{
  --pub-journal:#2f5fe0; --pub-conference:#e22d30; --pub-workshop:#0d9488;
  --pub-chapter:#b4690e; --pub-wip:#64748b; --pub-thesis:#7c4dff;
}
:root[data-theme="dark"]{
  --pub-journal:#5b82f5; --pub-conference:#ff5a5c; --pub-workshop:#2dd4bf;
  --pub-chapter:#e0962f; --pub-wip:#94a3b8; --pub-thesis:#a78bfa;
}
#publications .pub-toolbar{position:sticky;top:0;z-index:20;display:flex;flex-wrap:wrap;gap:10px;
  align-items:center;padding:14px;margin:0 0 22px;background:var(--bg);border:1px solid var(--line);border-radius:12px;}
#publications .pub-input,#publications .pub-select{font-family:var(--b);font-size:14px;color:var(--fg);
  background:var(--card);border:1px solid var(--line);border-radius:8px;padding:8px 10px;}
#publications .pub-input{flex:1;min-width:200px;}
#publications .pub-reset{font-family:var(--b);font-size:13px;color:var(--muted);background:transparent;
  border:1px solid var(--line);border-radius:8px;padding:8px 14px;cursor:pointer;}
#publications .pub-reset:hover{color:var(--fg);border-color:var(--muted);}
#publications .pub-count{color:var(--muted);font-size:13px;margin-left:auto;}
#publications h2.pub-year__head{font-size:clamp(22px,2.4vw,30px);margin:34px 0 8px;padding-bottom:6px;
  border-bottom:1px solid var(--line);}
#publications ul.pub-list{list-style:none;padding:0;margin:0;}
#publications .publication-item{margin:0;border-left:3px solid var(--line);padding:14px 0 14px 16px;
  border-bottom:1px solid var(--line);transition:background .15s;}
#publications .publication-item:hover{background:var(--soft);}
#publications .publication-item[data-type="journal"]{border-left-color:var(--pub-journal);}
#publications .publication-item[data-type="conference"]{border-left-color:var(--pub-conference);}
#publications .publication-item[data-type="workshop"]{border-left-color:var(--pub-workshop);}
#publications .publication-item[data-type="chapter"]{border-left-color:var(--pub-chapter);}
#publications .publication-item[data-type="wip"]{border-left-color:var(--pub-wip);}
#publications .publication-item[data-type="thesis"]{border-left-color:var(--pub-thesis);}
#publications .pub-tag{display:inline-block;font-size:11px;font-weight:600;color:#fff;padding:2px 10px;
  border-radius:20px;margin-bottom:8px;}
#publications .pub-tag--journal{background:var(--pub-journal);}
#publications .pub-tag--conference{background:var(--pub-conference);}
#publications .pub-tag--workshop{background:var(--pub-workshop);}
#publications .pub-tag--chapter{background:var(--pub-chapter);}
#publications .pub-tag--wip{background:var(--pub-wip);}
#publications .pub-tag--thesis{background:var(--pub-thesis);}
#publications h3.pub-title{font-family:var(--b);font-size:17px;font-weight:700;color:var(--fg);
  line-height:1.35;margin:0;}
#publications .pub-authors,#publications .pub-venue,#publications .pub-note{font-size:14.5px;
  color:var(--muted);line-height:1.5;margin:4px 0 0;}
#publications .pub-me{font-weight:700;color:var(--fg);}
#publications .pub-note{font-style:italic;}
#publications .pub-links{margin:9px 0 0;display:flex;flex-wrap:wrap;gap:8px;}
#publications .pub-link{font-size:12.5px;color:var(--accent);border:1px solid var(--line);border-radius:6px;
  padding:3px 10px;text-decoration:none;}
#publications .pub-link:hover{background:var(--accent);color:#fff;border-color:var(--accent);text-decoration:none;}
```

- [ ] **Step 2: Build check**

Run: `cd /home/yfrl/projects/homepage && hugo --quiet && grep -q 'pub-tag--journal' public/css/immersive.css && echo CSS_OK`
Expected: `CSS_OK`.

- [ ] **Step 3: Commit**

```bash
git add static/css/immersive.css
git commit -m "style(publications): add theme-aware publication list styles"
```

---

## Task 3: Render switch — shortcode + JS rewrite + page (atomic)

These three changes must land together: the shortcode renders the new DOM, the rewritten JS drives that DOM, and `publications.md` invokes the shortcode. (Doing one without the others leaves the page broken, so they are one task.)

**Files:**
- Create: `layouts/shortcodes/publications.html`
- Rewrite: `static/js/publication-filter.js`
- Modify: `content/publications.md`

- [ ] **Step 1: Create `layouts/shortcodes/publications.html`**

Exact content:

```go-html-template
{{- $pubs := site.Data.publications -}}
{{- $labels := dict "journal" "journal" "conference" "conference" "workshop" "workshop" "chapter" "book chapter" "wip" "WiP paper" "thesis" "thesis" -}}
{{- $linkOrder := slice "Paper" "Slides" "Video" "Code" "Thesis" -}}
{{- $years := slice -}}
{{- range $pubs }}{{ $years = $years | append .year }}{{ end -}}
{{- $years = collections.Reverse (sort (uniq $years)) -}}
{{- $types := slice -}}
{{- range $pubs }}{{ $types = $types | append .type }}{{ end -}}
{{- $types = uniq $types -}}
<div id="publications">
  <div id="publication-filters" class="pub-toolbar">
    <input type="search" id="filter-search" class="pub-input" placeholder="Search title, author, venue…" aria-label="Search publications">
    <select id="filter-year" class="pub-select" aria-label="Filter by year">
      <option value="all">All years</option>
      {{- range $years }}<option value="{{ int . }}">{{ int . }}</option>{{ end }}
    </select>
    <select id="filter-type" class="pub-select" aria-label="Filter by type">
      <option value="all">All types</option>
      {{- range $types }}<option value="{{ . }}">{{ index $labels . | default . }}</option>{{ end }}
    </select>
    <select id="sort-order" class="pub-select" aria-label="Sort order">
      <option value="year-desc">Newest first</option>
      <option value="year-asc">Oldest first</option>
      <option value="title-asc">Title A–Z</option>
      <option value="title-desc">Title Z–A</option>
    </select>
    <button id="reset-filters" class="pub-reset" type="button">Reset</button>
    <span id="publication-count" class="pub-count"></span>
  </div>
  <div id="publications-list">
    {{- range $year := $years }}
    <section class="pub-year" data-year="{{ int $year }}">
      <h2 class="pub-year__head">{{ int $year }}</h2>
      <ul class="pub-list">
        {{- range where $pubs "year" $year }}
        {{- $vs := replaceRE "^\\*+|\\*+$" "" (.venueShort | default "") -}}
        {{- $authors := replace .authors "Xiaotian Dai" "<span class=\"pub-me\">Xiaotian Dai</span>" -}}
        {{- $search := lower (printf "%s %s %s %s %s" .title .authors .venue (.venueShort | default "") (.notes | default "")) -}}
        <li class="publication-item" data-year="{{ int .year }}" data-type="{{ .type }}" data-title="{{ .title }}" data-search="{{ $search }}">
          <span class="pub-tag pub-tag--{{ .type }}">{{ index $labels .type | default .type }}</span>
          <h3 class="pub-title">{{ .title }}</h3>
          <p class="pub-authors">{{ $authors | safeHTML }}</p>
          <p class="pub-venue">{{ with $vs }}<strong>({{ . }})</strong> {{ end }}{{ .venue }} · {{ int .year }}</p>
          {{- with .notes }}<p class="pub-note"><em>{{ . }}</em></p>{{ end }}
          {{- with .links }}
          {{- $links := . }}{{ $done := slice }}
          <p class="pub-links">
            {{- range $label := $linkOrder }}{{ with index $links $label }}<a class="pub-link" href="{{ . }}">{{ $label }}</a>{{ $done = $done | append $label }}{{ end }}{{ end -}}
            {{- range $label, $url := $links }}{{ if not (in $done $label) }}<a class="pub-link" href="{{ $url }}">{{ $label }}</a>{{ end }}{{ end -}}
          </p>
          {{- end }}
        </li>
        {{- end }}
      </ul>
    </section>
    {{- end }}
  </div>
</div>
```

- [ ] **Step 2: Rewrite `static/js/publication-filter.js`**

Replace the entire file with exactly:

```javascript
// Publications: filter & sort the build-time-rendered DOM. No fetching, no HTML generation.
(function () {
  'use strict';
  var root = document.getElementById('publications');
  if (!root) return;

  var listEl = document.getElementById('publications-list');
  var searchEl = document.getElementById('filter-search');
  var yearEl = document.getElementById('filter-year');
  var typeEl = document.getElementById('filter-type');
  var sortEl = document.getElementById('sort-order');
  var resetEl = document.getElementById('reset-filters');
  var countEl = document.getElementById('publication-count');

  var sections = Array.prototype.slice.call(listEl.querySelectorAll('.pub-year'));
  var items = Array.prototype.slice.call(listEl.querySelectorAll('.publication-item'));
  var total = items.length;

  // Record original grouped layout so we can restore after a title (flat) sort.
  var sectionOrder = sections.slice();
  var homeItems = new Map();
  items.forEach(function (it) {
    var ul = it.parentNode;
    if (!homeItems.has(ul)) homeItems.set(ul, []);
    homeItems.get(ul).push(it);
  });

  // One reusable container for the flattened title-sorted view.
  var flatList = document.createElement('ul');
  flatList.className = 'pub-list pub-list--flat';
  flatList.style.display = 'none';
  listEl.appendChild(flatList);

  function isFlat() { return flatList.style.display !== 'none'; }

  function matches(it) {
    var q = (searchEl ? searchEl.value : '').trim().toLowerCase();
    var y = yearEl ? yearEl.value : 'all';
    var t = typeEl ? typeEl.value : 'all';
    if (q && it.dataset.search.indexOf(q) === -1) return false;
    if (y !== 'all' && it.dataset.year !== y) return false;
    if (t !== 'all' && it.dataset.type !== t) return false;
    return true;
  }

  function restoreGrouped() {
    flatList.style.display = 'none';
    homeItems.forEach(function (arr, ul) {
      arr.forEach(function (it) { ul.appendChild(it); });
    });
    sectionOrder.forEach(function (s) {
      listEl.appendChild(s);
      s.style.display = '';
    });
    listEl.appendChild(flatList);
  }

  function sortYears(dir) {
    restoreGrouped();
    sectionOrder.slice().sort(function (a, b) {
      var d = (+a.dataset.year) - (+b.dataset.year);
      return dir === 'asc' ? d : -d;
    }).forEach(function (s) { listEl.appendChild(s); });
    listEl.appendChild(flatList);
  }

  function sortTitles(dir) {
    items.slice().sort(function (a, b) {
      var r = a.dataset.title.localeCompare(b.dataset.title);
      return dir === 'asc' ? r : -r;
    }).forEach(function (it) { flatList.appendChild(it); });
    sections.forEach(function (s) { s.style.display = 'none'; });
    flatList.style.display = '';
  }

  function applySort() {
    var v = sortEl ? sortEl.value : 'year-desc';
    if (v === 'title-asc') sortTitles('asc');
    else if (v === 'title-desc') sortTitles('desc');
    else if (v === 'year-asc') sortYears('asc');
    else sortYears('desc');
  }

  function applyFilters() {
    var shown = 0;
    items.forEach(function (it) {
      var ok = matches(it);
      it.style.display = ok ? '' : 'none';
      if (ok) shown++;
    });
    if (!isFlat()) {
      sections.forEach(function (s) {
        var any = Array.prototype.some.call(s.querySelectorAll('.publication-item'), function (it) {
          return it.style.display !== 'none';
        });
        s.style.display = any ? '' : 'none';
      });
    }
    if (countEl) countEl.textContent = shown + ' of ' + total + ' publications';
  }

  function update() { applySort(); applyFilters(); }

  if (searchEl) searchEl.addEventListener('input', applyFilters);
  if (yearEl) yearEl.addEventListener('change', applyFilters);
  if (typeEl) typeEl.addEventListener('change', applyFilters);
  if (sortEl) sortEl.addEventListener('change', update);
  if (resetEl) resetEl.addEventListener('click', function () {
    if (searchEl) searchEl.value = '';
    if (yearEl) yearEl.value = 'all';
    if (typeEl) typeEl.value = 'all';
    if (sortEl) sortEl.value = 'year-desc';
    update();
  });

  update();
})();
```

- [ ] **Step 3: Update `content/publications.md`**

Replace everything from the `<div id="publication-filters"...>` line through the closing `</style>` (i.e. the two placeholder divs and the inline `<style>` block) with a single shortcode call, so the file body reads exactly:

```markdown
For a full list of publications, please visit my [Google Scholar](https://scholar.google.co.uk/citations?hl=en&user=G7dzNUkAAAAJ&view_op=list_works&sortby=pubdate) | [dblp](https://dblp.org/pid/199/5323.html).

---

{{< publications >}}
```

Leave the front matter (including `layout: wide`) unchanged.

- [ ] **Step 4: Build and verify the build-time render (no JS needed)**

Run:
```bash
cd /home/yfrl/projects/homepage && rm -rf public && hugo --gc 2>&1 | grep -iE 'error|warn' && echo "!!WARN" || echo BUILD_CLEAN
F=public/publications/index.html
grep -c 'class="publication-item"' "$F"        # expect 36 (all papers, server-rendered)
grep -q 'pub-tag--conference' "$F" && echo CHIP_OK
grep -q '<h2 class="pub-year__head">2026' "$F" && echo YEAR_OK
grep -q 'pub-me">Xiaotian Dai' "$F" && echo AUTHOR_OK
grep -q 'js/publication-filter.js' "$F" && echo JS_LOADED
grep -q 'Loading publications' "$F" && echo "!!STALE_PLACEHOLDER" || echo NO_PLACEHOLDER
grep -q 'id="publications-container"' "$F" && echo "!!OLD_MARKUP" || echo NEW_MARKUP
```
Expected: `BUILD_CLEAN`; the count equals the number of entries in `data/publications.json` (36 at time of writing); `CHIP_OK`, `YEAR_OK`, `AUTHOR_OK`, `JS_LOADED`, `NO_PLACEHOLDER`, `NEW_MARKUP`. If `!!WARN` appears, read the Hugo error and fix the shortcode before continuing — do not proceed with a broken template.

- [ ] **Step 5: Manual check**

`hugo server`; open `/publications/`. Confirm: grouped by year with coloured rails + chips; search narrows live; year and type selects filter; empty year groups disappear; the count updates; all four sort modes work (title sort flattens, year sort regroups); reset restores; toggle dark mode and confirm everything stays legible and the six type colours stay distinct.

- [ ] **Step 6: Commit**

```bash
git add layouts/shortcodes/publications.html static/js/publication-filter.js content/publications.md
git commit -m "feat(publications): build-time render + DOM filter/sort, drop drag & inline styles"
```

---

## Task 4: Delete the old static JSON

**Files:**
- Delete: `static/data/publications.json`

The JS no longer fetches it and the shortcode reads `data/`.

- [ ] **Step 1: Confirm nothing references the old path, then delete**

Run:
```bash
cd /home/yfrl/projects/homepage
grep -rn 'static/data/publications\|/data/publications.json' layouts/ static/js/ content/ || echo "NO_REFS"
git rm static/data/publications.json
```
Expected: `NO_REFS` (no code path references the static copy), then the file is staged for deletion.

- [ ] **Step 2: Clean build + still rendered from data/**

Run:
```bash
cd /home/yfrl/projects/homepage && rm -rf public && hugo --gc 2>&1 | grep -iE 'error|warn' && echo "!!WARN" || echo BUILD_CLEAN
grep -c 'class="publication-item"' public/publications/index.html
```
Expected: `BUILD_CLEAN`; the item count is unchanged.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore(publications): remove old static JSON (now served from data/)"
```

---

## Task 5: Update `CLAUDE.md`

**Files:**
- Modify: `CLAUDE.md` (the "Publications System" section)

- [ ] **Step 1: Replace the Publications System paragraph**

Find this block in `CLAUDE.md`:

```markdown
Publications are stored in `static/data/publications.json` as a JSON array with fields: `id`, `year`, `type`, `title`, `authors`, `venue`, `venueShort`, `links`, `notes`. Valid `type` values: `journal`, `conference`, `workshop`, `chapter`, `wip`, `thesis`.

`static/js/publication-filter.js` fetches this JSON at runtime and renders a filterable, sortable publication list into `publications.md`'s placeholder `div#publications-container`. **To add a publication, edit `publications.json` only** — not the markdown file.
```

Replace it with exactly:

```markdown
Publications are stored in `data/publications.json` as a JSON array with fields: `id`, `year`, `type`, `title`, `authors`, `venue`, `venueShort`, `links`, `notes`. Valid `type` values: `journal`, `conference`, `workshop`, `chapter`, `wip`, `thesis`.

The `{{</* publications */>}}` shortcode (`layouts/shortcodes/publications.html`) renders the list from `site.Data.publications` at build time, grouped by year with type-coloured accent-rail entries. `static/js/publication-filter.js` then only filters/sorts the already-rendered DOM (search, year, type, sort). Styles live in `immersive.css` under `#publications`. **To add a publication, edit `data/publications.json` only** — not the markdown file.
```

- [ ] **Step 2: Build check + commit**

```bash
cd /home/yfrl/projects/homepage && hugo --quiet && echo BUILD_OK
git add CLAUDE.md
git commit -m "docs: update Publications System notes for build-time render"
```
Expected: `BUILD_OK`.

---

## Task 6: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Clean build, no warnings**

Run: `cd /home/yfrl/projects/homepage && rm -rf public && hugo --gc 2>&1 | tee /tmp/pub.txt | tail -2 && ! grep -iE 'error|warn' /tmp/pub.txt && echo CLEAN`
Expected: page count then `CLEAN`.

- [ ] **Step 2: No-JS / server-render assertions**

Run:
```bash
cd /home/yfrl/projects/homepage
F=public/publications/index.html
echo "items: $(grep -c 'class="publication-item"' $F)"   # equals entries in data/publications.json
for t in journal conference workshop chapter wip thesis; do
  grep -q "pub-tag--$t" $F && echo "$t chip: present" || echo "$t chip: (none of this type)";
done
grep -q 'id="publication-filters"' $F && echo TOOLBAR_OK
grep -q 'publications-container\|Loading publications' $F && echo "!!OLD_ARTIFACTS" || echo CLEAN_MARKUP
grep -rq 'style=' $F && echo "note: inline styles still present" || echo NO_INLINE_STYLES
```
Expected: item count matches the data; `TOOLBAR_OK`; `CLEAN_MARKUP`. (`NO_INLINE_STYLES` is ideal; the only allowable inline `style` is none from this page's own markup.)

- [ ] **Step 3: Manual matrix (`hugo server`, http://localhost:1313/publications/)**

Check off:
- [ ] Grouped by year, newest first; coloured rails + chips; "Xiaotian Dai" emphasised.
- [ ] Search narrows live (title/author/venue); count updates.
- [ ] Year select and Type select filter; empty year groups vanish; combined with search.
- [ ] Sort: newest/oldest reorder the year groups; Title A–Z / Z–A flatten (year headings hidden); switching back to a year sort restores grouping.
- [ ] Reset clears everything back to newest-first.
- [ ] Link pills show labels as authored (a "Code" link reads "Code").
- [ ] Dark mode (rail toggle): toolbar, chips, rails, text all legible; six type colours distinct.
- [ ] Other pages: no console errors (the JS is a no-op where `#publications` is absent).

- [ ] **Step 4: Final commit (if any fixes were made)**

```bash
git add -A && git commit -m "fix(publications): verification-pass adjustments" || echo "nothing to commit"
```

---

## Self-review (by plan author)

- **Spec coverage:** accent-rail entries (T2/T3) ✓; theme-aware tokens incl. dark (T2) ✓; refined 6-hue palette (T2) ✓; build-time render via shortcode + `site.Data` (T1/T3) ✓; JS filters/sorts existing DOM only (T3) ✓; toolbar search/year/type/sort/reset + count (T3) ✓; year grouping + empty-group hiding (T3) ✓; title-sort flatten behaviour (T3) ✓; drag-to-reorder removed (T3) ✓; inline styles removed (T3) ✓; `Code`→`GitHub` remap dropped — labels as authored (T3 link rendering) ✓; data moved to `data/`, old static deleted (T1/T4) ✓; CLAUDE.md updated (T5) ✓; verification incl. no-JS + dark mode (T6) ✓.
- **Placeholder scan:** none — every step has concrete file content or exact commands. The "36" item count is documented as "equals entries in data/publications.json" so it stays correct if the data grows.
- **Name consistency:** ids/classes used identically across shortcode, JS, and CSS: `#publications`, `#publication-filters`, `#publications-list`, `.pub-year[data-year]`, `.pub-year__head`, `.pub-list`, `.publication-item[data-type][data-year][data-title][data-search]`, `.pub-tag--<type>`, `.pub-title`, `.pub-authors`, `.pub-venue`, `.pub-note`, `.pub-me`, `.pub-links`, `.pub-link`, control ids `filter-search`/`filter-year`/`filter-type`/`sort-order`/`reset-filters`/`publication-count`.
