import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://demo.realworld.io/",
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    // chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      apiBaseURL: 'https://api.realworld.io/api'
    }
  },
});
