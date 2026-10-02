import type { Item, L } from '../types';

/** Text in Arabic and English. */
export const t = (ar: string, en: string): L => ({ ar, en });
/** The same text in both languages (times, numbers, names in Latin). */
export const same = (s: string): L => ({ ar: s, en: s });
/** A list item. */
export const item = (title: L, rest: Omit<Item, 'title'> = {}): Item => ({ title, ...rest });
