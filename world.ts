// CustomWorld class provides scenario context and manages Playwright browser/page lifecycle for each Cucumber scenario.
// Add scenario-specific variables as properties for sharing data between steps.
// Usage: Access via 'this' in step definitions.

import { setWorldConstructor, World, IWorldOptions, After } from '@cucumber/cucumber';
import { Browser, Page, chromium } from '@playwright/test';

export class CustomWorld extends World {
  browser: Browser | null = null;
  page: Page | null = null;
  petId: number | null = null;
  nexusPulsePage?: any;
  /**
   * scenarioContext is a generic object for storing scenario-specific data.
   * Use this to share data between steps in a scenario (e.g., invoice numbers, workflow state, etc).
   * Example usage: this.scenarioContext['invoiceId'] = '123';
   */
  scenarioContext: Record<string, any> = {};
  constructor(options: IWorldOptions) {
    super(options);
  }
  async initPage() {
    if (!this.browser) {
      this.browser = await chromium.launch({ channel: 'msedge', headless: false });
    }
    if (!this.page) {
      this.page = await this.browser.newPage();
    }
    return this.page;
  }
  async closePage() {
    if (this.page) {
      await this.page.close();
      this.page = null;
    }
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

setWorldConstructor(CustomWorld);

After(async function (this: CustomWorld) {
  await this.closePage();
});
