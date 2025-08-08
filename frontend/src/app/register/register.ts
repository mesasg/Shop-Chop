import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms'; // Import necesario si es standalone

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule], // necesario para [(ngModel)]
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  itsRegister = false;

  // Variables para los inputs
  nombre: string = '';
  email: string = '';
  identificacion: string = '';
  contrasena: string = '';
  telefono: string = '';
  direccion: string = '';
  celular: string= '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.itsRegister = event.urlAfterRedirects === '/';
      });
  }

  goToRegister() {
    this.router.navigate(['register/register.html']);
  }

  enviarRegistro() {
    const datos = {
      nombre: this.nombre,
      email: this.email,
      contraseña: this.contrasena,
      identificacion: this.identificacion,
      telefono: this.telefono,
      direccion: this.direccion,
      celular: this.celular,
    };

    console.log('Datos de registro:', datos);
    this.router.navigate(['/']);

    // Aquí puedes hacer la petición HTTP al backend si quieres
    // this.http.post('/api/registro', datos).subscribe(...)
  }
}
