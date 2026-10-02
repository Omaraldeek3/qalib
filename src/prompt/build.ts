import type { L, Lang } from '@/catalog/types';
import {
  aboutText, contactText, ctaText, decorText, footerText, heroText, itemsText, kindText, motionText, navText, pr,
  quotesText, roleText, stackText, statsText, type Stack,
} from './copy';
import type { FontRef, OutlineItem, PromptData } from './data';

/** What the person tells us about their own site. */
export type Brief = {
  name: string;
  /** A profile id ("restaurant"), "other", or "" when not chosen. */
  type: string;
  typeOther: string;
  description: string;
  languages: 'ar' | 'en' | 'both';
  pages: 'one' | 'multi';
  stack: Stack;
  contact: string;
  assets: boolean;
  notes: string;
};

export const emptyBrief: Brief = {
  name: '', type: '', typeOther: '', description: '', languages: 'both', pages: 'one', stack: 'auto', contact: '', assets: false, notes: '',
};

export type PromptOptions = { origin: string; css?: string };

const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));

function variantText(item: OutlineItem): L | undefined {
  const v = item.variant;
  switch (item.kind) {
    case 'nav': return v ? navText[v] : undefined;
    case 'hero': return v ? heroText[v] : undefined;
    case 'about': return v ? aboutText[v] : undefined;
    case 'items': return v ? itemsText[v] : undefined;
    case 'stats': return v ? statsText[v] : undefined;
    case 'testimonials': return v ? quotesText[v] : undefined;
    case 'contact': return v ? contactText[v] : undefined;
    case 'cta': return v ? ctaText[v] : undefined;
    case 'footer': return v ? footerText[v] : undefined;
    default: return kindText[item.kind];
  }
}

const weights = (f: FontRef) => `${f.family} (${f.weights.join(', ')})`;

/** A complete Markdown prompt for Claude Code. Pure: safe to run in the browser. */
export function buildPrompt(data: PromptData, brief: Brief, lang: Lang, opts: PromptOptions): string {
  const T = (l: L) => l[lang];
  const or = (s: string) => s.trim() || T(pr.fill);
  const no = String(data.no).padStart(3, '0');
  const out: string[] = [];
  const h = (s: string) => out.push('', `## ${s}`, '');

  out.push(`# ${fill(T(pr.title), { name: T(data.name) })}`, '', fill(T(pr.intro), { no }));

  // 1. The project.
  const typeName = brief.type === 'other' ? brief.typeOther.trim() : brief.type ? T(data.suggestions[brief.type]?.label ?? { ar: brief.type, en: brief.type }) : '';
  h(`1. ${T(pr.project)}`);
  out.push(
    `- ${T(pr.name)}: ${or(brief.name)}`,
    `- ${T(pr.type)}: ${or(typeName)}`,
    `- ${T(pr.about)}: ${or(brief.description)}`,
    `- ${T(pr.languages)}: ${T(brief.languages === 'ar' ? pr.langAr : brief.languages === 'en' ? pr.langEn : pr.langBoth)}`,
    `- ${T(pr.pages)}: ${T(brief.pages === 'one' ? pr.pagesOne : pr.pagesMulti)}`,
    `- ${T(pr.contact)}: ${or(brief.contact)}`,
    `- ${T(pr.assets)}: ${T(brief.assets ? pr.assetsYes : pr.assetsNo)}`,
  );
  if (brief.notes.trim()) out.push(`- ${T(pr.notes)}: ${brief.notes.trim()}`);

  // 2. Reference.
  h(`2. ${T(pr.reference)}`);
  out.push(
    `- ${T(pr.demoAr)}: ${opts.origin}/demos/${data.slug}/ar.html`,
    `- ${T(pr.demoEn)}: ${opts.origin}/demos/${data.slug}/en.html`,
    '',
    T(pr.referenceNote),
  );

  // 3. DNA.
  const dna = data.style.dna;
  h(`3. ${fill(T(pr.dna), { style: T(data.style.name) })}`);
  out.push(
    T(data.style.description),
    '',
    `- **${T(pr.dnaType)}:** ${T(dna.type)}`,
    `- **${T(pr.dnaColor)}:** ${T(dna.color)}`,
    `- **${T(pr.dnaLayout)}:** ${T(dna.layout)}`,
    `- **${T(pr.dnaShape)}:** ${T(dna.shape)}`,
    `- **${T(pr.dnaImagery)}:** ${T(dna.imagery)}`,
    `- **${T(pr.dnaMotion)}:** ${T(dna.motion)}`,
    `- **${T(pr.dnaDetails)}:** ${T(dna.details)}`,
    `- **${T(pr.dnaAvoid)}:** ${T(dna.avoid)}`,
    '',
    `**${T(pr.thisDesign)}:** ${T(data.blurb)}`,
  );

  // 4. Tokens.
  h(`4. ${T(pr.tokens)}`);
  const p = data.palette;
  const rows: [string, string, string][] = [
    ['--bg', p.bg, 'bg'], ['--surface', p.surface, 'surface'], ['--ink', p.ink, 'ink'], ['--muted', p.muted, 'muted'],
    ['--accent', p.accent, 'accent'], ['--accent2', p.accent2, 'accent2'], ['--line', p.line, 'line'], ['--on-accent', p.onAccent, 'onAccent'],
  ];
  out.push('```css', ':root {', ...rows.map(([k, v, r]) => `  ${k}: ${v}; /* ${T(roleText[r])} */`), `  --radius: ${data.radius}px;`, '}', '```', '');
  out.push(`- ${T(pr.scheme)}: ${T(data.scheme === 'dark' ? pr.dark : pr.light)}`);
  out.push(`- ${T(pr.fonts)}:`);
  out.push(`  - ${T(pr.fontDisplayAr)}: ${weights(data.fonts.displayAr)}`);
  out.push(`  - ${T(pr.fontBodyAr)}: ${weights(data.fonts.bodyAr)}`);
  out.push(`  - ${T(pr.fontDisplay)}: ${weights(data.fonts.display)}`);
  out.push(`  - ${T(pr.fontBody)}: ${weights(data.fonts.body)}`);
  if (data.fonts.accent) out.push(`  - ${T(pr.fontAccent)}: ${weights(data.fonts.accent)}`);
  out.push(`- ${T(pr.scale)}: ${T(pr.scaleValue)}`);

  // 5. Structure.
  h(`5. ${T(pr.structure)}`);
  out.push(fill(T(pr.structureIntro), { demo: T(data.demoType) }), '');
  data.outline.forEach((item, i) => {
    const desc = variantText(item);
    const title = item.title ? ` «${T(item.title)}»` : '';
    out.push(`${i + 1}. **${T(item.label)}**${title}${desc ? `: ${T(desc)}` : ''}`);
  });
  const wanted = brief.type && brief.type !== 'other' ? data.suggestions[brief.type] : undefined;
  if (wanted && brief.type !== data.demoProfile) {
    out.push('', fill(T(pr.suggested), { type: T(wanted.label) }), wanted.sections.map(s => T(s)).join(' · '));
  } else if (brief.type === 'other' && brief.typeOther.trim()) {
    out.push('', fill(T(pr.suggested), { type: brief.typeOther.trim() }), T(pr.fill));
  }

  // 6. Motion and decoration.
  h(`6. ${T(pr.motion)}`);
  out.push(T(motionText[data.motion]));
  const decor = data.decor.map(d => decorText[d]).filter(Boolean);
  if (decor.length) {
    out.push('', `**${T(pr.decor)}:**`, ...decor.map(d => `- ${T(d)}`));
  }

  // 7. Technical.
  h(`7. ${T(pr.tech)}`);
  out.push(`- **${T(pr.stack)}:** ${T(stackText[brief.stack])}`, ...pr.techList.map(l => `- ${T(l)}`));

  // 8. Delivery.
  h(`8. ${T(pr.deliver)}`);
  out.push(...pr.deliverList.map((l, i) => `${i + 1}. ${T(l)}`));

  if (opts.css) {
    h(T(pr.cssAppendix));
    out.push(T(pr.cssNote), '', '```css', opts.css.trim(), '```');
  }
  return out.join('\n') + '\n';
}
