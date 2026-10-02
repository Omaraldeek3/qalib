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

  // Scroll-driven effects.
  const progress = d.querySelector('.fx-progress');
  const parallax = reduce ? [] : $$('[data-parallax]');
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const y = scrollY;
    root.classList.toggle('is-scrolled', y > 8);
    if (progress) progress.style.setProperty('--p', String(y / Math.max(1, d.body.scrollHeight - innerHeight)));
    parallax.forEach(el => {
      const r = el.getBoundingClientRect();
      const k = parseFloat(el.dataset.parallax) || 0.15;
      el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - innerHeight / 2) * -k).toFixed(1)}px, 0)`;
    });
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

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
