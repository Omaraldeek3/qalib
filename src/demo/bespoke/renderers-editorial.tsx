import type { L, Lang } from '@/catalog/types';
import { img } from '../context';
import {
  CAPABILITIES, IDENTITY, NOTES, STATS, WORKS,
  SVG_NAQSH_ROSETTE, SVG_NAQSH_LATTICE, SVG_NAQSH_TATREEZ,
} from './content';
import type { RenderProps } from './renderers-grid';

const tx = (l: L, lang: Lang) => l[lang];

export function renderSwissBroadsheet({ lang }: RenderProps) {
  const ar = lang === 'ar';
  return (
    <div className="sb-sheet" id="ws">
      <div className="sb-meta-strip bsp-mono">
        <span><b className="sb-badge">ISSUE № 04</b> · {ar ? 'إصدار فلسطين' : 'PALESTINE EDITION'}</span>
        <span>{tx(IDENTITY.role, lang)}</span>
        <span>{IDENTITY.coords} · 2026</span>
      </div>

      <header className="sb-masthead">
        <span className="sb-mast-note bsp-mono">{ar ? 'سجل العمل الهندسي' : 'INDEPENDENT MONOGRAPH'}</span>
        <h1>{tx(IDENTITY.brand, lang)}</h1>
        <span className="sb-mast-note end bsp-mono">{IDENTITY.email}</span>
      </header>

      <div className="sb-bays" data-filter-root>
        <aside className="sb-bay">
          <span className="sb-kicker bsp-mono">{ar ? 'الافتتاحية' : 'MANIFESTO'}</span>
          <blockquote className="sb-pullquote">«{tx(IDENTITY.manifesto, lang)}»</blockquote>
          <div className="sb-stats-list">
            {STATS.map((s) => (
              <div className="sb-stat-item" key={s.code}>
                <span>{tx(s.label, lang)}</span>
                <strong className="bsp-mono">{s.value}</strong>
              </div>
            ))}
          </div>
        </aside>

        <article className="sb-bay">
          <span className="sb-kicker bsp-mono">{ar ? 'التقرير الرئيسي' : 'LEAD DISPATCH'}</span>
          <h2 className="sb-lead-title">{tx(IDENTITY.headline, lang)}</h2>
          <p className="sb-dropcap">
            {tx(IDENTITY.lead, lang)} {tx(CAPABILITIES[0].spec, lang)} {tx(CAPABILITIES[1].spec, lang)}
          </p>
          <figure className="sb-plate">
            <img src={img(0)} alt={tx(IDENTITY.brand, lang)} />
            <figcaption className="bsp-mono">
              <span>FIG. 01 — {ar ? 'بيئة البناء والأدوات' : 'WORKBENCH & CODE'}</span>
              <span>{tx(IDENTITY.location, lang)}</span>
            </figcaption>
          </figure>
        </article>

        <aside className="sb-bay">
          <span className="sb-kicker bsp-mono">{ar ? 'المختبر والأدوات' : 'LAB DISPATCHES'}</span>
          <div className="sb-filter-bar" role="group" aria-label={ar ? 'تصفية المقالات' : 'Filter dispatches'}>
            {[
              { id: 'all', label: ar ? 'الكل' : 'All' },
              { id: 'web', label: ar ? 'الويب' : 'Web' },
              { id: 'ai', label: ar ? 'الأتمتة' : 'AI' },
              { id: 'svg', label: ar ? 'SVG' : 'SVG' },
            ].map((f, i) => (
              <button key={f.id} type="button" className={i === 0 ? 'is-active' : undefined} data-filter={f.id} aria-pressed={i === 0}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="sb-dispatches">
            {WORKS.slice(0, 5).map((w) => (
              <div className="sb-dispatch" data-cat={w.cat} key={w.id}>
                <small className="bsp-mono">{w.no} · {tx(w.catLabel, lang)}</small>
                <h3>{tx(w.title, lang)}</h3>
                <p>{tx(w.summary, lang)}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <section className="sb-archive">
        {NOTES.map((n, i) => (
          <blockquote className="sb-note-box" key={i}>
            <p>«{tx(n.quote, lang)}»</p>
            <small>— {tx(n.name, lang)} ({tx(n.role, lang)})</small>
          </blockquote>
        ))}
      </section>

      <footer className="sb-colophon">
        <div>
          <strong>{tx(IDENTITY.brand, lang)}</strong> — <span style={{ color: 'var(--muted)' }}>{tx(IDENTITY.role, lang)}</span>
        </div>
        <button type="button" className="sb-btn" data-copy={IDENTITY.email} data-copied={ar ? 'تم النسخ' : 'Copied'}>
          {ar ? 'مراسلة الاستوديو' : 'Contact Studio'}
        </button>
      </footer>
    </div>
  );
}

export function renderIndexStage({ lang }: RenderProps) {
  const ar = lang === 'ar';
  const first = WORKS[0];
  return (
    <div className="is-wrap" id="ws">
      <header className="is-topbar">
        <div>
          <strong>{tx(IDENTITY.brand, lang)}</strong> — <span className="bsp-mono">{IDENTITY.coords}</span>
        </div>
        <nav aria-label={ar ? 'التنقل' : 'Navigation'}>
          <a href="#ledger">{ar ? 'الفهرس' : 'Index'}</a>
          <a href="#specs">{ar ? 'القدرات' : 'Practice'}</a>
          <a href="#colophon">{ar ? 'تواصل' : 'Contact'}</a>
        </nav>
      </header>

      <section className="is-intro">
        <div className="is-intro-role">
          <span>{tx(IDENTITY.role, lang)}</span>
          <span className="bsp-mono" style={{ color: 'var(--accent)' }}>{tx(IDENTITY.availability, lang)}</span>
        </div>
        <h1>{tx(IDENTITY.headline, lang)}</h1>
      </section>

      <section className="is-stage-grid" id="ledger" data-stage-root data-stage-hover="true">
        <div className="is-ledger" role="list">
          {WORKS.map((w, i) => (
            <button
              type="button"
              key={w.id}
              className={`is-row${i === 0 ? ' is-active' : ''}`}
              data-stage-item
              data-no={w.no}
              data-title={tx(w.title, lang)}
              data-cat={tx(w.catLabel, lang)}
              data-desc={tx(w.summary, lang)}
              data-metric={tx(w.metric, lang)}
              data-stack={w.stack.join(',')}
              data-img={img(w.img)}
            >
              <span className="is-row-no bsp-mono">{w.no}</span>
              <div>
                <b>{tx(w.title, lang)}</b>
                <div style={{ fontSize: '13.5px', color: 'var(--muted)' }}>{tx(w.metric, lang)}</div>
              </div>
              <small className="bsp-mono">{tx(w.catLabel, lang)} · {w.year}</small>
            </button>
          ))}
        </div>

        <aside className="is-preview-card" aria-live="polite">
          <div className="is-preview-head bsp-mono">
            <span data-stage-cat>{tx(first.catLabel, lang)}</span>
            <span data-stage-no>{first.no}</span>
          </div>
          <div className="is-preview-frame">
            <img src={img(first.img)} alt="" data-stage-img />
          </div>
          <h2 data-stage-title>{tx(first.title, lang)}</h2>
          <p data-stage-desc>{tx(first.summary, lang)}</p>
          <div style={{ fontSize: '13.5px', color: 'var(--accent)', fontWeight: 700 }} data-stage-metric>
            {tx(first.metric, lang)}
          </div>
          <div className="is-tags bsp-mono" data-stage-stack>
            {first.stack.map((s) => <span key={s}>{s}</span>)}
          </div>
        </aside>
      </section>

      <section className="is-bottom-cols" id="specs">
        <div className="is-col-box">
          <h3>{ar ? '٠١ · المنهج' : '01 · APPROACH'}</h3>
          <p>{tx(CAPABILITIES[0].short, lang)}</p>
        </div>
        <div className="is-col-box">
          <h3>{ar ? '٠٢ · الأتمتة' : '02 · AUTOMATION'}</h3>
          <p>{tx(CAPABILITIES[1].short, lang)}</p>
        </div>
        <div className="is-col-box" id="colophon">
          <h3>{ar ? '٠٣ · تواصل مباشر' : '03 · DIRECT LINE'}</h3>
          <p style={{ marginBottom: '8px' }}>{tx(IDENTITY.location, lang)}</p>
          <button type="button" className="is-link-accent bsp-mono" data-copy={IDENTITY.email} data-copied={ar ? 'تم النسخ' : 'Copied'}>
            {IDENTITY.email}
          </button>
        </div>
      </section>
    </div>
  );
}

export function renderPaperAtelier({ lang }: RenderProps) {
  const ar = lang === 'ar';
  return (
    <div className="pa-mat" id="ws">
      <div className="pa-spread">
        <section className="pa-left-folio">
          <div className="pa-folio-top bsp-mono">
            <span>FOLIO 01 — {tx(IDENTITY.brand, lang)}</span>
            <span>{IDENTITY.coords}</span>
          </div>
          <figure className="pa-polaroid">
            <img src={img(60)} alt={tx(IDENTITY.brand, lang)} />
            <figcaption className="bsp-mono">
              <span>{tx(IDENTITY.location, lang)}</span>
              <span>2026 EDITION</span>
            </figcaption>
          </figure>
          <div>
            <h1>{tx(IDENTITY.headline, lang)}</h1>
            <p style={{ marginTop: '10px' }}>{tx(IDENTITY.lead, lang)}</p>
          </div>
          <div className="pa-sign">— {tx(IDENTITY.brand, lang)}</div>
        </section>

        <div className="pa-spine" aria-hidden="true">
          <div className="pa-stitch" />
        </div>

        <section className="pa-right-folio" data-tabs>
          <div className="pa-bookmarks" role="tablist" aria-label={ar ? 'ألسنة الدفتر' : 'Notebook dividers'}>
            {[
              { key: 'lab', label: ar ? '٠١ المختبر' : '01 Lab' },
              { key: 'ai', label: ar ? '٠٢ الأتمتة' : '02 Automation' },
              { key: 'craft', label: ar ? '٠٣ المنهج' : '03 Craft' },
              { key: 'comms', label: ar ? '٠٤ تواصل' : '04 Contact' },
            ].map((tb, idx) => (
              <button
                key={tb.key}
                type="button"
                className={`pa-tab${idx === 0 ? ' is-active' : ''}`}
                role="tab"
                aria-selected={idx === 0}
                data-tab={tb.key}
              >
                {tb.label}
              </button>
            ))}
          </div>

          <div className="pa-folio-panel" data-panel="lab">
            {WORKS.slice(0, 4).map((w) => (
              <article className="pa-item-note" key={w.id}>
                <small className="bsp-mono">{w.no} · {tx(w.metric, lang)}</small>
                <h3>{tx(w.title, lang)}</h3>
                <p>{tx(w.summary, lang)}</p>
              </article>
            ))}
          </div>

          <div className="pa-folio-panel" data-panel="ai" hidden>
            <article className="pa-item-note">
              <small className="bsp-mono">04 · AUTONOMOUS</small>
              <h3>{tx(WORKS[3].title, lang)}</h3>
              <p>{tx(WORKS[3].summary, lang)}</p>
            </article>
            <article className="pa-item-note">
              <small className="bsp-mono">STACK</small>
              <h3>{tx(CAPABILITIES[1].title, lang)}</h3>
              <p>{tx(CAPABILITIES[1].spec, lang)}</p>
            </article>
          </div>

          <div className="pa-folio-panel" data-panel="craft" hidden>
            {CAPABILITIES.slice(0, 3).map((c) => (
              <article className="pa-item-note" key={c.no}>
                <small className="bsp-mono">{c.no}</small>
                <h3>{tx(c.title, lang)}</h3>
                <p>{tx(c.spec, lang)}</p>
              </article>
            ))}
          </div>

          <div className="pa-folio-panel" data-panel="comms" hidden>
            <article className="pa-item-note">
              <small className="bsp-mono">{tx(IDENTITY.availability, lang)}</small>
              <h3>{ar ? 'أرسل تفاصيل فكرتك' : 'Send your project note'}</h3>
              <p>{tx(IDENTITY.manifesto, lang)}</p>
              <button
                type="button"
                style={{ marginTop: '8px', padding: '10px 16px', width: 'fit-content', background: 'var(--accent)', color: 'var(--on-accent)', fontWeight: 700 }}
                data-copy={IDENTITY.email}
                data-copied={ar ? 'تم نسخ البريد' : 'Copied email'}
              >
                <span className="bsp-mono">{IDENTITY.email}</span>
              </button>
            </article>
          </div>

          <footer className="pa-folio-foot bsp-mono">
            <span>{STATS[0].value} TOOLS · {STATS[1].value} FONTS</span>
            <span>{tx(IDENTITY.availability, lang)}</span>
          </footer>
        </section>
      </div>

      <section className="pa-lower">
        {NOTES.map((n, i) => (
          <div className="pa-card-note" key={i}>
            <p>«{tx(n.quote, lang)}»</p>
            <small>{tx(n.name, lang)} · {tx(n.role, lang)}</small>
          </div>
        ))}
      </section>
    </div>
  );
}

export function renderKuficArch({ lang }: RenderProps) {
  const ar = lang === 'ar';
  return (
    <div className="ka-wrap" id="ws">
      <div className="ka-frame">
        <div className="ka-inner">
          <header className="ka-head">
            <strong>{tx(IDENTITY.brand, lang)}</strong>
            <nav aria-label={ar ? 'أقسام المعرض' : 'Monograph nav'}>
              <a href="#portal">{ar ? 'البوابة' : 'Portal'}</a>
              <a href="#naqsh">{ar ? 'نقش SVG' : 'Patterns'}</a>
              <a href="#plaque">{ar ? 'اللوحات' : 'Catalogue'}</a>
            </nav>
            <span className="bsp-mono">{tx(IDENTITY.location, lang)}</span>
          </header>

          <section className="ka-portal-grid" id="portal">
            <div className="ka-wing">
              <small className="bsp-mono" style={{ color: 'var(--accent)', fontWeight: 700 }}>{ar ? 'الفصل الأول · ٢٩ أداة' : 'MONOGRAPH 01 · STUDIO'}</small>
              <h1>{tx(IDENTITY.headline, lang)}</h1>
              <p>{tx(IDENTITY.lead, lang)}</p>
            </div>

            <div>
              <div className="ka-arch">
                <div className="ka-arch-inner">
                  <img src={img(252)} alt={tx(IDENTITY.brand, lang)} />
                </div>
              </div>
              <div className="ka-cap bsp-mono">{tx(IDENTITY.availability, lang)}</div>
            </div>

            <div className="ka-wing">
              {STATS.slice(0, 3).map((s) => (
                <div key={s.code} style={{ borderBottom: '1px solid var(--line)', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '14px' }}>{tx(s.label, lang)}</span>
                  <strong className="bsp-mono" style={{ fontSize: '1.6rem', color: 'var(--accent)' }}>{s.value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="ka-explorer" id="naqsh" data-tabs>
            <div>
              <div className="ka-svg-stage" data-panel="star" dangerouslySetInnerHTML={{ __html: SVG_NAQSH_ROSETTE }} />
              <div className="ka-svg-stage" data-panel="lattice" hidden dangerouslySetInnerHTML={{ __html: SVG_NAQSH_LATTICE }} />
              <div className="ka-svg-stage" data-panel="tatreez" hidden dangerouslySetInnerHTML={{ __html: SVG_NAQSH_TATREEZ }} />
            </div>
            <div>
              <small className="bsp-mono" style={{ color: 'var(--accent)', fontWeight: 700 }}>{ar ? 'معاينة مختبر نقش (٤٨٠ زخرفة)' : 'NAQSH PROCEDURAL VECTOR VIEWER'}</small>
              <h2 style={{ fontSize: '1.7rem', marginTop: '6px', marginBottom: '8px' }}>{tx(WORKS[2].title, lang)}</h2>
              <p style={{ color: 'var(--muted)' }}>{tx(WORKS[2].summary, lang)}</p>
              <div className="ka-motif-tabs" role="tablist">
                <button type="button" className="is-active" role="tab" aria-selected="true" data-tab="star">{ar ? 'نجمة ثمانية' : '8-Point Star'}</button>
                <button type="button" role="tab" aria-selected="false" data-tab="lattice">{ar ? 'مشربية سداسية' : 'Hex Lattice'}</button>
                <button type="button" role="tab" aria-selected="false" data-tab="tatreez">{ar ? 'تطريز هندسي' : 'Tatreez Pixel'}</button>
              </div>
            </div>
          </section>

          <section className="ka-triptych" id="plaque">
            {CAPABILITIES.slice(0, 3).map((c) => (
              <article className="ka-plaque" key={c.no}>
                <small className="bsp-mono">{c.no} · {c.tools[0]}</small>
                <h3>{tx(c.title, lang)}</h3>
                <p>{tx(c.short, lang)}</p>
              </article>
            ))}
          </section>

          <footer className="ka-foot">
            <span>{tx(IDENTITY.manifesto, lang)}</span>
            <button type="button" className="ka-cta" data-copy={IDENTITY.email} data-copied={ar ? 'تم نسخ البريد' : 'Copied'}>
              {ar ? 'تواصل مع عمر' : 'Initiate Collaboration'}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export function renderSolarHorizon({ lang }: RenderProps) {
  const ar = lang === 'ar';
  return (
    <div className="sh-wrap" id="ws">
      <aside className="sh-rail">
        <div className="sh-logo-ring">{tx(IDENTITY.mark, lang)}</div>
        <div>
          <h2>{tx(IDENTITY.brand, lang)}</h2>
          <p style={{ marginTop: '6px' }}>{tx(IDENTITY.role, lang)}</p>
        </div>
        <div style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 700 }}>{tx(IDENTITY.availability, lang)}</div>
        <div className="sh-tags">
          {['Next.js', 'RTL/LTR', 'AI / n8n', 'SVG 1:1', 'Harf'].map((tg) => (
            <span className="bsp-mono" key={tg}>{tg}</span>
          ))}
        </div>
        <button type="button" className="sh-scope-btn is-active" style={{ width: '100%', textAlign: 'center' }} data-copy={IDENTITY.email} data-copied={ar ? 'تم نسخ البريد' : 'Copied'}>
          {ar ? 'انسخ بريد التواصل' : 'Copy Inquiry Email'}
        </button>
      </aside>

      <main className="sh-main">
        <section className="sh-stagger">
          <div className="sh-hero-copy">
            <small className="bsp-mono" style={{ color: 'var(--accent)', fontWeight: 700 }}>{tx(IDENTITY.location, lang)}</small>
            <h1>{tx(IDENTITY.headline, lang)}</h1>
            <p>{tx(IDENTITY.lead, lang)}</p>
          </div>
          <div className="sh-photo-duo">
            <figure><img src={img(366)} alt="Harf font engine" /></figure>
            <figure><img src={img(526)} alt="Web workspace" /></figure>
          </div>
        </section>

        <section className="sh-scope-card" data-scope-calc>
          <div>
            <small className="bsp-mono" style={{ color: 'var(--accent)', fontWeight: 700 }}>{ar ? 'مقدّر نطاق المشروع التفاعلي' : 'INTERACTIVE PROJECT SCOPE BUILDER'}</small>
            <h2 style={{ fontSize: '1.5rem', marginTop: '4px' }}>{ar ? 'اختر ما تريد بناءه لنقدّر الجدول الزمني' : 'Select modules to estimate delivery rhythm'}</h2>
          </div>
          <div className="sh-scope-grid">
            <button type="button" className="sh-scope-btn is-active" data-scope-opt data-weeks="2" data-out={ar ? 'واجهة ويب ثنائية اللغة' : 'Bilingual Web UI'} aria-pressed="true">
              {ar ? 'موقع أو تطبيق ويب' : 'Bilingual Web App'}
            </button>
            <button type="button" className="sh-scope-btn" data-scope-opt data-weeks="2" data-out={ar ? 'نظام أتمتة ذكي' : 'AI n8n Pipeline'} aria-pressed="false">
              {ar ? 'خطوط أتمتة بالذكاء الاصطناعي' : 'AI Automation Workflow'}
            </button>
            <button type="button" className="sh-scope-btn" data-scope-opt data-weeks="1" data-out={ar ? 'هوية وأدوات SVG' : 'SVG & Type System'} aria-pressed="false">
              {ar ? 'نظام خطوط وهوية بصرية' : 'Type & SVG Tooling'}
            </button>
          </div>
          <div className="sh-scope-result">
            <div>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{ar ? 'المخرجات المقترحة' : 'ESTIMATED DELIVERABLES'}</div>
              <div style={{ fontWeight: 600 }} data-scope-deliver>{ar ? 'واجهة ويب ثنائية اللغة' : 'Bilingual Web UI'}</div>
            </div>
            <strong data-scope-weeks>{ar ? '٢–٤ أسابيع' : '2–4 wks'}</strong>
          </div>
        </section>

        <section className="sh-shelf">
          {WORKS.slice(0, 4).map((w) => (
            <article className="sh-tool" key={w.id}>
              <small className="bsp-mono">{w.no} · {tx(w.metric, lang)}</small>
              <h3>{tx(w.title, lang)}</h3>
              <p>{tx(w.summary, lang)}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
