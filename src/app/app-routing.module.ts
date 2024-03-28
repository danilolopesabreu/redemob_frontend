import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AcompanhamentoComponent } from './acompanhamento/acompanhamento.component';
import { AdministracaoComponent } from './administracao/administracao.component';
import { LoginComponent } from './login/login.component';
import { NaoautorizadoComponent } from './naoautorizado/naoautorizado.component';
import { AuthGuardAdmin } from './guard/authGuardAdmin';
import { AuthGuardAcompanhamento } from './guard/authGuardAcompanhamento';
import { SairComponent } from './sair/sair.component';

const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  { path: 'acompanhamento', component: AcompanhamentoComponent, canActivate: [AuthGuardAcompanhamento] },
  { path: 'administracao', component: AdministracaoComponent, canActivate: [AuthGuardAdmin] },
  { path: 'login', component: LoginComponent },
  { path: 'naoautorizado', component: NaoautorizadoComponent },
  { path: 'sair', component: SairComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
