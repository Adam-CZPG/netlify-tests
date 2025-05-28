import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Lead Capture Form Validation', () => {
  test('should verify the newsletter form is present and properly functioning', async ({ page }) => {
    // Use a longer timeout for the entire test
    test.slow();
    
    const homePage = new HomePage(page);
    await homePage.goto();
    
    // Verify form exists and test basic behavior
    const formWorks = await homePage.verifyFormBehavior();
    
    // Simple assertion - if we got this far, form is working
    expect(formWorks).toBeTruthy();
  });
});