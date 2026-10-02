import { CATEGORIES, PROFILES } from '@/catalog';
import { font } from '@/catalog/fonts';
import type { Design } from '@/catalog/types';
import type { Copy } from '@/lib/copy';
import type { Locale } from '@/lib/i18n';
import type { CatalogCopy } from './Catalog';

/** What a card and the catalogue filters need, in one language, for the browser. */
export type CardData = {
  slug: string;
  no: number;
  cat: string;
  catName: string;
  profile: string;
  profileName: string;
  name: string;
  blurb: string;
  scheme: 'light' | 'dark';
  animated: boolean;
  swatches: string[];
  fonts: string;
  /** Lower-case text in both languages, for search. */
  search: string;
};

export function cardData(d: Design, locale: Locale): CardData {
  const cat = CATEGORIES.find(c => c.id === d.cat)!;
  const prof = PROFILES[d.profile];
  const p = d.palette;
  const fonts = locale === 'ar' ? [d.fonts.displayAr, d.fonts.bodyAr] : [d.fonts.display, d.fonts.body];
  const motion = d.motion ?? cat.motion;
  return {
    slug: d.slug,
    no: d.no,
    cat: d.cat,
    catName: cat.name[locale],
    profile: d.profile,
    profileName: prof.label[locale],
    name: d.name[locale],
    blurb: d.blurb[locale],
    scheme: d.scheme,
    animated: motion === 'rich' || motion === 'lively',
    swatches: [p.bg, p.surface, p.ink, p.accent, p.accent2, p.line],
    fonts: [...new Set(fonts)].map(id => font(id).family).join(' · '),
    search: [d.slug, d.name.ar, d.name.en, cat.name.ar, cat.name.en, prof.label.ar, prof.label.en, d.blurb.ar, d.blurb.en, cat.tagline.ar, cat.tagline.en, d.scheme === 'dark' ? 'داكن dark' : 'فاتح light', motion === 'rich' || motion === 'lively' ? 'متحرك animated حركة' : '']
      .join(' ').toLowerCase(),
  };
}

export function catalogCopy(c: Copy): CatalogCopy {
  const f = c.filters;
  return {
    search: c.search, empty: c.empty, fav: c.fav, unfav: c.unfav,
    filters: { all: f.all, style: f.style, type: f.type, anyType: f.anyType, scheme: f.scheme, any: f.any, light: f.light, dark: f.dark, animated: f.animated, favs: f.favs, clear: f.clear, results: f.results(999).replace('999', '{n}') },
  };
}
