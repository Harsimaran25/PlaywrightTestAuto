//this is POM with cucumber

import { Locator,Page } from "playwright";

class login2{

    readonly page: Page;
    readonly emailLocator:Locator;
    readonly passwordLocator:Locator;
    readonly signInBtn: Locator;

    constructor(page:Page){

        this.page=page;
        this.emailLocator=page.getByRole("textbox", { name: "Email" });
            
    this.passwordLocator= page.getByRole("textbox", { name: "Password" });
            
            this.signInBtn = page.getByRole("button", { name: "Sign in", exact: true });
       
    }
}