import { Page, Locator, expect } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;

  // locators
  readonly profileLink: Locator;
  readonly activityTab: Locator;
  readonly gamesTab: Locator;
  readonly gamesCount: Locator;

  constructor(page: Page) {
    this.page = page;

    this.profileLink = page.locator('a.user-link:has-text("Profile")');
    this.activityTab = page.locator('a[data-tab="activity"]');
    this.gamesTab = page.locator('a[data-tab="games"]');
    this.gamesCount = page.locator('a.nm-item.to-all strong');
  }

  async goToProfile() {
    await this.profileLink.click();
  }

  async assertOnProfile(username: string) {
    await expect(this.page).toHaveURL(`https://lichess.org/@/${username}`);
    await expect(this.activityTab).toBeVisible();
  }

  async goToGames() {
    await this.gamesTab.click();
  }

  async assertGamesVisible(username: string) {
    await expect(this.page).toHaveURL(`https://lichess.org/@/${username}/all`);
    await expect(this.gamesCount).toBeVisible();
  }
}
