// now we will create a class in which we will keep our API things
import{expect} from '@playwright/test'  
class APIutils {

    //we will first create a contructor where we will pass the context when we create object 

        constructor(apiContext,loginPayload){
                this.apiContext=apiContext         //this refers to current class so will be accessible for this whole class
                this.loginPayload=loginPayload
        }
    // lets create a async method for login API
    async getLoginTokenApi(){

    // this is for login api 
    const loginResponse=await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
   
        {data:this.loginPayload,
            headers: {
            'Content-Type': 'application/json'
                    }
        });
expect(loginResponse.ok()).toBeTruthy();
     const responseBody = await loginResponse.json();// .json() is a method that reads the response body and parses it as JSON 
  
   const authtoken = responseBody.token;
   console.log('Logged in successfully. Token is :', authtoken);
 return authtoken;
            }
    

//Method for create order API
async createOrderApi(orderpayload){// use word async in front as we are using await

    let response={}; // creating empty object without any property
    response.token=await this.getLoginTokenApi()
    const orderResponse=await this.apiContext.post(
        'https://rahulshettyacademy.com/api/ecom/order/create-order',
    {
        data:   orderpayload,
        headers:    
        {
            'Content-Type': 'application/json',
           'Authorization' :response.token
        }
    
    }
    )
    
   
    //expect(orderResponse.ok()).toBeTruthy();
    const orderresponseJson= await orderResponse.json();
    console.log(orderresponseJson);
    const orderID= orderresponseJson.orders[0];
    console.log(orderresponseJson.message);
    console.log('order id is  :', orderID);
    response.orderID=orderID;
   
    return response;


}

}
module.exports={APIutils};