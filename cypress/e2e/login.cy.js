// describe("Login Application", () => {
    
//     beforeEach(() => {
//         cy.visit('https://schoolmanagement.threelittlecar.com')
//         cy.url().should('include', 'login.php')
//     })

//     it("Login the application with valid test data", () => {
//         cy.get("#email").should('be.visible').clear().click().type('admin@getprojects.org', { delay: 200 })
//         cy.get("#password").type('Abc123')
//         cy.get("#btnSubmit").click()
//     })

//     it("Login the application with invalid test data", () => {
//         cy.get("#email").should('be.visible').clear().click().type('admin', { delay: 200 })
//         cy.get("#password").type('12345')
//         cy.get("#btnSubmit").click()

//         cy.get('#login_error').should('be.visible')
//         cy.get('#login_error .modal-body').should('contain', 'Email or Password is Incorrect')
//     })
// })

describe("Login Application - Equivalence Partitioning", () => {
  
  beforeEach(() => {
    cy.visit('https://schoolmanagement.threelittlecar.com');
    cy.url().should('include', 'login.php');
  });

  // ===== EMAIL FIELD TESTS =====

  it("Email - Valid Input", () => {
    cy.get("#email").clear().type('admin@getprojects.org');
    cy.get("#password").clear().type('#Abc123!@#');
    cy.get("#btnSubmit").click();
    cy.url().should('include', '/view/dashboard.php'); // login success
  });

  it("Email - Invalid (missing @)", () => {
    cy.get("#email").clear().type('admingetprojects.org');
    cy.get("#password").clear().type('#Abc123!@#');
    cy.get("#btnSubmit").click();
    cy.get('#login_error .modal-body').should('contain', 'Email or Password is Incorrect');
  });

  it("Email - Invalid (missing domain)", () => {
    cy.get("#email").clear().type('admin@');
    cy.get("#password").clear().type('#Abc123!@#');
    cy.get("#btnSubmit").click();
    cy.get('#login_error .modal-body').should('contain', 'Email or Password is Incorrect');
  });

  it("Email - Invalid (empty)", () => {
    cy.get("#email").clear();
    cy.get("#password").clear().type('#Abc123!@#');
    cy.get("#btnSubmit").click();
    cy.get('#spanEmail')
      .should('exist')
      .and('have.attr', 'title', 'The user name is required');
  });

  it("Email - Invalid (whitespace)", () => {
    cy.get("#email").clear().type('admin @getprojects.org ');
    cy.get("#password").clear().type('#Abc123!@#');
    cy.get("#btnSubmit").click();
    cy.get('#login_error .modal-body').should('contain', 'Email or Password is Incorrect');
  });

  // ===== PASSWORD FIELD TESTS =====

  it("Password - Valid Input", () => {
    cy.get("#email").clear().type('admin@getprojects.org');
    cy.get("#password").clear().type('#Abc123!@#');
    cy.get("#btnSubmit").click();
    cy.url().should('include', '/view/dashboard.php');
  });

  it("Password - Invalid (empty)", () => {
    cy.get("#email").clear().type('admin@getprojects.org');
    cy.get("#password").clear();
    cy.get("#btnSubmit").click();
    cy.get('#spanPassword')
      .should('exist')
      .and('have.attr', 'title', 'The password is required');
  });

  it("Password - Invalid (incorrect password)", () => {
    cy.get("#email").clear().type('admin@getprojects.org');
    cy.get("#password").clear().type('Abc123');
    cy.get("#btnSubmit").click();
    cy.get('#login_error .modal-body').should('contain', 'Email or Password is Incorrect');
  });


});

