export class Login{
    cpf:string;
    senha:string;

    public constructor(init?: Partial<Login>) {
        Object.assign(this, init);
    }
}