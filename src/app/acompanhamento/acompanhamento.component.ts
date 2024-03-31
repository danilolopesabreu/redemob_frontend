import { Component, OnInit } from '@angular/core';
import { AcompanhamentoService } from '../services/acompanhamento/acompanhamento.service';
import { LocalstorageService } from '../services/localstorage/localstorage.service';
import { Cliente } from '../modelo/cliente';
import { municipios } from '../util/municipios';
import { MensagemService } from '../services/mensagem/mensagem.service';

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
    private localstorageService:LocalstorageService,
    private mensagemService:MensagemService){
  }

  ngOnInit(): void {
    let clienteString = this.localstorageService.getItem("clienteLogado");
    this.cliente = <Cliente>JSON.parse(clienteString);
  }

  novaSolicitacao(){
      
    this.acompanhamentoService.novaSolicitacao(this.cliente).subscribe(
      solicitacao => {
        this.cliente.solicitacoes.push(solicitacao);
      },
      error => {
        this.mensagemService.alerta(error.error.message);
      }
    );
    
  }
  
  descricaoMunicipio(idMunicipio:number){
    let municipio = municipios.filter(({ id }) => id == idMunicipio);
    return municipio[0];
  }

}
