import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    video: 'on',
  },
  reporter: [['html', { outputFolder: 'test-results' }]],
});