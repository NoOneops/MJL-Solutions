import { defineConfig, devices } from "@playwright/test";

// Playwright enables color output for its workers; avoid Node's conflicting-color warning.
delete process.env.NO_COLOR;

export default defineConfig({
  testDir: "./tests/e2e",
  globalSetup: "./tests/global-setup.js",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:4179/MJL-Solutions/",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
