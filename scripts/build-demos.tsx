// Renders every design to static HTML in public/demos and copies the fonts
// they use into public/fonts. Runs before `next dev` and `next build`.
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { DESIGNS } from '../src/catalog';
import { font } from '../src/catalog/fonts';
import { langs } from '../src/catalog/types';
import { demoFonts, designCss, renderDemo } from '../src/demo/render';

const root = process.cwd();
const pub = join(root, 'public');
const origin = process.env.QALIB_ORIGIN ?? 'https://qalib.omardeek.tech';
const only = process.argv[2];

const started = Date.now();
const designs = only ? DESIGNS.filter(d => d.slug === only) : DESIGNS;
if (!only) rmSync(join(pub, 'demos'), { recursive: true, force: true });

const usedFonts = new Set<string>();
const missingImages = new Set<number>();
for (const d of designs) {
  const dir = join(pub, 'demos', d.slug);
  mkdirSync(dir, { recursive: true });
  for (const lang of langs) {
    const html = renderDemo(d, lang, origin);
    for (const m of html.matchAll(/\.\.\/\.\.\/img\/(\d+)\.webp/g)) {
      if (!existsSync(join(pub, 'img', `${m[1]}.webp`))) missingImages.add(Number(m[1]));
    }
    writeFileSync(join(dir, `${lang}.html`), html);
    demoFonts(d, lang).forEach(f => usedFonts.add(f));
  }
  writeFileSync(join(dir, 'style.css'), designCss(d));
}

// Fonts: only the Latin, Latin-extended and Arabic files of the listed weights.
const subsets = /-(latin|latin-ext|arabic)-\d+-normal$/;
for (const id of usedFonts) {
  const meta = font(id);
  const pkg = join(root, 'node_modules', '@fontsource', id);
  if (!existsSync(pkg)) throw new Error(`Font package @fontsource/${id} is not installed`);
  const outDir = join(pub, 'fonts', id);
  mkdirSync(outDir, { recursive: true });
  const faces: string[] = [];
  for (const w of meta.weights) {
    const cssFile = join(pkg, `${w}.css`);
    if (!existsSync(cssFile)) throw new Error(`@fontsource/${id} has no weight ${w}`);
    const css = readFileSync(cssFile, 'utf8');
    for (const m of css.matchAll(/\/\* ([\w-]+) \*\/\s*@font-face\s*\{([^}]*)\}/g)) {
      const [, name, body] = m;
      if (!subsets.test(name)) continue;
      const file = `${name}.woff2`;
      copyFileSync(join(pkg, 'files', file), join(outDir, file));
      const range = body.match(/unicode-range:\s*([^;]+);/)?.[1];
      faces.push(`/* ${name} */\n@font-face { font-family: '${meta.family}'; font-style: normal; font-display: swap; font-weight: ${w}; src: url('${id}/${file}') format('woff2');${range ? ` unicode-range: ${range};` : ''} }`);
    }
  }
  if (!faces.length) throw new Error(`No usable files for font ${id}`);
  writeFileSync(join(pub, 'fonts', `${id}.css`), faces.join('\n') + '\n');
}

if (missingImages.size) {
  console.warn(`Missing photos (run \`npm run images\`): ${[...missingImages].sort((a, b) => a - b).join(', ')}`);
  if (process.env.CI || process.env.VERCEL) process.exit(1);
}
console.log(`Built ${designs.length} designs × ${langs.length} languages and ${usedFonts.size} fonts in ${Date.now() - started} ms`);
