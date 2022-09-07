/// <reference types="cypress" />

import { RegistroPage } from "../support/pages/registroPage"
import { LoginPage } from "../support/pages/loginPage"
import { Navbar } from "../support/pages/navbar"
import { TodoListPage }  from "../support/pages/todoListPage"
import { HomePage } from "../support/pages/homePage"

describe('Page object model', () => {
    let  datosLogin, tarea1, tarea2;
    const registroPage = new RegistroPage();
    const loginPage = new LoginPage();
    const navbar = new Navbar();
    const todoListPage = new TodoListPage();
    const homePage = new HomePage();

    before("Before", () => {
        cy.fixture("loginData").then(datos => {
            datosLogin = datos;
        })
        tarea1 = "Tarea 1"
        tarea2 = "Tarea 2"
    })
    beforeEach("Before each", () => {
        cy.visit("/")
        registroPage.clickIniciarSesionButton();
        loginPage.login(datosLogin.usuario, datosLogin.contraseña);
        navbar.verificarUsuario(datosLogin.usuario)
        homePage.clickTodoListLink();
    })

    it("deberia agregar 2 tareas y completar la primer tarea", () => {
        todoListPage.escribirTarea(tarea1);
        todoListPage.clickSendButton();
        todoListPage.escribirTarea(tarea2);
        todoListPage.clickSendButton();
        todoListPage.completarTarea(tarea1)
    })

    it("deberia agregar 2 tareas y eliminar la segundar tarea", () => {
        todoListPage.escribirTarea(tarea1);
        todoListPage.clickSendButton();
        todoListPage.escribirTarea(tarea2);
        todoListPage.clickSendButton();
        todoListPage.eliminarTarea(tarea2)
    })
})
