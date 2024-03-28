import { Injectable } from '@angular/core';
import { Cliente } from '../../modelo/cliente';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

    setItem(key: string, value: string): void {
      localStorage.setItem(key, value);
    }

    getItem(key: string): string | null {
      return localStorage.getItem(key);
    }
  
    removeItem(key: string): void {
      localStorage.removeItem(key);
    }
  
    clear(): void {
      localStorage.clear();
    }
}
