import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  // locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('#form3-username');
    this.passwordInput = page.locator('#form3-password');
    this.submitButton = page.locator('.one-factor button.submit.button');
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
