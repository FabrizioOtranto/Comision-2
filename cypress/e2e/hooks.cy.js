/// <reference types="cypress" />
describe('Hooks', () => {
    let usuario, contraseña;

    before("Before", () => {
        cy.log("Before")
         usuario = "pushingit"
         contraseña = "123456!"
    })

    beforeEach("Before each", () => {
        cy.log("Before each se esta ejecutando");
        cy.visit("/")
        cy.get("#registertoggle").dblclick();
    })

    it('Ingresar al sistema con datos validos', () => {
        cy.get("#user").type(usuario);
        cy.get("#pass").type(contraseña);
        cy.xpath("//button[contains(text(), 'Log in')]").click();
        cy.get(`[id*='user_${usuario}_']`).should("be.visible")
    });

    it('Segundo test', () => {
        cy.get("#user").type(usuario);
        cy.get("#pass").type(contraseña);
        cy.xpath("//button[contains(text(), 'Log in')]").click();
        cy.get("p").contains("Las credenciales son invalidas").should("have.text", "Las credenciales son invalidas");
    });

    afterEach("After each", () => {
        cy.log("after each")
        contraseña = "1234567!"
    })

    after("After", () => {
        cy.log("After")
    })
})