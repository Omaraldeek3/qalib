import { category } from '@/catalog/categories';
import { font } from '@/catalog/fonts';
import { itemsVariant, resolveLayout } from '@/catalog/layout';
import { PROFILES, profile } from '@/catalog/profiles';
import type { Category, Design, L, Motion, Palette, Profile, ProfileId, Section } from '@/catalog/types';
import { kindLabel } from './copy';

// Everything the prompt builder needs about one design, gathered on the
// server so the browser only receives this small object.

export type FontRef = { family: string; weights: number[] };

export type OutlineItem = { kind: string; label: L; variant?: string; title?: L };

export type PromptData = {
  no: number;
  slug: string;
  name: L;
  blurb: L;
  style: { name: L; description: L; dna: Category['dna'] };
  scheme: 'light' | 'dark';
  palette: Palette;
  radius: number;
  fonts: { displayAr: FontRef; bodyAr: FontRef; display: FontRef; body: FontRef; accent?: FontRef };
  motion: Motion;
  decor: string[];
  demoType: L;
  demoProfile: ProfileId;
  outline: OutlineItem[];
  suggestions: Record<string, { label: L; sections: L[] }>;
};

const ref = (id: string): FontRef => ({ family: font(id).family, weights: font(id).weights });

function sectionLabel(s: Section): L {
  switch (s.kind) {
    case 'about': case 'items': case 'testimonials': case 'faq': case 'contact': return s.eyebrow;
    case 'logos': return s.title;
    default: return kindLabel[s.kind];
  }
}

export function outline(p: Profile, design?: Design): OutlineItem[] {
  const layout = design ? resolveLayout(design) : undefined;
  const items: OutlineItem[] = [{ kind: 'nav', label: kindLabel.nav, variant: layout?.nav }];
  for (const s of p.sections) {
    switch (s.kind) {
      case 'hero': items.push({ kind: 'hero', label: kindLabel.hero, variant: layout?.hero }); break;
      case 'about': items.push({ kind: 'about', label: kindLabel.about, variant: layout?.about, title: s.eyebrow }); break;
      case 'items': items.push({ kind: 'items', label: kindLabel[s.role], variant: layout ? itemsVariant(layout, s) : undefined, title: s.eyebrow }); break;
      case 'stats': items.push({ kind: 'stats', label: kindLabel.stats, variant: layout?.stats }); break;
      case 'testimonials': items.push({ kind: 'testimonials', label: kindLabel.testimonials, variant: layout?.quotes, title: s.eyebrow }); break;
      case 'contact': items.push({ kind: 'contact', label: kindLabel.contact, variant: layout?.contact, title: s.eyebrow }); break;
      case 'cta': items.push({ kind: 'cta', label: kindLabel.cta, variant: layout?.cta, title: s.title }); break;
      default: items.push({ kind: s.kind, label: kindLabel[s.kind], title: s.kind === 'faq' ? s.eyebrow : undefined });
    }
  }
  items.push({ kind: 'footer', label: kindLabel.footer, variant: layout?.footer });
  return items;
}

export function promptData(design: Design): PromptData {
  const cat = category(design.cat);
  const p = profile(design.profile);
  const f = design.fonts;
  const suggestions: PromptData['suggestions'] = {};
  for (const [id, prof] of Object.entries(PROFILES)) {
    suggestions[id] = { label: prof.label, sections: prof.sections.map(sectionLabel) };
  }
  return {
    no: design.no,
    slug: design.slug,
    name: design.name,
    blurb: design.blurb,
    style: { name: cat.name, description: cat.description, dna: cat.dna },
    scheme: design.scheme,
    palette: design.palette,
    radius: design.radius ?? cat.radius,
    fonts: {
      displayAr: ref(f.displayAr), bodyAr: ref(f.bodyAr), display: ref(f.display), body: ref(f.body),
      ...(f.accent ? { accent: ref(f.accent) } : {}),
    },
    motion: design.motion ?? cat.motion,
    decor: design.decor ?? [],
    demoType: p.label,
    demoProfile: p.id,
    outline: outline(p, design),
    suggestions,
  };
}
