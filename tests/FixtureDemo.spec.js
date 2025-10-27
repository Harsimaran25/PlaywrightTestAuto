import { expect, test, chromium } from "@playwright/test";

//test without built in fixture
test("Without build in Fixture sign in", async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("https://binaryville.com/account");

  const signInBtn = page.getByRole("button", { name: "Sign in", exact: true });

  await expect(signInBtn).toBeVisible();

  await browser.close();
});

//with page fixture
test("With page Fixture sign in", async ({ page }) => {
  await page.goto("https://binaryville.com/account");

  const signInBtn = page.getByRole("button", { name: "Sign in", exact: true });

  await expect(signInBtn).toBeVisible();
});
