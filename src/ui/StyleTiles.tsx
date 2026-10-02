import Link from 'next/link';
import { CATEGORIES, designsIn } from '@/catalog';
import { stack } from '@/catalog/fonts';
import type { Copy } from '@/lib/copy';
import { num, type Locale } from '@/lib/i18n';

/** Font stylesheets a set of styles' tiles need, in one language. */
export function TileFonts({ locale, ids }: { locale: Locale; ids?: string[] }) {
  const fonts = new Set(CATEGORIES.filter(c => !ids || ids.includes(c.id)).map(c => (locale === 'ar' ? c.tile.fontAr : c.tile.font)));
  return <>{[...fonts].map(f => <link key={f} rel="stylesheet" href={`/fonts/${f}.css`} precedence="default" />)}</>;
}

/** Each style introduced in its own typeface and colours. */
export function StyleTiles({ locale, c }: { locale: Locale; c: Copy }) {
  return (
    <div className="tiles">
      <TileFonts locale={locale} />
      {CATEGORIES.map((cat, i) => {
        const designs = designsIn(cat.id);
        const tf = locale === 'ar' ? cat.tile.fontAr : cat.tile.font;
        return (
          <Link key={cat.id} href={`/${locale}/styles/${cat.id}`} className="tile"
            style={{ '--tile-bg': cat.tile.bg, '--tile-ink': cat.tile.ink, '--tile-accent': cat.tile.accent, '--tile-font': stack(tf) } as React.CSSProperties}>
            <span className="tile__no mono">{String(i + 1).padStart(2, '0')}</span>
            <span className="tile__name">{cat.name[locale]}</span>
            <span className="tile__tag">{cat.tagline[locale]}</span>
            <span className="tile__thumbs" aria-hidden="true">
              {designs.slice(0, 3).map(d => <img key={d.slug} src={`/thumbs/${d.slug}-${locale}.webp`} alt="" width={640} height={480} loading="lazy" decoding="async" />)}
            </span>
            <span className="tile__count mono">{c.designsCount(designs.length).replace(/\d+/, n => num(n, locale))}</span>
          </Link>
        );
      })}
    </div>
  );
}
