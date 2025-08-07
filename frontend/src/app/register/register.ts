import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  itsRegister = false;

  constructor(private router: Router){
    this.router.events
    .pipe(filter(event =>event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.itsRegister = event.urlAfterRedirects === '/';
    })
  }
   goToRegister(){
    this.router.navigate(['register/register.html']);
  }
}
