import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-log-in',
  imports: [],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css'
})

export class LogIn {
  itsMain = false;

  constructor(private router: Router){
    this.router.events
    .pipe(filter(event =>event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.itsMain = event.urlAfterRedirects === '/';
    })
  }

  goToOrders(){
    this.router.navigate(['order/order.html']);
  }

  closeModal() {
    this.router.navigate(['/'], { state: { isLoggedIn: true } });
  }
}
