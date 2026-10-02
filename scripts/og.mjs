// The social preview image (public/og.png), drawn from real design covers.
// Run after `npm run demos` and `npm run thumbs`.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';

const pub = join(process.cwd(), 'public');
const url = p => pathToFileURL(join(pub, p)).href;
const fan = ['kinetic', 'doors', 'tatreez', 'strata', 'terminal'];
// The counts come from the built demos, so the image follows the catalogue.
const slugs = readdirSync(join(pub, 'demos'));
const styles = new Set(slugs.map(s => readFileSync(join(pub, 'demos', s, 'en.html'), 'utf8').match(/data-style="([a-z-]+)"/)[1])).size;
const arDigits = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="${url('fonts/reem-kufi.css')}"><link rel="stylesheet" href="${url('fonts/bricolage-grotesque.css')}"><link rel="stylesheet" href="${url('fonts/ibm-plex-mono.css')}">
<style>
  body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: #F3EFE6; color: #16130F; font-family: "Bricolage Grotesque", sans-serif; }
  .wrap { position: relative; height: 100%; display: grid; grid-template-columns: 560px 1fr; align-items: center; padding: 0 64px; }
  .mark { display: inline-block; padding: 0 22px 8px; border: 4px solid #16130F; border-radius: 22px; font: 700 96px/1.25 "Reem Kufi"; position: relative; }
  .mark::after { content: ""; position: absolute; top: -14px; right: -14px; width: 26px; height: 26px; border-radius: 50%; background: #D93B22; }
  .latin { font: 500 22px "IBM Plex Mono"; color: #57514A; margin: 18px 0 30px; letter-spacing: .08em; }
  h1 { margin: 0; font-size: 58px; line-height: 1.02; letter-spacing: -.03em; font-weight: 800; }
  h1 em { font-style: normal; color: #D93B22; }
  .ar { margin-top: 18px; font: 500 30px/1.5 "Reem Kufi"; direction: rtl; text-align: left; color: #57514A; }
  .fan { position: relative; height: 100%; }
  .card { position: absolute; left: 50%; bottom: 70px; width: 360px; aspect-ratio: 4 / 3; border-radius: 12px; overflow: hidden; border: 1px solid #C2B9A7; box-shadow: 0 24px 44px -26px rgba(22,19,15,.55); transform-origin: 50% 140%; }
  .card img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .card:nth-child(1), .card:nth-child(5) { z-index: 1 } .card:nth-child(2), .card:nth-child(4) { z-index: 2 } .card:nth-child(3) { z-index: 3 }
</style></head><body><div class="wrap">
  <div>
    <span class="mark">قالب</span>
    <p class="latin">QALIB · qalib.omardeek.tech</p>
    <h1>${slugs.length} website designs,<br><em>${styles} styles</em>, one prompt away.</h1>
    <p class="ar">${arDigits(slugs.length)} تصميمًا للمواقع بالعربية والإنجليزية</p>
  </div>
  <div class="fan">${fan.map((s, i) => `<div class="card" style="transform: translateX(-50%) rotate(${(i - 2) * 9}deg)"><img src="${url(`thumbs/${s}-en.webp`)}"></div>`).join('')}</div>
</div></body></html>`;

const browser = await chromium.launch({ channel: process.env.CI ? undefined : 'msedge' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const file = join(process.cwd(), 'og.tmp.html');
writeFileSync(file, html);
await page.goto(pathToFileURL(file).href);
await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode().catch(() => {}))); });
await page.screenshot({ path: join(pub, 'og.png') });
await browser.close();
const { rmSync } = await import('node:fs');
rmSync(file);
console.log('public/og.png');
