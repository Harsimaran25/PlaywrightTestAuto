// using POM which has method to login and lets use our fixture here as well to access the method


import { PomFixture,expect } from "../PageObj/Fixtures";






PomFixture('Login to BInaryville using POM and Fixture 3', async({page,loginPage})=>{


await page.goto("https://binaryville.com/account");
    

await loginPage.login2Binary('test@example.com','pass123')


expect(page.url()).toContain('pass123');


})