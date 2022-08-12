describe("Locanlizando elementos con css Selector", () =>{

    xit("Localizando elementos Utilizando cssSelectors", () =>{
        cy.visit("/");
        cy.get('button').should("exist");
        cy.get('[id="user"]').should('exist');
        cy.get('#user').should('exist');
        cy.get('input#user').should('exist');
        cy.get('input[id="user"]').should('exist');
        cy.get('.password').should('exist')
        cy.get('[class="chakra-input password css-1ekf6i8"]')
    })

    it('Localizando elementos utilizando find', () =>{
        cy.visit('/')
        cy.get('fieldset').find("[value='Male']")
    })  

    it('Localizando elementos utilizando children', () =>{
        cy.visit('/')
        cy.get('#year').children("[value='1995']")
    }) 

    it('Localizando elementos utilizando parent', () =>{
        cy.visit('/')
        cy.get('[value="1995"]').parent('#year')
    }) 

    it('Localizando elementos utilizando hermanos', () =>{
        cy.visit('/')
        cy.get('#user').siblings('label')
    }) 

    it('Localizando elementos utilizando contains', () =>{
        cy.visit('/')
        cy.get('button').contains('Register')
        cy.contains('Register')
        cy.contains('register', {matchCase:false})
    }) 

    it.skip("Utilizando variables dentro de selectores", () =>{
        let usuario = "pushingit"
        cy.get(`[id=user_${usuario}_3]`)
    })

    it.only("ingresar un valor presionando enter", () =>{
        cy.visit('/')
        cy.get("#user").type("usuario {enter}")
        cy.get("#user").clear()
        let user = 'user'
        cy.get("#user").type(`${user} {enter}`)
    })
})