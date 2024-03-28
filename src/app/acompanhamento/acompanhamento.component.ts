import { Component, OnInit } from '@angular/core';
import { AcompanhamentoService } from '../services/acompanhamento/acompanhamento.service';
import { LocalstorageService } from '../services/localstorage/localstorage.service';
import { Cliente } from '../modelo/cliente';
import { municipios } from '../util/municipios';

@Component({
  selector: 'app-acompanhamento',
  templateUrl: './acompanhamento.component.html',
  styleUrl: './acompanhamento.component.css'
})
export class AcompanhamentoComponent implements OnInit{
  
  cliente:Cliente;
  mensagem:string;

  constructor(
    private acompanhamentoService:AcompanhamentoService,
    private localstorageService:LocalstorageService){
  }

  ngOnInit(): void {
    let clienteString = this.localstorageService.getItem("clienteLogado");
    this.cliente = <Cliente>JSON.parse(clienteString);
  }

  novaSolicitacao(){
    if(this.hasSolicitacaoAprovada()){
      this.mensagem = "Você já possui solicitação aprovada";
      return;
    }

    if(this.contarQtdSolicitacaoPendente() >= 1){
      this.mensagem = "Aguarde atualização da Situação para fazer nova solicitação";
      return;
    }

    if(this.contarQtdSolicitacaoRecusada() < 2){
      this.acompanhamentoService.novaSolicitacao(this.cliente).subscribe(
        solicitacao => {
          this.cliente.solicitacoes.push(solicitacao);
        }
      );
    }else{
      this.mensagem = "O Limite de solicitações recusadas foi alcançado";
    }
  }

  contarQtdSolicitacaoRecusada(){
    let contador = 0;
    this.cliente.solicitacoes.forEach( (umaSolicitacao) =>{
        if(umaSolicitacao.aprovado === false){
            contador++;
        }
    });
    return contador;
  }

  contarQtdSolicitacaoPendente(){
    let contador = 0;
    this.cliente.solicitacoes.forEach( (umaSolicitacao) =>{
        if(umaSolicitacao.aprovado === null){
            contador++;
        }
    });
    return contador;
  }

  hasSolicitacaoAprovada(){
    let aprovada = false;
    this.cliente.solicitacoes.forEach( (umaSolicitacao) =>{
        if(umaSolicitacao.aprovado === true){
          aprovada = true;
        }
    });
    return aprovada;
  }
  
  descricaoMunicipio(idMunicipio:number){
    let municipio = municipios.filter(({ id }) => id == idMunicipio);
    return municipio[0];
  }

}
