const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 4000,
    watchForFileChanges: false,
    "baseUrl": "https://pushing-front.vercel.app/",
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: true,
    json: true
  }
});


require('@applitools/eyes-cypress')(module);
