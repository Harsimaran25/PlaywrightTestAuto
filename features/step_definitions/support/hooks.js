/**Hooks are used for setup and teardown the environment before and after each scenario */

const { Before,After,AfterStep,Status} = require('@cucumber/cucumber');
const { Page } = require("playwright");
const { chromium } = require("@playwright/test");

/**By storing browser and page on this, you make them accessible in step definitions */
let page, browser
Before( async function () {

 console.log('Launching browser before scenario...');

 // Create and store browser/page in the Cucumber World (`this`)
this.browser = await chromium.launch({ headless: false });

const context = await this.browser.newContext();

this.page = await context.newPage();

//return page;

});


After( async function () {
  
    console.log('exiting')   //Checks if this.browser exists:Prevents errors in case the browser wasn't launched for some reason
   if (this.browser) {
    await this.browser.close();
  } 
});
/**What is result?
The result object contains the status and outcome of the step that just ran. 
This is provided by Cucumber.js (not Playwright) and is passed to the AfterStep hook automatically. 
key properties of result: status , duration and exception*/

AfterStep( async function ({result} , scenario) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
   const screenshot = await this.page.screenshot({ path: `CucumberScreenshots/${Date.now()}-failed.png`, fullPage: true });
  }
});