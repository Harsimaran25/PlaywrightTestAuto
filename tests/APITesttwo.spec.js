// test case fot API rahulsheety practice site


import{test,expect,request} from '@playwright/test'


let apiContext;

const loginPayload={
    userEmail: "bhakha@bhakha.com", userPassword: "Bhai@1234"
}; 

test.only('apisetup', async()=>{

  apiContext= await request.newContext();

  const response= await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',{
    
    data:loginPayload,
    headers:{
'Content-Type':'application/json'

    }

})

  expect(response.status()).toBe(200);
     const responsebody= await response.json();
     console.log(responsebody);

})