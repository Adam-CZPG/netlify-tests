import { test, expect } from '@playwright/test';
import { SitemapPage } from '../pages/SitemapPage';

test.describe('Sitemap and Crawlability Verification', () => {
  test('should verify sitemap.xml exists and URLs are accessible', async ({ page }) => {
    const sitemapPage = new SitemapPage(page);
    await sitemapPage.verifySitemapExists();
    await sitemapPage.verifyUrlsAccessible();
    await sitemapPage.verifyNoNoindexMetaTags();
  });
});
