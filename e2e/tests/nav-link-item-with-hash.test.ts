import { expect, test } from '@playwright/test';
import path from 'node:path';
import { getPort, killProcess, runDevCommand } from '../utils/runCommands';

const fixtureDir = path.resolve(__dirname, '../fixtures');

test.describe('basic test', async () => {
  let appPort;
  let app;
  test.beforeAll(async () => {
    const appDir = path.join(fixtureDir, 'nav-link-item-with-hash');
    appPort = await getPort();
    app = await runDevCommand(appDir, appPort);
  });

  test.afterAll(async () => {
    if (app) {
      await killProcess(app);
    }
  });

  test('Navigate with an hash as link', async ({ page }) => {
    await page.goto(`http://localhost:${appPort}/`);

    await page.locator('.rspress-nav-menu a').first().click();
    expect(page.url()).toContain('index#pageA');

    await page.locator('.rspress-nav-menu a').nth(1).click();
    expect(page.url()).toContain('index#pageB');
  });
});
