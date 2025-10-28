// this is now same feature BinaryLogin but using POM
import { Given,When,Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../browserSetup";
import { login2 } from "../../cucumberPageObjects/login-Page.pom";

let loginpage:login2;

         Given('the user is on the login Page', async()=> {
           // Write code here that turns the phrase above into concrete actions
          loginpage=new login2(page);
          await loginpage.goto();
           console.log('in given binaryville');
         });

         When('user enters a valid email and password', async()=> {
         
            
            await loginpage.emailLocator.fill('test@example.com');
            
            await loginpage.passwordLocator.fill('pass123')
            
            await loginpage.signInBtn.click();
            console.log('in when binaryville');
         });

          Then('the user should see their email and password in the url', async()=> {
      
            expect(page.url()).toContain('pass123');
                console.log('in then binaryville');
         });