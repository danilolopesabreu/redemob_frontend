import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import moment from 'moment';

export function maiorIdadeValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        let nascimento = moment(value, 'DD/MM/yyyy').toDate();
        let ageDifMs = Date.now() - nascimento.getTime();
        let ageDate = new Date(ageDifMs); 
        let idade = Math.abs(ageDate.getUTCFullYear() - 1970);
        console.log(idade);

        const maiorIdade = idade >= 18;

        return !maiorIdade ? {maiorIdade:true}: null;
    }
}