// test case fot API rahulsheety practice site


import{test,expect} from '@playwright/test'
import { request } from 'http';

let apiContext;

const loginPayload={
    userEmail: "bhakha@bhakha.com", userPassword: "Bhai@1234"
}; 

test.beforeAll('apisetup', async()=>{

  apiContext= await request.newContext();

  const response= await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',{
    
    data:loginPayload,
    Headers:{
'Content-Type':'application/json'

    }

})

  expect(response.status()).toBe(200);


})