// Screenshots of every demo for the library cards: a cover (the first screen)
// and a full-page strip, in both languages. Needs `npm run demos` first and
// Microsoft Edge (Playwright drives the installed browser). Interactive designs
// are shot in their first frame with motion on; full pages always use the still layout.
//   node scripts/thumbs.mjs            all designs
//   node scripts/thumbs.mjs andalus,oxford    some designs
import { mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';
import sharp from 'sharp';

const root = process.cwd();
const demos = join(root, 'public', 'demos');
const out = join(root, 'public', 'thumbs');
mkdirSync(out, { recursive: true });

const only = process.argv[2]?.split(',');
const slugs = readdirSync(demos).filter(s => !only || only.includes(s)).sort();
const jobs = slugs.flatMap(slug => ['ar', 'en'].map(lang => ({ slug, lang })));

const browser = await chromium.launch({ channel: process.env.CI ? undefined : 'msedge' });
const viewport = { viewport: { width: 1280, height: 960 }, deviceScaleFactor: 1 };
const still = await browser.newContext({ ...viewport, reducedMotion: 'reduce' });
const moving = await browser.newContext({ ...viewport, reducedMotion: 'no-preference' });

async function load(page, file) {
  await page.goto(pathToFileURL(file).href);
  await page.evaluate(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });
    await Promise.all([...document.images].map(i => (i.complete ? null : new Promise(r => { i.onload = i.onerror = r; }))));
    // Decoding is asynchronous; a picture that is loaded but not decoded is painted blank.
    await Promise.all([...document.images].map(i => i.decode().catch(() => {})));
    await document.fonts.ready;
  });
  await page.waitForTimeout(200);
}

async function shoot(pages, { slug, lang }) {
  const file = join(demos, slug, `${lang}.html`);
  const interactive = readFileSync(file, 'utf8').slice(0, 1500).includes('data-style="interactive"');
  let cover;
  if (interactive) {
    await load(pages.moving, file);
    await pages.moving.waitForTimeout(1600);
    cover = await pages.moving.screenshot();
  }
  const page = pages.still;
  await load(page, file);
  cover ??= await page.screenshot();
  await sharp(cover).resize(640, 480).webp({ quality: 74 }).toFile(join(out, `${slug}-${lang}.webp`));
  const full = await page.screenshot({ fullPage: true });
  const img = sharp(full).resize({ width: 480 });
  const { height } = await img.clone().toBuffer({ resolveWithObject: true }).then(r => r.info);
  await img.extract({ left: 0, top: 0, width: 480, height: Math.min(height, 3000) }).webp({ quality: 62 }).toFile(join(out, `${slug}-${lang}-full.webp`));
}

const started = Date.now();
let done = 0;
await Promise.all(Array.from({ length: 4 }, async () => {
  const pages = { still: await still.newPage(), moving: await moving.newPage() };
  for (let job = jobs.shift(); job; job = jobs.shift()) {
    await shoot(pages, job);
    if (++done % 20 === 0) console.log(`${done} screenshots`);
  }
  await pages.still.close();
  await pages.moving.close();
}));
await browser.close();
console.log(`Done: ${done} pages in ${Math.round((Date.now() - started) / 1000)} s`);
