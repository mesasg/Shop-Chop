import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  searchQuery = '';
  isLoggedIn = false;
  protected readonly title = signal('angularSC');
  itsMain = false;
  cartCount = 0;

  constructor(private router: Router){
    this.router.events
    .pipe(filter(event =>event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.itsMain = event.urlAfterRedirects === '/';
    })
  }

  goToLogIn(){
    this.router.navigate(["src\app\log-in\log-in.html"]);
  }
  logout() {
    console.log('Cerrar sesión');
  }

  showCart() {
    console.log('Mostrar carrito');
  }
}
