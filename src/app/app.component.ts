import { Cliente } from './modelo/cliente';
import { LocalstorageService } from './services/localstorage/localstorage.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  cliente:Cliente;
  constructor(private localstorageService:LocalstorageService){

  }
}
