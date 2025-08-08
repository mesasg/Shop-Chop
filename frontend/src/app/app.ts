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
        this.showHeader = !event.urlAfterRedirects.includes('/log-in') &&
                         !event.urlAfterRedirects.includes('/register');
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