describe("Add Student 2 - Test Guardian Details Only", () => {
  // Unique value generators
  function generateUniqueIndexNumber() {
    return `IDX${Date.now()}${Math.floor(Math.random() * 10000)}`;
  }
  function generateUniqueEmail() {
    return `user${Date.now()}${Math.floor(Math.random() * 10000)}@example.com`;
  }
  function generateUniqueGuardianEmail() {
    return `guardian${Date.now()}${Math.floor(Math.random() * 10000)}@example.com`;
  }

  let baseValidData = {};

  beforeEach(() => {
    baseValidData = {
      index_number: generateUniqueIndexNumber(),
      full_name: 'John Doe',
      i_name: 'J. D.',
      email: generateUniqueEmail(),
      address: '123, Jalan ABC',
      phone: '378-427-2184',
      b_date: '2000-01-01',
      gender: 'Male',
      g_full_name: 'Doe Lee',
      g_i_name: 'D. L.',
      g_address: '123, Jalan ABC',
      g_email: generateUniqueGuardianEmail(),
      g_phone: '123-456-7890',
      g_b_date: '1970-01-01',
      g_gender: 'Male',
      fileToUpload: 'student.jpg',
      g_fileToUpload: 'guardian.jpg'
    };

    // Reset password and login
    cy.request('GET', 'https://schoolmanagement.threelittlecar.com/controller/reset_password.php');
    cy.visit('https://schoolmanagement.threelittlecar.com');
    cy.url().should('include', 'login.php');
    cy.get("#email").clear().type('admin@getprojects.org', { delay: 200 });
    cy.get("#password").type('#Abc123!@#');
    cy.get("#btnSubmit").click();

    // Go to Add Student screen
    cy.get("body > div > aside > section > ul > li:nth-child(10) > a").click();
    cy.get("body > div > aside > section > ul > li:nth-child(10) ul > li:nth-child(1) > a").click();
  });

  function fillForm(overrides = {}) {
    const textFields = [
      "index_number", "full_name", "i_name", "address", "email", "phone", "b_date",
      "g_full_name", "g_i_name", "g_address", "g_email", "g_phone", "g_b_date"
    ];
    textFields.forEach(field => {
      const value = overrides[field] !== undefined ? overrides[field] : baseValidData[field];
      cy.get(`#${field}`).clear();
      if (value !== '') {
        cy.get(`#${field}`).type(value);
      }
    });

    const selectFields = ["gender", "g_gender"];
    selectFields.forEach(field => {
      const value = overrides[field] !== undefined ? overrides[field] : baseValidData[field];
      cy.get(`#${field}`).select(value);
    });

    if (overrides.fileToUpload !== undefined) {
      cy.get("#fileToUpload").attachFile(overrides.fileToUpload);
    } else {
      cy.get("#fileToUpload").attachFile(baseValidData.fileToUpload);
    }

    if (overrides.g_fileToUpload !== undefined) {
      cy.get("#g_fileToUpload").attachFile(overrides.g_fileToUpload);
    } else {
      cy.get("#g_fileToUpload").attachFile(baseValidData.g_fileToUpload);
    }
  }

  function submitAndCheck(shouldPass, customCheck) {
    if (customCheck) {
      customCheck();
      return;
    }

    cy.get("#btnSubmit").click({ force: true });

    if (shouldPass) {
      cy.get('#modalSelectGrade').should('have.css', 'display', 'block');
      cy.get('#grade').should('be.visible').select('Grade 1', { force: true });
      cy.get('h3.panel-title').should('contain', 'Add Student Subject');
      cy.get('input[type="checkbox"][value="17"]').check();
      cy.get('input[type="checkbox"][value="18"]').check();
      cy.get('#btnSubmit1').click();
      cy.url().should('include', '/student.php');
    } else {
      cy.get('#modalSelectGrade').should('not.be.visible');
      cy.url().should('include', '/student.php');
    }
  }

  const testSuites = [
    {
      field: "g_full_name",
      tests: [
        { value: undefined, shouldPass: true },
        { value: '11111', shouldPass: false },
      ],
    },
    {
      field: "g_i_name",
      tests: [
        { value: undefined, shouldPass: true },
        { value: '11111', shouldPass: false },
      ],
    },
    {
      field: "g_address",
      tests: [
        { value: undefined, shouldPass: true },
        { value: 'abc', shouldPass: false },
      ],
    },
    {
      field: "g_email",
      tests: [
        { value: undefined, shouldPass: true },
        { value: 'doegmail.com', shouldPass: false },
        { value: '!;1doe@gmail.com', shouldPass: false },
        { value: 'doe@gmail', shouldPass: false },
        { value: '', shouldPass: false },
      ],
    },
    {
      field: "g_phone",
      tests: [
        { value: undefined, shouldPass: true },
        { value: 'abc', shouldPass: false },
        { value: '@#^&*$%', shouldPass: false },
        { value: '', shouldPass: false },
        { value: '1234567890', shouldPass: false },
      ],
    },
    {
      field: "g_b_date",
      tests: [
        { value: undefined, shouldPass: true },
        { value: '', shouldPass: false },
      ],
    },
    {
      field: "g_fileToUpload",
      tests: [
        { value: 'guardian.jpg', shouldPass: true },
        {
          value: 'guardian.txt',
          shouldPass: false,
          customCheck: () => {
            cy.get("#btnSubmit").click({ force: true });
            cy.wait(500);
            cy.get('#modalSelectGrade').should('not.be.visible');
          },
        },
      ],
    },
  ];

  testSuites.forEach(({ field, tests }) => {
    describe(`Field: ${field}`, () => {
      tests.forEach((test, i) => {
        const { value, shouldPass, customCheck } = test;
        const label = value === undefined ? "<dynamic>" : value;
        it(`Test #${i + 1} [${field}] should ${shouldPass ? "accept" : "reject"} value: "${label}"`, () => {
          let overrides = {};
          if (value !== undefined) {
            overrides[field] = value;
          }
          fillForm(overrides);
          submitAndCheck(shouldPass, customCheck);
        });
      });
    });
  });
});
