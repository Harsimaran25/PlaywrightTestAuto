// this is step definition file which will have the code

/*Cucumber tests contain two different files: the feature file and the step definition file. The feature file contains
  the scenarios in Gherkin format that are 
 Given, When, and then format, and the Step Definition file contains the actual code or implementation of test cases.*/

const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const {}

Given('user logs to site with {userName} and {passWord}', async function (username, password) {
           // Write code here that turns the phrase above into concrete actions
// but the page or browser this stepdefinition  does not know 


    await page.getByPlaceholder('email@example.com').fill(username);
    await page.getByPlaceholder('enter your passsword').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();


          
         });


When('user adds product {product} to cart', function (product) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

 Then('verify product is added to the cart', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });


         Then('product is present in orderhistory page', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
           });