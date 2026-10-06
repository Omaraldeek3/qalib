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
import { interactive } from './designs/interactive';
import { bento } from './designs/bento';
import { clay } from './designs/clay';
import { soft } from './designs/soft';
import { aurora } from './designs/aurora';
import { y2k } from './designs/y2k';
import { pixel } from './designs/pixel';
import { skeuo } from './designs/skeuo';
import { workbench } from './designs/workbench';
import type { DesignInput } from './designs/input';
import type { CategoryId, Design, HeroData, Profile } from './types';
import { category } from './categories';
import { profile } from './profiles';

export { CATEGORIES, category } from './categories';
export { PROFILES, profile } from './profiles';

const byCategory: Record<CategoryId, DesignInput[]> = {
  classic, vintage, modern, animated, heritage, digital, minimal, luxury, playful,
  editorial, brutalist, glass, retro, organic, artdeco, handdrawn, geometric, conventional, interactive,
  bento, clay, soft, aurora, y2k, pixel, skeuo, workbench,
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

/** The business as one design shows it. Every design of the same business
 *  leads with a different one of its hero photos, in turn, so two cards for
 *  the same bookshop don't open on the same picture. */
export function profileFor(d: Design): Profile {
  const p = profile(d.profile);
  const hero = p.sections.find((s): s is HeroData => s.kind === 'hero');
  if (!hero?.imgs?.length) return p;
  const siblings = DESIGNS.filter(x => x.profile === d.profile && category(x.cat).kind !== 'app');
  const pool = [hero.img, ...hero.imgs];
  const turn = Math.max(0, siblings.findIndex(x => x.slug === d.slug)) % pool.length;
  if (!turn) return p;
  const photos = [...pool.slice(turn), ...pool.slice(0, turn)];
  return { ...p, sections: p.sections.map(s => (s === hero ? { ...hero, img: photos[0], imgs: photos.slice(1) } : s)) };
}
