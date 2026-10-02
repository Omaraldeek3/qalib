import Link from 'next/link';
import { CATEGORIES, DESIGNS } from '@/catalog';
import { t } from '@/lib/copy';
import { num, type Locale } from '@/lib/i18n';
import { LangSwitch } from './LangSwitch';

export function Logo({ locale }: { locale: Locale }) {
  return (
    <Link className="logo" href={`/${locale}`} aria-label={t(locale).name}>
      <span className="logo__mark" aria-hidden="true">قالب</span>
      <span className="logo__latin" aria-hidden="true">Qalib</span>
    </Link>
  );
}

export function Header({ locale }: { locale: Locale }) {
  const c = t(locale);
  return (
    <header className="top">
      <div className="shell top__in">
        <Logo locale={locale} />
        <nav className="top__nav" aria-label={locale === 'ar' ? 'الأقسام' : 'Sections'}>
          <Link href={`/${locale}#designs`}>{c.nav.designs}<sup>{num(DESIGNS.length, locale)}</sup></Link>
          <Link href={`/${locale}#styles`}>{c.nav.styles}<sup>{num(CATEGORIES.length, locale)}</sup></Link>
          <Link href={`/${locale}#how`}>{c.nav.how}</Link>
        </nav>
        <LangSwitch locale={locale} label={c.switchTo} short={c.switchShort} />
      </div>
    </header>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const c = t(locale);
  return (
    <footer className="foot">
      <div className="shell foot__in">
        <div className="foot__brand">
          <Logo locale={locale} />
          <p>{c.footer.about}</p>
        </div>
        <div className="foot__links">
          <p className="foot__label">{c.footer.more}</p>
          <a href="https://sira.omardeek.tech">{locale === 'ar' ? 'سيرة · منشئ السيرة الذاتية' : 'Sira · CV builder'}</a>
          <a href="https://harf.omardeek.tech">{locale === 'ar' ? 'حرف · معاينة الخطوط' : 'Harf · font previewer'}</a>
          <a href="https://cutstudio.omardeek.tech">{locale === 'ar' ? 'كت ستوديو · ملفات القص' : 'Cut Studio · cutting files'}</a>
        </div>
        <div className="foot__meta">
          <p>{c.footer.by} <a href="https://omardeek.tech">{c.footer.author}</a></p>
          <p className="foot__small">{c.footer.photos}</p>
        </div>
      </div>
    </footer>
  );
}
