// // this is now same feature BinaryLogin but using new step file with browsersetup file  
// import { Given,When,Then } from "@cucumber/cucumber";
// import { expect } from "@playwright/test";
// import { page } from "../browserSetup";


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