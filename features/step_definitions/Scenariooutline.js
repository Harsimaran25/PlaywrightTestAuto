const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");
const { Page } = require("playwright");
const { chromium, expect } = require("@playwright/test");

Given(
  "user logs with {string} and  {string} to site",
  async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise");
    console.log(await this.page.title()); // title method to get title
    await expect(this.page).toHaveTitle(
      "LoginPage Practise | Rahul Shetty Academy"
    );
    await this.page.locator("#username").fill(username); // value entered in text box
    await this.page.locator("[type='password']").fill(password);
    await this.page.locator("#terms").click();
    await this.page.locator("#signInBtn").click();
  }
);

Then("Error message is displayed for invalid login", async function () {
  console.log(await this.page.locator("[style*='block']").textContent());

  await expect(this.page.locator("[style*='block']")).toContainText(
    "Incorrect"
  );
});
