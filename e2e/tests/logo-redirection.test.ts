import path from 'node:path';
import { expect, test } from '@playwright/test';
import { getPort, killProcess, runDevCommand } from '../utils/runCommands';

const fixtureDir = path.resolve(__dirname, '../fixtures');

test.describe('Nav should functions well', async () => {
  let appPort;
  let app;
  test.beforeAll(async () => {
    const appDir = path.join(fixtureDir, 'logo-redirection');
    appPort = await getPort();
    app = await runDevCommand(appDir, appPort);
  });

  test.afterAll(async () => {
    if (app) {
      await killProcess(app);
    }
  });

  test('should redirect to / if no lang is defined', async ({ page }) => {
    await page.goto(`http://localhost:${appPort}/subfolder/page`);

    await page.click('.rspress-logo');
    expect(page.url()).not.toContain('/index');
  });
});
