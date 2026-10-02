import { defineConfig } from '@playwright/test';

// A dedicated port, so a run never adopts some other app already running.
const baseURL = process.env.QALIB_TEST_URL || 'http://127.0.0.1:3470';
export default defineConfig({
  testDir: './tests/e2e', fullyParallel: true, workers: 2,
  use: { baseURL, browserName: 'chromium', ...(process.env.CI ? {} : { channel: 'msedge' }), screenshot: 'only-on-failure' },
  ...(process.env.QALIB_TEST_URL ? {} : { webServer: { command: 'npm run start -- --port 3470', url: `${baseURL}/en`, reuseExistingServer: !process.env.CI, timeout: 180000 } }),
  reporter: [['list'], ['html', { open: 'never' }]],
});
