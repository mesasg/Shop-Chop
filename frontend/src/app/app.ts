import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Auth } from './auth'; // Asegúrate de que la ruta del servicio sea correcta

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  showHeader: boolean = true;
  isLoggedIn: boolean = false; 
  cartCount= 0;
  protected readonly title = signal('angularSC');

    constructor(private router: Router, private auth: Auth) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;

        // Ocultamos solo en estas páginas
        const ocultarEn = ['/log-in', '/register', '/create-recipe'];

        // Si la ruta empieza por profile y el usuario está loggeado, no ocultar el header
        if (url.startsWith('/profile') && this.isLoggedIn) {
          this.showHeader = true;
        } else {
          this.showHeader = !ocultarEn.some(ruta => url.startsWith(ruta));
        }
        
      });
  }

  ngOnInit(): void {
    // Nos suscribimos al Observable de isLoggedIn$ de nuestro servicio de autenticación.
    // Esto asegura que la propiedad 'isLoggedIn' de este componente se mantenga
    // sincronizada con el estado global de la aplicación.
    this.auth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }
}