import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { municipios } from '../util/municipios';
import { CadastroService } from '../services/cadastro/cadastro.service';
import { Cliente } from '../modelo/cliente';
import { Observable, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import moment from 'moment';
import { LocalstorageService } from '../services/localstorage/localstorage.service';
import { CommonService } from '../services/login/commonService';
import { MensagemService } from '../services/mensagem/mensagem.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {
  
  cadastroForm:FormGroup;
  municipios = municipios;
  selectedFile: ImageSnippet;
  submitted = false;
  base64FotoRosto: string;
  base64FotoIdentidade: string;
  base64FotoComprovanteEndereco: string;
  msgMaiorIdade: boolean;

  constructor(
    private fb: FormBuilder, 
    private cadastroService:CadastroService,
    private localstorageService:LocalstorageService,
    private router: Router,
    private commonService:CommonService,
    private mensagemService:MensagemService){
  }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nomeCompletoTitular: ["", Validators.required],
      dataNascimento: ["", Validators.required],
      cpf: ["", Validators.required],
      nomeCompletoMaeTitular: ["", Validators.required],
      municipio: ["", Validators.required],
      fotoRosto: ["", Validators.required],
      identidade: ["", Validators.required],
      comprovanteResidencia: ["", Validators.required],
      senha: ["", [Validators.required, Validators.maxLength(20), Validators.minLength(8)] ],
    });

  }

  cadastrar(){
    this.submitted = true;
    if(this.cadastroForm.valid){

      let novoCliente = new Cliente(this.cadastroForm.value);
      
      if(this.ehMaiorDeIdade(novoCliente.dataNascimento)){

        novoCliente.fotoRosto = this.base64FotoRosto;
        novoCliente.identidade = this.base64FotoIdentidade;
        novoCliente.comprovanteResidencia = this.base64FotoComprovanteEndereco;
  
        this.cadastroService.cadastrarCliente(novoCliente).subscribe(
          cliente => {
            this.localstorageService.setItem("clienteLogado", JSON.stringify(cliente));
            this.commonService.emitEvent('login');
            this.router.navigate(['/acompanhamento']); 
          },
          error => {
            this.mensagemService.alerta(error.error.message);
          }
        );

      }else{
        this.mensagemService.alerta("Solicitacao disponivel apenas para maiores de 18 anos");
      }
      

    }

  }

  ehMaiorDeIdade(nascimentoString:string){
    let nascimento = moment(nascimentoString, 'DD/MM/yyyy').toDate();
    let ageDifMs = Date.now() - nascimento.getTime();
    let ageDate = new Date(ageDifMs); 
    let idade = Math.abs(ageDate.getUTCFullYear() - 1970);
    console.log(idade);
    return idade >= 18;
  }

  get cadastroFormControl() {
    return this.cadastroForm.controls;
  }

  processarImagem(event, tipoFoto:number){
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      switch(tipoFoto){
        case (1): this.base64FotoRosto = base64; break;
        case (2): this.base64FotoIdentidade = base64; break;
        case (3): this.base64FotoComprovanteEndereco = base64; break;
        default: return;
      }
      
    });
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();

    reader.readAsBinaryString(file);

    reader.onload = (event) => {
      result.next(btoa(event.target.result.toString()));
    };

    return result;
  }

}
