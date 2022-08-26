export class HomePage {
    constructor(){
        this.todolistLink = "#todolistlink"
    }

    clickTodoListLink(){
        cy.get(this.todolistLink).click();
    }
}