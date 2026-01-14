import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();


const BASE_URL = 'https://lichess.org/login';

const CORRECT_USERNAME = 'Pankekiii';
const CORRECT_PASSWORD = 'Zavrsje7';
const WRONG_EMAIL = 'wrongemail4127491274@gmaill.com';
const WRONG_PASSWORD = 'WrongPassword123';

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test('3. Korisnik može započeti 3+0 blitz igru', async ({ page }) => {
  // login
  await page.locator('#form3-username').fill(CORRECT_USERNAME);
  await page.locator('#form3-password').fill(CORRECT_PASSWORD);
  await page.locator('.one-factor button.submit.button').click();

  await expect(page.locator('.lobby')).toBeVisible();

  // click 3+0 blitz
  const blitz3minButton = page.locator('[role="button"][data-id="3+0"]');
  await expect(blitz3minButton).toBeVisible();
  await blitz3minButton.click();

  // assert chess board is visible
  const chessBoard = page.locator('cg-container');
  await expect(chessBoard).toBeVisible();
});



 
test('4. Korisnik može vidjeti svoj profil i statistiku', async ({ page }) => {
  await page.locator('#form3-username').fill(CORRECT_USERNAME);
  await page.locator('#form3-password').fill(CORRECT_PASSWORD);
  await page.locator('.one-factor button.submit.button').click();

  await expect(page.locator('.lobby')).toBeVisible();

  await page.locator('#user_tag').click();
  await page.locator('a.user-link:has-text("Profile")').click();

  await expect(page).toHaveURL('https://lichess.org/@/Pankekiii');
  await expect(page.locator('a[data-tab="activity"]')).toBeVisible();
});



test('5. Korisnik može vidjeti svoje odigrane partije', async ({ page }) => {
  await page.locator('#form3-username').fill(CORRECT_USERNAME);
  await page.locator('#form3-password').fill(CORRECT_PASSWORD);
  await page.locator('.one-factor button.submit.button').click();

  await expect(page.locator('.lobby')).toBeVisible();

  await page.locator('#user_tag').click();

  await page.locator('a.user-link:has-text("Profile")').click();
  await expect(page).toHaveURL('https://lichess.org/@/Pankekiii');
  await page.locator('a[data-tab="games"]').click();

  await expect(page).toHaveURL('https://lichess.org/@/Pankekiii/all');
  await expect(page.locator('a.nm-item.to-all strong')).toBeVisible();
});

