import { CATEGORIES } from './categories';
import { classic } from './designs/classic';
import { vintage } from './designs/vintage';
import { modern } from './designs/modern';
import { animated } from './designs/animated';
import { heritage } from './designs/heritage';
import { digital } from './designs/digital';
import { minimal } from './designs/minimal';
import { luxury } from './designs/luxury';
import { playful } from './designs/playful';
import { editorial } from './designs/editorial';
import { brutalist } from './designs/brutalist';
import { glass } from './designs/glass';
import { retro } from './designs/retro';
import { organic } from './designs/organic';
import { artdeco } from './designs/artdeco';
import { handdrawn } from './designs/handdrawn';
import { geometric } from './designs/geometric';
import { conventional } from './designs/conventional';
import type { DesignInput } from './designs/input';
import type { CategoryId, Design } from './types';

export { CATEGORIES, category } from './categories';
export { PROFILES, profile } from './profiles';

const byCategory: Record<CategoryId, DesignInput[]> = {
  classic, vintage, modern, animated, heritage, digital, minimal, luxury, playful,
  editorial, brutalist, glass, retro, organic, artdeco, handdrawn, geometric, conventional,
};

/** Every design, numbered in catalogue order. */
export const DESIGNS: Design[] = CATEGORIES.flatMap(c => byCategory[c.id])
  .map((d, i) => ({ ...d, cat: categoryOf(d), no: i + 1 }));

function categoryOf(d: DesignInput): CategoryId {
  for (const c of CATEGORIES) if (byCategory[c.id].includes(d)) return c.id;
  throw new Error(`Design ${d.slug} has no style`);
}

export function design(slug: string): Design | undefined {
  return DESIGNS.find(d => d.slug === slug);
}

export function designsIn(cat: CategoryId): Design[] {
  return DESIGNS.filter(d => d.cat === cat);
}
