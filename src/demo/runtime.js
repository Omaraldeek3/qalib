// Qalib demo runtime. Inlined at the end of every demo page; no dependencies.
(() => {
  const d = document;
  const root = d.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $$ = (sel, el = d) => Array.from(el.querySelectorAll(sel));

  // Demo links go nowhere.
  $$('a[href="#"]').forEach(a => a.addEventListener('click', e => e.preventDefault()));

  // Mobile menu.
  const nav = d.querySelector('[data-nav]');
  const toggle = nav && nav.querySelector('.nav__toggle');
  if (toggle) {
    toggle.addEventListener('click', () => toggle.setAttribute('aria-expanded', String(nav.classList.toggle('is-open'))));
    $$('.nav__links a', nav).forEach(a => a.addEventListener('click', () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }));
  }

  // Words of [data-split] headings rise one after another.
  $$('[data-split]').forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((w, i) => {
      const s = d.createElement('span');
      s.className = 'w';
      s.style.setProperty('--i', i);
      s.textContent = w;
      el.append(s, i < words.length - 1 ? ' ' : '');
    });
  });

  // Numbers count up when they come into view.
  const count = el => {
    const target = el.dataset.count;
    const m = target.match(/^(\D*)([\d.,]+)(.*)$/);
    if (!m || reduce) return;
    const end = parseFloat(m[2].replace(/,/g, ''));
    const decimals = (m[2].split('.')[1] || '').length;
    const comma = m[2].includes(',');
    const start = performance.now();
    const step = now => {
      const k = Math.min(1, (now - start) / 1400);
      const v = (end * (1 - Math.pow(1 - k, 3))).toFixed(decimals);
      el.textContent = m[1] + (comma ? Number(v).toLocaleString('en-US') : v) + m[3];
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // Big figures shrink to fit their columns instead of spilling out of them,
  // all by the same amount so a row of figures stays one size.
  const fit = () => $$('.stats__grid').forEach(grid => {
    const vals = $$('.stat__value', grid);
    const shown = vals.map(el => el.textContent);
    vals.forEach(el => { el.style.fontSize = ''; if (el.dataset.count) el.textContent = el.dataset.count; });
    const base = vals.map(el => parseFloat(getComputedStyle(el).fontSize));
    let k = 1;
    for (let i = 0; i < 3; i++) {
      const over = Math.max(...vals.map(el => el.scrollWidth / el.clientWidth));
      if (over <= 1.01) break;
      k *= 0.97 / over;
      vals.forEach((el, j) => { el.style.fontSize = `${base[j] * k}px`; });
    }
    vals.forEach((el, j) => { el.textContent = shown[j]; });
  });
  fit();
  if (d.fonts) d.fonts.ready.then(fit);
  let fitTimer;
  addEventListener('resize', () => { clearTimeout(fitTimer); fitTimer = setTimeout(fit, 150); });

  // Reveal on scroll.
  const reveal = $$('[data-reveal], [data-split], [data-count]');
  const show = el => { el.classList.add('is-in'); if (el.dataset.count) count(el); };
  if (reduce || !('IntersectionObserver' in window)) reveal.forEach(el => el.classList.add('is-in'));
  else {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -6% 0px', threshold: 0.12 });
    reveal.forEach(el => io.observe(el));
  }

  // Countdown to an event.
  $$('[data-countdown]').forEach(el => {
    const end = new Date(el.dataset.countdown).getTime();
    const out = $$('[data-unit]', el);
    const tick = () => {
      let s = Math.max(0, Math.floor((end - Date.now()) / 1000));
      const v = { d: Math.floor(s / 86400), h: Math.floor(s / 3600) % 24, m: Math.floor(s / 60) % 60, s: s % 60 };
      out.forEach(o => { o.textContent = String(v[o.dataset.unit]).padStart(2, '0'); });
    };
    tick();
    setInterval(tick, 1000);
  });

  // One testimonial at a time.
  $$('.quotes--single').forEach(sec => {
    const items = $$('.quote', sec);
    const dots = $$('.quotes__dots button', sec);
    let i = 0;
    const go = n => {
      i = (n + items.length) % items.length;
      items.forEach((q, k) => q.classList.toggle('is-active', k === i));
      dots.forEach((b, k) => b.setAttribute('aria-current', String(k === i)));
    };
    dots.forEach((b, k) => b.addEventListener('click', () => go(k)));
    go(0);
    if (!reduce) setInterval(() => go(i + 1), 6500);
  });

  // Typed text.
  $$('[data-type]').forEach(el => {
    if (reduce) return;
    const text = el.textContent;
    el.textContent = '';
    let k = 0;
    const next = () => { el.textContent = text.slice(0, ++k); if (k < text.length) setTimeout(next, 38 + Math.random() * 40); };
    setTimeout(next, 500);
  });

  // Forms are for show: say thanks instead of sending.
  $$('form').forEach(f => f.addEventListener('submit', e => { e.preventDefault(); f.classList.add('is-sent'); }));

  // Words of a scrubbed statement light up one by one (see --p below).
  $$('[data-words]').forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((w, i) => {
      const s = d.createElement('span');
      s.className = 'w';
      s.style.setProperty('--i', i);
      s.textContent = w;
      el.append(s, i < words.length - 1 ? ' ' : '');
    });
    el.style.setProperty('--n', words.length);
  });

  // Pinned sections are tall and hold a sticky stage on screen while the scroll
  // writes their progress, --p, from 0 to 1. Without motion they stay still.
  const pins = reduce ? [] : $$('[data-pin]');
  pins.forEach(el => el.setAttribute('data-live', ''));
  const views = reduce ? [] : $$('[data-view]');
  const sizeStages = () => {
    // The zoom photo starts just below the headline, wherever that ends.
    $$('.hero--zoom').forEach(sec => {
      const head = sec.querySelector('.zoom__head');
      const stage = sec.querySelector('.pin__stage');
      if (head && stage.clientHeight) sec.style.setProperty('--zt', `${((head.offsetTop + head.offsetHeight + 24) / stage.clientHeight * 100).toFixed(2)}%`);
    });
    // A rail is as tall as its track is wide, so the slide keeps pace with the scroll.
    $$('[data-rail]').forEach(sec => {
      const dist = Math.max(0, sec.querySelector('.rail__track').offsetWidth - sec.querySelector('.rail__view').clientWidth);
      sec.style.setProperty('--dist', `${dist}px`);
      if (sec.hasAttribute('data-live')) sec.style.height = `${Math.round(innerHeight * 1.15 + dist)}px`;
    });
  };
  sizeStages();
  if (d.fonts) d.fonts.ready.then(sizeStages);
  let stageTimer;
  addEventListener('resize', () => { clearTimeout(stageTimer); stageTimer = setTimeout(sizeStages, 120); });

  // Scroll-driven effects.
  const progress = d.querySelector('.fx-progress');
  const parallax = reduce ? [] : $$('[data-parallax]');
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const y = scrollY;
    const vh = innerHeight;
    root.classList.toggle('is-scrolled', y > 8);
    if (progress) progress.style.setProperty('--p', String(y / Math.max(1, d.body.scrollHeight - vh)));
    parallax.forEach(el => {
      const r = el.getBoundingClientRect();
      const k = parseFloat(el.dataset.parallax) || 0.15;
      el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - vh / 2) * -k).toFixed(1)}px, 0)`;
    });
    pins.forEach(el => {
      const r = el.getBoundingClientRect();
      const total = r.height - vh;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      el.style.setProperty('--p', p.toFixed(4));
      el.toggleAttribute('data-done', p > 0.7);
    });
    // Sections that are simply passing through the screen: 0 entering, 1 leaving.
    views.forEach(el => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--p', Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height))).toFixed(4));
    });
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', () => requestAnimationFrame(onScroll));
  onScroll();

  // Pointer heroes get --mx/--my (-1 to 1, eased) and --sx/--sy (pixels). With no
  // pointer for a moment they drift on their own, so phones see the effect too.
  const mice = $$('[data-mouse]').map(el => ({ el, tx: 0, ty: 0, x: 0, y: 0, px: -1, py: -1, sx: 0, sy: 0, last: -1e9, seen: false }));
  const trails = reduce ? [] : $$('[data-trail]').map(el => ({ el, pics: el.dataset.trail.split(' '), n: 0, lx: -1e4, ly: -1e4, live: 0, last: -1e9, seen: false }));
  if (mice.length || trails.length) {
    const watch = new IntersectionObserver(entries => entries.forEach(e => {
      const o = mice.find(m => m.el === e.target) || trails.find(t => t.el === e.target);
      if (o) o.seen = e.isIntersecting;
    }));
    mice.forEach(m => {
      m.el.addEventListener('pointermove', e => {
        const r = m.el.getBoundingClientRect();
        m.px = e.clientX - r.left;
        m.py = e.clientY - r.top;
        m.tx = m.px / r.width * 2 - 1;
        m.ty = m.py / r.height * 2 - 1;
        m.last = performance.now();
      });
      m.el.addEventListener('pointerleave', () => { m.tx = 0; m.ty = 0; });
      watch.observe(m.el);
    });
    // Pressing widens the spotlight.
    $$('.hero--spotlight').forEach(el => {
      el.addEventListener('pointerdown', () => el.classList.add('is-wide'));
      ['pointerup', 'pointerleave', 'pointercancel'].forEach(t => el.addEventListener(t, () => el.classList.remove('is-wide')));
    });
    // Photos dropped along the pointer's path, one every 85px, at most 14 at a time.
    trails.forEach(t => {
      t.pics.forEach(src => { new Image().src = src; });
      t.drop = (x, y) => {
        if (Math.hypot(x - t.lx, y - t.ly) < 85 || t.live > 13) return;
        t.lx = x;
        t.ly = y;
        const pic = new Image();
        pic.src = t.pics[t.n++ % t.pics.length];
        pic.alt = '';
        pic.className = 'trail__img';
        pic.style.left = `${x}px`;
        pic.style.top = `${y}px`;
        pic.style.rotate = `${(Math.random() * 16 - 8).toFixed(1)}deg`;
        t.el.append(pic);
        t.live++;
        pic.addEventListener('animationend', () => { pic.remove(); t.live--; });
      };
      t.el.addEventListener('pointermove', e => {
        const r = t.el.getBoundingClientRect();
        t.last = performance.now();
        t.drop(e.clientX - r.left, e.clientY - r.top);
      });
      watch.observe(t.el);
    });
    const frame = now => {
      const s = now / 1000;
      mice.forEach(m => {
        if (!m.seen) return;
        const r = m.el.getBoundingClientRect();
        if (m.px < 0) { m.px = m.sx = r.width / 2; m.py = m.sy = r.height / 2; }
        if (!reduce && now - m.last > 2200) {
          m.tx = Math.sin(s * 0.7) * 0.55;
          m.ty = Math.sin(s * 1.13) * 0.45;
          m.px = r.width * (0.5 + m.tx * 0.4);
          m.py = r.height * (0.5 + m.ty * 0.4);
        }
        const k = m.el.dataset.mouse === 'fast' ? 0.2 : 0.07;
        m.x += (m.tx - m.x) * k;
        m.y += (m.ty - m.y) * k;
        m.sx += (m.px - m.sx) * 0.22;
        m.sy += (m.py - m.sy) * 0.22;
        m.el.style.setProperty('--mx', m.x.toFixed(4));
        m.el.style.setProperty('--my', m.y.toFixed(4));
        m.el.style.setProperty('--sx', `${m.sx.toFixed(1)}px`);
        m.el.style.setProperty('--sy', `${m.sy.toFixed(1)}px`);
      });
      trails.forEach(t => {
        if (!t.seen || now - t.last < 2200) return;
        const r = t.el.getBoundingClientRect();
        t.drop(r.width * (0.5 + Math.sin(s * 1.3) * 0.36), r.height * (0.5 + Math.sin(s * 2.1) * 0.3));
      });
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  // A cursor that follows the pointer, and buttons that lean towards it.
  const cursor = d.querySelector('.fx-cursor');
  if (cursor && !reduce && matchMedia('(pointer: fine)').matches) {
    addEventListener('pointermove', e => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; });
    $$('a, button').forEach(el => {
      el.addEventListener('pointerenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('pointerleave', () => cursor.classList.remove('is-hover'));
    });
  }
  if (!reduce && root.dataset.motion === 'rich' && matchMedia('(pointer: fine)').matches) {
    $$('.btn').forEach(b => {
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
  }
})();
