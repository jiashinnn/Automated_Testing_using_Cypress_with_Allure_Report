const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://schoolmanagement.threelittlecar.com',
    specPattern: 'cypress/e2e/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
  screenshotsFolder: 'cypress/screenshots',
  video: true,
  videosFolder: 'cypress/videos',
  videoCompression: 32,
  screenshotOnRunFailure: true,

  // reporter: 'mocha-allure-reporter',
  // reporterOptions: {
  //   reportDir: 'allure-results',
  //   overwrite: false,
  //   html: false,
  //   json: true,
  // },
});
