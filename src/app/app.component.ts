import { Router } from '@angular/router';
import { Cliente } from './modelo/cliente';
import { LocalstorageService } from './services/localstorage/localstorage.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from './services/login/commonService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  cliente:Cliente;
  logado: boolean;

  constructor(
    private localstorageService:LocalstorageService,
    private router: Router,
    private commonService: CommonService){
      
  }
  ngOnInit(): void {
    this.commonService.aClickedEvent.subscribe((data: string) => {
      this.logado = true;
    });
  }

  sair(){
    this.localstorageService.removeItem("clienteLogado");
    this.logado = false;
    this.router.navigate(['/cadastro']);
  }

}
