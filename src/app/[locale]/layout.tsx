import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { t } from '@/lib/copy';
import { dirOf, isLocale, locales, siteUrl } from '@/lib/i18n';
import { Footer, Header } from '@/ui/Chrome';
// The library's own type, served from this site.
import '@fontsource/reem-kufi/500.css';
import '@fontsource/reem-kufi/700.css';
import '@fontsource-variable/bricolage-grotesque/index.css';
import '@fontsource-variable/readex-pro/index.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '../app.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#F3EFE6' }, { media: '(prefers-color-scheme: dark)', color: '#12110F' }],
};

export const dynamicParams = false;
export function generateStaticParams() { return locales.map(locale => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = t(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: c.title, template: `%s · ${c.name}` },
    description: c.description,
    applicationName: c.name,
    authors: [{ name: 'Omar Aldeek', url: 'https://omardeek.tech' }],
    alternates: { canonical: `/${locale}`, languages: { ar: '/ar', en: '/en', 'x-default': '/en' } },
    openGraph: { title: c.title, description: c.description, siteName: c.name, type: 'website', locale: locale === 'ar' ? 'ar_PS' : 'en_US', url: `/${locale}`, images: [{ url: '/og.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: c.title, description: c.description, images: ['/og.png'] },
    icons: { icon: '/icon.svg' },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} dir={dirOf(locale)}>
      <body>
        <a className="skip" href="#content">{locale === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content'}</a>
        <Header locale={locale} />
        <main id="content">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
