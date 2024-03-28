import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AcompanhamentoComponent } from './acompanhamento/acompanhamento.component';
import { AdministracaoComponent } from './administracao/administracao.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NaoautorizadoComponent } from './naoautorizado/naoautorizado.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { SairComponent } from './sair/sair.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    AcompanhamentoComponent,
    AdministracaoComponent,
    LoginComponent,
    NaoautorizadoComponent,
    SairComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask({})],
  bootstrap: [AppComponent]
})
export class AppModule { }
