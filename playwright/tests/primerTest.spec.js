const { test, expect, chromium } = require('@playwright/test');
const loginFixture = require("../fixtures/loginFixture.json")
const { RegisterPage } = require("../pages/registerPage")

test.describe("Primer suite de pruebas con Playwright", () => {
  let numero;
  let browser = null;
  let context = null;
  let page = null;
  let registerPage = null;

  test.beforeAll(async () => {
    numero = Math.floor(Math.random() * 1000)
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    registerPage = new RegisterPage(page)
  })

  test.beforeEach(async () => {
    await page.goto("https://pushing-front.vercel.app/");
  })

  test("Primer test con Playwright", async () => {
    await registerPage.escribirUsuario(loginFixture.user + numero)
    await page.locator('#pass').fill(loginFixture.password)
    await page.locator('//input[@value="Male"]').check({ force: true })
    await page.locator("#day").selectOption('1')
    await page.locator("#month").selectOption({ label: 'October' })
    await page.locator("#year").selectOption('1930')
    await page.locator("#submitForm").click()
    await expect(page.locator(`[id*="user_${loginFixture.user}"]`)).toBeVisible({ timeout: 10000 });
  });

  test.skip("Segundo test con Playwright", async ({ page }) => {
    await page.locator('#user').fill('pushingit' + numero)
    await page.locator('#pass').fill('123456!')
    await page.locator('//input[@value="Male"]').check({ force: true })
    await page.locator("#day").selectOption('1')
    await page.locator("#month").selectOption({ label: 'October' })
    await page.locator("#year").selectOption('1930')
    await page.waitForTimeout(5000);
  });

  test.afterEach(async () => {
    numero = Math.floor(Math.random() * 1000)
  })

  test.afterAll(async () => {
    console.log(numero)
  })
});