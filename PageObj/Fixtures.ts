import{expect, test as base} from '@playwright/test';

import { binaryvilleLogin } from '../PageObj/login-page.pom';

//create fixture

export const PomFixture = base.extend<{loginPage: binaryvilleLogin}>({

loginPage : async({page},use)=>{
const loginPage= new binaryvilleLogin(page);
await use(loginPage);

}

})

export{expect};