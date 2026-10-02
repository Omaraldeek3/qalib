// Screenshots of every demo for the library cards: a cover (the first screen)
// and a full-page strip, in both languages. Needs `npm run demos` first and
// Microsoft Edge (Playwright drives the installed browser).
//   node scripts/thumbs.mjs            all designs
//   node scripts/thumbs.mjs andalus    one design
import { mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';
import sharp from 'sharp';

const root = process.cwd();
const demos = join(root, 'public', 'demos');
const out = join(root, 'public', 'thumbs');
mkdirSync(out, { recursive: true });

const only = process.argv[2];
const slugs = readdirSync(demos).filter(s => !only || s === only).sort();
const jobs = slugs.flatMap(slug => ['ar', 'en'].map(lang => ({ slug, lang })));

const browser = await chromium.launch({ channel: process.env.CI ? undefined : 'msedge' });
const context = await browser.newContext({ viewport: { width: 1280, height: 960 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });

async function shoot(page, { slug, lang }) {
  await page.goto(pathToFileURL(join(demos, slug, `${lang}.html`)).href);
  await page.evaluate(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });
    await Promise.all([...document.images].map(i => (i.complete ? null : new Promise(r => { i.onload = i.onerror = r; }))));
    // Decoding is asynchronous; a picture that is loaded but not decoded is painted blank.
    await Promise.all([...document.images].map(i => i.decode().catch(() => {})));
    await document.fonts.ready;
  });
  await page.waitForTimeout(200);
  const cover = await page.screenshot();
  await sharp(cover).resize(640, 480).webp({ quality: 74 }).toFile(join(out, `${slug}-${lang}.webp`));
  const full = await page.screenshot({ fullPage: true });
  const img = sharp(full).resize({ width: 480 });
  const { height } = await img.clone().toBuffer({ resolveWithObject: true }).then(r => r.info);
  await img.extract({ left: 0, top: 0, width: 480, height: Math.min(height, 3000) }).webp({ quality: 62 }).toFile(join(out, `${slug}-${lang}-full.webp`));
}

const started = Date.now();
let done = 0;
await Promise.all(Array.from({ length: 4 }, async () => {
  const page = await context.newPage();
  for (let job = jobs.shift(); job; job = jobs.shift()) {
    await shoot(page, job);
    if (++done % 20 === 0) console.log(`${done} screenshots`);
  }
  await page.close();
}));
await browser.close();
console.log(`Done: ${done} pages in ${Math.round((Date.now() - started) / 1000)} s`);
