import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  toastOptions = {
    positionClass: 'toast-top-center',
    progressBar: true,
    newestOnTop: true,
  }

  constructor(private toastr: ToastrService) { }

  sucesso(mensagem:string, titulo?:string){
    this.toastr.success(mensagem, titulo, this.toastOptions);
  }

  alerta(mensagem:string, titulo?:string){
    this.toastr.warning(mensagem, titulo, this.toastOptions);
  }

  info(mensagem:string, titulo?:string){
    this.toastr.info(mensagem, titulo, this.toastOptions);
  }

  erro(mensagem:string, titulo?:string){
    this.toastr.error(mensagem, titulo, this.toastOptions);
  }
}
