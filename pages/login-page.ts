import { Page } from "@playwright/test";
import { BasePage } from "./base-page";
// import { LoginPage } from '../../pages/login-page';

export class LoginPage extends BasePage {
    // Thuộc tính đặt tên các thẻ HTML đã có login
    merchantCode = this.page.locator('input[id="Retailer"]');
    usernameInput = this.page.locator('input[id="UserName"]');
    passwordInput = this.page.locator('input[id="Password"]');
    loginButton = this.page.locator('button[id="btn-login"]');
    closeButton = this.page.locator('(//span[@class="vodal-close"])[1]');
    dashboardButton = this.page.locator('//a[contains(@ng-href,"DashBoard")]');
    errorMessage = this.page.locator('.error-message');
    logo = this.page.locator('img[alt="Phần mềm quản lý bán hàng"]');
    supportLink = this.page.locator('text=Hỗ trợ: 1900 6522');
    languageSelector = this.page.locator('text=Tiếng Việt (VN)');

    constructor(page: Page){
        super(page);
    }

    //method đặc trưng của loginpage
    // Navigate to login page
    async navigate() {
        // Thay URL bên dưới bằng URL thực tế của trang login
        await this.navigateTo("https://fnb.kiotviet.vn/login?redirect=%2ftestfnbnew#f=Unauthorized");
    }

    // Fill merchantCode
    async fillMerchantcode(merchantcode: string) {
        await this.merchantCode.fill(merchantcode);
    }

    // Fill username
    async fillUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    // Fill password
    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    // Click login button
    async clickLogin() {
        // Đợi nút login sẵn sàng và enabled
        await this.loginButton.waitFor({ state: 'visible' });
        await this.loginButton.click({ force: true });
    }

    // Complete login process
    async login(merchantcode: string, username: string, password: string) {
        await this.fillMerchantcode(merchantcode);
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLogin();
    }

    // Get error message
    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    // Check if error message is visible
    async isErrorVisible() {
        return await this.errorMessage.isVisible();
    }

    // Verify page loaded
    async verifyPageLoaded() {
        await this.logo.waitFor({ state: 'visible' });
        await this.page.waitForLoadState('networkidle');
    }

    // Change language
    async changeLanguage(language: string) {
        await this.languageSelector.click();
        await this.page.locator(`text=${language}`).click();
    }

    // Verify support link
    async verifySupportLink() {
        return await this.supportLink.isVisible();
    }
}