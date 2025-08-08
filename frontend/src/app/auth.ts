import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  // BehaviorSubject es ideal porque mantiene el último valor
  // y notifica a los suscriptores cuando cambia.
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  
  // Exponemos el estado como un Observable para que los componentes
  // puedan suscribirse y reaccionar a los cambios.
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor() { }

  // Método para actualizar el estado a "autenticado".
  // Se llamará cuando el usuario se registre o inicie sesión.
  login() {
    this.isLoggedInSubject.next(true);
  }

  // Método para actualizar el estado a "no autenticado".
  // Se llamará cuando el usuario cierre la sesión.
  logout() {
    this.isLoggedInSubject.next(false);
  }
}
