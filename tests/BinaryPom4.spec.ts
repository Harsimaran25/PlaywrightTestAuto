// using POM which has method to login and lets use our fixture here as well to access the method


import { PomFixture,expect } from "../PageObj/Fixtures";


/**Business logic, like decision based on user roles belongs in your test cases. Keep your 
 * POM focused purely on the mechanics of interacting with the page. Next, avoid adding complex
 *  logic to your POM. The POM should stay simple and handle direct actions. Complex logic like 
 * loops and conditions belongs in task cases where the context is clearer.  */



PomFixture('Login to BInaryville using POM and Fixture 3', async({page,loginPage})=>{


await page.goto("https://binaryville.com/account");
    

await loginPage.login2Binary('test@example.com','pass123')


expect(page.url()).toContain('pass123');


})