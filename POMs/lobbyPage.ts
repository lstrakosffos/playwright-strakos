import { Page, Locator, expect } from '@playwright/test';

export class LobbyPage {
  readonly page: Page;

  // locators
  readonly lobbyContainer: Locator;
  readonly userMenuButton: Locator;
  readonly signOutButton: Locator;
  readonly blitz3minButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.lobbyContainer = page.locator('.lobby');
    this.userMenuButton = page.locator('#user_tag');
    this.signOutButton = page.locator('form.logout button.text');
    this.blitz3minButton = page.locator('[role="button"][data-id="3+0"]');
  }

  async assertLobbyVisible() {
    await expect(this.lobbyContainer).toBeVisible();
  }

  async openUserMenu() {
    await this.userMenuButton.click();
  }

  async logout() {
    await this.openUserMenu();
    await this.signOutButton.click();
  }

  async startBlitz3minGame() {
    await this.blitz3minButton.click();
  }
}
