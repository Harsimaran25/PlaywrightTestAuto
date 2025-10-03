import{test,expect,request} from '@playwright/test'   /*You're importing 3 
important things from the Playwright testing library:*/
const {APIutils}=require('../Utils/APIutils')

const loginPayload={    userEmail: "bhakha@bhakha.com", userPassword: "Bhai@1234"}

const orderpayload={  orders: 
    [{country: "Cuba",productOrderedId: "68a961719320a140fe1ca57c"}]
}


let response;
test.beforeAll('API2 ordersetup',async()=>
    {

   // now here we will create context 
const apiContext= await request.newContext();

const apiutils=new APIutils(apiContext,loginPayload);   // creating object and passing args
response= await apiutils.createOrderApi(orderpayload);
    

});// test before all ends here



//Test case start
test.only('order search using api', async({page})=>{

   
// lets insert token in local storage 
await page.addInitScript(tokenvalue=>{
    window.localStorage.setItem('token',tokenvalue)
},response.token)


//navigate to already logged in page
await page.goto("https://rahulshettyacademy.com/client/");


await page.locator('[routerlink*="myorders"]').click();
await page.waitForLoadState('networkidle');
const ordertable= page.locator('tr.ng-star-inserted');
const ordcount=await ordertable.count();
console.log(ordcount);
await page.pause();
for(let i=0;i<ordcount;i++)
    {
const tablecontents=await page.locator('tr.ng-star-inserted').nth(i).locator('th').textContent();
if(response.orderID.includes(tablecontents))
{
    await ordertable.nth(i).getByRole('button',{name:'View'}).click();
    break;
}
}

const orderdetailpage= await page.locator('.col-text').textContent();
console.log(orderdetailpage);
expect(response.orderID.includes(orderdetailpage)).toBeTruthy();
});