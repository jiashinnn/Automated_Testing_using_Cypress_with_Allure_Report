// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload';

const origType = Cypress.Commands.overwrite('type', (originalFn, subject, string, options) => {
  const delay = 30; // ms delay per character
  const opts = { ...options, delay };
  return originalFn(subject, string, opts);
});

// Slow down .click() globally
const origClick = Cypress.Commands.overwrite('click', (originalFn, subject, options) => {
  const delay = 50; // ms delay before clicking
  return Cypress.Promise.delay(delay).then(() => originalFn(subject, options));
});

// Slow down .visit() globally
const origVisit = Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  const delay = 3000; // ms delay before visiting page
  return Cypress.Promise.delay(delay).then(() => originalFn(url, options));
});