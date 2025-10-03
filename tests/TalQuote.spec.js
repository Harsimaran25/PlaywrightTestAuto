//just a test to generate a quote on tal website

import{test,expect} from '@playwright/test'

const occu='Doctor - Medical Intern'

test('Tal quote', async({page})=>{




//await page.locator('a', { hasText: /^GET A QUOTE$/ }).click();



await expect(page.locator('h5.tal-gel-wojcer')).toContainText('quick quote');



//await page.locator('a', { hasText: /^GET A QUOTE$/ }).click();
//await page.locator('label[data-cy="gel-cr-label"]').filter({ hasText: /^Male$/ }).click();




 

//const listresults = await page.locator("[role='listbox']").allTextContents();

//console.log(listresults);
//await page.locator("[role='listbox']",{hasText:'Resident'}).click();


await expect (page.locator("[name='occupation']")).toHaveValue(occu)
// const listcount=await page.locator("[role='listbox']").count();
// console.log(listcount);
// //alternatively can use for loop to go through and pick the occupation

// for(let i=0;i<listcount;i++)
// {
// const occupation=await page.locator("[role='listbox']").nth(i).textContent();
// if(occupation.includes(occu))
// {
// await page.locator("[role='listbox']").nth(i).click()
// break;
// }

// }
// let g=await page.locator("[name='occupation']").inputValue()
// console.log()
// await expect (page.locator("[name='occupation']")).toHaveValue(occu)

await page.getByRole('button',{name:'CONTINUE'}).click();

await page.getByRole('textbox',{name:'First Name', exact:true}).fill('Havelli');

await page.getByRole('textbox',{name:'Last Name', exact:true}).fill('Havellii');

await page.getByRole('textbox',{name:'Phone', exact:true}).fill('0400000000');

await page.getByTestId('emailAddress').fill('vv@vv.com');

await page.getByRole('textbox',{name:'Postcode', exact: true}).fill('3000')




 await  page.getByRole('button',{name:'CALCULATE MY QUOTE',exact:true}).click();
 
  //handling modal popup 

await page.locator('.tal-gel-3vbj6j').isVisible();
await page.screenshot({path:'Afterscreenshot.png',fullPage: true});
//await page.getByRole('button',{name:'CANCEL', exact:true}).click();
await page.locator("[data-testid='cancel-btn']").click();

 });