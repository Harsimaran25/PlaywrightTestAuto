// this is where we are extending test class to make our own fixture for data
//const base = require ('@playwright/test')
import { test as base } from '@playwright/test';
import { Interface } from 'readline';
//Renames the imported test function to base. So now instead of calling test(), you use base().
//customTest includes your fixtures (like test data), while base is the original test from Playwright.

/*
 Analogy

It's like copying a recipe and adding your own toppings:

 test = the original pizza
 base = you copied it and renamed it

 customTest = you added your own toppings (fixtures) and baked your version

Original pizza (test) is still untouched!
*/


/**Visual Representation
@playwright/test
     │
     └── test (default)
              │
              └── import as base
                          │
                          └── base.extend({ fixtures... }) → customTest
                                        │
                                        └── used in test files */



const customTest = base.extend(
    {

    testData:{
 userName : "bhakha@bhakha.com",
 passWord :"Bhai@1234",
 productName:"iphone 13 pro" ,
 cardNo:"3566002020360505",
 cardName:"Bhakha",
 Cvv:"165",
 Country:"Cuba"

}
})
export default customTest;




//using interface declartion  for example

// interface User {
//   name: string;
//   id: number;
// }
 
// class UserAccount {
//   name: string;
//   id: number;
 
//   constructor(name: string, id: number) {
//     this.name = name;
//     this.id = id;
//   }
// }
//
// function deleteUser(user: User) {
    // ...
// }

// return type is use as below 
// function getAdminUser(): User {
  //...
  //}





//the typescript equivalent for above is below: customdata is 

// interface TestData :{

//      userName : string;
//  passWord :string;
//  productName: string;
//  cardNo: number;
//  cardName: string;
//  Cvv: number;
//  Country: string
// };

// const customTest = base.extend <{testData : TestData}>({
//       testData:{
//  userName : "bhakha@bhakha.com",
//  passWord :"Bhai@1234",
//  productName:"iphone 13 pro" ,
//  cardNo:"3566002020360505",
//  cardName:"Bhakha",
//  Cvv:"165",
//  Country:"Cuba"

// }
//})