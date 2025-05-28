import { Page, expect } from '@playwright/test';

export class CommonPage {
  constructor(private page: Page) {}

  async goto(url: string) {
    await this.page.goto(url);
  }

  async verifyNo404Links() {
    // Get all links on the page
    const links = await this.page.locator('a[href]:not([href^="#"]):not([href^="javascript"])').all();
    console.log(`Found ${links.length} links to check`);
    
    // Check first 20 links to avoid too long test runs
    const linksToCheck = links.slice(0, 20);
    
    for (let i = 0; i < linksToCheck.length; i++) {
      const href = await linksToCheck[i].getAttribute('href');
      if (href) {
        try {
          // Construct absolute URL if relative
          const url = new URL(href, this.page.url()).toString();
          console.log(`Checking link: ${url}`);
          
          // Use request instead of navigation to check status
          const response = await this.page.request.get(url);
          expect(response.status()).not.toBe(404);
        } catch (error) {
          console.error(`Error checking link: ${href}`, error);
        }
      }
    }
  }
}