// this is login page  POM for https://binaryville.com/account/

import { Locator, Page } from "@playwright/test";

export class binaryvilleLogin{

    public readonly emailLocator: Locator;
    public readonly passWordLocator: Locator;
    public readonly signInBtn :Locator;

    constructor(page: Page){

      this.emailLocator= page.getByRole("textbox", { name: "Email" });
      this.passWordLocator= page.getByRole("textbox", { name: "Password" });
      this.signInBtn = page.getByRole("button", { name: "Sign in"});
    }


}


