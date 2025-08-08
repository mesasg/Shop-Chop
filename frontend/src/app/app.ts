import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
// 1. Importa CommonModule aquí
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  // 2. Añade CommonModule a la lista de imports
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showHeader: boolean = true;
  isLoggedIn: boolean = false; 
  cartCount= 0;
  protected readonly title = signal('angularSC');

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showHeader = !event.urlAfterRedirects.includes('/log-in') && !event.urlAfterRedirects.includes('/register');
      });
  }
}