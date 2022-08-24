/// <reference types="cypress" />
describe('Esperas', () => {
    let datosLogin, titulo;

    before("Before", () => {
        cy.fixture("loginData").then(datos => {
            datosLogin = datos;
        })
        titulo = "Waits"
    })
    beforeEach("Before each", () => {
        cy.visit("/")
        cy.get("#registertoggle").dblclick();
        cy.get("#user").type(datosLogin.usuario);
        cy.get("#pass").type(datosLogin.contraseña);
        cy.xpath("//button[contains(text(), 'Log in')]").click();
        cy.get(`[id*='user_${datosLogin.usuario}_']`).should("be.visible")
        cy.get("a#waitslink").click();
        cy.get("[name='wait']").dblclick();
    })
    
    it('Espera estatica por el mensaje', () => {
        cy.wait(10000)
        cy.get("#message").should("have.text", "You have waited for ten seconds, CONGRATULATIONS")
    });

    it('Espera dinamica por el mensaje utilizando timeout', () => {
        cy.get("#message", {timeout:20000}).should("be.visible")
    });

    it('Espera dinamica por el mensaje utilizando timeout con asersion', () => {
        cy.get("#message", {timeout:15000}).should("have.text", "You are a man of patience and have waited fifteen seconds")
    });

    it('Esperar que la mascara de carga desaparezca', () => {
        cy.get("[role='progressbar']",{timeout:10000}).should("not.exist")
        cy.get("#message").should("exist")
    });

    it('Espera dinamica por el mensaje utilizando timeout con asersion validando el color', () => {
        cy.get("#message", {timeout:15000}).should("have.css", "color", "rgb(0, 0, 0)")
        cy.get("#message", {timeout:15000}).should("have.css", "color", "rgb(51, 255, 255)")
    });

    it('Espera dinamica por el mensaje utilizando timeout validando el texto y luego invocandolo', () => {
        cy.get("#message", {timeout:20000}).should("have.text","You are a man of patience and have waited fifteen seconds" ).invoke("text").then(texto =>{
            expect(texto).to.equal("You are a man of patience and have waited fifteen seconds")
        })
    });

    it('Esperar que la barra de carga no exista utilizando commands', () => {
        cy.esperaBarraDeCarga()
        cy.get("#message").should('exist')
    });
})