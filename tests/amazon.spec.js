// @ts-check
import { test, expect } from '@playwright/test';

const url = 'https://www.amazon.com';

test.beforeEach(async ({ page }) => {
  // open amazon.com before each test
  await page.goto(url);
});

test.afterEach(async ({ page }) => {
  await page.close();
})


test('search for Nikon products', async ({ page }) => {
  await page.getByRole('searchbox').fill('Nikon');
  await page.getByRole('searchbox').press('Enter');

  await expect(page).toHaveTitle(/Nikon/);
});


test('sort results from highest price to lowest price', async ({ page }) => {

  await page.getByRole('searchbox').fill('Nikon');
  await page.getByRole('searchbox').press('Enter');

  await page.locator('#a-autoid-0-announce').click();
  await page.getByLabel('Price: High to Low').click();  
  
  // expect url to contain s=price-desc-rank
  await expect(page).toHaveURL(/s=price-desc-rank/);
});


test('click on second product', async ({ page })  => {
  await page.getByRole('searchbox').fill('Nikon');
  await page.getByRole('searchbox').press('Enter');
  await page.locator('#a-autoid-0-announce').click();
  await page.getByLabel('Price: High to Low').click(); 
  
  await page.getByRole('link').getByText('See options').nth(1).click();

  // expect the page to contain the text Product information
  await expect(page.getByRole('heading', {level: 1}).getByText('Product information')).toBeVisible();
});


test('product title includes text Nikon D3X', async ({ page }) => {
  await page.getByRole('searchbox').fill('Nikon');
  await page.getByRole('searchbox').press('Enter');
  await page.locator('#a-autoid-0-announce').click();
  await page.getByLabel('Price: High to Low').click(); 
  await page.getByRole('link').getByText('See options').nth(1).click();

  // expect product title to contain text Nikon D3X
  // fails at the time of writing this test as the product title does not contain the text Nikon D3X
  await expect(page.getByRole('heading', { level: 1 }).first()).toHaveText(/Nikon D3X/);
});

