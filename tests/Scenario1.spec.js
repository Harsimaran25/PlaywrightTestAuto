//Assignment Task: Playwright 101

//Test Scenario 1:

import { test, expect, chromium } from "@playwright/test";

test.describe.configure({ mode: "parallel" });
test("Test scenario 1", async ({ browser }) => {
  const browserTest = await chromium.launch({ headless: false });
  const TestContext = await browserTest.newContext();

  const page = await TestContext.newPage();

  await page.goto("https://www.lambdatest.com/selenium-playground");

  const simpleFormLink = page.getByRole("link", {
    name: "Simple Form Demo",
    exact: true,
  });
  await expect(simpleFormLink).toBeVisible();

  await simpleFormLink.click();

  expect(page.url()).toContain("simple-form-demo");

  const msg = "Welcome to LambdaTest";

  await page
    .getByRole("textbox", { name: "Please enter your Message" })
    .fill(msg);

  await page.getByRole("button", { name: "Get Checked Value" }).click();

  const messageoutput = page.locator("p#message");
  await expect(messageoutput).toBeVisible();
  // const messageText = await messageoutput.textContent();

  await expect(messageoutput).toHaveText(msg);

  await browser.close();
});

test.only("Test Scenario 2", async ({}) => {
  const browserTest = await chromium.launch({ headless: false });
  const TestContext = await browserTest.newContext();

  const page = await TestContext.newPage();
  await page.goto("https://www.lambdatest.com/selenium-playground");

  const dragDrop = page.getByRole("link", {
    name: "Drag & Drop Sliders",
    exact: true,
  });

  await dragDrop.click();
  await expect(
    page.getByRole("heading", { name: "Slider Demo" })
  ).toBeVisible();

  const slider3 = page.locator("#slider3 input.sp__range");
  // 4. Drag the slider to value 95
  const minValue = Number(await slider3.getAttribute("min"));
  const maxValue = Number(await slider3.getAttribute("max"));
  const desiredValue = 95;

  // Get slider bounding box
  const box = await slider3.boundingBox();
  if (!box) throw new Error("Slider bounding box not found");

  const slider3Width = box.width;
  const valueRange = maxValue - minValue;

  // Get initial slider value
  let currentValue = Number(await slider3.inputValue());

  // Function to calculate X position for a given value
  const getXForValue = (value) => {
    const padding = 10; // adjust if necessary
    return (
      box.x +
      padding +
      ((value - minValue) / valueRange) * (slider3Width - 2 * padding)
    );
  };

  // Move slider in steps from current to desired value
  const stepSize = 5; // value increment per step
  await page.mouse.move(getXForValue(currentValue), box.y + box.height / 2);
  await page.mouse.down();

  while (currentValue < desiredValue) {
    currentValue = Math.min(currentValue + stepSize, desiredValue);
    await page.mouse.move(getXForValue(currentValue), box.y + box.height / 2, {
      steps: 5,
    });
    await page.waitForTimeout(100); // small delay to mimic real dragging
  }

  await page.mouse.up();

  // Validate final slider value
  await expect(page.locator("#rangeSuccess")).toHaveText("95");
  await browser.close();
});
