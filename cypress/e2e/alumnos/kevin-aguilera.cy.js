describe('Desafio4', () => {

  it("Deberia registrarse, ingresar y luego eliminar el usuario", () => {
    const user = "kevin" + Math.floor(Math.random() * 10000);
    const pass = "123456!";

    cy.request({
      url: "https://pushing-it-backend.herokuapp.com/api/register",
      method: "POST",
      body: {
        username: user,
        password: pass,
        gender: "male",
        year: "2022",
        month: "7",
        day: "24"
      }

    }).then(respuesta => {
      expect(respuesta.status).to.equal(200);
      expect(respuesta.body.newUser.username).equal(user);
      cy.log(respuesta)
      
    }).then(respuesta => {
      cy.request({
        url: "https://pushing-it-backend.herokuapp.com/api/login",
        method: "POST",
        body: {
          username: respuesta.body.newUser.username,
          password: pass,
        }

      }).then(respuesta => {
        expect(respuesta.status).to.equal(200);
        expect(respuesta.body.user.username).equal(user);

      }).then(respuesta => {
        cy.request({
          method: "DELETE",
          url: "https://pushing-it-backend.herokuapp.com/api/deleteuser/" + respuesta.body.user.username

        }).then(respuesta => {
          expect(respuesta.status).to.equal(200);
          cy.log(respuesta)
        })
      })
    })
  })
})