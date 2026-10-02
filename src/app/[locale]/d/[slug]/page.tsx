import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORIES, DESIGNS, PROFILES, design, designsIn } from '@/catalog';
import { font, stack } from '@/catalog/fonts';
import { t } from '@/lib/copy';
import { isLocale, locales, siteUrl } from '@/lib/i18n';
import { kindLabel } from '@/prompt/copy';
import { promptData } from '@/prompt/data';
import { cardData } from '@/ui/cards';
import { DesignCard, FavButton } from '@/ui/DesignCard';
import { Preview } from '@/ui/Preview';
import { PromptPanel } from '@/ui/PromptPanel';
import { Swatches } from '@/ui/Swatches';

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap(locale => DESIGNS.map(d => ({ locale, slug: d.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const d = design(slug);
  if (!isLocale(locale) || !d) return {};
  const cat = CATEGORIES.find(c => c.id === d.cat)!;
  const title = `${d.name[locale]} · ${cat.name[locale]}`;
  return {
    title,
    description: d.blurb[locale],
    alternates: { canonical: `/${locale}/d/${slug}`, languages: { ar: `/ar/d/${slug}`, en: `/en/d/${slug}` } },
    openGraph: { title, description: d.blurb[locale], images: [{ url: `/thumbs/${slug}-${locale}.webp`, width: 640, height: 480 }] },
  };
}

export default async function DesignPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const d = design(slug);
  if (!isLocale(locale) || !d) notFound();
  const c = t(locale);
  const cat = CATEGORIES.find(x => x.id === d.cat)!;
  const prof = PROFILES[d.profile];
  const data = promptData(d);
  const i = DESIGNS.indexOf(d);
  const prev = DESIGNS[(i - 1 + DESIGNS.length) % DESIGNS.length];
  const next = DESIGNS[(i + 1) % DESIGNS.length];
  const siblings = designsIn(d.cat).filter(x => x.slug !== d.slug);
  const p = d.palette;
  const roles = c.roles;
  const colors = [
    { role: roles.bg, hex: p.bg }, { role: roles.surface, hex: p.surface }, { role: roles.ink, hex: p.ink }, { role: roles.muted, hex: p.muted },
    { role: roles.accent, hex: p.accent }, { role: roles.accent2, hex: p.accent2 }, { role: roles.line, hex: p.line }, { role: roles.onAccent, hex: p.onAccent },
  ];
  const fonts = [
    { label: locale === 'ar' ? 'عناوين عربية' : 'Arabic headings', id: d.fonts.displayAr, sample: 'أبجد هوز حطي' },
    { label: locale === 'ar' ? 'نص عربي' : 'Arabic text', id: d.fonts.bodyAr, sample: 'كلمن سعفص قرشت' },
    { label: locale === 'ar' ? 'عناوين لاتينية' : 'Latin headings', id: d.fonts.display, sample: 'Aa Bb Cc 123' },
    { label: locale === 'ar' ? 'نص لاتيني' : 'Latin text', id: d.fonts.body, sample: 'The quick brown fox' },
    ...(d.fonts.accent ? [{ label: locale === 'ar' ? 'خط مساعد' : 'Accent', id: d.fonts.accent, sample: 'Aa 0123' }] : []),
  ];
  const types = Object.values(PROFILES).map(x => ({ id: x.id, name: x.label[locale] })).sort((a, b) => a.name.localeCompare(b.name, locale));
  const pc = c.prompt;
  const labels = { add: c.fav, remove: c.unfav };

  return (
    <>
      {[...new Set(fonts.map(f => f.id))].map(id => <link key={id} rel="stylesheet" href={`/fonts/${id}.css`} precedence="default" />)}
      <div className="shell dpage">
        <nav className="crumbs mono" aria-label={locale === 'ar' ? 'المسار' : 'Breadcrumb'}>
          <Link href={`/${locale}`}>{c.crumbsHome}</Link><span aria-hidden="true">/</span>
          <Link href={`/${locale}/styles/${cat.id}`}>{cat.name[locale]}</Link><span aria-hidden="true">/</span>
          <span>№ {String(d.no).padStart(3, '0')}</span>
        </nav>

        <header className="dhead">
          <div className="dhead__text">
            <p className="kicker mono">№ {String(d.no).padStart(3, '0')} · {cat.name[locale]} · {c.demoOf} {prof.label[locale]}</p>
            <h1 className="dhead__name">{d.name[locale]}</h1>
            <p className="dhead__blurb">{d.blurb[locale]}</p>
          </div>
          <div className="dhead__actions">
            <a className="btn btn--accent" href="#prompt">{c.copyPrompt}</a>
            <a className="btn" href={`/demos/${slug}/${locale}.html`} target="_blank" rel="noopener">{c.openDemo} ↗</a>
            <FavButton slug={slug} labels={labels} />
          </div>
        </header>

        <Preview slug={slug} locale={locale} c={c.preview} cover={`/thumbs/${slug}-${locale}.webp`} />

        <section className="dna" aria-labelledby="dna-title">
          <h2 id="dna-title" className="section-title">{c.dna.title}</h2>
          <div className="dna__grid">
            <div className="dna__block">
              <h3 className="dna__label mono">{c.dna.palette}</h3>
              <Swatches colors={colors} hint={c.dna.copyHex} done={c.dna.copied} />
            </div>
            <div className="dna__block">
              <h3 className="dna__label mono">{c.dna.fonts}</h3>
              <ul className="fonts">
                {fonts.map(f => (
                  <li key={f.label}>
                    <span className="fonts__sample" style={{ fontFamily: stack(f.id), fontWeight: font(f.id).display }}>{f.sample}</span>
                    <span className="fonts__meta"><span>{f.label}</span><span className="mono">{font(f.id).family}</span></span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dna__block">
              <h3 className="dna__label mono">{c.dna.sections}</h3>
              <ol className="outline">
                {data.outline.map((o, k) => <li key={k}><span>{(o.title ?? o.label)[locale]}</span><span className="mono">{o.variant ?? kindLabel[o.kind]?.[locale] ?? ''}</span></li>)}
              </ol>
              <p className="dna__facts mono">
                <span>{c.dna.motion}: {c.motion[data.motion]}</span>
                <span>{c.dna.radius}: {data.radius}px</span>
                <span>{d.scheme === 'dark' ? c.filters.dark : c.filters.light}</span>
              </p>
            </div>
          </div>
        </section>

        <PromptPanel data={data} locale={locale} types={types} origin={siteUrl}
          c={pc} />

        <nav className="pager" aria-label={locale === 'ar' ? 'تصاميم مجاورة' : 'Neighbouring designs'}>
          <Link href={`/${locale}/d/${prev.slug}`} className="pager__link" rel="prev"><span className="mono">{c.prev}</span><strong>{prev.name[locale]}</strong></Link>
          <Link href={`/${locale}/d/${next.slug}`} className="pager__link pager__link--next" rel="next"><span className="mono">{c.next}</span><strong>{next.name[locale]}</strong></Link>
        </nav>

        <section className="more">
          <h2 className="section-title">{c.more(cat.name[locale])}</h2>
          <div className="grid">{siblings.map(s => <DesignCard key={s.slug} d={cardData(s, locale)} locale={locale} labels={labels} />)}</div>
        </section>
      </div>
    </>
  );
}
