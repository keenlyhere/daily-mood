const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    pageLoadTimeout: 180000,
    defaultCommandTimeout: 180000,
    baseUrl: 'https://localhost:3000'
  },
});
