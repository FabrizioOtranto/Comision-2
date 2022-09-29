
///<reference types="cypress" />



describe('Api testing', () => {

    it("Ingresar en pushingIT utilizando rqeuest", () => {
        cy.request({
            method: "POST",
            url: "https://pushing-it-backend.herokuapp.com/api/register",
            body: {
                "username": "quelysapis9",
                "password": "123456!",
                "gender": "Female",
                "day": "26",
                "month": "September",
                "year": "1985"
            }
        }).then(respuesta =>{
            cy.request({
                method: "POST", 
                url: "https://pushing-it-backend.herokuapp.com/api/login",
                body: {
                "username": "quelysapis9",
                "password": "123456!",
                }
            }).then(respuesta => {
                window.localStorage.setItem("user", respuesta.body.user.username)
            })
            cy.visit("/")
        }).then(respuesta =>{
            cy.request({
                method: "DELETE",
                url: "https://pushing-it-backend.herokuapp.com/api/deleteuser/quelysapis9"
            }).then(respuesta => {
                expect(respuesta.status).to.equal(200)
            })
        })
    })
})
