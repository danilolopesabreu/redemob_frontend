import { Component } from '@angular/core';
import { AcompanhamentoService } from '../services/acompanhamento/acompanhamento.service';
import { Cliente } from '../modelo/cliente';
import { saveAs } from 'file-saver';
import { municipios } from '../util/municipios';

@Component({
  selector: 'app-administracao',
  templateUrl: './administracao.component.html',
  styleUrl: './administracao.component.css'
})
export class AdministracaoComponent {
  
  clientes:Array<Cliente>;

  constructor(private acompanhamentoService:AcompanhamentoService){
  }

  ngOnInit(): void {
    this.acompanhamentoService.listarClientesComSolicitacaoSemAvaliacao().subscribe(
      clientes => {
        this.clientes = clientes;
        let cli = new Cliente();
        cli.cpf = "99999999999";
        this.removerDaListaDeClientesParaAprovacao(cli);
      }
    );
  }

  aprovar(cliente:Cliente){  
    let solicitacao = cliente.solicitacoes[0];
    solicitacao.aprovado = true;
    
    this.acompanhamentoService.alterarSituacaoSolicitacao(solicitacao).subscribe(
      clientes => {
        console.log(clientes);
      }
    );

    this.removerDaListaDeClientesParaAprovacao(cliente);
  }

  reprovar(cliente:Cliente){
    let solicitacao = cliente.solicitacoes[0];
    solicitacao.aprovado = false;
    this.acompanhamentoService.alterarSituacaoSolicitacao(solicitacao).subscribe(
      clientes => {
        console.log(clientes);
      }
    );;
    this.removerDaListaDeClientesParaAprovacao(cliente);
  }

  removerDaListaDeClientesParaAprovacao(cliente:Cliente){
    this.clientes = this.clientes.filter( ({ cpf }) => cpf !== cliente.cpf);
  }

  baixarFotoRosto(cliente:Cliente){
    this.gerarDownload(cliente.fotoRosto, "fotoRosto_"+cliente.cpf);
  }
  
  baixarFotoIdentidade(cliente:Cliente){
    this.gerarDownload(cliente.identidade, "fotoIdentidade_"+cliente.cpf);
  }

  baixarFotoCompResidencia(cliente:Cliente){
    this.gerarDownload(cliente.comprovanteResidencia, "fotoCompResidencia_"+cliente.cpf);
  }

  gerarDownload(base64:any, nomeArquivo:string){
    let blob = new Blob([base64], {type: "data:image/jpg;base64,"});
    saveAs(blob, nomeArquivo+".jpg");
    // let link = document.createElement("a");
    // link.href = URL.createObjectURL(blob);
    // link.download = nomeArquivo+".jpg";
    // link.click();
    // link.remove();
  }
  
  descricaoMunicipio(idMunicipio:number){
    let municipio = municipios.filter(({ id }) => id == idMunicipio);
    return municipio[0];
  }
}
