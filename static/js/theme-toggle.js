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
