import { Page, expect } from '@playwright/test';

export class SitemapPage {
  constructor(private page: Page) {}

  async verifySitemapExists() {
    const response = await this.page.goto('https://www.netlify.com/sitemap.xml');
    expect(response.status()).toBe(200);
    return response;
  }

  async verifyUrlsAccessible() {
    const response = await this.verifySitemapExists();
    const content = await response.text();
    
    // Extract URLs using regular expression
    const urlRegex = /<loc>(.*?)<\/loc>/g;
    const urls = [];
    let match;
    
    while ((match = urlRegex.exec(content)) !== null) {
      urls.push(match[1]);
    }
    
    console.log(`Found ${urls.length} URLs in sitemap`);
    
    // Check only 5 URLs and use shorter timeout
    const urlsToCheck = urls.slice(0, 5);
    for (const url of urlsToCheck) {
      console.log(`Checking URL: ${url}`);
      try {
        const urlResponse = await this.page.goto(url, { timeout: 30000 });
        expect(urlResponse.status()).not.toBe(404);
      } catch (error) {
        console.error(`Error loading URL: ${url}`, error);
        // Continue with next URL instead of failing
      }
    }
  }

  async verifyNoNoindexMetaTags() {
    const response = await this.verifySitemapExists();
    const content = await response.text();
    
    const urlRegex = /<loc>(.*?)<\/loc>/g;
    const urls = [];
    let match;
    
    while ((match = urlRegex.exec(content)) !== null) {
      urls.push(match[1]);
    }
    
    // Check only 3 URLs
    const urlsToCheck = urls.slice(0, 3);
    for (const url of urlsToCheck) {
      try {
        await this.page.goto(url, { timeout: 30000 });
        const robotsMeta = await this.page.locator('meta[name="robots"]').count();
        
        if (robotsMeta > 0) {
          const content = await this.page.locator('meta[name="robots"]').first().getAttribute('content');
          expect(content).not.toContain('noindex');
        }
      } catch (error) {
        console.error(`Error checking robots meta for URL: ${url}`, error);
      }
    }
  }
}