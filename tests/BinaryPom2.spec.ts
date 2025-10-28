// in this test lets further extend and optimise the BinaryPom1.spec.ts by introducting Fixture

import{expect, test as base} from '@playwright/test';
import { binaryvilleLogin } from '../PageObj/login-page.pom';
//create fixture

const PomFixture = base.extend<{loginPage: binaryvilleLogin}>({

loginPage : async({page},use)=>{
const loginPage= new binaryvilleLogin(page);
await use(loginPage);

}

})




PomFixture('Login to BInaryville using POM and Fixture', async({page,loginPage})=>{


await page.goto("https://binaryville.com/account");
    

await loginPage.emailLocator.fill('test@example.com');

await loginPage.passWordLocator.fill('pass123');
await loginPage.signInBtn.click();

expect(page.url()).toContain('pass123');


})