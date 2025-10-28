// require("dotenv").config();
// const { chromium } = require("playwright");
// const { expect } = require("expect");
// const cp = require("child_process");
// const playwrightClientVersion = cp
//   .execSync("npx playwright --version")
//   .toString()
//   .trim()
//   .split(" ")[1];

// (async () => {
//   console.log("Starting Playwright test...");
//   console.log("Playwright version:", playwrightClientVersion);

//   const capabilities =[ {
//     browserName: "Chrome",
//     // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
//     browserVersion: "latest",
//     "LT:Options": {
//       platform: "Windows 10",
//       build: "Playwright Single Build",
//       name: "Playwright Sample Test",
//       user: process.env.LT_USERNAME,
//       accessKey: process.env.LT_ACCESS_KEY,
//       network: true,
//       video: true,
//       console: true,
//       tunnel: false, // Add tunnel configuration if testing locally hosted webpage
//       tunnelName: "", // Optional
//       geoLocation: "", // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
//       playwrightClientVersion: playwrightClientVersion,
//     },
//   },
//   {
//     browserName: "MicrosoftEdge",
//     // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
//     browserVersion: "latest",
//     "LT:Options": {
//       platform: "Windows 10",
//       build: "Playwright Single Build",
//       name: "Playwright Sample Test",
//       user: process.env.LT_USERNAME,
//       accessKey: process.env.LT_ACCESS_KEY,
//       network: true,
//       video: true,
//       console: true,
//       tunnel: false, // Add tunnel configuration if testing locally hosted webpage
//       tunnelName: "", // Optional
//       geoLocation: "", // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
//       playwrightClientVersion: playwrightClientVersion,
//     },
//   },
// ];

//   async function runtest(capability)  {

//   const browserInstance = await chromium.connect({
//     wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capability))}`
//   })

//   console.log(`Connected successfully for ${testName}!`);
//   console.log(`Creating new page for ${testName}...`);

//   //const page = await browser.newPage();

// test("Test scenario 1", async ({ page }) => {

//   await page.goto("https://www.lambdatest.com/selenium-playground");

//   const simpleFormLink = page.getByRole("link", {
//     name: "Simple Form Demo",
//     exact: true,
//   });
//   await expect(simpleFormLink).toBeVisible();

//   await simpleFormLink.click();

//   expect(page.url()).toContain("simple-form-demo");

//   const msg = "Welcome to LambdaTest";

//   await page
//     .getByRole("textbox", { name: "Please enter your Message" })
//     .fill(msg);

//   await page.getByRole("button", { name: "Get Checked Value" }).click();

//   const messageoutput = page.locator("p#message");
//   await expect(messageoutput).toBeVisible();
//   // const messageText = await messageoutput.textContent();

//   await expect(messageoutput).toHaveText(msg);

//   await browser.close();
// });

// test("Test Scenario 2", async ({page}) => {

//   await page.goto("https://www.lambdatest.com/selenium-playground");

//   const dragDrop = page.getByRole("link", {
//     name: "Drag & Drop Sliders",
//     exact: true,
//   });

//   await dragDrop.click();
//   await expect(
//     page.getByRole("heading", { name: "Slider Demo" })
//   ).toBeVisible();

//   const slider3 = page.locator("#slider3 input.sp__range");
//   // 4. Drag the slider to value 95
//   const minValue = Number(await slider3.getAttribute("min"));
//   const maxValue = Number(await slider3.getAttribute("max"));
//   const desiredValue = 95;

//   // Get slider bounding box
//   const box = await slider3.boundingBox();

//   if (!box) throw new Error("Slider bounding box not found");

//   const slider3Width = box.width;
//   const valueRange = maxValue - minValue;

//   // Get initial slider value
//   let currentValue = Number(await slider3.inputValue());

//   // Function to calculate X position for a given value
//   const getXForValue = (value) => {
//     const padding = 10; // adjust if necessary
//     return (
//       box.x +
//       padding +
//       ((value - minValue) / valueRange) * (slider3Width - 2 * padding)
//     );
//   };

//   // Move slider in steps from current to desired value
//   const stepSize = 5; // value increment per step
//   await page.mouse.move(getXForValue(currentValue), box.y + box.height / 2);
//   await page.mouse.down();

//   while (currentValue < desiredValue) {
//     currentValue = Math.min(currentValue + stepSize, desiredValue);
//     await page.mouse.move(getXForValue(currentValue), box.y + box.height / 2, {
//       steps: 5,
//     });
//     await page.waitForTimeout(100); // small delay to mimic real dragging
//   }

//   await page.mouse.up();

//   // Validate final slider value
//   await expect(page.locator("#rangeSuccess")).toHaveText("95");

// });

// test("Test Scenario 3", async ({page}) => {

//   await page.goto("https://www.lambdatest.com/selenium-playground");

//   await page
//     .getByRole("link", { name: "Input Form Submit", exact: true })
//     .click();

//   await page.getByText("Submit").click();

//   const nameLocator = page.locator('input[name="name"]');
//   //form validation message - browser’s default form validation tooltip
//   const errorMsg = await nameLocator.evaluate((el) => el.matches(":invalid"));
//   console.log("isInvalid:", errorMsg);

//   // Get the browser-generated validation message
//   const validationMessage = await nameLocator.evaluate(
//     (el) => el.validationMessage
//   );
//   console.log("validationMessage:", validationMessage);
//   await expect(validationMessage).toContain("fill");
//   await page
//     .getByRole("textbox", { name: "Name", exact: true })
//     .fill("TestName");

//   await page
//     .getByRole("textbox", { name: "Email*", exact: true })
//     .fill("TestName@name.com");

//   await page
//     .getByRole("textbox", { name: "Password*", exact: true })
//     .fill("Password");

//   await page
//     .getByRole("textbox", { name: "Company", exact: true })
//     .fill("1tester");

//   await page
//     .getByRole("textbox", { name: "City", exact: true })
//     .fill("TestCity");
//   await page
//     .getByRole("textbox", { name: "Website", exact: true })
//     .fill("www.test.com");
//   await page
//     .getByRole("textbox", { name: "Address 1", exact: true })
//     .fill("TestCity");
//   await page
//     .getByRole("textbox", { name: "Address 2", exact: true })
//     .fill("TestCity");
//   await page
//     .getByRole("textbox", { name: "Zip Code*", exact: true })
//     .fill("123456");

//   await page.locator("#inputState").fill("Teststate");
//   await page.locator('select[name="country"]').click({ delay: 500 });
//   await page
//     .locator('select[name="country"]')
//     .selectOption({ label: "United States" });

//   //await page.locator("text=Please fill in the fields").hover();
//   await page.getByText("Submit").click();
//   await page.locator("p.hidden").waitFor({ state: "visible" });

//   await expect(page.locator("p.hidden")).toContainText(
//     "Thanks for contacting us, we will get back to you shortly."
//   );
// });

//   }

// async function teardown(page, browser) {
//   console.log("Cleaning up resources...");
//   await page.close();
//   await browser.close();
//   console.log("Test completed and resources cleaned up!");
// };
// }
