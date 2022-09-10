describe('Desafio-4', () => { 

    it("Deberia registarse, ingresar y luego eliminar el usuario", () =>{
        const id = Math.floor(Math.random() * 10000);
        const userName = "miguel"+id;
        const userPassword = "123456!";
        const userGender ="Male";
        const userDay = "18";
        const userMonth= "06";
        const userYear = "1997";

        cy.request({
            method: 'POST',
            url: "https://pushing-it-backend.herokuapp.com/api/register",
            body:{
                username : userName,
                password: userPassword,
                gender: userGender,
                day: userDay,
                month: userMonth,
                year: userYear,
            }
        }).then(response=> {
            expect(response.status).to.equal(200);
            expect(response.body.newUser.username).to.equal(userName);
            expect(response.body.newUser.gender).to.equal(userGender);
            expect(response.body.newUser.day).to.equal(userDay);
            expect(response.body.newUser.month).to.equal(userMonth);
            expect(response.body.newUser.year).to.equal(userYear);
        }).then(response =>{
            cy.request({
                method: 'POST',
                url: "https://pushing-it-backend.herokuapp.com/api/login",
                body:{
                    username : response.body.newUser.username,
                    password: userPassword,
                }
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.user.username).to.equal(userName);
            }).then(response =>{
                cy.request({
                    method: "DELETE",
                    url: "https://pushing-it-backend.herokuapp.com/api/delete/"+response.body.user.username,
                    failOnStatusCode: false
                }).then(response=>{
                    expect(response.status).to.equal(404);
                })
            })
        })
    })
})
