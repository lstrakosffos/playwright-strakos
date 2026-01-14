import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();



const BASE_URL = process.env.BASE_URL;

const CORRECT_USERNAME = process.env.CORRECT_USERNAME;
const CORRECT_PASSWORD = process.env.CORRECT_PASSWORD;

const WRONG_EMAIL = process.env.WRONG_EMAIL;
const WRONG_PASSWORD = process.env.WRONG_PASSWORD;


test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});



test('1. Uspješna prijava', async ({ page }) => {
  await page.locator('#form3-username').fill(CORRECT_USERNAME);
  await page.locator('#form3-password').fill(CORRECT_PASSWORD);

  // Click ONLY the visible login button
  await page.locator('.one-factor button.submit.button').click();

  await expect(page).toHaveURL('https://lichess.org/login');
  await expect(page.locator('.lobby')).toBeVisible();
});


test('2. Korisnik se može prijaviti i odjaviti', async ({ page }) => {
  // login
  await page.locator('#form3-username').fill(CORRECT_USERNAME);
  await page.locator('#form3-password').fill(CORRECT_PASSWORD);
  await page.locator('.one-factor button.submit.button').click();

  await expect(page.locator('.lobby')).toBeVisible();

  // open user menu
  await page.locator('#user_tag').click();

  // sign out
  await page.locator('form.logout button.text').click();

  // assert redirect to login page
  await expect(page).toHaveURL(/login/);
  await expect(page.locator('#form3-username')).toBeVisible();
});
