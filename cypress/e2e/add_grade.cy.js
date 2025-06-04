describe("Add Grade", () => {

    beforeEach(() => {
        cy.request('GET', 'https://schoolmanagement.threelittlecar.com/controller/reset_password.php'); 
        // Visit the login page and log in
        cy.visit('https://schoolmanagement.threelittlecar.com')
        cy.url().should('include', 'login.php')

        cy.get("#email").should('be.visible').clear().click().type('admin@getprojects.org', { delay: 300 })
        cy.get("#password").type('#Abc123!@#', { delay: 200 })
        cy.get("#btnSubmit").click()

        cy.get("body > div > aside > section > ul > li:nth-child(5) > a").click()
    })

    it("Grade name - Valid Input", () => {

        cy.get("#name").type('Grade 6')
        cy.get("#admission_fee").type('200.50')
        cy.get("#hall_charge").type('10')
        cy.get("#btnSubmit").click()

        cy.get("#modalInsertform").should('be.visible')

    })

    it("Grade name - Invalid Input (Numbers)", () => {

        cy.get("#name").type('123')
        cy.get("#admission_fee").type('200.50')
        cy.get("#hall_charge").type('10')
        cy.get("#btnSubmit").click()

        cy.get('#modalInsertForm').should('not.be.visible');

    })

    it("Grade name - Invalid Input (Symbols)", () => {

        cy.get("#name").type('!@#')
        cy.get("#admission_fee").type('200.50')
        cy.get("#hall_charge").type('10')
        cy.get("#btnSubmit").click()

        cy.get('#modalInsertForm').should('not.be.visible');

    })

    it("Grade name - Invalid Input (Spaces)", () => {

        cy.get("#name").type('  ')
        cy.get("#admission_fee").type('200.50')
        cy.get("#hall_charge").type('10')
        cy.get("#btnSubmit").click()

        cy.get('#modalInsertForm').should('not.be.visible');

    })

    it("Admission Fee - Valid Input", () => {

        cy.get("#name").type('Grade 7')
        cy.get("#admission_fee").type('200.50')
        cy.get("#hall_charge").type('10')
        cy.get("#btnSubmit").click()

        cy.get("#modalInsertform").should('be.visible')

    })

    it("Admission Fee - Invalid Input (Negative Number)", () => {

        cy.get("#name").type('Grade 8')
        cy.get("#admission_fee").type('-20')
        cy.get("#hall_charge").type('10')
        cy.get("#btnSubmit").click()

        cy.get('#modalInsertForm').should('not.be.visible');
    })

    it("Admission Fee - Invalid Input (Letters)", () => {

        cy.get("#name").type('Grade 9')
        cy.get("#admission_fee").type('abc')
        cy.get("#hall_charge").type('10')
        cy.get("#btnSubmit").click()

        cy.get('#modalInsertForm').should('not.be.visible');
        
    })

    it("Admission Fee - Invalid Input (Space)", () => {

        cy.get("#name").type('Grade 10')
        cy.get("#admission_fee").type('  ')
        cy.get("#hall_charge").type('10')
        cy.get("#btnSubmit").click()

        cy.get('#modalInsertForm').should('not.be.visible');
        
    })

    it("Hall Charge - Valid Input", () => {

        cy.get("#name").type('Grade 11')
        cy.get("#admission_fee").type('200.50')
        cy.get("#hall_charge").type('10')
        cy.get("#btnSubmit").click()

        cy.get("#modalInsertform").should('be.visible')
        
    })

    it("Hall Charge - Invalid Input (Negative Number)", () => {

        cy.get("#name").type('Grade 12')
        cy.get("#admission_fee").type('200.50')
        cy.get("#hall_charge").type('-20')
        cy.get("#btnSubmit").click()

        cy.get('#modalInsertForm').should('not.be.visible');
        
    })

    it("Hall Charge - Invalid Input (Letters)", () => {

        cy.get("#name").type('Grade 13')
        cy.get("#admission_fee").type('200.50')
        cy.get("#hall_charge").type('abc')
        cy.get("#btnSubmit").click()

        cy.get('#modalInsertForm').should('not.be.visible');
    })

    it("Hall Charge - Invalid Input (Space)", () => {

        cy.get("#name").type('Grade 14')
        cy.get("#admission_fee").type('200.50')
        cy.get("#hall_charge").type('  ')
        cy.get("#btnSubmit").click()

        cy.get('#modalInsertForm').should('not.be.visible');
    })

    it("Range - Valid Input", () => {

        cy.get("#name").type('Grade 15')
        cy.get("#admission_fee").type('200.50')
        cy.get("#hall_charge").type('10')
        cy.get("#btnSubmit").click()

        cy.get("#modalInsertform").should('be.visible')
        cy.get("#mark_range_text_1").type('90-100')
        cy.get("#mark_grade_text_1").type('A+')

        cy.get("#btnSubmit1").click()

        cy.get('#insert_Success .modal-body').should('contain', 'Your information has been successfully inserted in our database')

    })

    it("Range - Invalid Input (Alphabetic)", () => {

        cy.get("#name").type('Grade 16')
        cy.get("#admission_fee").type('200.50')
        cy.get("#hall_charge").type('10')
        cy.get("#btnSubmit").click()

        cy.get("#modalInsertform").should('be.visible')
        cy.get("#mark_range_text_1").type('abc de')
        cy.get("#mark_grade_text_1").type('A+')

        cy.get("#btnSubmit1").click()

        cy.get('#insert_Success .modal-body').should('not.contain', 'Your information has been successfully inserted in our database')

    })

    it("Range - Invalid Input (Symbols)", () => {

        cy.get("#name").type('Grade 17')
        cy.get("#admission_fee").type('200.50')
        cy.get("#hall_charge").type('10')
        cy.get("#btnSubmit").click()

        cy.get("#modalInsertform").should('be.visible')
        cy.get("#mark_range_text_1").type('-!@#$')
        cy.get("#mark_grade_text_1").type('A+')

        cy.get("#btnSubmit1").click()

        cy.get('#insert_Success .modal-body').should('not.contain', 'Your information has been successfully inserted in our database')

    })

    it("Range - Invalid Input (Space)", () => {

        cy.get("#name").type('Grade 18')
        cy.get("#admission_fee").type('200.50')
        cy.get("#hall_charge").type('10')
        cy.get("#btnSubmit").click()

        cy.get("#modalInsertform").should('be.visible')
        cy.get("#mark_range_text_1").type('  ')
        cy.get("#mark_grade_text_1").type('A+')

        cy.get("#btnSubmit1").click()

        cy.get('#insert_Success .modal-body').should('not.contain', 'Your information has been successfully inserted in our database')

    })

    it("Grade - Valid Input", () => {

        cy.get("#name").type('Grade 19')
        cy.get("#admission_fee").type('200.50')
        cy.get("#hall_charge").type('10')
        cy.get("#btnSubmit").click()

        cy.get("#modalInsertform").should('be.visible')
        cy.get("#mark_range_text_1").type('90-100')
        cy.get("#mark_grade_text_1").type('A+')

        cy.get("#btnSubmit1").click()

        cy.get('#insert_Success .modal-body').should('contain', 'Your information has been successfully inserted in our database')

    })

    it("Grade - Invalid Input (Number)", () => {

        cy.get("#name").type('Grade 20')
        cy.get("#admission_fee").type('200.50')
        cy.get("#hall_charge").type('10')
        cy.get("#btnSubmit").click()

        cy.get("#modalInsertform").should('be.visible')
        cy.get("#mark_range_text_1").type('90-100')
        cy.get("#mark_grade_text_1").type('0')

        cy.get("#btnSubmit1").click()

        cy.get('#insert_Success .modal-body').should('not.contain', 'Your information has been successfully inserted in our database')

    })

    it("Grade - Invalid Input (Space)", () => {

        cy.get("#name").type('Grade 21')
        cy.get("#admission_fee").type('200.50')
        cy.get("#hall_charge").type('10')
        cy.get("#btnSubmit").click()

        cy.get("#modalInsertform").should('be.visible')
        cy.get("#mark_range_text_1").type('90-100')
        cy.get("#mark_grade_text_1").type('  ')

        cy.get("#btnSubmit1").click()

        cy.get('#insert_Success .modal-body').should('not.contain', 'Your information has been successfully inserted in our database')

    })
})
