import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Auth } from '../auth'; // Asegúrate de que esta ruta sea correcta

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
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
  direccion: string = '';
  celular: string= '';

  constructor(private router: Router, private auth: Auth) {
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
      direccion: this.direccion,
      celular: this.celular,
    };

    console.log('Datos de registro:', datos);
    
    // Asume que el registro fue exitoso y que el usuario ha iniciado sesión.
    // Llama al método login() de tu servicio de autenticación.
    this.auth.login();
    
    // Ahora navegas a la página principal, que ya reflejará el estado de login.
    this.router.navigate(['/']);
  }

  closeModal() {
    this.router.navigate(['/']);
  }
}
