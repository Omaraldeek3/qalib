'use client';

import Link from 'next/link';
import { useFavs } from './favs';
import type { CardData } from './cards';

export function FavButton({ slug, labels }: { slug: string; labels: { add: string; remove: string } }) {
  const { favs, toggle } = useFavs();
  const on = favs.includes(slug);
  return (
    <button type="button" className={on ? 'fav is-on' : 'fav'} aria-pressed={on} aria-label={on ? labels.remove : labels.add} title={on ? labels.remove : labels.add}
      onClick={e => { e.preventDefault(); e.stopPropagation(); toggle(slug); }}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-7.5-10.3A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.5 2.6c0 5.7-7.5 10.3-7.5 10.3z" /></svg>
    </button>
  );
}

/** A specimen card: cover screenshot that pans through the whole page on hover. */
export function DesignCard({ d, locale, labels }: { d: CardData; locale: string; labels: { add: string; remove: string } }) {
  return (
    <article className="dcard" data-scheme={d.scheme}>
      <Link className="dcard__link" href={`/${locale}/d/${d.slug}`} aria-label={`${d.name}: ${d.catName}`}>
        <div className="dcard__frame">
          <div className="dcard__shot">
            <img className="dcard__cover" src={`/thumbs/${d.slug}-${locale}.webp`} alt="" width={640} height={480} loading="lazy" decoding="async" />
            <img className="dcard__full" src={`/thumbs/${d.slug}-${locale}-full.webp`} alt="" width={480} loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="dcard__body">
          <p className="dcard__meta"><span className="mono">№ {String(d.no).padStart(3, '0')}</span><span>{d.catName}</span><span>{d.profileName}</span></p>
          <h3 className="dcard__name">{d.name}</h3>
          <p className="dcard__blurb">{d.blurb}</p>
          <div className="dcard__foot">
            <span className="swatches" aria-hidden="true">{d.swatches.map((c, i) => <i key={i} style={{ background: c }} />)}</span>
            <span className="dcard__fonts mono">{d.fonts}</span>
          </div>
        </div>
      </Link>
      <FavButton slug={d.slug} labels={labels} />
    </article>
  );
}
