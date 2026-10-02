'use client';

import { useEffect, useMemo, useState } from 'react';
import { DesignCard } from './DesignCard';
import { useFavs } from './favs';
import type { CardData } from './cards';

type Option = { id: string; name: string; color?: string };

/** The catalogue's words, as plain strings so they can cross into the browser. */
export type CatalogCopy = {
  search: string; empty: string; fav: string; unfav: string;
  filters: { all: string; style: string; type: string; anyType: string; scheme: string; any: string; light: string; dark: string; animated: string; favs: string; clear: string; results: string };
};
type Filters = { q: string; style: string; type: string; scheme: string; animated: boolean; favs: boolean };
const blank: Filters = { q: '', style: '', type: '', scheme: '', animated: false, favs: false };

export const SEARCH_EVENT = 'qalib:search';

function fromUrl(): Filters {
  const p = new URLSearchParams(location.search);
  return { q: p.get('q') ?? '', style: p.get('style') ?? '', type: p.get('type') ?? '', scheme: p.get('scheme') ?? '', animated: p.get('animated') === '1', favs: p.get('favs') === '1' };
}

function toUrl(f: Filters) {
  const p = new URLSearchParams();
  if (f.q) p.set('q', f.q);
  if (f.style) p.set('style', f.style);
  if (f.type) p.set('type', f.type);
  if (f.scheme) p.set('scheme', f.scheme);
  if (f.animated) p.set('animated', '1');
  if (f.favs) p.set('favs', '1');
  const qs = p.toString();
  history.replaceState(null, '', `${location.pathname}${qs ? `?${qs}` : ''}${location.hash}`);
}

export function Catalog({ cards, styles, types, locale, c, lockStyle }: { cards: CardData[]; styles: Option[]; types: Option[]; locale: string; c: CatalogCopy; lockStyle?: string }) {
  const [f, setF] = useState<Filters>(blank);
  const { favs } = useFavs();
  const labels = { add: c.fav, remove: c.unfav };

  useEffect(() => {
    // Filters live in the address so a filtered view can be shared or revisited.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setF(fromUrl());
    const onSearch = (e: Event) => setF(prev => ({ ...prev, q: (e as CustomEvent<string>).detail }));
    window.addEventListener(SEARCH_EVENT, onSearch);
    return () => window.removeEventListener(SEARCH_EVENT, onSearch);
  }, []);

  const update = (patch: Partial<Filters>) => setF(prev => { const next = { ...prev, ...patch }; toUrl(next); return next; });

  const shown = useMemo(() => {
    const words = f.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return cards.filter(d =>
      (!f.style || d.cat === f.style) && (!f.type || d.profile === f.type) && (!f.scheme || d.scheme === f.scheme) &&
      (!f.animated || d.animated) && (!f.favs || favs.includes(d.slug)) && words.every(w => d.search.includes(w)));
  }, [cards, f, favs]);

  const active = f.q || f.style || f.type || f.scheme || f.animated || f.favs;

  return (
    <div className="catalog">
      <div className="filters" role="search">
        <div className="filters__row">
          <label className="field field--search">
            <span className="sr">{c.search}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
            <input type="search" value={f.q} placeholder={c.search} onChange={e => update({ q: e.target.value })} />
          </label>
          <label className="field">
            <span className="sr">{c.filters.type}</span>
            <select value={f.type} onChange={e => update({ type: e.target.value })} aria-label={c.filters.type}>
              <option value="">{c.filters.anyType}</option>
              {types.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>
          </label>
          <div className="seg" role="group" aria-label={c.filters.scheme}>
            {(['', 'light', 'dark'] as const).map(s => (
              <button key={s || 'any'} type="button" aria-pressed={f.scheme === s} onClick={() => update({ scheme: s })}>
                {s === '' ? c.filters.any : s === 'light' ? c.filters.light : c.filters.dark}
              </button>
            ))}
          </div>
          <button type="button" className="toggle" aria-pressed={f.animated} onClick={() => update({ animated: !f.animated })}>{c.filters.animated}</button>
          <button type="button" className="toggle toggle--fav" aria-pressed={f.favs} onClick={() => update({ favs: !f.favs })}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-7.5-10.3A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.5 2.6c0 5.7-7.5 10.3-7.5 10.3z" /></svg>
            {c.filters.favs}{favs.length > 0 && <span className="count">{favs.length}</span>}
          </button>
        </div>
        {!lockStyle && (
          <div className="chips" role="group" aria-label={c.filters.style}>
            <button type="button" aria-pressed={!f.style} onClick={() => update({ style: '' })}>{c.filters.all}</button>
            {styles.map(s => (
              <button key={s.id} type="button" aria-pressed={f.style === s.id} onClick={() => update({ style: f.style === s.id ? '' : s.id })}>
                <i style={{ background: s.color }} aria-hidden="true" />{s.name}
              </button>
            ))}
          </div>
        )}
        <p className="filters__count" aria-live="polite">
          <span className="mono">{c.filters.results.replace('{n}', String(shown.length))}</span>
          {active && <button type="button" className="link" onClick={() => update(blank)}>{c.filters.clear}</button>}
        </p>
      </div>
      {shown.length ? (
        <div className="grid">{shown.map(d => <DesignCard key={d.slug} d={d} locale={locale} labels={labels} />)}</div>
      ) : (
        <p className="empty">{c.empty}</p>
      )}
    </div>
  );
}
