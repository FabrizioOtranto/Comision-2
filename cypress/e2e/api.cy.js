/// <reference types="cypress" />
describe('Api testing', () => {

    it("Primer test de api rest", () => {
        cy.request("http://localhost:3000/posts").then(respuesta => {
            expect(respuesta.status).to.equal(200)
            cy.log(respuesta)
        })
    })

    it("Segundo  test de api rest utilizando params", () => {
        cy.request(
            {
                url: "http://localhost:3000/posts",
                method: "GET",
                qs: {
                    id:5
                }
            }
        ).then(respuesta => {
            expect(respuesta.status).to.equal(200)
            cy.log(respuesta.body)
        })
    })

    it("Peticion GEt utilizando sort", () => {
        cy.request(
            {
                url: "http://localhost:3000/posts",
                method: "GET",
                qs: {
                    _sort: "id",
                    _order: "desc"
                }
            }
        ).then(respuesta => {
            expect(respuesta.status).to.equal(200)
            cy.log(respuesta.body)
        })
    })

    it("Peticion GEt utilizando slides", () => {
        cy.request(
            {
                url: "http://localhost:3000/posts",
                method: "GET",
                qs: {
                    _start: "0",
                    _end: "10"
                }
            }
        ).then(respuesta => {
            expect(respuesta.status).to.equal(200)
            cy.log(respuesta.body)
        })
    })

    it("Peticion GEt utilizando rangos", () => {
        cy.request(
            {
                url: "http://localhost:3000/posts",
                method: "GET",
                qs: {
                    id_gte: "1",
                    id_lte: "10"
                }
            }
        ).then(respuesta => {
            expect(respuesta.status).to.equal(200)
            cy.log(respuesta.body)
        })
    })

    it("Peticion GEt excluyendo resultados", () => {
        cy.request(
            {
                url: "http://localhost:3000/posts",
                method: "GET",
                qs: {
                    id_ne: ["3", "2"],
                }
            }
        ).then(respuesta => {
            expect(respuesta.status).to.equal(200)
            cy.log(respuesta.body)
        })
    })

    it("Peticion POST", () => {
        const id = Math.floor(Math.random() * 10000)
        const userID = 3
        const title =  "Pushing IT"
        const body = "Curso Pushing IT"

        cy.request(
            {
                url: "http://localhost:3000/posts",
                method: "POST",
                body: {
                    "userId": userID,
                    "id": id,
                    "title": title,
                    "body": body
                }
            }
        ).then(respuesta => {
            expect(respuesta.status).to.equal(201)
            expect(respuesta.body.id).to.equal(id)
            expect(respuesta.body.title).to.equal(title)

        })
    })

    it("Peticion POST utilizando destructuring", () => {
        const id = Math.floor(Math.random() * 10000)
        const userID = 3
        const title =  "Pushing IT"
        const body = "Curso Pushing IT"

        cy.request(
            {
                url: "http://localhost:3000/posts",
                method: "POST",
                body: {
                    "userId": userID,
                    "id": id,
                    "title": title,
                    "body": body
                }
            }
        ).then(({body, status, headers}) => {
            expect(status).to.equal(201)
            expect(body.id).to.equal(id)
            expect(body.title).to.equal(title)
            cy.log(headers)

        })
    })

    it("Peticiion POST agregando headers", () => {
        const id = Math.floor(Math.random() * 10000)
        const userID = 3
        const title =  "Pushing IT"
        const body = "Curso Pushing IT"

        cy.request(
            {
                url: "http://localhost:3000/posts",
                method: "POST",
                body: {
                    "userId": userID,
                    "id": id,
                    "title": title,
                    "body": body
                },
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(({body, status, headers}) => {
            expect(status).to.equal(201)
            expect(body.id).to.equal(id)
            expect(body.title).to.equal(title)
            cy.log(headers)

        })
    })

    it("Peticion PUI", () => {
        const id = 20
        const userID = 3
        const title =  "Pushing IT"
        const body = "Curso Pushing IT"

        cy.request(
            {
                url: "http://localhost:3000/posts/" + id,
                method: "PUT",
                body: {
                    "userId": userID,
                    "title": title,
                    "body": body
                }
            }
        ).then(respuesta => {
            expect(respuesta.status).to.equal(200)
            expect(respuesta.body.id).to.equal(id)
            expect(respuesta.body.title).to.equal(title)

        })
    })

    it("Peticion DELETE", () => {
        const id  = 15
        cy.request(
            {
                url: "http://localhost:3000/posts/" + id,
                method: "DELETE",
            }
        ).then(respuesta => {
            expect(respuesta.status).to.equal(200)
        })
    })

    it("Peticion PUT y luego encadenar una peticion DELETE", () => {
        const id = 52
        const userID = 3
        const title =  "Pushing IT"
        const body = "Curso Pushing IT"

        cy.request(
            {
                url: "http://localhost:3000/posts/" + id,
                method: "PUT",
                body: {
                    "userId": userID,
                    "title": title,
                    "body": body
                }
            }
        ).then(respuesta => {
            expect(respuesta.status).to.equal(200)
            expect(respuesta.body.id).to.equal(id)
            expect(respuesta.body.title).to.equal(title)
        }).then(respuesta =>{
            cy.request({
                url: "http://localhost:3000/posts/" + respuesta.body.id, 
                method : "DELETE"
            }).then(respuesta => {
                expect(respuesta.status).to.equal(200)
            }).then(() => {
                cy.request( {
                    method: "GET",
                    url: "http://localhost:3000/posts/" + id,
                    failOnStatusCode: false
                }).then(respuesta =>{
                    expect(respuesta.status).to.equal(404)
                })
            })
        })
    })

    it.only("Ingresar en pushingIT utilizando rqeuest", () =>{
        cy.request({
            method: "POST", 
            url: "https://pushing-it-backend.herokuapp.com/api/login",
            body: {
                "username":"pushingit",
                "password": "123456!"
            }
        }).then(respuesta => {
            window.localStorage.setItem("token", respuesta.body.token)
            window.localStorage.setItem("user", respuesta.body.user.username)
        })
        cy.visit("/")
    })
})