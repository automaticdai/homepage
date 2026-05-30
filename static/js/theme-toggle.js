(function () {
  var root = document.documentElement;

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    var btn = document.querySelector('[data-theme-toggle]');
    if (btn) { btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false'); }
  }

  // sync the toggle's pressed state with the theme applied before first paint
  var initBtn = document.querySelector('[data-theme-toggle]');
  if (initBtn) { initBtn.setAttribute('aria-pressed', root.getAttribute('data-theme') === 'dark' ? 'true' : 'false'); }

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-theme-toggle]')) {
      var cur = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      apply(cur === 'dark' ? 'light' : 'dark');
      return;
    }
    var navBtn = e.target.closest('[data-nav-toggle]');
    if (navBtn) {
      var open = document.body.classList.toggle('nav-open');
      navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      return;
    }
    if (e.target.closest('.app-rail a')) {
      document.body.classList.remove('nav-open');
      var nb = document.querySelector('[data-nav-toggle]');
      if (nb) { nb.setAttribute('aria-expanded', 'false'); }
    }
  });
})();
