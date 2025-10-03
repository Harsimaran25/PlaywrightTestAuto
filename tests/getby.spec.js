// this is to understand getby like web locators
import{test,expect} from '@playwright/test'


//normally tests in a test file run in sequence , but if we need to run the tests in a test file 
// we can use test.describe.configure as below

//test.describe.configure({mode:'parallel'});



test('@getby Getbylocators demo', async({page})=>{

await page.goto('https://rahulshettyacademy.com/angularpractice/');



const [page2]=await Promise.all([
    page.waitForEvent('popup'),
    await page.locator('.blinkingText').click()
])
console.log(await page2.title());

await expect(page2).toHaveTitle(/Software Testing/);

await page.locator(".ng-invalid[name='name']").fill('Bhakh');
await page.locator('[name="email"]').fill('bhakha@b.com');

//await page.getByRole('textbox',{name:'Password'}).fill('Magha123') OR>
await page.getByPlaceholder('Password').fill('Magha123');



await page.waitForTimeout(1000);


//await page.getByRole('checkbox',{name:/Check me/}).check(); OR
await page.getByLabel('Check me out if you Love IceCreams!').click();

//await page.getByRole('combobox',{name:'Gender'}).selectOption('Female');  //OR>
await page.getByLabel('Gender').selectOption('Female');
await page.getByLabel('Employed').click();
await page.locator('.form-control[name="bday"]').waitFor();
await page.locator('.form-control[name="bday"]').fill('1980-09-25');

await page.getByRole('button',{name:'Submit'}).click();

//check success message
const msg1=await page.getByText('Success! The Form has been submitted successfully!.').isVisible(); //this returns Boolean

 expect(msg1).toBeTruthy();


 // clicking on shop link
await page.getByRole('link',{name:'Shop'}).click();

await page.getByRole('heading',{name:'Shop Name'}).isVisible();

/*another method instead of using for loop to add item in cart using filter method and chaining 
locators, as we are already inside app-card there is one button so no need to give name*/
await page.locator('app-card').filter({hasText:'Nokia Edge'}).getByRole('button').click();

await page.locator('.nav-link.btn.btn-primary').click();

const ord=await page.getByRole('link',{name:'Nokia Edge'}).isVisible();

expect(ord).toBeTruthy();

});



//test 2 using getby locators 

test('@getby shettyacademy using getby', async({page})=>{

await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
const username='bhakha@bhakha.com';
const password="Bhai@1234";
const productname='ZARA COAT 3';
await page.getByPlaceholder('email@example.com').fill(username);
await page.getByPlaceholder('enter your passsword').fill(password);
await page.getByRole('button', { name: 'Login' }).click(); // as this has btn (button ) class  or of button tag getbyrole can be used

//await page.waitForLoadState('networkidle');
await page.locator('.card-body b').first().textContent();//just used to let this load 

//get product and add to cart using filter
await page.locator('.card-body').filter({hasText:productname}).getByRole('button',{name:'Add to Cart'}).click();

//click top right cart button

await page.getByRole('listitem').getByRole('button',{name:'Cart'}).click();

await page.locator('div.cartSection').first().waitFor(); // just to make sure all is loaded and synced

await expect(page.getByText(productname)).toBeVisible(); //assertion

await page.getByRole('button',{name:'Checkout'}).click();

await page.waitForLoadState('networkidle');
await page.getByPlaceholder('Select Country').pressSequentially('Ind');
await page.getByRole('Button',{name: /\s*India$/}).click();

await page.getByText('PLACE ORDER').click();

//await expect(page.getByRole('heading',{name:'Thankyou for the order.'})).toBeVisible();  OR

await expect(page.getByText('Thankyou for the order.')).toBeVisible();

const ordidraw=await page.locator('label.ng-star-inserted').textContent();
console.log(ordidraw);
const ordid= ordidraw.replace(/^\s*\|\s*|\s*\|\s*$/g, '').trim();
console.log(ordid);
await page.locator('label[routerlink*="myorders"]').click();

await expect(page.getByRole('heading',{name:'Your Orders'})).toBeVisible();
//const p= await page.getByRole('rowheader')

const ordrows=await page.locator('tr.ng-star-inserted').count();
console.log(ordrows);
for(let i=0;i<ordrows;i++)
    {
      let k= await page.locator('tr.ng-star-inserted').nth(i).locator('th').textContent();
      if(ordidraw.includes(k)){
       await page.locator('tr.ng-star-inserted').nth(i).locator('button').first().click();
   break;
      }

    }

    await expect(page.locator('.email-title')).toContainText(' order summary ');
const orderdetailpage= await page.locator('.col-text').textContent();
expect(ordidraw.includes(orderdetailpage)).toBeTruthy();

});

///CALENDAR TEST

test('@getby calendartest site', async({browser})=>{

const context= await browser.newContext();
const page= await context.newPage();
    const month='9';
    const day='23';
    const year='2027';
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/');

    await expect(page.locator('.brand.greenLogo')).toContainText('GREEN'); //assertion
    

    // click on top deals

    //await page.getByRole('link',{name:'Top Deals'}).click();
  
    const [page2]= await Promise.all([
        //Promise.all() takes an array (or any iterable) of promises and returns a single promise that:

// Resolves when all input promises resolve ,OR Rejects immediately if any input promise rejects
 /*you should start listening for the 'popup' event before triggering the click. That way, Playwright won’t miss
  the popup if it opens immediately.*/
         context.waitForEvent('page'), //popup wont work as target="_blank" in css so using context
        page.getByRole('link',{name:'Top Deals'}).click()
        
    ]);

// go to calendar
  await page2.locator('.react-date-picker__inputGroup').click(); //first operation to open calendar
  //now another click to open year
 await page2.locator('.react-calendar__navigation__label').click();  // 2 clicks so two steps at same place
 await page2.locator('.react-calendar__navigation__label').click();  

 // select 2027 
 //await page2.getByRole('button',{name:year}).click();
 await page2.getByText(year).click();
 //select month
 await page2.locator('button.react-calendar__tile').nth(Number(month)-1).click();
 //select day
//await page2.locator("//abbr[text()='"+day+"']").click();// this is xpath'
//OR
//await page2.locator('abbr', { hasText: day }).click();
//OR
await page2.locator(`abbr[aria-label*='${day}']`).click();// template literal we need to use back ticks `

const inputs = page2.locator('.react-date-picker__inputGroup__input');
const expectedlist=[month,day,year]
//console.log(expectedlist);
//valiating and assertion calendar values
for (let i = 0; i < expectedlist.length; i++) {
//   values.push(await inputs.nth(i).inputValue()); //returns an array
  const values=await inputs.nth(i).inputValue();
  //console.log(values);
  expect(values).toEqual(expectedlist[i]);
}



//Example template strings/Template Literals 
let name = "Alice";
let greeting = `Hello ${name}`;
console.log(greeting); 
//  let dateselected=await page2.locator('.react-date-picker__inputGroup').allInnerTexts();
//  console.log(dateselected);





});



test.only('@getby naveenautomationtest', async({page})=>{

await page.goto('https://naveenautomationlabs.com/opencart');

await page.locator('[title="My Account"]').click();
await page.locator('.dropdown-menu-right').waitFor();
await page.getByRole('link',{name:'Login' , exact:true}).click();
const t= await page.locator('h2',{hasText:'Returning Customer'}).textContent();
console.log(t)
await expect(page.locator('h2',{hasText:'Returning Customer'})).toBeVisible();


await 

});