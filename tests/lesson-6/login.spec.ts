import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { time } from 'console';

test.describe('Login page tests', () => {

  test('Successful login (example, adjust creds) ', async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate();
    await page.waitForLoadState('networkidle');

    // Thay bằng thông tin hợp lệ nếu có
    await login.fillMerchantcode('testfnb0411');
    await login.fillUsername('admin');
    await login.fillPassword('1234');
    await login.clickLogin();
    // await page.waitForURL('**/DashBoard**', { timeout: 30000 });
    await page.pause();


    await login.closeButton.click();
    await login.dashboardButton.click();


    // Kiểm tra đã chuyển sang trang dashboard thành công (tăng timeout)
    expect(page.url()).toContain('DashBoard');
  });

});