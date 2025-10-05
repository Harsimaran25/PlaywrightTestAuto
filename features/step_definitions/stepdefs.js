// this is step definition file which will have the code

/*Cucumber tests contain two different files: the feature file and the step definition file. The feature file contains
  the scenarios in Gherkin format that are 
 Given, When, and then format, and the Step Definition file contains the actual code or implementation of test cases.*/

const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { Page } = require("playwright");
const { chromium, expect } = require("@playwright/test");

let ordidraw,ordid,productname; //global scope here 
Given('user logs to site with {string} and {string}',{ timeout: 60000 }, async function (username, password) {
           // Write code here that turns the phrase above into concrete actions
// but the page or browser this stepdefinition  does not know  so we 
// browser = await chromium.launch({ headless: false });

// const context = await browser.newContext();

// page = await context.newPage();
    // await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    // await page.waitForLoadState('networkidle');

      await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login', {
        waitUntil: 'networkidle'
    });
// Wait and fill credentials
    await this.page.waitForSelector('[placeholder="email@example.com"]');
    await this.page.getByPlaceholder('email@example.com').fill(username);
    await this.page.getByPlaceholder('enter your passsword').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
   
//just used to let this load 
console.log('in given');

          
         });


When('user adds product {string} to cart', async function (product) {
           // Write code here that turns the phrase above into concrete actions
        //get product and add to cart using filter
        await this.page.locator('.card-body b').first().textContent();
        console.log('in when')
        productname=product;
        await this.page.locator('.card-body').filter({hasText:product}).getByRole('button',{name:'Add to Cart'}).click();
         });

 Then('verify product is added to the cart', async function () {
           // Write code here that turns the phrase above into concrete actions
    console.log('in Then')
           await this.page.getByRole('listitem').getByRole('button',{name:'Cart'}).click();

        await this.page.locator('div.cartSection').first().waitFor(); // just to make sure all is loaded and synced

        await expect(this.page.getByText(productname)).toBeVisible(); 
        await this.page.getByRole('button',{name:'Checkout'}).click();

    await this.page.waitForLoadState('networkidle');
    await this.page.getByPlaceholder('Select Country').pressSequentially('Ind');
    await this.page.getByRole('Button',{name: /\s*India$/}).click();

    await this.page.getByText('PLACE ORDER').click();

    //await expect(page.getByRole('heading',{name:'Thankyou for the order.'})).toBeVisible();  OR

    await expect(this.page.getByText('Thankyou for the order.')).toBeVisible();
    ordidraw=await this.page.locator('label.ng-star-inserted').textContent();
    console.log(ordidraw);
     ordid= ordidraw.replace(/^\s*\|\s*|\s*\|\s*$/g, '').trim();
    console.log(ordid);
            
         });


         Then('product is present in orderhistory page', async function () {
           // Write code here that turns the phrase above into concrete actions

           console.log('in then 73 line no')
           await this.page.locator('label[routerlink*="myorders"]').click();

await expect(this.page.getByRole('heading',{name:'Your Orders'})).toBeVisible();
//const p= await page.getByRole('rowheader')

const ordrows=await this.page.locator('tr.ng-star-inserted').count();
console.log(ordrows);
for(let i=0;i<ordrows;i++)
    {
      let k= await this.page.locator('tr.ng-star-inserted').nth(i).locator('th').textContent();
      if(ordidraw.includes(k)){
       await this.page.locator('tr.ng-star-inserted').nth(i).locator('button').first().click();
   break;
      }

    }

    await expect(this.page.locator('.email-title')).toContainText(' order summary ');
const orderdetailpage= await this.page.locator('.col-text').textContent();
expect(ordidraw.includes(orderdetailpage)).toBeTruthy();
console.log('finished test')

//or use command in CLI npx cucumber-js --exit
           });