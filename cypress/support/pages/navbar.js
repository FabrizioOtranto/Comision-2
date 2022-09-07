export class Navbar {

    verificarUsuario(usuario){
        cy.get(`[id^='user_${usuario}_']`, {timeout: 10000}).should("be.visible")
    }
}