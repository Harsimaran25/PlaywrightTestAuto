/**Hooks are used for setup and teardown the environment before and after each scenario */

const { Before,After} = require('@cucumber/cucumber');
const { Page } = require("playwright");
const { chromium, expect } = require("@playwright/test");

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