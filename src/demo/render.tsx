import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { category } from '@/catalog/categories';
import { font, stack } from '@/catalog/fonts';
import { resolveLayout } from '@/catalog/layout';
import { profile } from '@/catalog/profiles';
import type { Design, L, Lang, Section } from '@/catalog/types';
import { About, Items, Logos, Marquee, Stats } from './blocks';
import { Contact, Cta, Faq, Footer, Quotes, Topbar, WhatsApp } from './bottom';
import { tx, type Ctx } from './context';
import { Divider, Fx, dividerTypes } from './decor';
import { Hero, Nav } from './top';

const read = (...p: string[]) => readFileSync(join(process.cwd(), 'src', 'demo', ...p), 'utf8');
const baseCss = read('css', 'base.css');
const runtimeJs = read('runtime.js');
const kitCache = new Map<string, string>();
const kitCss = (id: string) => {
  if (!kitCache.has(id)) kitCache.set(id, read('css', 'kits', `${id}.css`));
  return kitCache.get(id)!;
};

export function makeCtx(design: Design, lang: Lang): Ctx {
  const cat = category(design.cat);
  return {
    design, cat, profile: profile(design.profile), lang,
    layout: resolveLayout(design),
    decor: new Set(design.decor ?? []),
  };
}

/** The fonts a demo page loads for one language. */
export function demoFonts(design: Design, lang: Lang): string[] {
  const f = design.fonts;
  const ids = lang === 'ar' ? [f.displayAr, f.bodyAr] : [f.display, f.body];
  if (f.accent) ids.push(f.accent);
  return [...new Set(ids)];
}

/** The design's tokens as CSS variables. */
export function tokensCss(design: Design): string {
  const p = design.palette;
  const f = design.fonts;
  const radius = design.radius ?? category(design.cat).radius;
  const accentEn = f.accent ? stack(f.accent, f.body) : 'var(--font-body)';
  const accentAr = f.accent ? stack(f.accent, f.bodyAr) : 'var(--font-body)';
  return `:root {
  --bg: ${p.bg}; --surface: ${p.surface}; --ink: ${p.ink}; --muted: ${p.muted};
  --accent: ${p.accent}; --accent2: ${p.accent2}; --line: ${p.line}; --on-accent: ${p.onAccent};
  --radius: ${radius}px;
  --font-display: ${stack(f.display)}; --font-body: ${stack(f.body)}; --font-accent: ${accentEn};
  --fw-font: ${font(f.display).display};
  color-scheme: ${design.scheme};
}
html[lang="ar"] {
  --font-display: ${stack(f.displayAr)}; --font-body: ${stack(f.bodyAr)}; --font-accent: ${accentAr};
  --fw-font: ${font(f.displayAr).display};
}`;
}

/** Everything the design looks like: base layout, the style's kit, tokens and design tweaks. */
export function designCss(design: Design): string {
  return [baseCss, `/* ---------- style: ${design.cat} ---------- */`, kitCss(design.cat), `/* ---------- design: ${design.slug} ---------- */`, tokensCss(design), design.css ?? ''].join('\n');
}

const navKinds = new Set(['about', 'items', 'testimonials', 'faq', 'contact']);

export function renderDemo(design: Design, lang: Lang, origin: string): string {
  const ctx = makeCtx(design, lang);
  const p = ctx.profile;
  const sections = p.sections;
  const hero = sections.find((s): s is Extract<Section, { kind: 'hero' }> => s.kind === 'hero');
  const contact = sections.find((s): s is Extract<Section, { kind: 'contact' }> => s.kind === 'contact');
  if (!hero || !contact) throw new Error(`${p.id} needs a hero and a contact section`);

  const links: { id: string; label: L }[] = [];
  for (const s of sections) {
    if (navKinds.has(s.kind) && 'nav' in s && s.nav && 'id' in s && s.kind !== 'contact') links.push({ id: s.id, label: s.nav });
  }
  const navLinks = [...links.slice(0, 4), { id: contact.id, label: contact.nav }];
  const firstOffer = sections.find(s => s.kind === 'items' && s.role === 'offer');
  const secondHref = `#${firstOffer && 'id' in firstOffer ? firstOffer.id : links[0]?.id ?? contact.id}`;
  const ctaHref = `#${contact.id}`;

  const divider = dividerTypes.find(t => ctx.decor.has(`divider-${t}`));
  const parts: string[] = [];
  let num = 0;
  let prevIsSec = false;
  for (const s of sections) {
    const isSec = s.kind === 'about' || s.kind === 'items' || s.kind === 'testimonials' || s.kind === 'faq' || s.kind === 'contact';
    // Ornaments go between two plain sections, never against a band or the hero.
    if (divider && prevIsSec && (s.kind === 'about' || s.kind === 'testimonials' || s.kind === 'contact' || s.kind === 'faq')) parts.push(renderToStaticMarkup(<Divider type={divider} />));
    prevIsSec = isSec;
    if (isSec) num++;
    const alt = num % 2 === 0;
    let el;
    switch (s.kind) {
      case 'hero': el = <Hero ctx={ctx} hero={s} ctaHref={ctaHref} secondHref={secondHref} />; break;
      case 'marquee': el = <Marquee ctx={ctx} data={s} />; break;
      case 'about': el = <About ctx={ctx} data={s} num={num} alt={alt} />; break;
      case 'items': el = <Items ctx={ctx} data={s} num={num} alt={alt} />; break;
      case 'stats': el = <Stats ctx={ctx} data={s} />; break;
      case 'logos': el = <Logos ctx={ctx} data={s} />; break;
      case 'testimonials': el = <Quotes ctx={ctx} data={s} num={num} alt={alt} />; break;
      case 'faq': el = <Faq ctx={ctx} data={s} num={num} alt={alt} />; break;
      case 'cta': el = <Cta ctx={ctx} data={s} href={ctaHref} />; break;
      case 'contact': el = <Contact ctx={ctx} data={s} num={num} alt={alt} />; break;
    }
    parts.push(renderToStaticMarkup(el));
  }

  const brand = tx(ctx, p.brand);
  const title = lang === 'ar' ? `${brand} · تصميم «${design.name.ar}» من قالب` : `${brand} · "${design.name.en}" design from Qalib`;
  const fontLinks = demoFonts(design, lang).map(id => `<link rel="stylesheet" href="../../fonts/${id}.css">`).join('\n');
  const decor = [...ctx.decor].join(' ');
  const skip = lang === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content';

  return `<!doctype html>
<!-- Qalib design No. ${String(design.no).padStart(3, '0')} "${design.name.en}" (${design.cat}). Live page: ${origin}/${lang}/d/${design.slug}
     Reference implementation: every rule is in the <style> below. The business and its content are fictional. -->
<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}" data-style="${design.cat}" data-design="${design.slug}" data-motion="${design.motion ?? ctx.cat.motion}" data-scheme="${design.scheme}"${decor ? ` data-decor="${decor}"` : ''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(tx(ctx, hero.lead))}">
<meta name="robots" content="noindex">
<meta name="theme-color" content="${design.palette.bg}">
${fontLinks}
<script>document.documentElement.classList.add('js')</script>
<style>
${designCss(design)}
</style>
</head>
<body>
<a class="skip" href="#main">${skip}</a>
${renderToStaticMarkup(<Fx ctx={ctx} />)}
${ctx.decor.has('topbar') ? renderToStaticMarkup(<Topbar ctx={ctx} contact={contact} />) : ''}
${renderToStaticMarkup(<Nav ctx={ctx} links={navLinks} ctaHref={ctaHref} />)}
<main id="main">
${parts.join('\n')}
</main>
${renderToStaticMarkup(<Footer ctx={ctx} links={navLinks} contact={contact} />)}
${ctx.decor.has('whatsapp') ? renderToStaticMarkup(<WhatsApp ctx={ctx} />) : ''}
<script>
${runtimeJs}
</script>
</body>
</html>
`;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
