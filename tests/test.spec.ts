import { test, expect } from "@playwright/test";

test.describe("HomePage Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://bank-ui-test.vercel.app");
  });

  test("Check if components exist on the page", async ({ page }) => {
    const accountCard = page.locator("#account-card");
    await expect(accountCard).toBeVisible();

    const invoiceTable = page.locator("#invoices-table");
    await expect(invoiceTable).toBeVisible();

    const chartIncomeExpenses = page.locator("#chart-container");
    await expect(chartIncomeExpenses).toBeVisible();

    const transfer = page.locator("#transfer-container");
    await expect(transfer).toBeVisible();

    const topup = page.locator("#topup-container");
    await expect(topup).toBeVisible();
  });
});
