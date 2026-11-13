import type { Design, L, Lang } from '@/catalog/types';
import { img } from '../context';
import {
  CAPABILITIES, IDENTITY, NOTES, STATS, WORKS,
  SVG_CAD_SCHEMATIC, SVG_NAQSH_ROSETTE, SVG_NAQSH_LATTICE, SVG_PIPELINE_NODE_MAP,
} from './content';

export type RenderProps = { design: Design; lang: Lang };

const tx = (l: L, lang: Lang) => l[lang];

export function renderMonolithSplit({ lang }: RenderProps) {
  const ar = lang === 'ar';
  const nav = [
    { id: '#thesis', no: '01', label: ar ? 'الرؤية والمنهج' : 'Thesis & Metrics' },
    { id: '#caps', no: '02', label: ar ? 'القدرات الأربع' : 'Four Capabilities' },
    { id: '#works', no: '03', label: ar ? 'المختبر والأعمال' : 'Lab & Systems' },
    { id: '#contact', no: '04', label: ar ? 'ابدأ مشروعاً' : 'Start a Build' },
  ];
  return (
    <div className="ms-wrap" id="top">
      <aside className="ms-rail">
        <div className="ms-top">
          <div className="ms-brand">
            <span className="ms-mark">{tx(IDENTITY.mark, lang)}</span>
            <div className="ms-brand-meta">
              <b>{tx(IDENTITY.brand, lang)}</b>
              <small>{tx(IDENTITY.role, lang)}</small>
            </div>
          </div>
          <span className="ms-status"><i className="ms-dot" />{tx(IDENTITY.availability, lang)}</span>
          <p className="ms-pitch">{tx(IDENTITY.lead, lang)}</p>
          <nav className="ms-nav" data-spy aria-label={ar ? 'فهرس الصفحة' : 'Page chapters'}>
            {nav.map((n, i) => (
              <a key={n.id} href={n.id} className={i === 0 ? 'is-active' : undefined}>
                <span>{n.label}</span>
                <span className="bsp-mono">{n.no}</span>
              </a>
            ))}
          </nav>
        </div>
        <div className="ms-foot">
          <button
            type="button"
            className="ms-copy"
            data-copy={IDENTITY.email}
            data-copied={ar ? 'تم نسخ البريد' : 'Email copied'}
          >
            <span className="bsp-mono">{IDENTITY.email}</span>
            <em>{ar ? 'نسخ' : 'Copy'}</em>
          </button>
          <small style={{ color: 'var(--muted)', fontSize: '12.5px' }}>{tx(IDENTITY.location, lang)}</small>
        </div>
      </aside>

      <main className="ms-main" id="ws">
        <section className="ms-hero" id="thesis">
          <span className="ms-kicker bsp-mono">{tx(IDENTITY.location, lang)}</span>
          <h1>{tx(IDENTITY.headline, lang)}</h1>
          <div className="ms-stats">
            {STATS.map((s) => (
              <div className="ms-stat" key={s.code}>
                <strong className="bsp-mono">{s.value}</strong>
                <small>{tx(s.label, lang)}</small>
              </div>
            ))}
          </div>
        </section>

        <section id="caps">
          <div className="ms-sec-head">
            <h2>{ar ? 'أربع طبقات، يد واحدة تبنيها' : 'Four layers, built end to end'}</h2>
            <span className="bsp-mono">02 / STACK</span>
          </div>
          <div className="ms-caps">
            {CAPABILITIES.map((c, idx) => (
              <article className={`ms-cap${idx === 0 ? ' is-open' : ''}`} data-acc-item key={c.no}>
                <div className="ms-cap-top">
                  <span className="bsp-mono">{c.no}</span>
                  <span>{c.tools.slice(0, 2).join(' · ')}</span>
                </div>
                <h3>{tx(c.title, lang)}</h3>
                <p>{tx(c.short, lang)}</p>
                <div className="ms-cap-tags">
                  {c.tools.map((t) => <span key={t} className="bsp-mono">{t}</span>)}
                </div>
                <div className="ms-cap-more">{tx(c.spec, lang)}</div>
                <button type="button" className="ms-cap-toggle" data-acc-btn aria-expanded={idx === 0}>
                  {ar ? 'عرض التفاصيل التقنية ↙' : 'Toggle technical spec ↙'}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="works">
          <div className="ms-sec-head">
            <h2>{ar ? 'مختارات المختبر الحيّ' : 'Selected Production Tools'}</h2>
            <span className="bsp-mono">03 / WORK</span>
          </div>
          <div className="ms-works">
            {WORKS.slice(0, 5).map((w) => (
              <article className="ms-work" key={w.id}>
                <img src={img(w.img)} alt={tx(w.title, lang)} loading="lazy" />
                <div>
                  <h3>{tx(w.title, lang)}</h3>
                  <p>{tx(w.summary, lang)}</p>
                </div>
                <div className="ms-work-meta">
                  <b>{tx(w.metric, lang)}</b>
                  <span className="bsp-mono">{w.year}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="ms-contact-box" id="contact">
          <div className="ms-sec-head" style={{ marginBottom: 0 }}>
            <h2>{ar ? 'ابدأ مشروعاً أو أتمتة جديدة' : 'Start a website or automation build'}</h2>
            <span className="bsp-mono">04 / PING</span>
          </div>
          <form className="ms-form" data-demo-form data-sent={ar ? 'تم إرسال الرسالة التجريبية بنجاح' : 'Demo inquiry sent cleanly'}>
            <input type="text" placeholder={ar ? 'الاسم أو المشروع' : 'Your name or project'} required />
            <input type="email" placeholder="you@domain.com" required />
            <textarea placeholder={ar ? 'اشرح المشكلة أو الفكرة باختصار…' : 'Describe what needs to be built…'} />
            <button type="submit" className="ms-submit">{ar ? 'إرسال الطلب' : 'Send brief'}</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export function renderBentoStudio({ lang }: RenderProps) {
  const ar = lang === 'ar';
  return (
    <div className="bs-page" id="ws">
      <div className="bs-cockpit">
        <section className="bs-card bs-id" id="home">
          <div className="bs-id-top">
            <div className="bs-avatar-row">
              <img className="bs-avatar" src={img(1)} alt={tx(IDENTITY.brand, lang)} />
              <div>
                <strong>{tx(IDENTITY.brand, lang)}</strong>
                <div style={{ fontSize: '12.5px', color: 'var(--muted)' }}>{tx(IDENTITY.location, lang)}</div>
              </div>
            </div>
            <span className="bs-avail"><i />{tx(IDENTITY.availability, lang)}</span>
          </div>
          <div>
            <h1>{tx(IDENTITY.headline, lang)}</h1>
            <p style={{ marginTop: '10px' }}>{tx(IDENTITY.lead, lang)}</p>
          </div>
          <div className="bs-actions">
            <a className="bs-btn-main" href="#contact">{ar ? 'ابدأ مشروعاً' : 'Start a project'}</a>
            <a className="bs-btn-sub" href="#cases">{ar ? 'استعرض الأعمال' : 'Explore builds'}</a>
          </div>
        </section>

        <section className="bs-card bs-lab" data-tabs id="lab">
          <div className="bs-lab-head">
            <div>
              <small style={{ color: 'var(--accent)', fontWeight: 700 }}>{ar ? 'معاينة مختبر حيّة' : 'INTERACTIVE LAB SWITCHER'}</small>
              <h2 style={{ fontSize: '1.25rem' }}>{ar ? 'أدوات متصفح بلا تسجيل' : 'Zero-signup browser utilities'}</h2>
            </div>
            <div className="bs-tabs" role="tablist">
              <button type="button" className="is-active" role="tab" aria-selected="true" data-tab="naqsh">{ar ? 'نقش SVG' : 'Naqsh SVG'}</button>
              <button type="button" role="tab" aria-selected="false" data-tab="harf">{ar ? 'حرف Harf' : 'Harf Type'}</button>
              <button type="button" role="tab" aria-selected="false" data-tab="cut">Cut Studio</button>
            </div>
          </div>
          <div className="bs-stage" data-panel="naqsh">
            <div className="bs-svg-box" dangerouslySetInnerHTML={{ __html: SVG_NAQSH_ROSETTE }} />
            <div>
              <h3>{tx(WORKS[2].title, lang)}</h3>
              <p>{tx(WORKS[2].summary, lang)}</p>
              <div className="bs-pill-row">{WORKS[2].stack.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          </div>
          <div className="bs-stage" data-panel="harf" hidden>
            <div className="bs-svg-box" style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
              {ar ? 'أبجد 436' : 'AaBb 436'}
            </div>
            <div>
              <h3>{tx(WORKS[1].title, lang)}</h3>
              <p>{tx(WORKS[1].summary, lang)}</p>
              <div className="bs-pill-row">{WORKS[1].stack.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          </div>
          <div className="bs-stage" data-panel="cut" hidden>
            <div className="bs-svg-box" dangerouslySetInnerHTML={{ __html: SVG_NAQSH_LATTICE }} />
            <div>
              <h3>{tx(WORKS[0].title, lang)}</h3>
              <p>{tx(WORKS[0].summary, lang)}</p>
              <div className="bs-pill-row">{WORKS[0].stack.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          </div>
        </section>

        <section className="bs-card bs-pipe" id="systems">
          <div>
            <small style={{ color: 'var(--accent)', fontWeight: 700 }}>{ar ? 'أتمتة يومية' : 'AI PIPELINE BUS'}</small>
            <h2 style={{ fontSize: '1.15rem', marginTop: '4px' }}>{ar ? '٩ أنظمة تعمل في الخلفية' : '9 daily automated workers'}</h2>
          </div>
          <div className="bs-pipe-box" dangerouslySetInnerHTML={{ __html: SVG_PIPELINE_NODE_MAP }} />
        </section>

        <section className="bs-card bs-kpi">
          <small>{ar ? 'المختبر المفتوح' : 'LIVE LIBRARY'}</small>
          <strong className="bs-kpi-num bsp-mono">29+</strong>
          <small>{ar ? 'أداة ليزر وتصميم وخطوط في المتصفح' : 'Free workshop & typography tools'}</small>
        </section>

        <section className="bs-card bs-stack-strip">
          <div style={{ display: 'grid', gap: '4px' }}>
            <strong style={{ fontSize: '1.1rem' }}>{ar ? 'من الفكرة إلى النظام الكامل' : 'Full-stack delivery architecture'}</strong>
            <span style={{ color: 'var(--muted)', fontSize: '14px' }}>Next.js · TypeScript · n8n · LLM Agents · SVG 1:1</span>
          </div>
          <button type="button" className="bs-btn-sub" data-copy={IDENTITY.email} data-copied={ar ? 'تم النسخ' : 'Copied'}>
            <span className="bsp-mono">{IDENTITY.email}</span>
          </button>
        </section>

        <section className="bs-card bs-photo-tile">
          <img src={img(0)} alt="Studio desk" />
          <div className="bs-photo-cap">
            <small>{ar ? 'بيئة البناء' : 'ONE-PERSON STUDIO'}</small>
            <strong>{tx(IDENTITY.manifesto, lang)}</strong>
          </div>
        </section>
      </div>

      <section className="bs-cases" id="cases">
        {WORKS.slice(3, 6).map((w) => (
          <article className="bs-case-card" key={w.id}>
            <img src={img(w.img)} alt={tx(w.title, lang)} loading="lazy" />
            <div className="bs-case-body">
              <div className="bs-case-top">
                <span>{tx(w.catLabel, lang)}</span>
                <span className="bsp-mono">{w.year}</span>
              </div>
              <h3>{tx(w.title, lang)}</h3>
              <p>{tx(w.summary, lang)}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="bs-contact" id="contact">
        <div>
          <h2 style={{ fontSize: '1.8rem' }}>{ar ? 'جاهز لبناء مشروعك أو أتمتتك؟' : 'Ready to ship something crisp?'}</h2>
          <p style={{ color: 'var(--muted)', marginTop: '6px' }}>{tx(NOTES[0].quote, lang)} — {tx(NOTES[0].name, lang)}</p>
        </div>
        <div className="bs-actions" style={{ justifyContent: 'flex-end' }}>
          <button type="button" className="bs-btn-main" data-copy={IDENTITY.email} data-copied={ar ? 'تم نسخ البريد' : 'Copied email'}>
            {ar ? 'نسخ بريد التواصل' : 'Copy contact email'}
          </button>
        </div>
      </section>

      <nav className="bs-dock" aria-label={ar ? 'رصيف التنقل' : 'Floating dock'}>
        <a href="#home" className="is-primary">{ar ? 'المقصورة' : 'Cockpit'}</a>
        <a href="#lab">{ar ? 'المختبر' : 'Lab'}</a>
        <a href="#systems">{ar ? 'الأتمتة' : 'Systems'}</a>
        <a href="#cases">{ar ? 'المشاريع' : 'Work'}</a>
        <a href="#contact">{ar ? 'تواصل' : 'Contact'}</a>
      </nav>
    </div>
  );
}

export function renderTerminalWorkbench({ lang }: RenderProps) {
  const ar = lang === 'ar';
  const files = [
    { key: 'readme', name: 'README.md', tag: 'INFO' },
    { key: 'pipelines', name: 'pipelines/n8n.ts', tag: 'AI' },
    { key: 'harf', name: 'lab/harf-engine.ts', tag: 'SVG' },
    { key: 'cut', name: 'lab/cut-studio.ts', tag: '29+' },
    { key: 'contact', name: 'contact.sh', tag: 'RUN' },
  ];
  return (
    <div className="tw-shell" id="ws">
      <header className="tw-chrome">
        <div className="tw-chrome-start">
          <span className="tw-lights"><i /><i /><i /></span>
          <strong className="bsp-mono">omardeek.tech — workspace</strong>
          <span className="tw-branch bsp-mono">main*</span>
        </div>
        <span className="bsp-mono" style={{ color: 'var(--muted)' }}>{IDENTITY.coords} · {tx(IDENTITY.availability, lang)}</span>
      </header>

      <div className="tw-workspace" data-tabs>
        <aside className="tw-tree">
          <div className="tw-tree-title bsp-mono">{ar ? 'ملفات الاستوديو' : 'EXPLORER // STUDIO'}</div>
          {files.map((f, i) => (
            <button
              key={f.key}
              type="button"
              className={`tw-file${i === 0 ? ' is-active' : ''}`}
              role="tab"
              aria-selected={i === 0}
              data-tab={f.key}
            >
              <span className="bsp-mono">{f.name}</span>
              <small>{f.tag}</small>
            </button>
          ))}
        </aside>

        <main className="tw-editor">
          <div className="tw-tabs" role="tablist">
            {files.map((f, i) => (
              <button
                key={f.key}
                type="button"
                className={`tw-tab bsp-mono${i === 0 ? ' is-active' : ''}`}
                data-tab={f.key}
              >
                {f.name}
              </button>
            ))}
          </div>

          <section className="tw-pane" data-panel="readme">
            <div className="tw-hero-banner">
              <small className="bsp-mono" style={{ color: 'var(--accent)' }}>{'// OMAR ALDEEK — PALESTINE'}</small>
              <h1>{tx(IDENTITY.headline, lang)}</h1>
              <p>{tx(IDENTITY.lead, lang)}</p>
              <div className="tw-cmd-row">
                <button type="button" className="tw-cmd-btn bsp-mono" data-copy={IDENTITY.email} data-copied={ar ? 'تم نسخ البريد' : 'Copied'}>
                  $ mail --to {IDENTITY.email}
                </button>
                <button type="button" className="tw-cmd-ghost bsp-mono" data-tab="pipelines">
                  {ar ? 'فتح خطوط الأتمتة ←' : 'inspect pipelines/ →'}
                </button>
              </div>
            </div>
            <div className="tw-code-card bsp-mono">
              <div className="tw-code-row"><span className="tw-ln">01</span><span><b className="tw-kw">export const</b> studio = &#123;</span></div>
              <div className="tw-code-row"><span className="tw-ln">02</span><span>  owner: <b className="tw-str">&quot;{tx(IDENTITY.brand, lang)}&quot;</b>,</span></div>
              <div className="tw-code-row"><span className="tw-ln">03</span><span>  focus: [<b className="tw-str">&quot;Next.js RTL/LTR&quot;</b>, <b className="tw-str">&quot;AI Pipelines&quot;</b>, <b className="tw-str">&quot;Laser SVG Tools&quot;</b>],</span></div>
              <div className="tw-code-row"><span className="tw-ln">04</span><span>  shipped: &#123; browserTools: 29, fonts: 436, svgOrnaments: 480, workflows: 9 &#125;,</span></div>
              <div className="tw-code-row"><span className="tw-ln">05</span><span>&#125;;</span></div>
            </div>
          </section>

          <section className="tw-pane" data-panel="pipelines" hidden>
            <div className="tw-hero-banner">
              <small className="bsp-mono" style={{ color: 'var(--accent)' }}>{'// PIPELINES/N8N.TS'}</small>
              <h2 style={{ fontSize: '1.8rem' }}>{tx(WORKS[3].title, lang)}</h2>
              <p>{tx(WORKS[3].summary, lang)}</p>
            </div>
            <div className="tw-code-card" style={{ padding: '18px' }} dangerouslySetInnerHTML={{ __html: SVG_PIPELINE_NODE_MAP }} />
          </section>

          <section className="tw-pane" data-panel="harf" hidden>
            <div className="tw-hero-banner">
              <small className="bsp-mono" style={{ color: 'var(--accent)' }}>{'// LAB/HARF-ENGINE.TS'}</small>
              <h2 style={{ fontSize: '1.8rem' }}>{tx(WORKS[1].title, lang)}</h2>
              <p>{tx(WORKS[1].summary, lang)}</p>
            </div>
          </section>

          <section className="tw-pane" data-panel="cut" hidden>
            <div className="tw-hero-banner">
              <small className="bsp-mono" style={{ color: 'var(--accent)' }}>{'// LAB/CUT-STUDIO.TS'}</small>
              <h2 style={{ fontSize: '1.8rem' }}>{tx(WORKS[0].title, lang)}</h2>
              <p>{tx(WORKS[0].summary, lang)}</p>
            </div>
          </section>

          <section className="tw-pane" data-panel="contact" hidden>
            <div className="tw-hero-banner">
              <small className="bsp-mono" style={{ color: 'var(--accent)' }}>#!/bin/bash contact.sh</small>
              <h2 style={{ fontSize: '1.8rem' }}>{ar ? 'أرسل تفاصيل مشروعك مباشرة' : 'Dispatch a build request'}</h2>
              <p>{IDENTITY.email}</p>
              <div className="tw-cmd-row">
                <button type="button" className="tw-cmd-btn bsp-mono" data-copy={IDENTITY.email} data-copied={ar ? 'تم نسخ البريد' : 'Copied'}>
                  {ar ? 'نسخ البريد الإلكتروني' : 'Copy Email'}
                </button>
              </div>
            </div>
          </section>
        </main>

        <aside className="tw-inspector">
          <div className="tw-tree-title bsp-mono">{ar ? 'قياس الأداء الحيّ' : 'RUNTIME METRICS'}</div>
          <div className="tw-metric-grid">
            {STATS.map((s) => (
              <div className="tw-metric" key={s.code}>
                <div>
                  <small className="bsp-mono">{s.code}</small>
                  <div style={{ fontSize: '13px', color: 'var(--ink)' }}>{tx(s.label, lang)}</div>
                </div>
                <strong className="bsp-mono">{s.value}</strong>
              </div>
            ))}
          </div>
          <div className="tw-log bsp-mono">
            <span><b>[OK]</b> cut-studio: 29 tools online</span>
            <span><b>[OK]</b> harf: 436 font tables ready</span>
            <span><b>[OK]</b> n8n: 9 workers scheduled</span>
          </div>
        </aside>
      </div>

      <footer className="tw-status bsp-mono">
        <span>OMAR ALDEEK // BUILD READY</span>
        <span>{lang.toUpperCase()} ({lang === 'ar' ? 'RTL' : 'LTR'})</span>
      </footer>
    </div>
  );
}

export function renderCadBlueprint({ lang }: RenderProps) {
  const ar = lang === 'ar';
  return (
    <div className="cb-sheet" id="ws">
      <div className="cb-frame">
        <div className="cb-ruler-top bsp-mono">
          <span>+ 000 MM</span>
          <span>250 MM</span>
          <span>500 MM</span>
          <span>750 MM</span>
          <span>1000 MM</span>
          <span>+ 1280 MM</span>
        </div>

        <header className="cb-head">
          <div className="cb-title-bay">
            <span className="bsp-mono" style={{ color: 'var(--accent)', fontSize: '12px' }}>SHEET A1 // PORTFOLIO SYSTEM ARCHITECTURE</span>
            <h1>{tx(IDENTITY.headline, lang)}</h1>
            <p>{tx(IDENTITY.lead, lang)}</p>
          </div>
          <div className="cb-title-block bsp-mono">
            <div className="cb-tb-cell"><small>ARCHITECT</small><strong>{tx(IDENTITY.brand, lang)}</strong></div>
            <div className="cb-tb-cell"><small>SCALE</small><strong>1 : 1</strong></div>
            <div className="cb-tb-cell"><small>TOOLS</small><strong>29 LIVE</strong></div>
            <div className="cb-tb-cell"><small>REVISION</small><strong>REV 4.2</strong></div>
          </div>
        </header>

        <div className="cb-workspace">
          <div className="cb-canvas">
            <div className="cb-controls">
              <strong style={{ fontSize: '14px' }}>{ar ? 'مخطط الطبقات التفاعلي — تحكّم بالطبقات:' : 'INTERACTIVE SYSTEM SCHEMATIC — TOGGLE LAYERS:'}</strong>
              <div className="cb-checks bsp-mono">
                <label><input type="checkbox" defaultChecked data-layer-toggle="grid" /> GRID</label>
                <label><input type="checkbox" defaultChecked data-layer-toggle="vectors" /> VECTORS</label>
                <label><input type="checkbox" defaultChecked data-layer-toggle="bus" /> AI_BUS</label>
                <label><input type="checkbox" defaultChecked data-layer-toggle="dims" /> DIMS</label>
              </div>
            </div>
            <div className="cb-svg-stage" dangerouslySetInnerHTML={{ __html: SVG_CAD_SCHEMATIC }} />
          </div>

          <aside className="cb-specs">
            <h2 className="bsp-mono">{ar ? 'مواصفات الإنتاج' : 'PRODUCTION SPECS'}</h2>
            {STATS.map((s) => (
              <div className="cb-spec-row" key={s.code}>
                <span>{tx(s.label, lang)}</span>
                <strong className="bsp-mono">{s.value}</strong>
              </div>
            ))}
            <button type="button" className="cb-btn" data-copy={IDENTITY.email} data-copied={ar ? 'تم النسخ' : 'Copied'}>
              {ar ? 'نسخ البريد الهندسي' : 'Copy Inquiry Email'}
            </button>
          </aside>
        </div>

        <section className="cb-ledger">
          {WORKS.slice(0, 6).map((w) => (
            <article className="cb-item" key={w.id}>
              <small className="bsp-mono">{`${w.no} // ${tx(w.catLabel, lang)}`}</small>
              <h3>{tx(w.title, lang)}</h3>
              <p>{tx(w.summary, lang)}</p>
            </article>
          ))}
        </section>

        <footer className="cb-foot bsp-mono">
          <span>{tx(IDENTITY.location, lang)} · {IDENTITY.coords}</span>
          <span>{IDENTITY.email}</span>
        </footer>
      </div>
    </div>
  );
}

export function renderExposedSpec({ lang }: RenderProps) {
  const ar = lang === 'ar';
  return (
    <div className="es-wall" id="ws" data-filter-root data-filter-mode="hide">
      <header className="es-top bsp-mono">
        <div>01 // {tx(IDENTITY.brand, lang)}</div>
        <div>{tx(IDENTITY.location, lang)} · {tx(IDENTITY.role, lang)}</div>
        <a href="#es-contact">{ar ? 'تواصل مباشر ←' : 'HIRE / BRIEF →'}</a>
      </header>

      <section className="es-band-hero">
        <div className="es-manifesto">
          <h1>{tx(IDENTITY.headline, lang)}</h1>
          <p>{tx(IDENTITY.lead, lang)}</p>
        </div>
        <aside className="es-dark-box">
          <span className="es-dark-tag bsp-mono">{ar ? 'مرشّح الأنظمة المباشر' : 'LIVE DISCIPLINE FILTER'}</span>
          <div className="es-filter-stack">
            {[
              { id: 'all', arL: 'الكل (٠٧)', enL: 'ALL SYSTEMS (07)' },
              { id: 'web', arL: 'واجهات وتطبيقات ويب', enL: 'WEB ARCHITECTURE' },
              { id: 'ai', arL: 'أتمتة بالذكاء الاصطناعي', enL: 'AI PIPELINES' },
              { id: 'svg', arL: 'تصنيع SVG والخطوط', enL: 'SVG & TYPE LABS' },
            ].map((f, i) => (
              <button
                key={f.id}
                type="button"
                className={`es-filter-btn${i === 0 ? ' is-active' : ''}`}
                data-filter={f.id}
                aria-pressed={i === 0}
              >
                <span>{ar ? f.arL : f.enL}</span>
                <span className="bsp-mono">→</span>
              </button>
            ))}
          </div>
          <small className="bsp-mono" style={{ opacity: .75 }}>{IDENTITY.email}</small>
        </aside>
      </section>

      <section className="es-kpi-row">
        {STATS.map((s) => (
          <div className="es-kpi-cell" key={s.code}>
            <strong className="bsp-mono">{s.value}</strong>
            <span>{tx(s.label, lang)}</span>
          </div>
        ))}
      </section>

      <section>
        <div className="es-table-head">
          <strong className="bsp-mono">{ar ? 'سجل الأنظمة والمختبرات' : 'PRODUCTION DIRECTORY MATRIX'}</strong>
          <span className="bsp-mono">2025 — 2026</span>
        </div>
        {WORKS.map((w) => (
          <div className="es-row" data-cat={w.cat} key={w.id}>
            <span className="bsp-mono">{w.no}</span>
            <strong>{tx(w.title, lang)}</strong>
            <span className="bsp-mono">{tx(w.catLabel, lang)}</span>
            <span>{tx(w.summary, lang)}</span>
            <span className="bsp-mono">{tx(w.metric, lang)}</span>
          </div>
        ))}
      </section>

      <footer className="es-bottom" id="es-contact">
        <div>
          <strong style={{ fontSize: '1.5rem', display: 'block' }}>{tx(IDENTITY.manifesto, lang)}</strong>
          <span className="bsp-mono" style={{ opacity: .8 }}>{IDENTITY.email}</span>
        </div>
        <button type="button" className="es-btn bsp-mono" style={{ padding: '14px 26px', background: 'var(--accent)', color: 'var(--on-accent)', fontWeight: 700 }} data-copy={IDENTITY.email} data-copied={ar ? 'تم النسخ' : 'Copied'}>
          {ar ? 'نسخ بريد التواصل' : 'COPY CONTACT EMAIL'}
        </button>
      </footer>
    </div>
  );
}
