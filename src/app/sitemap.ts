import type { MetadataRoute } from 'next';
import { CATEGORIES, DESIGNS } from '@/catalog';
import { locales, siteUrl } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', ...CATEGORIES.map(c => `/styles/${c.id}`), ...DESIGNS.map(d => `/d/${d.slug}`)];
  return paths.flatMap(path => locales.map(locale => ({
    url: `${siteUrl}/${locale}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path ? 0.7 : 1,
    alternates: { languages: { ar: `${siteUrl}/ar${path}`, en: `${siteUrl}/en${path}` } },
  })));
}
