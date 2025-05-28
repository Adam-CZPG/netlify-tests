import { CommonPage } from '../pages/CommonPage';
import { test, expect } from '@playwright/test';

test.describe('404 Link Verification', () => {
  test('should check all links on pages do not lead to 404', async ({ page }) => {
    const commonPage = new CommonPage(page);
    await commonPage.goto('https://www.netlify.com/');
    await commonPage.verifyNo404Links();
  });
});
