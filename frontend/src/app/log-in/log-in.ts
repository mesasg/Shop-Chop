import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css'
  
})

export class LogIn {
  itsMain = false;
  correo = new FormControl('');
  contrasena = new FormControl('');

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

  autentificar(){

  }
}
