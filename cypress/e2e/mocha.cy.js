describe("Primer suite de pruebas", () => {
    var curso = 'pushing it'
    it.only("Primer test con Mocha", () => {
        cy.log("Nuestro primer test en " + curso)
    })

    it.only("Tercer test con Mocha", () => {
        cy.log("Nuestro tercer test en " + curso)
    })

    it("Cuarto test con Mocha", () => {
        cy.log("Nuestro cuarto test en " + curso)
    })
})

it.skip("Segundo test con Mocha", () => {
    cy.log("Nuestro primer test en " + curso)
})