export class Navbar {

    verificarUsuario(usuario){
        cy.get(`[id^='user_${usuario}_']`).should("be.visible")
    }
}