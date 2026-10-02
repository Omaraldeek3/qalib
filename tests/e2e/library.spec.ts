import { expect, test } from '@playwright/test';
import { DESIGNS } from '../../src/catalog/index.ts';
import { cardData } from '../../src/ui/cards.ts';

// Counts come from the catalogue, so adding designs does not break the tests.
const inStyle = (cat: string) => DESIGNS.filter(d => d.cat === cat).length;
const matching = (word: string) => DESIGNS.map(d => cardData(d, 'en')).filter(c => c.search.includes(word)).length;

test.describe('in an Arabic browser', () => {
  test.use({ locale: 'ar-PS' });
  test('an address without a language gets Arabic', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/ar$/);
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  });
});

test('an English browser gets English', async ({ page }) => {
  await page.goto('/d/andalus');
  await expect(page).toHaveURL(/\/en\/d\/andalus$/);
});

test('the home page lists every design and filters them', async ({ page }) => {
  await page.goto('/en');
  const cards = page.locator('.catalog .dcard');
  await expect(cards).toHaveCount(DESIGNS.length);
  await page.getByRole('group', { name: 'Style' }).getByRole('button', { name: 'Retro' }).click();
  await expect(cards).toHaveCount(inStyle('retro'));
  await expect(page).toHaveURL(/style=retro/);
  await page.getByRole('button', { name: 'Clear' }).click();
  await page.locator('.filters input[type="search"]').fill('restaurant');
  await expect(cards).toHaveCount(matching('restaurant'));
});

test('the hero search hands its words to the catalogue', async ({ page }) => {
  await page.goto('/en');
  await page.locator('.hsearch input').fill('wedding');
  await page.locator('.hsearch button').click();
  await expect(page.locator('.catalog .dcard')).toHaveCount(matching('wedding'));
});

test('a style page shows its six designs', async ({ page }) => {
  await page.goto('/ar/styles/heritage');
  await expect(page.locator('h1')).toHaveText('تراثي');
  await expect(page.locator('.catalog .dcard')).toHaveCount(inStyle('heritage'));
});

test('a design page frames the demo and builds a prompt from the brief', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/en/d/andalus');
  const frame = page.frameLocator('.preview iframe');
  await expect(frame.locator('h1')).toContainText('Home cooking');
  await page.getByRole('button', { name: 'عربي' }).first().click();
  await expect(frame.locator('html')).toHaveAttribute('dir', 'rtl');

  await page.getByLabel('Business or project name').fill('Dar Salma');
  await page.getByLabel('Type of site').selectOption('cafe');
  const out = page.locator('.out__text');
  await expect(out).toContainText('Name: Dar Salma');
  await expect(out).toContainText('#7A1F2B');
  await expect(out).toContainText('Suggested sections for a Cafe site');
  await page.getByRole('button', { name: 'Copy the prompt' }).last().click();
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  expect(clip).toContain('# Build a website in the "Andalus" style');

  // The brief is remembered for the next design.
  await page.goto('/en/d/kinetic');
  await expect(page.getByLabel('Business or project name')).toHaveValue('Dar Salma');
});

test('every demo page exists in both languages', async ({ request }) => {
  for (const slug of ['andalus', 'kinetic', 'tatreez', 'desktop-98', 'services']) {
    for (const lang of ['ar', 'en']) {
      const res = await request.get(`/demos/${slug}/${lang}.html`);
      expect(res.status()).toBe(200);
      expect(await res.text()).toContain(`lang="${lang}"`);
    }
  }
});
