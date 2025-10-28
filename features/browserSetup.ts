
//this is for cucumber instead of using hook file we cud also do this way

import { Before,After } from "@cucumber/cucumber";

import { chromium, Browser, Page } from 'playwright';

// to run a feature file use npx cucumber-js features/BinaryLogin.feature
let page:Page;
let browser:Browser;

Before(async()=>{

    browser= await chromium.launch({headless:false});
    const browserContext=  await browser.newContext();
    page= await browserContext.newPage();
    console.log('Launching browser...');
});

After(async()=>{

    await browser.close();
})

//so now page has all information to use it in another files we can export it

export {page}