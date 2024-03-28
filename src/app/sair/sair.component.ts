import { Component } from '@angular/core';
import { LocalstorageService } from '../services/localstorage/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sair',
  templateUrl: './sair.component.html',
  styleUrl: './sair.component.css'
})
export class SairComponent {
  constructor(
    private localstorageService:LocalstorageService,
    private router: Router){
      this.localstorageService.removeItem("clienteLogado");
      this.router.navigate(['/cadastro']);
  }
}
