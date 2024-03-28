import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../../modelo/cliente';
import { Solicitacao } from '../../modelo/solicitacao';

@Injectable({
  providedIn: 'root'
})
export class AcompanhamentoService {
    
  urlBase = "http://localhost:8088";

  constructor(private http: HttpClient) { }

  listarClientesComSolicitacaoSemAvaliacao(){
    return this.http.get<Cliente[]>(this.urlBase+"/cliente/semavaliacao");
  }

  alterarSituacaoSolicitacao(solicitacao: Solicitacao) {
    return this.http.post<Solicitacao>(this.urlBase+"/solicitacao/avaliacao", solicitacao);
  }

  novaSolicitacao(cliente:Cliente){
    return this.http.post<Solicitacao>(this.urlBase+"/solicitacao/cliente/"+cliente.id, {});
  }

}
