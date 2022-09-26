/// <reference types="cypress" />
describe('Desafio 4', () => {
    it("Registro de usuario en PushingIT via POST", () => {
           const usuario = Math.floor(Math.random() * 10000).toString()
           const password = "123456!"
           const gender = "Male"
           const year = "1990"
           const month = "05"
           const day = "10"
           const url_home = "https://pushing-front.vercel.app/"
           const url_register = "http://pushing-it.herokuapp.com/api/register"
           const url_login = "https://pushing-it-backend.herokuapp.com/api/login"
           const url_delete = "https://pushing-it-backend.herokuapp.com/api/deleteuser/"
   
                cy.request(
                    {
                        url: url_register,
                        method: "POST",
                        body: {
                            "username": usuario,
                            "password": password,
                            "gender": gender,
                            "year": year,
                            "month": month,
                            "day": day
                   }
               }).then(({body, status}) => {
                expect(status).to.equal(200)
                expect(body.newUser.username).to.equal(usuario)

            }).then(() => {                
                cy.request(
                    {
                        url: url_login,
                        method: "POST",
                        body: {
                            "username": usuario,
                            "password": password,
                        }
                    
                }).then(({status, body}) => {
                    
                    expect(status).to.equal(200)
                    expect(body.user.username).to.equal(usuario)
                })  

           cy.visit(url_home)
           
           }).then(() => {                
                cy.request(
                    {
                        url: url_delete + usuario,
                        method: "DELETE",
                    }
                )
           }).then(() => {

                cy.request( {
                    method: "GET",
                    url: url_delete + usuario,
                    failOnStatusCode: false
                }).then(({status}) =>{
                    expect(status).to.equal(404)
                })
        })

       })
   
   })