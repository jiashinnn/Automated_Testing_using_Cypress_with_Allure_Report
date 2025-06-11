// cypress/integration/add_event_spec.js

describe("Add Event - Valid and Invalid Data", () => {
    beforeEach(() => {
        cy.visit("https://schoolmanagement.threelittlecar.com/");

        // Login first
        cy.get("#email").should('be.visible').clear().click().type('admin@getprojects.org', { delay: 300 })
        cy.get("#password").type('#Abc123!@#', { delay: 200 })
        cy.get("#btnSubmit").click();

        // Navigate to Event -> My Events -> Create Event
        cy.contains("Event").click({ force: true });
        cy.contains("My Events").click({ force: true });

        cy.get("a.btn-sm.bg-orange-active.pull-right").click();
    });

    // title
    it("Title - Valid", () => {
        cy.get("#title").clear().type("Sports Day");
        cy.get("#category").select("All");
        cy.get("#reservationtime").clear().type("06/11/2025 12:00 AM - 06/11/2025 11:59 PM");
        cy.get("#title").click();
        cy.get("#note").clear().type("Bring sports shoes");
        cy.get("#colorF").clear().type("Red");
        cy.get("form#formExam").submit();

        cy.get('#insert_Success')
            .should('be.visible')
            .within(() => {
                cy.contains('Success!').should('be.visible');
                cy.contains('successfully inserted').should('be.visible');
            });

    });

    it("Title - Invalid Title (Empty)", () => {
        cy.get("#title").clear();
        cy.get("#category").select("All");
        cy.get("#reservationtime").clear().type("06/11/2025 12:00 AM - 06/11/2025 11:59 PM");
        cy.get("#title").click();
        cy.get("#note").clear().type("Bring sports shoes");
        cy.get("#colorF").clear().type("Red");
        cy.get("form#formExam").submit();

        cy.get('#spanTitle').should('exist');
    });

    // Date and Time
    it("Date and time - Valid", () => {
        cy.get("#title").clear().type("Sports Day");
        cy.get("#category").select("All");
        cy.get("#reservationtime").clear().type("06/11/2025 12:00 AM - 06/11/2025 11:59 PM");
        cy.get("#title").click();
        cy.get("#note").clear().type("Bring sports shoes");
        cy.get("#colorF").clear().type("Red");
        cy.get("form#formExam").submit();

        cy.get('#insert_Success')
            .should('be.visible')
            .within(() => {
                cy.contains('Success!').should('be.visible');
                cy.contains('successfully inserted').should('be.visible');
            });
    });

    it("Date and time - Invalid (alphabets))", () => {
        cy.get("#title").clear().type("Sports Day");
        cy.get("#category").select("All");
        cy.get("#reservationtime").clear().type("ABC");
        cy.get("#title").click();
        cy.get("#note").clear().type("Bring sports shoes");
        cy.get("#colorF").clear().type("Red");
        cy.get("form#formExam").submit();

        cy.get('#spanDate').should('exist')
    });

    it("Date and time - Invalid (symbols))", () => {
        cy.get("#title").clear().type("Sports Day");
        cy.get("#category").select("All");
        cy.get("#reservationtime").clear().type("@#^&*$%");
        cy.get("#title").click();
        cy.get("#note").clear().type("Bring sports shoes");
        cy.get("#colorF").clear().type("Red");
        cy.get("form#formExam").submit();

        cy.get('#spanDate').should('exist')
    });

    it("Date and time - Invalid (empty))", () => {
        cy.get("#title").clear().type("Sports Day");
        cy.get("#category").select("All");
        cy.get("#reservationtime").clear();
        cy.get("#title").click();
        cy.get("#note").clear().type("Bring sports shoes");
        cy.get("#colorF").clear().type("Red");
        cy.get("form#formExam").submit();

        cy.get('#spanDate').should('exist')
    });

    // Note
    it("Note - Valid", () => {
        cy.get("#title").clear().type("Sports Day");
        cy.get("#category").select("All");
        cy.get("#reservationtime").clear().type("06/11/2025 12:00 AM - 06/11/2025 11:59 PM");
        cy.get("#title").click();
        cy.get("#note").clear().type("Bring sports shoes");
        cy.get("#colorF").clear().type("Red");
        cy.get("form#formExam").submit();

        cy.get('#insert_Success')
            .should('be.visible')
            .within(() => {
                cy.contains('Success!').should('be.visible');
                cy.contains('successfully inserted').should('be.visible');
            });

    });

    it("Note - Invalid (Empty)", () => {
        cy.get("#title").clear().type("Sports Day");
        cy.get("#category").select("All");
        cy.get("#reservationtime").clear().type("06/11/2025 12:00 AM - 06/11/2025 11:59 PM");
        cy.get("#title").click();
        cy.get("#note").clear();
        cy.get("#colorF").clear().type("Red");
        cy.get("form#formExam").submit();

        cy.get('#spanNote').should('exist')
    });

    // Color
    it("Color - Valid", () => {
        cy.get("#title").clear().type("Sports Day");
        cy.get("#category").select("All");
        cy.get("#reservationtime").clear().type("06/11/2025 12:00 AM - 06/11/2025 11:59 PM");
        cy.get("#title").click();
        cy.get("#note").clear().type("Bring sports shoes");
        cy.get("#colorF").clear().type("Red");
        cy.get("form#formExam").submit();

        cy.get('#insert_Success')
            .should('be.visible')
            .within(() => {
                cy.contains('Success!').should('be.visible');
                cy.contains('successfully inserted').should('be.visible');
            });
    });

    it("Color - Invalid Color (Wrong name)", () => {
        cy.get("#title").clear().type("Sports Day");
        cy.get("#category").select("All");
        cy.get("#reservationtime").clear().type("06/11/2025 12:00 AM - 06/11/2025 11:59 PM");
        cy.get("#title").click();
        cy.get("#note").clear().type("Bring sports shoes");
        cy.get("#colorF").clear().type("reddish");
        cy.get("form#formExam").submit();

        cy.get('#spanColor').should('exist')
    });

});
