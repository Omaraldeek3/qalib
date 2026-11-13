(() => {
  const showToast = (msg) => {
    const el = document.querySelector('.bsp-toast');
    if (!el || !msg) return;
    el.textContent = msg;
    el.classList.add('is-shown');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => el.classList.remove('is-shown'), 2200);
  };

  // Generic tab switcher inside scoped [data-tabs] containers
  document.querySelectorAll('[data-tabs]').forEach((root) => {
    const tabs = root.querySelectorAll('[data-tab]');
    const panels = root.querySelectorAll('[data-panel]');
    tabs.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-tab');
        tabs.forEach((b) => {
          const on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-selected', String(on));
        });
        panels.forEach((p) => {
          const match = p.getAttribute('data-panel') === key;
          p.hidden = !match;
          p.classList.toggle('is-active', match);
        });
      });
    });
  });

  // Hover & click live stage preview (index-stage & noir-cinema)
  document.querySelectorAll('[data-stage-root]').forEach((root) => {
    const items = root.querySelectorAll('[data-stage-item]');
    const titleEl = root.querySelector('[data-stage-title]');
    const catEl = root.querySelector('[data-stage-cat]');
    const descEl = root.querySelector('[data-stage-desc]');
    const metricEl = root.querySelector('[data-stage-metric]');
    const stackEl = root.querySelector('[data-stage-stack]');
    const imgEl = root.querySelector('[data-stage-img]');
    const noEl = root.querySelector('[data-stage-no]');
    const activate = (el) => {
      items.forEach((i) => i.classList.toggle('is-active', i === el));
      if (titleEl) titleEl.textContent = el.getAttribute('data-title') || '';
      if (catEl) catEl.textContent = el.getAttribute('data-cat') || '';
      if (descEl) descEl.textContent = el.getAttribute('data-desc') || '';
      if (metricEl) metricEl.textContent = el.getAttribute('data-metric') || '';
      if (noEl) noEl.textContent = el.getAttribute('data-no') || '';
      if (stackEl) {
        const tags = (el.getAttribute('data-stack') || '').split(',').filter(Boolean);
        stackEl.innerHTML = tags.map((s) => `<span>${s}</span>`).join('');
      }
      if (imgEl && el.getAttribute('data-img')) {
        imgEl.setAttribute('src', el.getAttribute('data-img'));
      }
    };
    items.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        if (root.getAttribute('data-stage-hover') === 'true') activate(el);
      });
      el.addEventListener('click', () => activate(el));
    });
  });

  // Discipline filters (broadsheet, spatial-chapters, exposed-spec)
  document.querySelectorAll('[data-filter-root]').forEach((root) => {
    const btns = root.querySelectorAll('[data-filter]');
    const targets = root.querySelectorAll('[data-cat]');
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-filter');
        btns.forEach((b) => {
          const on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', String(on));
        });
        targets.forEach((el) => {
          const show = val === 'all' || el.getAttribute('data-cat') === val;
          el.classList.toggle('is-dimmed', !show);
          if (root.getAttribute('data-filter-mode') === 'hide') {
            el.hidden = !show;
          }
        });
      });
    });
  });

  // Expandable accordions (kinetic-marquee, monolith-split)
  document.querySelectorAll('[data-acc-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const box = btn.closest('[data-acc-item]');
      if (!box) return;
      const open = !box.classList.contains('is-open');
      box.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  // CAD blueprint layer toggles
  document.querySelectorAll('[data-layer-toggle]').forEach((chk) => {
    chk.addEventListener('change', () => {
      const layer = chk.getAttribute('data-layer-toggle');
      document.querySelectorAll(`.cad-layer-${layer}`).forEach((g) => {
        g.style.opacity = chk.checked ? '' : '0.06';
      });
    });
  });

  // Spatial modal drawer (spatial-chapters)
  const modal = document.querySelector('[data-case-modal]');
  if (modal) {
    const mTitle = modal.querySelector('[data-m-title]');
    const mCat = modal.querySelector('[data-m-cat]');
    const mDesc = modal.querySelector('[data-m-desc]');
    const mMetric = modal.querySelector('[data-m-metric]');
    const mImg = modal.querySelector('[data-m-img]');
    document.querySelectorAll('[data-open-case]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (mTitle) mTitle.textContent = btn.getAttribute('data-title') || '';
        if (mCat) mCat.textContent = btn.getAttribute('data-cat-label') || '';
        if (mDesc) mDesc.textContent = btn.getAttribute('data-desc') || '';
        if (mMetric) mMetric.textContent = btn.getAttribute('data-metric') || '';
        if (mImg) mImg.setAttribute('src', btn.getAttribute('data-img') || '');
        modal.hidden = false;
      });
    });
    modal.querySelectorAll('[data-close-modal]').forEach((b) => {
      b.addEventListener('click', () => { modal.hidden = true; });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) modal.hidden = true;
    });
  }

  // Scope calculator (solar-horizon)
  const scopeBox = document.querySelector('[data-scope-calc]');
  if (scopeBox) {
    const outWeeks = scopeBox.querySelector('[data-scope-weeks]');
    const outDeliver = scopeBox.querySelector('[data-scope-deliver]');
    const checks = scopeBox.querySelectorAll('[data-scope-opt]');
    const updateScope = () => {
      let weeks = 0;
      const picked = [];
      checks.forEach((c) => {
        if (c.classList.contains('is-active')) {
          weeks += Number(c.getAttribute('data-weeks') || 2);
          picked.push(c.getAttribute('data-out') || '');
        }
      });
      if (weeks === 0) weeks = 2;
      const isAr = document.documentElement.lang === 'ar';
      if (outWeeks) outWeeks.textContent = isAr ? `${weeks}–${weeks + 2} أسابيع` : `${weeks}–${weeks + 2} wks`;
      if (outDeliver) outDeliver.textContent = picked.length ? picked.join(' · ') : (isAr ? 'اختر مجالاً واحداً على الأقل' : 'Select one or more modules');
    };
    checks.forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('is-active');
        btn.setAttribute('aria-pressed', String(btn.classList.contains('is-active')));
        updateScope();
      });
    });
  }

  // Copy to clipboard & quick contact feedback
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-copy');
      const msg = btn.getAttribute('data-copied') || 'Copied';
      if (val && navigator.clipboard) {
        navigator.clipboard.writeText(val).catch(() => {});
      }
      showToast(msg);
    });
  });

  document.querySelectorAll('form[data-demo-form]').forEach((f) => {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast(f.getAttribute('data-sent') || 'Sent');
    });
  });

  // Scroll-spy for sticky navigation links
  const navLinks = Array.from(document.querySelectorAll('[data-spy] a[href^="#"]'));
  if (navLinks.length && 'IntersectionObserver' in window) {
    const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((ent) => {
        if (ent.isIntersecting) {
          const id = `#${ent.target.id}`;
          navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === id));
        }
      });
    }, { rootMargin: '-30% 0px -55% 0px' });
    sections.forEach((s) => io.observe(s));
  }
})();
