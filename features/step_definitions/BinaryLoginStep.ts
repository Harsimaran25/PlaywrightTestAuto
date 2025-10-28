// import { Given,When,Then,Before,After } from "@cucumber/cucumber";
// import { expect } from "@playwright/test";

// import { chromium, Browser, Page } from 'playwright';

// // to run a feature file use npx cucumber-js features/BinaryLogin.feature
// let page:Page;
// let browser:Browser;

// Before(async()=>{

//     browser= await chromium.launch({headless:false});
//     const browserContext=  await browser.newContext();
//     page= await browserContext.newPage();
//     console.log('Launching broswser');
// });

// After(async()=>{

//     await browser.close();
// })

//          Given('the user is on the login Page', async()=> {
//            // Write code here that turns the phrase above into concrete actions
//           await page.goto("https://binaryville.com/account");
//            console.log('in given binaryville');
//          });

//          When('user enters a valid email and password', async()=> {
         
//             const email = page.getByRole("textbox", { name: "Email" });
//             await email.fill('test@example.com');
//             const passWord = page.getByRole("textbox", { name: "Password" });
//             await passWord.fill('pass123')
//             const signInBtn = page.getByRole("button", { name: "Sign in", exact: true });
//             await signInBtn.click();
//             console.log('in when binaryville');
//          });

//           Then('the user should see their email and password in the url', async()=> {
      
//             expect(page.url()).toContain('pass123');
//                 console.log('in then binaryville');
//          });