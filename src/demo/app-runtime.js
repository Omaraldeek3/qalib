// The app demos' small runtime: the controls answer, nothing is sent anywhere.
(() => {
  const app = document.querySelector('.app');
  if (!app) return;
  const toast = document.querySelector('.app-toast');
  let timer;
  const say = text => { if (!toast) return; toast.textContent = text; toast.classList.add('is-on'); clearTimeout(timer); timer = setTimeout(() => toast.classList.remove('is-on'), 1800); };
  const ar = document.documentElement.lang === 'ar';

  // Navigation, tabs, segments: one choice in each group.
  const pick = (selector, attr) => app.querySelectorAll(selector).forEach(group => {
    group.addEventListener('click', e => {
      const btn = e.target.closest(group.dataset.item || 'a,button');
      if (!btn || !group.contains(btn)) return;
      e.preventDefault();
      group.querySelectorAll(group.dataset.item || 'a,button').forEach(x => {
        if (attr === 'class') { x.classList.toggle('is-active', x === btn); x.toggleAttribute('aria-current', x === btn); }
        else x.setAttribute(attr, String(x === btn));
      });
    });
  });
  app.querySelectorAll('.app-groups').forEach(g => { g.dataset.item = 'a'; });
  pick('.app-groups, .app-rail nav, .app-nav-top', 'class');
  pick('.ws-tabs', 'aria-selected');
  pick('.app-segment', 'aria-checked');

  app.querySelectorAll('.app-chips button').forEach(b => b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'))));
  app.querySelectorAll('.app-range input').forEach(r => {
    const out = app.querySelector(`[data-out="${r.id}"]`);
    r.addEventListener('input', () => { if (out) out.textContent = r.value + (r.dataset.unit ? ` ${r.dataset.unit}` : ''); });
  });
  app.querySelectorAll('.ws-tile, .ws-gallery figure, .ws-table tbody tr, .ws-card').forEach(el => el.addEventListener('click', () => {
    el.parentElement.querySelectorAll('.is-selected').forEach(x => x.classList.remove('is-selected'));
    el.classList.add('is-selected');
  }));
  app.querySelectorAll('.app-btn:not(.app-panel-toggle)').forEach(b => b.addEventListener('click', () => say(ar ? `«${b.textContent.trim()}» · هذا عرض توضيحي` : `"${b.textContent.trim()}" · this is a demo`)));

  // On a phone the settings panel is a drawer.
  const toggle = app.querySelector('.app-panel-toggle');
  toggle?.addEventListener('click', () => {
    const open = app.classList.toggle('panel-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
})();
