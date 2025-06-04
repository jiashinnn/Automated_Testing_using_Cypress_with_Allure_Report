describe('Edit Profile', () => {
  beforeEach(() => {

    // Reset password before each test to #Abc123!@#
    cy.request('GET', 'https://schoolmanagement.threelittlecar.com/controller/reset_password.php');

    cy.visit('https://schoolmanagement.threelittlecar.com/');

    // Login first
    cy.get("#email").should('be.visible').clear().click().type('admin@getprojects.org', { delay: 300 })
    cy.get("#password").type('#Abc123!@#', { delay: 200 })
    cy.get('#btnSubmit').click();

    // Wait and navigate to profile edit
    cy.wait(2000); // adjust as needed
    // Step 3: Assert successful login by checking URL or menu
    cy.url().should('include', '/view/dashboard.php');

    // Step 4: Click through UI to reach profile (update selector based on actual nav)
    cy.contains('My Profile').click(); // OR the actual sidebar/menu link
    cy.url().should('include', '/admin_profile.php'); // confirm navigation
    cy.get('#btnEdit').click(); // Clicking the edit button
  });


 // === Full Name ===
  it('Full Name - Valid Input (only letters and spaces)', () => {
    cy.get('#full_name1').clear().type('Admin');
    cy.get('#i_name1').clear().type('A. B. C.');
    cy.get('#address1').clear().type('123, Jalan ABC');
    cy.get('#email1').clear().type('admin@getprojects.org');
    cy.get('#phone1').clear().type('0123456789');
    cy.get('#password1').clear().type('#Abc123!@#');
    cy.get('form').submit();
    cy.get('#update_Success').should('be.visible');
  });

  it('Full Name - Invalid Input (Numbers)', () => {
    cy.get('#full_name1').clear().type('11111');
    cy.get('form').submit();
    cy.get('#spanFullName').should('exist');
  });

    it('Full Name - Invalid Input (Symbols)', () => {
    cy.get('#full_name1').clear().type('#$%^');
    cy.get('form').submit();
    cy.get('#spanFullName').should('exist');
  });

    it('Full Name - Invalid Input (Blanks)', () => {
    cy.get('#full_name1').clear();
    cy.get('form').submit();
    cy.get('#spanFullName').should('exist');
  });

  // === Name With Initials ===
  it('Name With Initials - Valid Input (Initials format like A.B.C)', () => {
    cy.get('#full_name1').clear().type('Admin');
    cy.get('#i_name1').clear().type('A. B. C.');
    cy.get('#address1').clear().type('123, Jalan ABC');
    cy.get('#email1').clear().type('admin@getprojects.org');
    cy.get('#phone1').clear().type('0123456789');
    cy.get('#password1').clear().type('#Abc123!@#');
    cy.get('form').submit();
    cy.get('#update_Success').should('be.visible');
  });

  it('Name With Initials - Invalid Input', () => {
    cy.get('#i_name1').clear().type('11111');
    cy.get('form').submit();
    cy.get('#spanInitials').should('exist');
  });

  // === Address ===
  it('Address - Valid Input (any characters, >5 chars)', () => {
    cy.get('#full_name1').clear().type('Admin');
    cy.get('#i_name1').clear().type('A. B. C.');
    cy.get('#address1').clear().type('123, Jalan ABC');
    cy.get('#email1').clear().type('admin@getprojects.org');
    cy.get('#phone1').clear().type('0123456789');
    cy.get('#password1').clear().type('#Abc123!@#');
    cy.get('form').submit();
    cy.get('#update_Success').should('be.visible');
  });

  it('Address - Invalid Input (too short)', () => {
    cy.get('#address1').clear().type('Abc');
    cy.get('form').submit();
    cy.get('#spanAddress').should('exist');
  });

  it('Address - Invalid Input (blank)', () => {
    cy.get('#address1').clear();
    cy.get('form').submit();
    cy.get('#spanAddress').should('exist');
  });

  // === Email ===
  it('Email - Valid Input (example@email.com)', () => {
    cy.get('#full_name1').clear().type('Admin');
    cy.get('#i_name1').clear().type('A. B. C.');
    cy.get('#address1').clear().type('123, Jalan ABC');
    cy.get('#email1').clear().type('admin@getprojects.org');
    cy.get('#phone1').clear().type('0123456789');
    cy.get('#password1').clear().type('#Abc123!@#');
    cy.get('form').submit();
    cy.get('#update_Success').should('be.visible');
  });

  it('Email - Invalid Input (Missing @ )', () => {
    cy.get('#email1').clear().type('admingmail.com');
    cy.get('form').submit();
    cy.get('#spanEmail').should('exist');
  });

  it('Email - Invalid Input (include symbols)', () => {
    cy.get('#email1').clear().type('!;1admin@gmail.com ');
    cy.get('form').submit();
    cy.get('#spanEmail').should('exist');
  });

  it('Email - Invalid Input (missing domain)', () => {
    cy.get('#email1').clear().type('admin@gmail');
    cy.get('form').submit();
    cy.get('#spanEmail').should('exist');
  });

  it('Email - Invalid Input (blank)', () => {
    cy.get('#email1').clear();
    cy.get('form').submit();
    cy.get('#spanEmail').should('exist');
  });

  // === Phone Number ===
  it('Phone Number - Valid Input (integer only, length: 10-11)', () => {
    cy.get('#full_name1').clear().type('Admin');
    cy.get('#i_name1').clear().type('A. B. C.');
    cy.get('#address1').clear().type('123, Jalan ABC');
    cy.get('#email1').clear().type('admin@getprojects.org');
    cy.get('#phone1').clear().type('0123456789');
    cy.get('#password1').clear().type('#Abc123!@#');
    cy.get('form').submit();
    cy.get('#update_Success').should('be.visible');
  });

  it('Phone Number - Invalid Input (alphabets)', () => {
    cy.get('#phone1').clear().type('abc@123');
    cy.get('form').submit();
    cy.get('#spanPhone').should('exist');
  });

  it('Phone Number - Invalid Input (symbols)', () => {
    cy.get('#phone1').clear().type('@#^&*$%');
    cy.get('form').submit();
    cy.get('#spanPhone').should('exist');
  });

  it('Phone Number - Invalid Input (blank)', () => {
    cy.get('#phone1').clear();
    cy.get('form').submit();
    cy.get('#spanPhone').should('exist');
  });


  // === Password ===
  it('Password - Valid Input (Alphanumeric + Symbol)', () => {
    cy.get('#full_name1').clear().type('Admin');
    cy.get('#i_name1').clear().type('A. B. C.');
    cy.get('#address1').clear().type('123, Jalan ABC');
    cy.get('#email1').clear().type('admin@getprojects.org');
    cy.get('#phone1').clear().type('0123456789');
    cy.get('#password1').clear().type('#Abc123!@#');
    cy.get('form').submit();
    cy.get('#update_Success').should('be.visible');
  });

  it('Password - Invalid Input (Blank)', () => {
    cy.get('#password1').clear();
    cy.get('form').submit();
    cy.get('#spanPassword').should('exist');
  });

  it('Password - Invalid Input (Alphabets)', () => {
    cy.get('#password1').clear().type('Abcde');
    cy.get('form').submit();
    cy.get('#spanPassword').should('exist');
  });

  it('Password - Invalid Input (Numeric)', () => {
    cy.get('#password1').clear().type('12345');
    cy.get('form').submit();
    cy.get('#spanPassword').should('exist');
  });

  it('Password - Invalid Input (Alphanumeric)', () => {
    cy.get('#password1').clear().type('Abc123');
    cy.get('form').submit();
    cy.get('#spanPassword').should('exist');
  });

});