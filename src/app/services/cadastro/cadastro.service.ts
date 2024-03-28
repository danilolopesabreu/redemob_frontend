import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../../modelo/cliente';


@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  urlBase = "http://localhost:8088/cliente";

  constructor(private http: HttpClient) { }

  cadastrarCliente(cliente:Cliente){
    return this.http.post<Cliente>(this.urlBase, cliente);
  }

}
