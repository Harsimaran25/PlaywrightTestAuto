// using POM which has method to login and lets use our fixture here as well to access the method


import{expect, test as base} from '@playwright/test';
import { binaryvilleLogin } from '../PageObj/login-page.pom';
//create fixture

const PomFixture = base.extend<{loginPage: binaryvilleLogin}>({

loginPage : async({page},use)=>{
const loginPage= new binaryvilleLogin(page);
await use(loginPage);

}

})




PomFixture('Login to BInaryville using POM and Fixture 2', async({page,loginPage})=>{


await page.goto("https://binaryville.com/account");
    

await loginPage.login2Binary('test@example.com','pass123')


expect(page.url()).toContain('pass123');


})