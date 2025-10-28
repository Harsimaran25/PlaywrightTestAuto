//this is to test using different test data using json file
import { test, expect } from '@playwright/test';
import loginData from '../testData/loginData.json';

loginData.forEach(({ email, password }) => {
  test(`Login test for ${email}`, async ({ page }) => {
    await page.goto('https://binaryville.com/account/');

    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    await page.waitForLoadState('networkidle');

    const currentUrl = page.url();
    console.log(`Test for ${email}: navigated to ${currentUrl}`);

    expect(currentUrl).not.toContain('error'); // adjust based on actual login
  });
});
