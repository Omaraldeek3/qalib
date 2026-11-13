import type { L, Lang } from '@/catalog/types';
import { img } from '../context';
import {
  CAPABILITIES, IDENTITY, STATS, WORKS,
  SVG_NAQSH_ROSETTE, SVG_PIPELINE_NODE_MAP,
} from './content';
import type { RenderProps } from './renderers-grid';

const tx = (l: L, lang: Lang) => l[lang];

export function renderSpatialChapters({ lang }: RenderProps) {
  const ar = lang === 'ar';
  return (
    <div className="sc-desk" id="ws" data-filter-root>
      <header className="sc-bar">
        <div className="sc-brand">
          <strong>{tx(IDENTITY.brand, lang)}</strong>
          <span className="bsp-mono">{`// ${tx(IDENTITY.location, lang)}`}</span>
        </div>
        <div className="sc-filters" role="group" aria-label={ar ? 'تصفية الألواح' : 'Filter plates'}>
          {[
            { id: 'all', label: ar ? 'الكل' : 'All' },
            { id: 'web', label: ar ? 'الويب' : 'Web' },
            { id: 'ai', label: ar ? 'الأتمتة' : 'AI Systems' },
            { id: 'svg', label: ar ? 'الأدوات والقص' : 'SVG Labs' },
          ].map((f, i) => (
            <button key={f.id} type="button" className={i === 0 ? 'is-active' : undefined} data-filter={f.id} aria-pressed={i === 0}>
              {f.label}
            </button>
          ))}
        </div>
      </header>

      <section className="sc-table">
        <div className="sc-thesis">
          <small className="bsp-mono" style={{ color: 'var(--accent)', fontWeight: 700 }}>{tx(IDENTITY.availability, lang)}</small>
          <h1>{tx(IDENTITY.headline, lang)}</h1>
          <p>{tx(IDENTITY.lead, lang)}</p>
          <div className="sc-note-pin">
            <b>{ar ? 'تلميح تفاعلي ←' : 'Interactive Table →'}</b>
            <span>{ar ? 'انقر على أي لوح لفتح ملف تفاصيل المشروع، أو استعمل أزرار التخصص أعلاه.' : 'Click any staggered studio plate to inspect the full case brief or filter by discipline.'}</span>
          </div>
        </div>

        <div className="sc-plates">
          {WORKS.slice(0, 6).map((w) => (
            <button
              type="button"
              key={w.id}
              className="sc-plate"
              data-cat={w.cat}
              data-open-case
              data-title={tx(w.title, lang)}
              data-cat-label={tx(w.catLabel, lang)}
              data-desc={tx(w.summary, lang)}
              data-metric={tx(w.metric, lang)}
              data-img={img(w.img)}
            >
              <div className="sc-plate-img">
                <img src={img(w.img)} alt="" />
                <span className="sc-stamp bsp-mono">{w.no} · {w.year}</span>
              </div>
              <div className="sc-plate-body">
                <strong>{tx(w.title, lang)}</strong>
                <span>{tx(w.metric, lang)} · {tx(w.catLabel, lang)}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <footer className="sc-foot">
        <div>
          <strong style={{ display: 'block', fontSize: '1.2rem' }}>{tx(IDENTITY.manifesto, lang)}</strong>
          <small className="bsp-mono" style={{ color: 'var(--muted)' }}>{IDENTITY.email}</small>
        </div>
        <button type="button" className="sc-btn" data-copy={IDENTITY.email} data-copied={ar ? 'تم النسخ' : 'Copied'}>
          {ar ? 'ابدأ محادثة عمل' : 'Start a conversation'}
        </button>
      </footer>

      <div className="sc-modal" data-case-modal hidden role="dialog" aria-modal="true">
        <div className="sc-drawer">
          <img src={img(0)} alt="" data-m-img />
          <div className="sc-drawer-body">
            <div className="sc-drawer-head">
              <span className="bsp-mono" data-m-cat />
              <button type="button" className="sc-close" data-close-modal>{ar ? 'إغلاق ✕' : 'Close ✕'}</button>
            </div>
            <h2 data-m-title />
            <p style={{ color: 'var(--muted)' }} data-m-desc />
            <strong className="bsp-mono" style={{ color: 'var(--accent2)' }} data-m-metric />
          </div>
        </div>
      </div>
    </div>
  );
}

export function renderNoirCinema({ lang }: RenderProps) {
  const ar = lang === 'ar';
  const reel = WORKS.slice(0, 5);
  const active = reel[0];
  return (
    <div className="nc-shell" id="ws" data-stage-root>
      <header className="nc-top">
        <strong>{tx(IDENTITY.brand, lang)}</strong>
        <div className="nc-top-end">
          <span className="bsp-mono">{ar ? 'الفصل' : 'CHAPTER'} <b data-stage-no>{active.no}</b> / 05</span>
          <button type="button" className="nc-book" data-copy={IDENTITY.email} data-copied={ar ? 'تم نسخ البريد' : 'Copied'}>
            {ar ? 'حجز استشارة' : 'Book Inquiry'}
          </button>
        </div>
      </header>

      <section className="nc-stage">
        <div className="nc-copy">
          <span className="nc-ch-num bsp-mono" data-stage-cat>{tx(active.catLabel, lang)} · {active.year}</span>
          <h1 data-stage-title>{tx(IDENTITY.headline, lang)}</h1>
          <div className="nc-gold-line" />
          <p data-stage-desc>{tx(IDENTITY.lead, lang)}</p>
          <div style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '14px' }} data-stage-metric>
            {tx(active.metric, lang)}
          </div>
          <div className="nc-meta-chips bsp-mono" data-stage-stack>
            {active.stack.map((s) => <span key={s}>{s}</span>)}
          </div>
        </div>

        <div className="nc-visual">
          <img src={img(180)} alt="" data-stage-img />
        </div>
      </section>

      <section className="nc-reel" aria-label={ar ? 'مبدل الفصول' : 'Chapter switcher'}>
        {reel.map((w, idx) => (
          <button
            type="button"
            key={w.id}
            className={`nc-frame${idx === 0 ? ' is-active' : ''}`}
            data-stage-item
            data-no={w.no}
            data-title={idx === 0 ? tx(IDENTITY.headline, lang) : tx(w.title, lang)}
            data-cat={tx(w.catLabel, lang)}
            data-desc={idx === 0 ? tx(IDENTITY.lead, lang) : tx(w.summary, lang)}
            data-metric={tx(w.metric, lang)}
            data-stack={w.stack.join(',')}
            data-img={idx === 0 ? img(180) : img(w.img)}
          >
            <small className="bsp-mono">{w.no} · {tx(w.catLabel, lang)}</small>
            <strong>{tx(w.title, lang)}</strong>
          </button>
        ))}
      </section>

      <section className="nc-credits">
        {CAPABILITIES.slice(0, 3).map((c) => (
          <article className="nc-credit" key={c.no}>
            <small className="bsp-mono" style={{ color: 'var(--muted)' }}>{c.no}</small>
            <h3>{tx(c.title, lang)}</h3>
            <p>{tx(c.short, lang)}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export function renderKineticMarquee({ lang }: RenderProps) {
  const ar = lang === 'ar';
  const ticker = ar
    ? '٢٩ أداة متصفح مجانية · ٤٣٦ خطاً عربياً ولاتينياً · ٩ أنظمة أتمتة يومية · ملفات فيكتور دقيقة · '
    : '29 BROWSER TOOLS · 436 INDEXED FONTS · 9 DAILY AI WORKERS · NATIVE RTL/LTR · ';
  return (
    <div className="km-page" id="ws">
      <header className="km-header">
        <strong>{tx(IDENTITY.brand, lang)}</strong>
        <button type="button" className="km-cta" data-copy={IDENTITY.email} data-copied={ar ? 'تم النسخ' : 'Copied'}>
          {ar ? 'ابدأ البناء ←' : 'START A BUILD →'}
        </button>
      </header>

      <section className="km-hero">
        <h1 className="km-poster-type">
          {ar ? <>واجهات ويب، <em>أتمتة AI</em> وأدوات مفتوحة.</> : <>WEB SYSTEMS, <em>AI AGENTS</em> &amp; OPEN LAB TOOLS.</>}
        </h1>
      </section>

      <div className="km-ribbon-wrap" aria-hidden="true">
        <div className="km-track bsp-mono">
          <span>{ticker}</span><span>{ticker}</span><span>{ticker}</span>
        </div>
      </div>

      <section className="km-pillars">
        {CAPABILITIES.slice(0, 3).map((c) => (
          <article className="km-pillar" key={c.no}>
            <div className="km-pillar-num bsp-mono">{c.no}</div>
            <h2>{tx(c.title, lang)}</h2>
            <p>{tx(c.short, lang)}</p>
          </article>
        ))}
      </section>

      <section className="km-dossiers" aria-label={ar ? 'ملفات المشاريع' : 'Technical dossiers'}>
        {WORKS.slice(0, 5).map((w, i) => (
          <article className={`km-acc${i === 0 ? ' is-open' : ''}`} data-acc-item key={w.id}>
            <button type="button" className="km-acc-btn" data-acc-btn aria-expanded={i === 0}>
              <div className="km-acc-left">
                <small className="bsp-mono">{w.no}</small>
                <strong>{tx(w.title, lang)}</strong>
              </div>
              <span className="km-acc-plus">+</span>
            </button>
            <div className="km-acc-body">
              <p style={{ color: 'var(--muted)' }}>{tx(w.summary, lang)} — <b>{tx(w.metric, lang)}</b></p>
              <div className="km-acc-tags bsp-mono">
                {w.stack.map((s) => <span key={s}>{s}</span>)}
              </div>
            </div>
          </article>
        ))}
      </section>

      <footer className="km-foot">
        <strong>{tx(IDENTITY.location, lang)}</strong>
        <span className="bsp-mono">{IDENTITY.email}</span>
      </footer>
    </div>
  );
}

export function renderAuroraPrism({ lang }: RenderProps) {
  const ar = lang === 'ar';
  return (
    <div className="ap-canvas" id="ws">
      <div className="ap-nav-wrap">
        <nav className="ap-pill-nav" aria-label={ar ? 'التنقل الزجاجي' : 'Floating navigation'}>
          <strong>{tx(IDENTITY.brand, lang)}</strong>
          <a href="#sim">{ar ? 'المحاكي الحي' : 'Simulator'}</a>
          <a href="#stats">{ar ? 'الأرقام' : 'Metrics'}</a>
          <button type="button" className="ap-pill-cta" data-copy={IDENTITY.email} data-copied={ar ? 'تم النسخ' : 'Copied'}>
            {ar ? 'تواصل' : 'Ping'}
          </button>
        </nav>
      </div>

      <section className="ap-hero">
        <h1>{tx(IDENTITY.headline, lang)}</h1>
        <p>{tx(IDENTITY.lead, lang)}</p>
      </section>

      <section className="ap-prism" id="sim" data-tabs>
        <div className="ap-sim-head">
          <strong className="bsp-mono" style={{ fontSize: '13px', color: 'var(--accent2)' }}>LIVE INTERACTIVE WORKBENCH PREVIEW</strong>
          <div className="ap-seg" role="tablist">
            <button type="button" className="is-active" role="tab" aria-selected="true" data-tab="web">{ar ? 'الويب وRTL' : 'Web & RTL'}</button>
            <button type="button" role="tab" aria-selected="false" data-tab="ai">{ar ? 'الأتمتة الذكية' : 'AI Pipelines'}</button>
            <button type="button" role="tab" aria-selected="false" data-tab="svg">{ar ? 'نقش والقص SVG' : 'SVG Fabricator'}</button>
          </div>
        </div>

        <div className="ap-sim-panel" data-panel="web">
          <div className="ap-sim-visual">
            <img src={img(0)} alt={tx(WORKS[4].title, lang)} />
          </div>
          <div className="ap-sim-info">
            <small className="bsp-mono">MODE 01 // NEXT.JS + DESIGN SYSTEMS</small>
            <h2>{tx(WORKS[4].title, lang)}</h2>
            <p>{tx(WORKS[4].summary, lang)}</p>
            <div className="ap-chips bsp-mono">
              {WORKS[4].stack.map((s) => <span key={s}>{s}</span>)}
              <span>{tx(WORKS[4].metric, lang)}</span>
            </div>
          </div>
        </div>

        <div className="ap-sim-panel" data-panel="ai" hidden>
          <div className="ap-sim-visual" dangerouslySetInnerHTML={{ __html: SVG_PIPELINE_NODE_MAP }} />
          <div className="ap-sim-info">
            <small className="bsp-mono">MODE 02 // AUTONOMOUS AGENTS</small>
            <h2>{tx(WORKS[3].title, lang)}</h2>
            <p>{tx(WORKS[3].summary, lang)}</p>
            <div className="ap-chips bsp-mono">
              {WORKS[3].stack.map((s) => <span key={s}>{s}</span>)}
              <span>{tx(WORKS[3].metric, lang)}</span>
            </div>
          </div>
        </div>

        <div className="ap-sim-panel" data-panel="svg" hidden>
          <div className="ap-sim-visual" dangerouslySetInnerHTML={{ __html: SVG_NAQSH_ROSETTE }} />
          <div className="ap-sim-info">
            <small className="bsp-mono">MODE 03 // MILLIMETRE PRECISION</small>
            <h2>{tx(WORKS[0].title, lang)} &amp; {tx(WORKS[2].title, lang)}</h2>
            <p>{tx(WORKS[0].summary, lang)}</p>
            <div className="ap-chips bsp-mono">
              {WORKS[0].stack.map((s) => <span key={s}>{s}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="ap-tiles" id="stats">
        {STATS.map((s) => (
          <div className="ap-tile" key={s.code}>
            <strong className="bsp-mono">{s.value}</strong>
            <span>{tx(s.label, lang)}</span>
          </div>
        ))}
      </section>

      <footer className="ap-foot">
        <div>
          <strong style={{ display: 'block', fontSize: '1.25rem' }}>{tx(IDENTITY.manifesto, lang)}</strong>
          <small className="bsp-mono" style={{ color: 'var(--muted)' }}>{IDENTITY.email}</small>
        </div>
        <button type="button" className="ap-cta-btn" data-copy={IDENTITY.email} data-copied={ar ? 'تم النسخ' : 'Copied'}>
          {ar ? 'ابدأ محادثة' : 'Start a conversation'}
        </button>
      </footer>
    </div>
  );
}

export function renderTactileBinder({ lang }: RenderProps) {
  const ar = lang === 'ar';
  const chs = [
    { key: 'ch1', ch: 'CH-01', name: ar ? 'تطوير الويب' : 'WEB UI', work: WORKS[4] },
    { key: 'ch2', ch: 'CH-02', name: ar ? 'أتمتة AI' : 'AI BUS', work: WORKS[3] },
    { key: 'ch3', ch: 'CH-03', name: ar ? 'حرف الخطوط' : 'HARF DB', work: WORKS[1] },
    { key: 'ch4', ch: 'CH-04', name: 'CUT LAB', work: WORKS[0] },
  ];
  return (
    <div className="tb-sheet" id="ws">
      <div className="tb-chassis" data-tabs>
        <header className="tb-bezel-top">
          <div className="tb-screw-brand">
            <span className="tb-screw" aria-hidden="true" />
            <strong>{tx(IDENTITY.brand, lang)}</strong>
            <span className="bsp-mono" style={{ color: 'var(--muted)', fontSize: '12.5px' }}>{'// STUDIO-UNIT-01'}</span>
          </div>
          <span className="bsp-mono" style={{ fontSize: '12.5px', color: 'var(--accent)', fontWeight: 700 }}>{tx(IDENTITY.availability, lang)}</span>
        </header>

        <div className="tb-oled">
          <span><b>SYS:</b> READY</span>
          <span><b>LOC:</b> {IDENTITY.coords}</span>
          <span><b>LAB:</b> 29 TOOLS // 436 FONTS</span>
          <span><b>AI:</b> 9 ACTIVE FLOWS</span>
        </div>

        <section className="tb-bay">
          <div className="tb-pad-left">
            <div>
              <small className="bsp-mono" style={{ color: 'var(--accent)', fontWeight: 700 }}>{tx(IDENTITY.role, lang)}</small>
              <h1 style={{ marginTop: '8px' }}>{tx(IDENTITY.headline, lang)}</h1>
              <p style={{ marginTop: '10px' }}>{tx(IDENTITY.lead, lang)}</p>
            </div>
            <button type="button" className="tb-orange-btn" data-copy={IDENTITY.email} data-copied={ar ? 'تم النسخ' : 'Copied'}>
              {ar ? 'تشغيل التواصل · نسخ البريد' : 'TRIGGER COMMS · COPY EMAIL'}
            </button>
          </div>

          <div className="tb-pad-right">
            <div className="tb-keys" role="tablist" aria-label={ar ? 'مفاتيح القنوات' : 'Channel selector'}>
              {chs.map((c, idx) => (
                <button
                  key={c.key}
                  type="button"
                  className={`tb-key${idx === 0 ? ' is-active' : ''}`}
                  role="tab"
                  aria-selected={idx === 0}
                  data-tab={c.key}
                >
                  <small className="bsp-mono">{c.ch}</small>
                  <strong className="bsp-mono">{c.name}</strong>
                </button>
              ))}
            </div>

            {chs.map((c, idx) => (
              <div className="tb-readout" data-panel={c.key} hidden={idx !== 0} key={c.key}>
                <div className="tb-readout-top bsp-mono">
                  <span>{`${c.ch} // ${tx(c.work.catLabel, lang)}`}</span>
                  <span>{c.work.year}</span>
                </div>
                <h2>{tx(c.work.title, lang)}</h2>
                <p>{tx(c.work.summary, lang)}</p>
                <div className="tb-spec-chips bsp-mono">
                  <span>{tx(c.work.metric, lang)}</span>
                  {c.work.stack.map((s) => <span key={s}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="tb-manual">
          {STATS.map((s) => (
            <div className="tb-cell" key={s.code}>
              <strong className="bsp-mono">{s.value}</strong>
              <small>{tx(s.label, lang)}</small>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
