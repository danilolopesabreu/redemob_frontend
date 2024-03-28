import { Solicitacao } from "./solicitacao";

export class Cliente {
    id:number;
    nomeCompletoTitular:string;
    nomeCompletoMaeTitular:string;
    dataNascimento:string;
    cpf:string;
    fotoRosto:string;
    identidade:string;
    comprovanteResidencia:string;
    senha:string;
    municipio:number;
    solicitacoes:Array<Solicitacao>;

    public constructor(init?: Partial<Cliente>) {
        Object.assign(this, init);
    }

}