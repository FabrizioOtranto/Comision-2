/// <reference types="cypress" />
describe('Hooks', () => {
    let datosLogin, datosRegistro, numeroRandom;

    before("Before", () => {
        cy.fixture("loginData").then(datos => {
            datosLogin = datos;
        })
        cy.fixture("registrodata").then(datos => {
            datosRegistro = datos;
        })
        numeroRandom = Math.floor(Math.random() * 1000)
    })
    beforeEach("Before each", () => {
        cy.visit("/")
    })

    it("deberia registrarse correctamente", () =>{
        cy.get("#user").type(datosRegistro.PrimerUsuario.usuario + numeroRandom);
        cy.get("#pass").type(datosRegistro.PrimerUsuario.contraseña);
        cy.get(`[value='${datosRegistro.PrimerUsuario.genero}']`).check({force:true})
        cy.xpath("//button[contains(text(), 'Register')]").click();
        cy.get(`[id*='user_${datosRegistro.PrimerUsuario.usuario + numeroRandom}_']`).should("be.visible")
    })

    it('Ingresar al sistema con datos validos', () => {
        cy.get("#registertoggle").dblclick();
        cy.get("#user").type(datosLogin.usuario + numeroRandom);
        cy.get("#pass").type(datosLogin.contraseña);
        cy.xpath("//button[contains(text(), 'Log in')]").click();
        cy.get(`[id*='user_${datosLogin.usuario + numeroRandom}_']`).should("be.visible")
    });
})