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
