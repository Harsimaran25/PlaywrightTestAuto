// test to create a custom fixture

import { expect, test as base } from "@playwright/test";

const customTest = base.extend({
  testData: async ({}, use) => {
    const data = { email: "test@example.com", password: "pass123" };
    await use(data);
  },
  //create another fixture
  authenticatedUser: [
    async ({ page, testData }, use) => {
      await page.goto("https://binaryville.com/account/");
      const email = page.getByRole("textbox", { name: "Email" });
      await email.fill(testData.email);

      const passWord = page.getByRole("textbox", { name: "Password" });

      await passWord.fill(testData.password);

      const signInBtn = page.getByRole("button", {
        name: "Sign in",
        exact: true,
      });
      await signInBtn.click();
      await use(page);
    },
    { auto: true },
  ],
});

customTest("test with customFixture", async ({ page, testData }) => {
  const url = page.url();

  console.log(url);

  expect(url).toContain(testData.password);
});
