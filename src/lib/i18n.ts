import type { Lang } from '@/catalog/types';

export const siteUrl = 'https://qalib.omardeek.tech';
export const locales = ['ar', 'en'] as const satisfies readonly Lang[];
export type Locale = Lang;
export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);
export const dirOf = (locale: Locale) => (locale === 'ar' ? 'rtl' : 'ltr');
export const other = (locale: Locale): Locale => (locale === 'ar' ? 'en' : 'ar');

/** Arabic-Indic digits for Arabic text, Latin digits otherwise. */
export const num = (n: number | string, locale: Locale) =>
  locale === 'ar' ? String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[Number(d)]) : String(n);

export const no = (n: number) => `№ ${String(n).padStart(3, '0')}`;
