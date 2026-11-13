import { renderToStaticMarkup } from 'react-dom/server';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { profile } from '@/catalog/profiles';
import type { Design, Lang } from '@/catalog/types';
import type { BespokeKey } from './specs';
import {
  renderBentoStudio, renderCadBlueprint, renderExposedSpec, renderMonolithSplit, renderTerminalWorkbench,
} from './renderers-grid';
import {
  renderIndexStage, renderKuficArch, renderPaperAtelier, renderSolarHorizon, renderSwissBroadsheet,
} from './renderers-editorial';
import {
  renderAuroraPrism, renderKineticMarquee, renderNoirCinema, renderSpatialChapters, renderTactileBinder,
} from './renderers-interactive';

const read = (...p: string[]) => readFileSync(join(process.cwd(), 'src', 'demo', 'bespoke', ...p), 'utf8');

const commonCss = read('css', 'common.css');
const runtimeJs = read('runtime.js');
const cssCache = new Map<string, string>();

export function bespokeThemeCss(key: string): string {
  let css = cssCache.get(key);
  if (css === undefined) {
    css = read('css', `${key}.css`);
    cssCache.set(key, css);
  }
  return [commonCss, css].join('\n');
}

const RENDERERS: Record<BespokeKey, (p: { design: Design; lang: Lang }) => React.ReactElement> = {
  'monolith-split': renderMonolithSplit,
  'bento-studio': renderBentoStudio,
  'terminal-workbench': renderTerminalWorkbench,
  'cad-blueprint': renderCadBlueprint,
  'exposed-spec': renderExposedSpec,
  'swiss-broadsheet': renderSwissBroadsheet,
  'index-stage': renderIndexStage,
  'paper-atelier': renderPaperAtelier,
  'kufic-arch': renderKuficArch,
  'solar-horizon': renderSolarHorizon,
  'spatial-chapters': renderSpatialChapters,
  'noir-cinema': renderNoirCinema,
  'kinetic-marquee': renderKineticMarquee,
  'aurora-prism': renderAuroraPrism,
  'tactile-binder': renderTactileBinder,
};

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function renderBespokeDemo(
  design: Design,
  lang: Lang,
  origin: string,
  fullCss: string,
  fontIds: string[],
): string {
  const key = design.bespoke as BespokeKey;
  const renderer = RENDERERS[key];
  if (!renderer) throw new Error(`Unknown bespoke renderer "${design.bespoke}" on design "${design.slug}"`);
  const p = profile(design.profile);
  const brand = p.brand[lang];
  const title = lang === 'ar'
    ? `${brand} · تصميم «${design.name.ar}» من قالب`
    : `${brand} · "${design.name.en}" bespoke architecture from Qalib`;
  const fontLinks = fontIds.map((id) => `<link rel="stylesheet" href="../../fonts/${id}.css">`).join('\n');
  const mark = [...p.mark[lang]][0] ?? '';
  const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="${design.palette.accent}"/><text x="16" y="16" dy=".35em" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" font-weight="700" fill="${design.palette.onAccent}">${escapeHtml(mark)}</text></svg>`;
  const markup = renderToStaticMarkup(renderer({ design, lang }));

  return `<!doctype html>
<!-- Qalib bespoke design No. ${String(design.no).padStart(3, '0')} "${design.name.en}" (${design.bespoke} / ${design.cat}). Live page: ${origin}/${lang}/d/${design.slug}
     Bespoke architectural portfolio reference: every CSS rule is self-contained inside <style> below. -->
<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}" data-style="${design.cat}" data-design="${design.slug}" data-bespoke="${design.bespoke}" data-scheme="${design.scheme}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="robots" content="noindex">
<meta name="theme-color" content="${design.palette.bg}">
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(icon)}">
${fontLinks}
<style>
${fullCss}
</style>
</head>
<body>
<a class="skip" href="#ws">${lang === 'ar' ? 'تجاوز إلى المحتوى' : 'Skip to content'}</a>
${markup}
<div class="bsp-toast" role="status" aria-live="polite"></div>
<script>
${runtimeJs}
</script>
</body>
</html>
`;
}
