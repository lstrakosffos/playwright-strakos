import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

import { LoginPage } from '../POMs/loginPage';
import { LobbyPage } from '../POMs/lobbyPage';
import { ProfilePage } from '../POMs/profilePage';

dotenv.config();

const BASE_URL = process.env.BASE_URL!;
const USERNAME = process.env.CORRECT_USERNAME!;
const PASSWORD = process.env.CORRECT_PASSWORD!;

if (!USERNAME || !PASSWORD) {
  throw new Error('Nedostaju ENV varijable');
}

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(BASE_URL);
});

test('1. Uspješna prijava', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const lobbyPage = new LobbyPage(page);

  await loginPage.login(USERNAME, PASSWORD);

  await expect(page).toHaveURL(/login/);
  await lobbyPage.assertLobbyVisible();
});

test('2. Korisnik se može prijaviti i odjaviti', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const lobbyPage = new LobbyPage(page);

  await loginPage.login(USERNAME, PASSWORD);
  await lobbyPage.assertLobbyVisible();

  await lobbyPage.logout();

  await expect(page).toHaveURL(/login/);
  await expect(page.locator('#form3-username')).toBeVisible();
});

test('3. Korisnik može započeti 3+0 blitz igru', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const lobbyPage = new LobbyPage(page);

  await loginPage.login(USERNAME, PASSWORD);
  await lobbyPage.assertLobbyVisible();

  await lobbyPage.startBlitz3minGame();

  const chessBoard = page.locator('cg-container');
  await expect(chessBoard).toBeVisible();
});

test('4. Korisnik može vidjeti svoj profil i statistiku', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const lobbyPage = new LobbyPage(page);
  const profilePage = new ProfilePage(page);

  await loginPage.login(USERNAME, PASSWORD);
  await lobbyPage.assertLobbyVisible();

  await lobbyPage.openUserMenu();
  await profilePage.goToProfile();

  await profilePage.assertOnProfile(USERNAME);
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
