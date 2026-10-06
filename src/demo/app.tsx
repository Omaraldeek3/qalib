import { renderToStaticMarkup } from 'react-dom/server';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { app, type AppContent, type AppField, type AppView, type Tone } from '@/catalog/apps';
import { profile } from '@/catalog/profiles';
import type { AppLayout, Design, L, Lang } from '@/catalog/types';
import { iconSvg, img } from './context';

// The workbench style: a business's working tool rather than its website.
// A full-screen app shell (navigation, workspace header, settings panel,
// workspace, figures and a status bar) drawn from the app data in
// catalog/apps.ts, in the design's colours and type.

const read = (...p: string[]) => readFileSync(join(process.cwd(), 'src', 'demo', ...p), 'utf8');
export const appCss = read('css', 'app.css');
const appJs = read('app-runtime.js');

type Ctx = { lang: Lang; design: Design; app: AppContent; layout: AppLayout };
const T = (c: Ctx, l: L | string | undefined) => (l === undefined ? '' : typeof l === 'string' ? l : l[c.lang]);

function Icon({ name }: { name: string }) {
  return <span className="icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: iconSvg(name) }} />;
}

const flat = (a: AppContent) => a.groups.flatMap(g => g.items);

function Brand({ c, short }: { c: Ctx; short?: boolean }) {
  const p = profile(c.design.profile);
  return (
    <a className="app-brand" href="#">
      <span className="app-brand-mark">{T(c, p.mark)}</span>
      {!short && <span className="app-brand-name"><b>{T(c, p.brand)}</b><small>{T(c, c.app.name)}</small></span>}
    </a>
  );
}

function Side({ c }: { c: Ctx }) {
  let n = 0;
  return (
    <aside className="app-side">
      <Brand c={c} />
      <label className="app-search"><Icon name="search" /><input type="search" placeholder={T(c, c.app.search)} aria-label={T(c, c.app.search)} /></label>
      <nav className="app-groups" aria-label={T(c, c.app.name)}>
        {c.app.groups.map((g, gi) => (
          <div className="app-group" key={gi}>
            <h2>{T(c, g.title)}</h2>
            {g.items.map(item => {
              const active = n++ === c.app.active;
              return <a key={T(c, item.label)} href="#" className={active ? 'is-active' : undefined} aria-current={active ? 'page' : undefined}><Icon name={item.icon} /><span>{T(c, item.label)}</span>{item.badge && <em>{item.badge}</em>}</a>;
            })}
          </div>
        ))}
      </nav>
      <div className="app-foot"><span className="app-dot" />{T(c, c.app.status)}</div>
    </aside>
  );
}

function Rail({ c }: { c: Ctx }) {
  return (
    <aside className="app-rail">
      <Brand c={c} short />
      <nav aria-label={T(c, c.app.name)}>
        {flat(c.app).map((item, i) => (
          <a key={i} href="#" className={i === c.app.active ? 'is-active' : undefined} aria-current={i === c.app.active ? 'page' : undefined} aria-label={T(c, item.label)} data-tip={T(c, item.label)}>
            <Icon name={item.icon} />{item.badge && <em>{item.badge}</em>}
          </a>
        ))}
      </nav>
      <span className="app-avatar" aria-hidden="true">{c.lang === 'ar' ? 'ع' : 'OA'}</span>
    </aside>
  );
}

function Top({ c }: { c: Ctx }) {
  return (
    <header className="app-top">
      <Brand c={c} />
      <nav className="app-nav-top" aria-label={T(c, c.app.name)}>
        {flat(c.app).slice(0, 6).map((item, i) => (
          <a key={i} href="#" className={i === c.app.active ? 'is-active' : undefined} aria-current={i === c.app.active ? 'page' : undefined}><Icon name={item.icon} /><span>{T(c, item.label)}</span>{item.badge && <em>{item.badge}</em>}</a>
        ))}
      </nav>
      <label className="app-search app-search--top"><Icon name="search" /><input type="search" placeholder={T(c, c.app.search)} aria-label={T(c, c.app.search)} /></label>
      <span className="app-avatar" aria-hidden="true">{c.lang === 'ar' ? 'ع' : 'OA'}</span>
    </header>
  );
}

function Field({ c, f, id }: { c: Ctx; f: AppField; id: string }) {
  const label = T(c, f.label);
  switch (f.kind) {
    case 'number': return <label className="app-field" htmlFor={id}><span>{label}</span><div className="app-input"><input id={id} type="text" inputMode="decimal" defaultValue={f.value} dir="ltr" />{f.unit && <i>{f.unit}</i>}</div></label>;
    case 'text': return <label className="app-field" htmlFor={id}><span>{label}</span><div className="app-input"><input id={id} type="text" defaultValue={T(c, f.value)} /></div></label>;
    case 'select': return <label className="app-field" htmlFor={id}><span>{label}</span><div className="app-input app-input--select"><select id={id} defaultValue="0"><option value="0">{T(c, f.value)}</option></select><Icon name="chevron-down" /></div></label>;
    case 'toggle': return <label className="app-toggle"><span>{label}</span><input type="checkbox" defaultChecked={f.on} /><i aria-hidden="true" /></label>;
    case 'range': return <label className="app-range" htmlFor={id}><span>{label}<b dir="ltr" data-out={id}>{f.value}{f.unit ? ` ${f.unit}` : ''}</b></span><input id={id} type="range" min={f.min} max={f.max} defaultValue={f.value} data-unit={f.unit ?? ''} /></label>;
    case 'segment': return <div className="app-field"><span>{label}</span><div className="app-segment" role="radiogroup" aria-label={label}>{f.options.map((o, i) => <button key={i} type="button" role="radio" aria-checked={i === f.active}>{T(c, o)}</button>)}</div></div>;
    case 'chips': return <div className="app-field"><span>{label}</span><div className="app-chips" role="group" aria-label={label}>{f.options.map((o, i) => <button key={i} type="button" aria-pressed={f.active.includes(i)}>{T(c, o)}</button>)}</div></div>;
  }
}

function Panel({ c }: { c: Ctx }) {
  return (
    <aside className="app-panel" aria-label={T(c, c.app.panelTitle)}>
      <h2 className="app-panel-title">{T(c, c.app.panelTitle)}</h2>
      {c.app.panel.map((s, si) => (
        <section className="app-section" key={si}>
          <h3><span>{String(si + 1).padStart(2, '0')}</span>{T(c, s.title)}</h3>
          {s.fields.map((f, fi) => <Field key={fi} c={c} f={f} id={`f${si}${fi}`} />)}
        </section>
      ))}
    </aside>
  );
}

const toneClass = (tone: Tone) => `tone-${tone}`;

/** A finger-joint box laid out flat: four walls round a base, the lid above. */
function BoxNet({ c, view }: { c: Ctx; view: Extract<AppView, { kind: 'canvas' }> }) {
  const fingers = (x: number, y: number, w: number, h: number) => {
    const n = 5, tw = w / n, d = 3;
    let top = `M${x} ${y}`;
    for (let i = 0; i < n; i++) top += ` H${x + tw * (i + 1)}` + (i % 2 === 0 ? ` V${y - d} H${x + tw * (i + 1)} V${y}` : '');
    return `${top} V${y + h} H${x} Z`;
  };
  const panels = [[70, 20, 120, 60], [70, 90, 120, 80], [70, 180, 120, 60], [0, 90, 60, 80], [200, 90, 60, 80], [70, 250, 120, 80]];
  return (
    <figure className="ws-paper">
      <svg viewBox="-10 -10 280 350" role="img" aria-label={T(c, view.caption)}>
        {panels.map(([x, y, w, h], i) => <path key={i} d={fingers(x, y, w, h)} className="cut" />)}
        <circle cx="130" cy="270" r="6" className="cut" />
        <text x="130" y="135" className="engrave" textAnchor="middle">{c.lang === 'ar' ? 'القاعدة' : 'BASE'}</text>
        <text x="130" y="295" className="engrave" textAnchor="middle">{c.lang === 'ar' ? 'الغطاء' : 'LID'}</text>
      </svg>
      <figcaption><span>{T(c, view.caption)}</span><b dir="ltr">{view.size}</b></figcaption>
    </figure>
  );
}

function Plan({ c, view }: { c: Ctx; view: Extract<AppView, { kind: 'plan' }> }) {
  return (
    <figure className="ws-plan">
      <svg viewBox="-8 -8 116 120" role="img" aria-label={T(c, view.caption)}>
        <rect x="0" y="0" width="100" height="100" className="wall" />
        {view.rooms.map((r, i) => (
          <g key={i}>
            <rect x={r.x} y={r.y} width={r.w} height={r.h} className="room" />
            <text x={r.x + r.w / 2} y={r.y + r.h / 2} textAnchor="middle" className="room-label">{T(c, r.label)}</text>
            <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 5} textAnchor="middle" className="room-area">{((r.w * r.h) / 54).toFixed(1)} m²</text>
          </g>
        ))}
        <path d="M40 100 A 10 10 0 0 1 50 90 L50 100" className="door" />
        <line x1="0" y1="106" x2="100" y2="106" className="dim" /><text x="50" y="112" textAnchor="middle" className="room-area">13.60 m</text>
      </svg>
      <figcaption>{T(c, view.caption)}</figcaption>
    </figure>
  );
}

function View({ c }: { c: Ctx }) {
  const v = c.app.view;
  switch (v.kind) {
    case 'canvas': return <BoxNet c={c} view={v} />;
    case 'plan': return <Plan c={c} view={v} />;
    case 'kanban': return (
      <div className="ws-kanban">
        {v.columns.map((col, i) => (
          <section className="ws-column" key={i}>
            <h3><i className={toneClass(col.tone)} />{T(c, col.title)}<span>{col.cards.length}</span></h3>
            {col.cards.map((card, j) => (
              <article className="ws-card" key={j}>
                <strong>{T(c, card.title)}</strong><p>{T(c, card.meta)}</p>
                <footer>{card.tag && <span className={`ws-tag ${toneClass(col.tone)}`}>{T(c, card.tag)}</span>}{card.who && <b className="ws-who">{card.who}</b>}</footer>
              </article>
            ))}
          </section>
        ))}
      </div>
    );
    case 'table': return (
      <div className="ws-frame ws-table-wrap"><table className="ws-table">
        <thead><tr>{v.columns.map((h, i) => <th key={i}>{T(c, h)}</th>)}<th>{c.lang === 'ar' ? 'الحالة' : 'Status'}</th></tr></thead>
        <tbody>{v.rows.map((r, i) => <tr key={i} className={i === 0 ? 'is-selected' : undefined}>{r.cells.map((cell, j) => <td key={j} dir={typeof cell === 'string' ? 'ltr' : undefined}>{T(c, cell)}</td>)}<td><span className={`ws-tag ${toneClass(r.status.tone)}`}>{T(c, r.status.label)}</span></td></tr>)}</tbody>
      </table></div>
    );
    case 'week': {
      const hours = Array.from({ length: v.to - v.from }, (_, i) => v.from + i);
      return (
        <div className="ws-frame ws-week" style={{ ['--days' as string]: v.days.length, ['--hours' as string]: hours.length }}>
          <div className="ws-week-head"><span />{v.days.map((d, i) => <b key={i}>{T(c, d)}</b>)}</div>
          <div className="ws-week-body">
            <div className="ws-hours">{hours.map(h => <span key={h} dir="ltr">{`${h}:00`}</span>)}</div>
            {v.days.map((_, d) => (
              <div className="ws-day" key={d}>
                {v.events.filter(e => e.day === d).map((e, i) => (
                  <article key={i} className={`ws-event ${toneClass(e.tone)}`} style={{ top: `${((e.at - v.from) / hours.length) * 100}%`, height: `${(e.len / hours.length) * 100}%` }}>
                    <strong>{T(c, e.title)}</strong><span>{T(c, e.who)}</span>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    }
    case 'timeline': return (
      <div className="ws-frame ws-timeline" style={{ ['--slots' as string]: v.slots.length }}>
        <div className="ws-lane ws-lane--head"><span />{v.slots.map((s, i) => <b key={i} dir="ltr">{T(c, s)}</b>)}</div>
        {v.lanes.map((lane, i) => (
          <div className="ws-lane" key={i}>
            <span className="ws-lane-name">{T(c, lane)}</span>
            <div className="ws-track">
              {v.bars.filter(b => b.lane === i).map((b, j) => <span key={j} className={`ws-bar ${toneClass(b.tone)}`} style={{ insetInlineStart: `${(b.from / v.slots.length) * 100}%`, width: `${((b.to - b.from) / v.slots.length) * 100}%` }}>{T(c, b.label)}</span>)}
            </div>
          </div>
        ))}
      </div>
    );
    case 'grid': return (
      <div className="ws-grid">
        {v.tiles.map((tile, i) => (
          <article className={`ws-tile${i === 0 ? ' is-selected' : ''}`} key={i}>
            <figure><img src={img(tile.img)} alt="" loading="lazy" />{tile.badge && <span className="ws-tag tone-accent">{T(c, tile.badge)}</span>}</figure>
            <strong>{T(c, tile.title)}</strong><p><span>{T(c, tile.meta)}</span><b dir="ltr">{tile.price}</b></p>
          </article>
        ))}
      </div>
    );
    case 'dashboard': {
      const max = Math.max(...v.series, ...v.series2) * 1.1;
      const line = (s: number[]) => s.map((y, i) => `${i === 0 ? 'M' : 'L'}${(i / (s.length - 1)) * 300} ${120 - (y / max) * 120}`).join(' ');
      return (
        <div className="ws-dash">
          <section className="ws-frame ws-chart">
            <header><h3>{T(c, v.chart)}</h3><span><i className="tone-accent" />{T(c, v.legend[0])}</span><span><i className="tone-muted" />{T(c, v.legend[1])}</span></header>
            <svg viewBox="0 0 300 130" preserveAspectRatio="none" role="img" aria-label={T(c, v.chart)}>
              {[0, 1, 2, 3].map(i => <line key={i} x1="0" x2="300" y1={i * 40} y2={i * 40} className="grid" />)}
              <path d={`${line(v.series)} L300 130 L0 130 Z`} className="area" />
              <path d={line(v.series2)} className="line2" /><path d={line(v.series)} className="line1" />
            </svg>
            <footer dir="ltr">{v.months.map((m, i) => <span key={i}>{T(c, m)}</span>)}</footer>
          </section>
          <section className="ws-frame ws-list">
            <h3>{T(c, v.list)}</h3>
            {v.rows.map((r, i) => <p key={i}><span>{T(c, r.label)}</span><b dir="ltr">{r.value}</b><i style={{ width: `${r.share * 100}%` }} /></p>)}
          </section>
        </div>
      );
    }
    case 'gallery': return (
      <div className="ws-gallery">
        {v.photos.map((ph, i) => (
          <figure key={i} className={`${i === 2 ? 'is-selected ' : ''}${ph.flag === 'reject' ? 'is-rejected' : ''}`.trim() || undefined}>
            <img src={img(ph.img)} alt="" loading="lazy" />
            <figcaption><span className="ws-stars" aria-label={`${ph.rating}/5`}>{'★'.repeat(ph.rating)}<i>{'★'.repeat(5 - ph.rating)}</i></span>{ph.flag && <b className={ph.flag === 'pick' ? 'tone-ok' : 'tone-warn'}><Icon name={ph.flag === 'pick' ? 'flag' : 'x'} /></b>}</figcaption>
          </figure>
        ))}
      </div>
    );
    case 'document': return (
      <div className="ws-frame ws-doc">
        {v.blocks.map((b, i) => (
          <div className="ws-block" key={i}>
            <span className="ws-grip" aria-hidden="true"><Icon name="grip-vertical" /></span>
            {b.kind === 'h' && <h2>{T(c, b.text)}</h2>}
            {b.kind === 'p' && <p>{T(c, b.text)}</p>}
            {b.kind === 'list' && <ul>{b.items.map((it, j) => <li key={j}>{T(c, it)}</li>)}</ul>}
            {b.kind === 'media' && <figure><img src={img(b.img)} alt="" loading="lazy" /><figcaption>{T(c, b.caption)}</figcaption></figure>}
            {b.kind === 'quiz' && <fieldset className="ws-quiz"><legend>{T(c, b.q)}</legend>{b.options.map((o, j) => <label key={j}><input type="radio" name={`q${i}`} defaultChecked={j === b.answer} />{T(c, o)}</label>)}</fieldset>}
          </div>
        ))}
        <button type="button" className="ws-add"><Icon name="plus" />{c.lang === 'ar' ? 'أضف كتلة' : 'Add a block'}</button>
      </div>
    );
  }
}

function Shell({ c }: { c: Ctx }) {
  const a = c.app;
  const items = flat(a);
  const group = a.groups.find(g => g.items.includes(items[a.active]));
  return (
    <div className="app" data-nav={c.layout.nav} data-panel={c.layout.panel} data-view={c.layout.view}>
      {c.layout.nav === 'sidebar' && <Side c={c} />}
      {c.layout.nav === 'rail' && <Rail c={c} />}
      <div className="app-main">
        {c.layout.nav === 'topbar' && <Top c={c} />}
        <header className="ws-head">
          <p className="ws-crumb">{group && <span>{T(c, group.title)}</span>}<Icon name="chevron-right" /><b>{T(c, items[a.active].label)}</b></p>
          <div className="ws-title"><h1>{T(c, a.title)}</h1><p>{T(c, a.subtitle)}</p></div>
          <div className="ws-actions">
            <button type="button" className="app-btn app-panel-toggle" aria-expanded="false"><Icon name="sliders-horizontal" /><span>{T(c, a.panelTitle)}</span></button>
            {a.actions.map((b, i) => <button key={i} type="button" className={`app-btn${b.primary ? ' app-btn--primary' : ''}`}><Icon name={b.icon} /><span>{T(c, b.label)}</span></button>)}
          </div>
          <div className="ws-tabs" role="tablist">{a.tabs.map((tab, i) => <button key={i} type="button" role="tab" aria-selected={i === 0}>{T(c, tab)}</button>)}</div>
        </header>
        <div className="ws-body">
          <Panel c={c} />
          <section className="ws-view" id="ws" aria-label={T(c, a.title)}><View c={c} /></section>
        </div>
        <div className="app-stats">{a.stats.map((s, i) => <div className="app-stat" key={i}><span>{T(c, s.label)}</span><strong dir="ltr">{s.value}{s.unit && <small>{T(c, s.unit)}</small>}</strong></div>)}</div>
        <footer className="app-status"><span><i className="app-dot" />{T(c, a.status)}</span><span>{c.lang === 'ar' ? 'محفوظ' : 'Saved'}</span></footer>
      </div>
    </div>
  );
}

export function appLayout(design: Design): AppLayout {
  if (!design.app) throw new Error(`${design.slug} is in an app style but has no app layout`);
  return design.app;
}

/** The body of an app demo, between the page's <body> tags. */
export function renderAppBody(design: Design, lang: Lang): string {
  const c: Ctx = { lang, design, app: app(design.profile), layout: appLayout(design) };
  return `${renderToStaticMarkup(<Shell c={c} />)}\n<div class="app-toast" role="status" aria-live="polite"></div>\n<script>\n${appJs}\n</script>`;
}
