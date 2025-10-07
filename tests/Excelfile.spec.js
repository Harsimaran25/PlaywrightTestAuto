//lecture 73 read excel using java script

// to read and write to excel we need to download a node package called exceljs

//Lecture72

//lets try to find a fruit  in sheet then update the price cell for it
import { test, expect } from "@playwright/test";
import ExcelJs from "exceljs";

const file = "ExcelTestFile.xlsx";

async function myXlsxReader2(worksheet, searchterm) {
  //to pass row and column dynamically instead of hardcoding lets create object
  let output = {
    row: null,
    column: null,
    price: null, //assigning default values
  };

  // Iterate over each row
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchterm) {
        //console.log('Row is ',rowNumber, 'and column is',colNumber, 'value is',cell.value);
        // lets put the row and column in our output object
        output.row = rowNumber;
        output.column = colNumber;
        output.price = colNumber + 2;
        //console.log(output.price)
      }
    });
  });
  return output;
}

async function myXlsxWrite(searchterm, price, file) {
  const myExcelWrkBk = new ExcelJs.Workbook();

  await myExcelWrkBk.xlsx.readFile(file);
  const myWorkSheet = myExcelWrkBk.getWorksheet("Sheet1");

  const output = await myXlsxReader2(myWorkSheet, searchterm);
  if (output.row !== null && output.price !== null) {
    const cellToUpadate = myWorkSheet.getCell(output.row, output.price); //now we are telling it to go to this particular cell
    cellToUpadate.value = price; // so now we have just assigned the value but HAVE NOT saved or written to xls

    //to write or save now
    await myExcelWrkBk.xlsx.writeFile(file);
  } else {
    console.log("not found check searchterm");
  }
}

///Test
test("excel up-download", async ({ page }) => {
  const item = "Banana";
  let price = "400";

  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html"
  );

  //await page.locator('#downloadButton').click();
  const promisedownloadfinish = page.waitForEvent("download"); // we need to set this listener add this to let download finish
  await page.getByRole("button", { name: "Download" }).click();
  await promisedownloadfinish;

  await myXlsxWrite(item, price, file);

  await page.locator("#fileinput").click();

  //now when u click choose file it opens window which is outside of playwright . to attach file we need to use
  // method called setInputfiles as below, this works only if there is type=file attribute for the element like:
  //<input type="file" id="fileinput" accept=".xlsx,.xlx" class="upload">

  await page.locator("#fileinput").setInputFiles(file);
  const rowp = await page
    .locator(".sc-jsEeTM.itluUR.rdt_TableRow", { hasText: item })
    .textContent();

  console.log(rowp);

  //asssertion

  //await expect (page.locator('.sc-jsEeTM.itluUR.rdt_TableRow', {hasText:item})).toContainText(price)

  //another way to assert is go row by row as below

  const textlocator = page.getByText(item);

  const desiredRow = page.getByRole("row").filter({ has: textlocator });
  await expect(desiredRow.locator("#cell-4-undefined")).toContainText(price);
});
