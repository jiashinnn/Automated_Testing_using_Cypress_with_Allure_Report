describe("Add Subject", () => {

    beforeEach(() => {
        // Reset password before each test to #Abc123!@#
        cy.request('GET', 'https://schoolmanagement.threelittlecar.com/controller/reset_password.php'); 
        cy.visit('https://schoolmanagement.threelittlecar.com')
        cy.url().should('include', 'login.php')

        cy.get("#email").should('be.visible').clear().click().type('admin@getprojects.org', { delay: 200 })
        cy.get("#password").type('#Abc123!@#')
        cy.get("#btnSubmit").click()

        // Navigate to the Subject page (6th menu item)
        cy.get("body > div > aside > section > ul > li:nth-child(6) > a").click()
    })

    it("Add Subject with Valid Test Data", () => {
        cy.get("#name").type('Math 101', { delay: 100 })
        cy.get("button[type='submit'].btn.btn-primary").click()

        // Check if success message appears
        cy.get('#insert_Success .modal-body').should('contain', 'successfully inserted')
    })

    it("Add Subject with Invalid Test Data", () => {
        cy.get("#name").type('!@#', { delay: 100 })
        cy.get("button[type='submit'].btn.btn-primary").click()

        // It should NOT show the success message
        cy.get('#insert_Success .modal-body').should('not.contain', 'successfully inserted')
    })

})
// npx cypress open