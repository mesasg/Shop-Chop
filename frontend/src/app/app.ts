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
  protected readonly title = signal('angularSC');
  itsMain = false;

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
}
