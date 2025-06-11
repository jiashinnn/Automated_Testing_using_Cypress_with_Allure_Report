describe('Add Petty Cash – Valid & Invalid Test Cases', () => {

  // Ignore showModal() ReferenceError
  Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('showModal is not defined')) return false;
  });

  beforeEach(() => {
    cy.visit('https://schoolmanagement.threelittlecar.com');

    // Login
    cy.get("#email").should('be.visible').clear().click().type('admin@getprojects.org', { delay: 300 })
    cy.get("#password").type('#Abc123!@#', { delay: 200 })
    cy.get('#btnSubmit').click();

    // Navigate to Petty Cash
    cy.contains('Petty Cash').click();
    cy.url().should('include', 'petty_cash.php');

    // Wait for button and force click if needed
    cy.get('a.btn.btn-success.btn-sm.pull-right')
      .should('exist')
      .click({ force: true });

    // Wait for modal form to be visible
    cy.get('#textDesc_1').should('be.visible');
  });


  // === TEST 1: Description Field ===

  it('SM07_01_01 - Valid Description, valid amount', () => {
    cy.get('#textDesc_1').clear().type('Bought books');
    cy.get('#textAmount_1').clear().type('120.50');
    cy.get('#btnSubmit').click();

    cy.get('#insert_Success')
    .should('be.visible')
    .within(() => {
      cy.contains('Success!').should('be.visible');
      cy.contains('successfully inserted').should('be.visible');
    });
  });

  it('SM07_02_01 - Invalid Description (empty), valid amount', () => {
    cy.get('#textDesc_1').clear(); // invalid
    cy.get('#textAmount_1').clear().type('120.50');
    cy.get('#btnSubmit').click();

    cy.get('#spanDescription').should('exist');
  });

  // === TEST 2: Amount Field (valid & invalid) ===

  it('SM07_03_01 - Valid amount, valid description', () => {
    cy.get('#textDesc_1').clear().type('Transport');
    cy.get('#textAmount_1').clear().type('120.50');
    cy.get('#btnSubmit').click();

    cy.get('#insert_Success')
    .should('be.visible')
    .within(() => {
      cy.contains('Success!').should('be.visible');
      cy.contains('successfully inserted').should('be.visible');
    });
  });

  it('SM07_04_01 - Invalid amount (negative), valid description', () => {
    cy.get('#textDesc_1').clear().type('Negative value');
    cy.get('#textAmount_1').clear().type('-20');
    cy.get('#btnSubmit').click();

    cy.get('#spanAmount').should('exist');
  });

  it('SM07_04_02 - Invalid amount (alphabet), valid description', () => {
    cy.get('#textDesc_1').clear().type('Wrong value');
    cy.get('#textAmount_1').clear().type('abc');
    cy.get('#btnSubmit').click();

    cy.get('#spanAmount').should('exist');
  });

});
