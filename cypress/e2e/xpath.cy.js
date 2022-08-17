describe('Xpaths', () => { 

    it("Localizar elementos con xpath utilizando contains", () =>{
        cy.visit("/")
        cy.xpath("//input[contains(@class,'password')]")
    })

    it("Localizar varios elementos con xpath y luego filtrando con cssSelector", () =>{
        cy.visit("/")
        cy.xpath("//input").get("#user")
    })

    it("Localizar elemento con xpath utilizando el operador logico and", () =>{
        cy.visit("/")
        cy.xpath('//input[@id="user" and @name="user"]')
    })
    
    it("Localizar elemento con xpath utilizando el operador logico or", () =>{
        cy.visit("/")
        cy.xpath('//input[@id="user" or @name="user"]')
    })

    it("Localizar elemento con xpath utilizando el operador logico not", () =>{
        cy.visit("/")
        cy.xpath("//input[@id='user' and not(@name='pass')]")
    })

    it("Localizar elemento con xpath utilizando el metodo starts-with", () =>{
        cy.visit("/")
        cy.xpath("//*[starts-with(@id,'us')]")
    })
    it("Localizar elemento con xpath utilizando el metodo text", () =>{
        cy.visit("/")
        cy.xpath("//*[text()='Iniciá sesión']")
    })
    
    it("Localizar elemento con xpath combinando text y contains", () =>{
        cy.visit("/")
        cy.xpath("//*[contains(text(),'Iniciá sesión')]")
    })

    it("Localizar elemento con xpath combinando text y starts-wtih", () =>{
        cy.visit("/")
        cy.xpath("//*[starts-with(text(),'Iniciá')]")
    })

    it("Localizar elementos utilizando descendant", () =>{
        cy.xpath("//div[@role='group']//descendant::option[text()='5']")
    })

    it("Localizar elementos utilizando ancestor", () =>{
        cy.xpath("//option[text()='5']//ancestor::div[@role='group']")
    })

    it("Localizar elementos utilizando ancestor", () =>{
        cy.xpath("//option[text()='5']//ancestor::div[@role='group']")
    })

    it("Localizar elementos utilizando children", () =>{
        cy.xpath("//select[@id='day']//child::option[text()='5']")
    })
 
    it("Localizar elementos utilizando parent", () =>{
        cy.xpath("//option[text()='5']//parent::select[@id='day']")
    })

    it('Localizar elemento utilizando preceding-sibling', () => {
        cy.xpath("//input[@id='user']//preceding-sibling::label")
    });

    it('Localizar elemento utilizando following-sibling', () => {
        cy.xpath("//label[@for='user']//following-sibling::input")
    });
})

