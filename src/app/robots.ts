import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/i18n';

export default function robots(): MetadataRoute.Robots {
  // The demos are fictional businesses: keep them out of search results.
  return { rules: { userAgent: '*', allow: '/', disallow: '/demos/' }, sitemap: `${siteUrl}/sitemap.xml` };
}
