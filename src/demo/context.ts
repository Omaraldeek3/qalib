import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Category, Design, Item, L, Lang, Layout, Profile, Social } from '@/catalog/types';

/** Everything a section needs to render itself. */
export type Ctx = {
  design: Design;
  cat: Category;
  profile: Profile;
  lang: Lang;
  layout: Layout;
  decor: Set<string>;
};

export const tx = (ctx: Ctx, text: L | string | undefined): string =>
  text === undefined ? '' : typeof text === 'string' ? text : text[ctx.lang];

/** Demos live at /demos/<slug>/<lang>.html, so assets are two levels up. */
export const img = (id: number) => `../../img/${id}.webp`;

export const price = (ctx: Ctx, item: Item) => tx(ctx, item.price);

export const pad = (n: number) => String(n).padStart(2, '0');

const iconCache = new Map<string, string>();
/** The inner markup of a lucide icon, ready to inline. */
export function iconSvg(name: string): string {
  let svg = iconCache.get(name);
  if (svg === undefined) {
    const file = join(process.cwd(), 'node_modules', 'lucide-static', 'icons', `${name}.svg`);
    svg = readFileSync(file, 'utf8')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\sclass="[^"]*"/, '')
      .replace(/\s+/g, ' ')
      .trim();
    iconCache.set(name, svg);
  }
  return svg;
}

// Brand marks are drawn here as simple shapes; lucide no longer ships them.
export const socialSvg: Record<Social, string> = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4A21 21 0 0 0 14.4 4C12 4 10.5 5.4 10.5 8v2.5H8v3h2.5V21z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4l16 16M20 4L4 20"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="9" width="3.4" height="11"/><circle cx="5.7" cy="5.5" r="1.9"/><path d="M10 9h3.2v1.6c.5-.9 1.7-1.9 3.6-1.9 3.4 0 4.2 2.1 4.2 5V20h-3.4v-5.4c0-1.4-.3-2.6-1.8-2.6-1.6 0-2.2 1.1-2.2 2.6V20H10z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/></svg>',
  behance: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h5.2c2.2 0 3.5 1 3.5 2.8 0 1.1-.6 1.9-1.5 2.3 1.3.3 2 1.3 2 2.6 0 2.1-1.6 3.3-3.9 3.3H3zm2.4 4.4h2.5c.9 0 1.4-.4 1.4-1.2S8.8 8 7.9 8H5.4zm0 4.6h2.7c1 0 1.6-.5 1.6-1.3s-.6-1.3-1.6-1.3H5.4zM17.6 9.2c2.6 0 4 1.8 3.9 4.6h-5.9c.1 1.3.9 2 2.1 2 .8 0 1.4-.3 1.7-.9h2c-.5 1.7-1.9 2.6-3.8 2.6-2.5 0-4.1-1.6-4.1-4.1 0-2.5 1.6-4.2 4.1-4.2zm1.8 3.2c-.1-1-.8-1.6-1.8-1.6s-1.7.6-1.9 1.6zM15.3 6.6h4.6V8h-4.6z"/></svg>',
};

export const socialLabel: Record<Social, string> = {
  instagram: 'Instagram', facebook: 'Facebook', x: 'X', linkedin: 'LinkedIn', youtube: 'YouTube', behance: 'Behance',
};
