import { RegistroPage } from "../support/pages/registroPage"
import { LoginPage } from "../support/pages/loginPage"
import { Navbar } from "../support/pages/navbar"

describe('Screenshot', () => {     
    const registroPage = new RegistroPage();
    const loginPage = new LoginPage();
    const navbar = new Navbar();
    it("Tomar una foto a pantalla completa", () => {
        cy.visit("/")
        registroPage.clickIniciarSesionButton();
        loginPage.login("pushingit", "123456!");
        navbar.verificarUsuario("pushingit")
        cy.screenshot({capture: "fullPage"})
    })

    it("tomar una foto de un elemento", () => {5
        cy.visit("/")
        registroPage.clickIniciarSesionButton();
        loginPage.login("pushingit", "123456!");
        navbar.verificarUsuario("pushingit")
        cy.get(`[id^='user_pushingit_']`).screenshot("usuario")
    })

 })