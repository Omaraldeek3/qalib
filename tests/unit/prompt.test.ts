import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { design } from '../../src/catalog/index.ts';
import { buildPrompt, emptyBrief, type Brief } from '../../src/prompt/build.ts';
import { promptData } from '../../src/prompt/data.ts';

const origin = 'https://qalib.omardeek.tech';
const andalus = promptData(design('andalus')!);
const brief: Brief = { ...emptyBrief, name: 'Dar Salma', type: 'cafe', description: 'A small cafe in Jenin', contact: '+970 59 111 2222', stack: 'next' };

describe('prompt builder', () => {
  it('describes the design exactly: colours, fonts, demo links', () => {
    const out = buildPrompt(andalus, brief, 'en', { origin });
    for (const hex of Object.values(design('andalus')!.palette)) assert.ok(out.includes(hex), hex);
    for (const family of ['Amiri', 'Noto Naskh Arabic', 'Cormorant Garamond', 'EB Garamond']) assert.ok(out.includes(family), family);
    assert.ok(out.includes(`${origin}/demos/andalus/ar.html`));
    assert.ok(out.includes(`${origin}/demos/andalus/en.html`));
    assert.match(out, /design No\. 001/);
  });

  it('carries the brief: name, description, contact, stack and suggested sections', () => {
    const out = buildPrompt(andalus, brief, 'en', { origin });
    assert.ok(out.includes('Dar Salma'));
    assert.ok(out.includes('A small cafe in Jenin'));
    assert.ok(out.includes('+970 59 111 2222'));
    assert.ok(out.includes('Next.js (App Router)'));
    assert.match(out, /Suggested sections for a Cafe site/);
  });

  it('leaves clear blanks when the brief is empty', () => {
    const out = buildPrompt(andalus, emptyBrief, 'en', { origin });
    assert.ok(out.includes('- Name: [fill in]'));
    assert.ok(!out.includes('Suggested sections'));
  });

  it('writes Arabic when asked, with RTL rules', () => {
    const ar = buildPrompt(andalus, brief, 'ar', { origin });
    assert.match(ar, /[؀-ۿ]/);
    assert.ok(ar.includes('dir="rtl"'));
    assert.notEqual(ar, buildPrompt(andalus, brief, 'en', { origin }));
  });

  it('appends the reference CSS only when given', () => {
    assert.ok(!buildPrompt(andalus, brief, 'en', { origin }).includes('Appendix'));
    const out = buildPrompt(andalus, brief, 'en', { origin, css: ':root { --bg: #fff; }' });
    assert.ok(out.includes('Appendix'));
    assert.ok(out.includes(':root { --bg: #fff; }'));
  });

  it('works for every design in both languages', async () => {
    const { DESIGNS } = await import('../../src/catalog/index.ts');
    for (const d of DESIGNS) {
      for (const lang of ['ar', 'en'] as const) {
        const out = buildPrompt(promptData(d), brief, lang, { origin });
        assert.ok(!out.includes('undefined'), `${d.slug} ${lang}`);
        assert.ok(out.length > 3000, `${d.slug} ${lang} is too short`);
      }
    }
  });
});
