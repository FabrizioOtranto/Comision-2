/// <reference types="cypress" />
describe('Asersiones', () => {
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
        cy.get(`[id*='user_${datosLogin.usuario}_']`, {timeout:11000}).should("be.visible")
        cy.get("a#waitslink").click();
    })

    it('Validar el titulo waits utilizando should', () => {
        cy.get("#title").should("have.text", titulo)
    });

    it('Validar el titulo waits utilizando expect', () => {
        cy.get("#title").invoke("text").then(texto => {
            expect(texto).is.equal(titulo)
        })
    });

    it('Validar el titulo waits utilizando assert', () => {
        cy.get("#title").invoke("text").then(texto => {
            assert.equal(texto, titulo);
        })
    });

    it('Valida la cantidad de elementos cuyo id es title', () => {
        cy.get("#title").should("have.length", "1")
    });

    it('Valida la cantidad de caracteres que tiene el titulo', () => {
        cy.get("#title").invoke("text").should("have.length", "5")
    });

    it('Valida la cantidad de caracteres que tiene el titulo utilizando expect', () => {
        cy.get("#title").invoke("text").then(texto => {
            expect(texto).to.have.length(5, "La cantidad de caracteres es invalida")
        })
    });

    it('Valida la cantidad de caracteres que tiene el titulo utilizando assert', () => {
        cy.get("#title").invoke("text").then(texto => {
            assert.lengthOf(texto, 5);
        })
    });

    it('Validando utilizando mas de una asersiones', () => {
        cy.get("#title").should("be.visible").and("have.text", titulo);
    });

    it('Validando que el boton tenga atributo nombre valor wait', () => {
        cy.get("#wait").invoke("attr", "name").should("equal", "wait");
    });

    it('Validando que el boton tenga atributo nombre valor wait', () => {
        cy.get("#wait").invoke("attr", "name").then(name =>{
            expect(name).equal("waits");
        })
    });

    it('Validando que el boton tenga atributo nombre valor wait sin usar invoke', () => {
        cy.get("#wait").should("have.attr", "name", "wait");
    });
})