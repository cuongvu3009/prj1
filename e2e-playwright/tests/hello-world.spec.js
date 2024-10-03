/**requirement:
 * The project comes with at least five meaningful end to end tests 
 * that can be used to test the functionality of the application. 
 * */

const { test, expect } = require("@playwright/test");

/** test1: main page responds test: title */
test("Server responds with the title and headings", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Shared shopping lists");
  await expect(page.locator("h1")).toHaveText("Shared shopping lists");
});

/** test2: main page responds test: links */
test("Server responds with a link", async ({ page }) => {
  await page.goto("/");

  // Click the Lists links.
  await page.getByRole('link', { name: 'Lists'}).click();

  // expect the URL to contain lists
  await expect(page).toHaveURL(/.*lists/);
})

/** test3: /lists page responds test: links */
test("list page responds with a link", async ({ page }) => {
  await page.goto("/lists");

  // Click the Lists links.
  await page.getByRole('link', { name: 'Main page'}).click();

  // expect the URL to contain lists
  await expect(page).toHaveURL("/");
})

// main page responds test: statics?

/** test4: creating a shopping list */
test("Can create a list.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByRole('button', { name: 'Create List' }).click();
  await expect(page.getByText(listName)).toBeVisible();
})

/** test5: to shopping list link */
test("Have a link to the created list.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByRole('button', { name: 'Create List' }).click();
  await page.getByRole('link', { name: listName }).click(); 
  await expect(page).toHaveURL(/.*lists\/[0-9]+/);
})

/** test6: shopping list deactive */
test("Deactivate the created list.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByRole('button', { name: 'Create List' }).click();
  // await page.getByRole('link', { name: listName }).click();
  await page.locator('form').filter({ hasText: listName }).getByRole('button', {name: 'Deactivate list!'}).click();  
  await expect(page.getByText(listName)).toBeHidden();

})

/** test 7: shopping list title */
test("List have title.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByRole('button', { name: 'Create List' }).click();
  await page.getByRole('link', { name: listName }).click(); 
  await expect(page).toHaveURL(/.*lists\/[0-9]+/);

  await expect(page.locator("h1")).toHaveText(listName);
  
})

/** test 8: shopping list link back  */
test("List link to the Lists back.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByRole('button', { name: 'Create List' }).click();
  await page.getByRole('link', { name: listName }).click(); 
  await expect(page).toHaveURL(/.*lists\/[0-9]+/);

  await page.getByRole('link', { name: 'Shopping lists'}).click();
  await expect(page).toHaveURL(/.*lists/);
  
})

/** test 9: add and list item  */
test("List item add and view .", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByRole('button', { name: 'Create List' }).click();
  await page.getByRole('link', { name: listName }).click(); 
  await expect(page).toHaveURL(/.*lists\/[0-9]+/);

  const itemName = `My item ${Math.random()}`;
  await page.locator("input[type=text]").type(itemName);
  await page.getByRole('button', { name: 'Add Item' }).click();
  await expect(page.getByText(itemName)).toBeVisible();
})

/** test 10: delete item  */
test("List item deleting.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByRole('button', { name: 'Create List' }).click();
  await page.getByRole('link', { name: listName }).click(); 
  await expect(page).toHaveURL(/.*lists\/[0-9]+/);

  const itemName = `My item ${Math.random()}`;
  await page.locator("input[type=text]").type(itemName);
  await page.getByRole('button', { name: 'Add Item' }).click();

  await page.locator('form').filter({ hasText: itemName }).getByRole('button', {name: 'Mark collected!'}).click();  
  await expect(page.locator("del")).toHaveText(itemName);
  
})
// adding item test

// 