// this is step definition for error.feature
const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");
const { Page } = require("playwright");
const { chromium, expect } = require("@playwright/test");

Given(
  "user logs with {string} and password as {string} to site",
  async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise");
    console.log(await this.page.title()); // title method to get title
    await expect(this.page).toHaveTitle(
      "LoginPage Practise | Rahul Shetty Academy"
    ); // this is assertion
    //locators mostly advised to use CSS with playwright lets see locator method
    // there are 2 methods to input old method is type and new is fill, use fill like below
    //await page.locator('#username').click();
    await this.page.locator("#username").fill(username); // value entered in text box
    //await page.waitForTimeout(1000);
    // use [attribute=value] css this time for password box as below
    await this.page.locator("[type='password']").fill(password);
    await this.page.locator("#terms").click();
    await this.page.locator("#signInBtn").click();
    //await page.locator("[style*='block']");//this is to locate that blinking error message now if we want to extract the text of error
    // we can use below * used is regular expression , textcontent will extract text from msg
  }
);

Then("Error message is displayed", async function () {
  // Write code here that turns the phrase above into concrete actions
  console.log(await this.page.locator("[style*='block']").textContent());
  // now lets validate text with expected results using assertion
  await expect(this.page.locator("[style*='block']")).toContainText(
    "Incorrect"
  );
  // we have just passed only substring from the whole msg
  // NOTE : The method toContainText() is meant for locators
});
