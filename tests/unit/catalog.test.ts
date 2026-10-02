import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import { CATEGORIES, DESIGNS, PROFILES } from '../../src/catalog/index.ts';
import { FONTS } from '../../src/catalog/fonts.ts';
import {
  aboutVariants, contactVariants, ctaVariants, footerVariants, heroVariants, itemsVariants, navVariants, quotesVariants, statsVariants,
  type L,
} from '../../src/catalog/types.ts';
import { decorText } from '../../src/prompt/copy.ts';

const root = process.cwd();

function luminance(hex: string) {
  const c = hex.replace('#', '').match(/../g)!.map(x => parseInt(x, 16) / 255).map(v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
const contrast = (a: string, b: string) => {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

/** Every bilingual string anywhere inside a value. */
function* strings(v: unknown, path = ''): Generator<[string, L]> {
  if (Array.isArray(v)) { for (let i = 0; i < v.length; i++) yield* strings(v[i], `${path}[${i}]`); return; }
  if (v && typeof v === 'object') {
    const o = v as Record<string, unknown>;
    if (typeof o.ar === 'string' && typeof o.en === 'string' && Object.keys(o).length === 2) { yield [path, o as L]; return; }
    for (const [k, x] of Object.entries(o)) yield* strings(x, `${path}.${k}`);
  }
}

describe('catalogue', () => {
  it('has 18 styles with 6 designs each, numbered 1 to 108', () => {
    assert.equal(CATEGORIES.length, 18);
    for (const c of CATEGORIES) assert.equal(DESIGNS.filter(d => d.cat === c.id).length, 6, c.id);
    assert.deepEqual(DESIGNS.map(d => d.no), Array.from({ length: 108 }, (_, i) => i + 1));
  });

  it('uses unique kebab-case slugs', () => {
    const slugs = DESIGNS.map(d => d.slug);
    assert.equal(new Set(slugs).size, slugs.length);
    for (const s of slugs) assert.match(s, /^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('only uses installed fonts and weights', () => {
    for (const d of DESIGNS) {
      for (const id of Object.values(d.fonts)) {
        if (!id) continue;
        assert.ok(FONTS[id], `${d.slug}: unknown font ${id}`);
        for (const w of FONTS[id].weights) assert.ok(existsSync(join(root, 'node_modules', '@fontsource', id, `${w}.css`)), `${id} ${w}`);
      }
      assert.ok(FONTS[d.fonts.displayAr].arabic && FONTS[d.fonts.bodyAr].arabic, `${d.slug}: Arabic fonts must cover Arabic`);
    }
  });

  it('only uses known layout variants and decorations', () => {
    const ok: Record<string, readonly string[]> = {
      nav: navVariants, hero: heroVariants, about: aboutVariants, quotes: quotesVariants, contact: contactVariants,
      cta: ctaVariants, footer: footerVariants, stats: statsVariants,
      offer: itemsVariants, gallery: itemsVariants, pricing: itemsVariants, process: itemsVariants, schedule: itemsVariants, extra: itemsVariants,
    };
    for (const d of [...DESIGNS, ...CATEGORIES.map(c => ({ slug: c.id, layout: c.defaults, decor: [] as string[] }))]) {
      for (const [k, v] of Object.entries(d.layout ?? {})) assert.ok(ok[k]?.includes(v as string), `${d.slug}: ${k}=${v}`);
      for (const x of d.decor ?? []) assert.ok(decorText[x], `${d.slug}: decoration "${x}" has no prompt text`);
    }
  });

  it('has readable palettes', () => {
    for (const d of DESIGNS) {
      const p = d.palette;
      // Windows 98 sets all its text inside grey windows, not on the desktop colour.
      const page = d.decor?.includes('win98') ? p.surface : p.bg;
      assert.ok(contrast(p.ink, page) >= 4.5, `${d.slug}: ink on bg ${contrast(p.ink, page).toFixed(2)}`);
      assert.ok(contrast(p.muted, page) >= 3.5, `${d.slug}: muted on bg ${contrast(p.muted, page).toFixed(2)}`);
      assert.ok(contrast(p.onAccent, p.accent) >= 3, `${d.slug}: text on accent ${contrast(p.onAccent, p.accent).toFixed(2)}`);
    }
  });

  it('has every text in Arabic and English', () => {
    for (const [path, l] of strings({ PROFILES, CATEGORIES, DESIGNS })) {
      assert.ok(l.ar.trim() && l.en.trim(), `empty text at ${path}`);
    }
  });

  it('gives every demo a hero and a contact section, with photos and icons that exist', () => {
    for (const p of Object.values(PROFILES)) {
      assert.equal(p.sections[0].kind, 'hero', p.id);
      assert.ok(p.sections.some(s => s.kind === 'contact'), p.id);
      assert.ok(p.sections.some(s => s.kind === 'items'), p.id);
      const json = JSON.stringify(p);
      for (const m of json.matchAll(/"img2?":(\d+)/g)) assert.ok(existsSync(join(root, 'public', 'img', `${m[1]}.webp`)), `${p.id}: photo ${m[1]}`);
      for (const m of json.matchAll(/"imgs":\[([\d,]+)\]/g)) for (const n of m[1].split(',')) assert.ok(existsSync(join(root, 'public', 'img', `${n}.webp`)), `${p.id}: photo ${n}`);
      for (const m of json.matchAll(/"icon":"([a-z0-9-]+)"/g)) assert.ok(existsSync(join(root, 'node_modules', 'lucide-static', 'icons', `${m[1]}.svg`)), `${p.id}: icon ${m[1]}`);
    }
  });
});
