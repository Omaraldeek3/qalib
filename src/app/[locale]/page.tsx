import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORIES, DESIGNS, PROFILES, design } from '@/catalog';
import { t } from '@/lib/copy';
import { isLocale, num } from '@/lib/i18n';
import { Catalog } from '@/ui/Catalog';
import { cardData, catalogCopy } from '@/ui/cards';
import { HeroSearch } from '@/ui/HeroSearch';
import { StyleTiles } from '@/ui/StyleTiles';

const FAN = ['kinetic', 'andalus', 'tatreez', 'storytime', 'terminal'];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = t(locale);
  const cards = DESIGNS.map(d => cardData(d, locale));
  const styles = CATEGORIES.map(s => ({ id: s.id, name: s.name[locale], color: s.tile.accent }));
  const types = Object.values(PROFILES).map(p => ({ id: p.id, name: p.label[locale] })).sort((a, b) => a.name.localeCompare(b.name, locale));
  const [w1, w2, w3] = c.heroTitle;

  return (
    <>
      <section className="hero">
        <div className="shell hero__in">
          <div className="hero__text">
            <p className="kicker mono">{c.kicker(num(DESIGNS.length, locale), num(CATEGORIES.length, locale))}</p>
            <h1 className="hero__title">{w1} <em>{w2}</em> {w3}</h1>
            <p className="hero__lead">{c.heroLead}</p>
            <HeroSearch placeholder={c.search} button={c.browse} />
          </div>
          <div className="fan" aria-hidden="true">
            {FAN.map((slug, i) => {
              const d = design(slug)!;
              return (
                <Link key={slug} href={`/${locale}/d/${slug}`} className="fan__card" style={{ '--i': i - 2 } as React.CSSProperties} tabIndex={-1}>
                  <img src={`/thumbs/${slug}-${locale}.webp`} alt="" width={640} height={480} />
                  <span className="fan__label mono">№ {String(d.no).padStart(3, '0')} · {d.name[locale]}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="how" id="how">
        <div className="shell">
          <h2 className="section-title">{c.howTitle}</h2>
          <ol className="how__steps">
            {c.how.map((s, i) => (
              <li key={i} className="how__step">
                <span className="how__no mono">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
          <pre className="how__sample mono" aria-hidden="true">{locale === 'ar'
            ? '# ابنِ موقعًا بتصميم «أندلس»\n## ١. المشروع\n- الاسم: مطعم دار سلمى\n- نوع الموقع: مطعم\n## ٤. القيم الأساسية\n:root { --bg: #F5EFE3; --accent: #7A1F2B; … }\n## ٥. بنية الصفحة\n1. الترويسة: الشعار في المنتصف…'
            : '# Build a website in the "Andalus" style\n## 1. The project\n- Name: Dar Salma restaurant\n- Type of site: Restaurant\n## 4. Design tokens\n:root { --bg: #F5EFE3; --accent: #7A1F2B; … }\n## 5. Page structure\n1. Header: the logo centred on top…'}</pre>
        </div>
      </section>

      <section className="styles" id="styles">
        <div className="shell">
          <header className="section-head">
            <h2 className="section-title">{c.stylesTitle}</h2>
            <p className="section-lead">{c.stylesLead}</p>
          </header>
          <StyleTiles locale={locale} c={c} />
        </div>
      </section>

      <section className="designs" id="designs">
        <div className="shell">
          <header className="section-head">
            <h2 className="section-title">{c.allTitle}</h2>
          </header>
          <Catalog cards={cards} styles={styles} types={types} locale={locale} c={catalogCopy(c)} />
        </div>
      </section>
    </>
  );
}
