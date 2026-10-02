import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORIES, PROFILES, designsIn } from '@/catalog';
import { stack } from '@/catalog/fonts';
import type { CategoryId } from '@/catalog/types';
import { t } from '@/lib/copy';
import { isLocale, locales, num } from '@/lib/i18n';
import { Catalog } from '@/ui/Catalog';
import { cardData, catalogCopy } from '@/ui/cards';
import { TileFonts } from '@/ui/StyleTiles';

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap(locale => CATEGORIES.map(c => ({ locale, cat: c.id })));
}

const find = (id: string) => CATEGORIES.find(c => c.id === id);

export async function generateMetadata({ params }: { params: Promise<{ locale: string; cat: string }> }): Promise<Metadata> {
  const { locale, cat } = await params;
  const style = find(cat);
  if (!isLocale(locale) || !style) return {};
  return {
    title: `${style.name[locale]} · ${style.tagline[locale]}`,
    description: style.description[locale],
    alternates: { canonical: `/${locale}/styles/${cat}`, languages: { ar: `/ar/styles/${cat}`, en: `/en/styles/${cat}` } },
  };
}

export default async function StylePage({ params }: { params: Promise<{ locale: string; cat: string }> }) {
  const { locale, cat } = await params;
  const style = find(cat);
  if (!isLocale(locale) || !style) notFound();
  const c = t(locale);
  const designs = designsIn(cat as CategoryId);
  const tf = locale === 'ar' ? style.tile.fontAr : style.tile.font;
  const dna = style.dna;
  const keys = ['type', 'color', 'layout', 'shape', 'imagery', 'motion', 'details', 'avoid'] as const;
  const types = Object.values(PROFILES).filter(p => designs.some(d => d.profile === p.id)).map(p => ({ id: p.id, name: p.label[locale] }));
  const index = CATEGORIES.indexOf(style);

  return (
    <>
      <TileFonts locale={locale} />
      <section className="shead" style={{ '--tile-bg': style.tile.bg, '--tile-ink': style.tile.ink, '--tile-accent': style.tile.accent, '--tile-font': stack(tf) } as React.CSSProperties}>
        <div className="shell shead__in">
          <nav className="crumbs mono" aria-label={locale === 'ar' ? 'المسار' : 'Breadcrumb'}>
            <Link href={`/${locale}`}>{c.crumbsHome}</Link><span aria-hidden="true">/</span><Link href={`/${locale}#styles`}>{c.nav.styles}</Link><span aria-hidden="true">/</span><span>{String(index + 1).padStart(2, '0')}</span>
          </nav>
          <h1 className="shead__name">{style.name[locale]}</h1>
          <p className="shead__tag">{style.tagline[locale]}</p>
          <p className="shead__desc">{style.description[locale]}</p>
          <p className="shead__count mono">{c.designsCount(designs.length).replace(/\d+/, n => num(n, locale))}</p>
        </div>
      </section>

      <section className="sdna">
        <div className="shell">
          <h2 className="section-title">{c.styleDna}</h2>
          <dl className="sdna__list">
            {keys.map(k => (
              <div key={k} className={k === 'avoid' ? 'sdna__item sdna__item--avoid' : 'sdna__item'}>
                <dt className="mono">{c.dnaLabels[k]}</dt>
                <dd>{dna[k][locale]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="designs">
        <div className="shell">
          <Catalog cards={designs.map(d => cardData(d, locale))} styles={[]} types={types} locale={locale} c={catalogCopy(c)} lockStyle={cat} />
        </div>
      </section>

      <section className="others">
        <div className="shell">
          <h2 className="section-title">{c.otherStyles}</h2>
          <div className="chips chips--links">
            {CATEGORIES.filter(s => s.id !== cat).map(s => (
              <Link key={s.id} href={`/${locale}/styles/${s.id}`}><i style={{ background: s.tile.accent }} aria-hidden="true" />{s.name[locale]}</Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
