import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

import { LoginPage } from '../POMs/loginPage';
import { LobbyPage } from '../POMs/lobbyPage';
import { ProfilePage } from '../POMs/profilePage';

dotenv.config();

const BASE_URL = process.env.BASE_URL!;
const USERNAME = process.env.CORRECT_USERNAME!;
const PASSWORD = process.env.CORRECT_PASSWORD!;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(BASE_URL);
});



test('5. Korisnik može vidjeti svoje odigrane partije', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const lobbyPage = new LobbyPage(page);
  const profilePage = new ProfilePage(page);

  await loginPage.login(USERNAME, PASSWORD);
  await lobbyPage.assertLobbyVisible();

  await lobbyPage.openUserMenu();
  await profilePage.goToProfile();
  await profilePage.goToGames();

  await profilePage.assertGamesVisible(USERNAME);
});
