export class Usuario {
    static getparse({nombre, email, uid}): Usuario{
        return new Usuario(uid, nombre, email,);
    }
    constructor(
        public uid: string,
        public nombre: string,
        public email: string
    ) { 
    }
}