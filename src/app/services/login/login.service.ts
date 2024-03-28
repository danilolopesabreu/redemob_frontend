import { Injectable } from '@angular/core';
import { Login } from '../../modelo/login';
import { Cliente } from '../../modelo/cliente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlBase = "http://localhost:8088/acesso-restrito";

  constructor(private http: HttpClient) { }

  login(login:Login){
    return this.http.post<Cliente>(this.urlBase+"/login", login);
  }
}
