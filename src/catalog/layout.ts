import { category } from './categories';
import type { Design, ItemsData, ItemsVariant, Layout } from './types';

// Which variant each part of a design's page uses. Pure, so both the demo
// generator and the prompt builder (in the browser) agree.

export function resolveLayout(design: Design): Layout {
  return { ...category(design.cat).defaults, ...design.layout };
}

const needsImages: ItemsVariant[] = ['zigzag', 'gallery', 'masonry', 'strip', 'rail'];

/** The variant an items section actually gets: photo layouts fall back when there are no photos. */
export function itemsVariant(layout: Layout, data: ItemsData): ItemsVariant {
  const v = layout[data.role];
  if (needsImages.includes(v) && !data.items.every(i => i.img !== undefined)) return data.role === 'schedule' ? 'timeline' : 'cards';
  if (data.role === 'gallery' && !needsImages.includes(v) && v !== 'bento') return 'gallery';
  return v;
}
