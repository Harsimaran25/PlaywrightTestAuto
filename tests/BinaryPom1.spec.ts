//this test will is for login-page.pom.ts 
import{test,expect} from '@playwright/test'
import { binaryvilleLogin } from '../PageObj/login-page.pom'

//this is very first test using POM only not fixture at this moment
test('Login to BInaryville using POM', async({page})=>{


await page.goto("https://binaryville.com/account");
    const loginpage= new binaryvilleLogin(page);

await loginpage.emailLocator.fill('test@example.com');

await loginpage.passWordLocator.fill('pass123');
await loginpage.signInBtn.click();

expect(page.url()).toContain('pass123');


})