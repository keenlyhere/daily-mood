const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // pageLoadTimeout: 180000,
    // defaultCommandTimeout: 180000,
    // baseUrl: 'https://daily-mood.onrender.com'
    baseUrl: 'http://localhost:3000',
    retries: 2
  },
});
