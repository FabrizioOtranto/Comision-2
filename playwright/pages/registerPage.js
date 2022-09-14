
export class RegisterPage {

    constructor(page){
        this.page = page;
        this.userInput = page.locator("#user")
    }

    async escribirUsuario(usuario){
        await this.userInput.fill(usuario);
    };
}