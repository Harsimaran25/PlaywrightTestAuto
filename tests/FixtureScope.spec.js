//linked in design patterns lesson to   fixture scope and isolation
/* the difference between two fixer scopes in Playwright, task scope and worker scope. 
These scopes control how and when fixtures are created, which impacts how state is managed across your test*/

import { expect, test as base } from "@playwright/test";

let counter = 0;
const customFixtureScope = base.extend({
  counterFixture: [
    async ({}, use) => {
      counter++;
      await use(counter);
    },
    // { scope: "worker" }, // we could change it to scope test which is by default
    { scope: "test" },
  ],
});

//test here

customFixtureScope("test 1 with worker scope", async ({ counterFixture }) => {
  console.log(`Test 1 counter ${counter}`);
});

customFixtureScope("test 2 with worker scope", async ({ counterFixture }) => {
  console.log(`Test 1 counter ${counter}`);
});

customFixtureScope("test 3 with worker scope", async ({ counterFixture }) => {
  console.log(`Test 1 counter ${counter}`);
});
//run using npx playwright test FixtureScope.spec.js --workers=1

/**Playwright provides a variety of built-in fixtures that are optimized for common testing tasks.
 *  Here's a quick rundown. Page and browser fixtures. Page is for interacting with webpages,
 * while browser handles the browser instance. Context and request fixtures. Context manages isolated sessions,
 * and requests is great for API testing without a browser. Advance fixtures, trace captures detailed test traces,
 *  and artifacts handle screenshots, videos, and more. */

/**What is a page object model?
 Think of your web application as a large library. Each webpage is like a different book in this library. 
Instead of searching for specific information yourself, imagine having a librarian who knows exactly where everything is. 
In this analogy, the librarian represents the page object model. The page object model, or POM, acts like a librarian for
 your web application. Each webpage is presented by a specific class in your code. Just like a librarian knows where each 
 book is located, the POM knows all the elements on a page, and how to interact with them. For example, the login page
  might be book one, the dashboard might be book two, and so on. This organization helps streamline your tests. Just 
  like a librarian makes finding books quicker and easier, the POM makes writing and maintaining tests more efficient and 
  consistent. With POM, you don't need to know every detail about a webpage. The POM takes care of it for you, simplifying
   the process. Here's a real world example of using POM, logging into a website. Without POM, you'll need to manually 
   find the login fields and enter your credentials in every test. With POM, it's like telling the librarian to log you in. 
   The POM knows exactly what to do and handles it for you, saving time and effort. */
