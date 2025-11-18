import { Page } from "@playwright/test";
export class BasePage {
    page: Page; //thuộc tính
    
    constructor(page: Page){
        this.page = page; //gán lại
    }
    
    async navigateTo(url:string){
        await this.page.goto(url);
    }
}