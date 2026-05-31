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
