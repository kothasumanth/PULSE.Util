// CustomWorld class provides scenario context and manages Playwright browser/page lifecycle for each Cucumber scenario.
// Add scenario-specific variables as properties for sharing data between steps.
// Usage: Access via 'this' in step definitions.

import { setWorldConstructor, World, IWorldOptions, After } from '@cucumber/cucumber';

export class CustomWorld extends World {
  /**
   * scenarioContext is a generic object for storing scenario-specific data.
   * Use this to share data between steps in a scenario (e.g., invoice numbers, workflow state, etc).
   * Example usage: this.scenarioContext['invoiceId'] = '123';
   */
  scenarioContext: Record<string, any> = {};
  petId: number | null = null;
  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);

After(async function (this: CustomWorld) {
  // Cleanup logic if needed
});
