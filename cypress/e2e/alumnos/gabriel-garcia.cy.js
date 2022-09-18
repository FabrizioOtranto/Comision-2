/// <reference types="cypress"/>
describe("Desafio 4", () => {
  it("Enviar peticios post, registrar usuario y encadenar una peticion delete que elimine el usuario", () => {

    const nombreUsuario = "Gabriel1234" + Math.floor(Math.random()*1000);
    const password = "Password1!";
    const gender = "Male";
    const dateOfBirth = 1;
    const monthOfBirth = "February";
    const yearOfBirth = 1997;

    cy.request({
      method: "POST",
      url: "https://pushing-it-backend.herokuapp.com/api/register",
      body: {
        username: nombreUsuario,
        password: password,
        gender: gender,
        day: dateOfBirth,
        month: monthOfBirth,
        year: yearOfBirth,
      },
    }).then((respuesta) => {
        expect(respuesta.status).to.equal(200);
      }).then(() => {
        cy.request({
          method: "POST",
          url: "https://pushing-it-backend.herokuapp.com/api/login",
          body: {
            username: nombreUsuario,
            password: password,
          },
        }).then((respuesta) => {
          expect(respuesta.status).to.equal(200);
          cy.log(respuesta)
          expect(respuesta.body.user.username).to.equal(nombreUsuario.toLowerCase())
        }).then(()=>{
            cy.request({
                method: "DELETE",
                url : "https://pushing-it-backend.herokuapp.com/api/deleteuser/" + nombreUsuario.toLowerCase()
            }).then(respuesta=>{
                expect(respuesta.status).to.equal(200);
            })
        })
      });
  });
});
