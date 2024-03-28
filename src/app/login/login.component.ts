import { LoginService } from './../services/login/login.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../modelo/login';
import { LocalstorageService } from '../services/localstorage/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginForm:FormGroup;
  submitted:boolean;

  constructor(
    private fb: FormBuilder,
    private loginService:LoginService,
    private localstorageService:LocalstorageService,
    private router: Router
    ){

    this.loginForm = this.fb.group({
      cpf: ["", Validators.required],
      senha: ["", Validators.required],
    });

  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  login(){
    this.submitted = true;
    let novoLogin = new Login(this.loginForm.value);
    this.loginService.login(novoLogin).subscribe(
      cliente => {
        if(cliente !== null){
          this.localstorageService.setItem("clienteLogado", JSON.stringify(cliente));
          if(cliente.cpf !== '99999999999'){
            this.router.navigate(['/acompanhamento']);
          }else{
            this.router.navigate(['/administracao']);
          }
        }
        
      }
    );
  }
}
