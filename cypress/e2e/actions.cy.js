/// <reference types="cypress" />
describe('Actions', () => {
    let authData, loginComponent, appComponent, tareas, boardCollectionComponent;
    before("Deberia reiniciar la base de datos", () => {
        cy.request({
            method: "DELETE",
            url: "http://localhost:3000/api/users"
        }).then((respuesta) => {
            expect(respuesta.status).equal(204)
        })
        cy.fixture("userActions").then(data => {
            authData = data
        })
        cy.fixture("tareaAction").then(data => {
            tareas = data
        })
    })

    beforeEach("Ingresar en la url y acceder a los componentes", () => {
        cy.visit("http://localhost:3000/")

        cy.component("root").then(component =>{
            appComponent = component
        })

        cy.component("Login").then(component =>{
            loginComponent = component
        })

        cy.component("board-collection").then(component =>{
            boardCollectionComponent = component
        })
    })

    xit("Deberia encontrar el componente app", () => {
        appComponent.showLoginModule = true
        loginComponent.loginCardActive = false
        loginComponent.signupCardActive = true
    })

    it("Deberia registrarse utilizando actions", () => {
        appComponent.showLoginModule = true
        loginComponent.loginCardActive = false
        loginComponent.signupCardActive = true
        loginComponent.signupEmail = authData.user
        loginComponent.signupPassword = authData.password
        loginComponent.signup()
    })

    it("Deberia ingresar utilizando actions", () => {
        appComponent.showLoginModule = true
        loginComponent.loginEmail = authData.user
        loginComponent.loginPassword = authData.password
        loginComponent.login()
    })

    it.only("Deberia ingresar al sistema e ingresar una tarea nueva", () =>{
        appComponent.showLoginModule = true
        loginComponent.loginEmail = authData.user
        loginComponent.loginPassword = authData.password
        loginComponent.login()
        appComponent.showLoginModule = false
        boardCollectionComponent.newBoardInputActive = true
        boardCollectionComponent.newBoardTitle = tareas.tarea
        boardCollectionComponent.createNewBoard()
    })
})