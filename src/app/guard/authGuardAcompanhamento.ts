import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LocalstorageService } from "../services/localstorage/localstorage.service";
import { Cliente } from "../modelo/cliente";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardAcompanhamento implements CanActivate {
    
    constructor(private localstorageService:LocalstorageService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        let clienteString = this.localstorageService.getItem("clienteLogado");
        let cliente = <Cliente>JSON.parse(clienteString);

        if (!cliente) {
            this.router.navigateByUrl('/login');
            return false;
        } else {
            if(cliente.cpf === "99999999999"){
                this.router.navigateByUrl('/administracao');
                return false;
            }
            return true;
        }
    }
}