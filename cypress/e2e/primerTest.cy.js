/// <reference types="cypress" />

describe("Nuestro primer suite de pruebas con Cypress", () =>{

    it('Registrarse en Pushing IT', () => {
        var numeroRandom = Math.floor(Math.random() * 1000)
        cy.visit("/");
        cy.get('#user').type("Fabrziopushingit2");
        cy.get('#user').clear()
        cy.get('#user').type(`pushingIt${numeroRandom}`);
        cy.get('#pass').type("123456!");
        cy.get(':nth-child(1) > input[value="Male"]').check({force: true});
        cy.get('#day').select("9");
        cy.get('#month').select("September");
        cy.get("#year").select(0);
        cy.get('#submitForm').click();
    });
});