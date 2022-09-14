const { test, expect } = require('@playwright/test');
const loginFixture = require("../fixtures/loginFixture.json")

test.describe("Primer suite de pruebas con Playwright", () => {
  let numero;
  
  test.beforeAll(async () =>{
    numero = Math.floor(Math.random() * 1000)
  })

  test.beforeEach(async ({page}) =>{
    await page.goto("/");
  })

    test("Primer test con Playwright", async({ page }) =>{
      await page.locator('#user').fill(loginFixture.user + numero)
      await page.locator('#pass').fill(loginFixture.password)
      await page.locator('//input[@value="Male"]').check({force:true})
      await page.locator("#day").selectOption('1')
      await page.locator("#month").selectOption({label:'October'})
      await page.locator("#year").selectOption('1930')
      await page.locator("#submitForm").click()
      await expect(page.locator(`[id*="user_${loginFixture.user}"]`)).toBeVisible({timeout:10000});
    });

    test.skip("Segundo test con Playwright", async({ page }) =>{
      await page.locator('#user').fill('pushingit' + numero)
      await page.locator('#pass').fill('123456!')
      await page.locator('//input[@value="Male"]').check({force:true})
      await page.locator("#day").selectOption('1')
      await page.locator("#month").selectOption({label:'October'})
      await page.locator("#year").selectOption('1930')
      await page.waitForTimeout(5000);
    });

    test.afterEach(async () =>{
      numero = Math.floor(Math.random() * 1000)
    })

    test.afterAll(async () => {
      console.log(numero)
    })
});