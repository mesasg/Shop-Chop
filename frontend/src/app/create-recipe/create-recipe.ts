import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.html',
  styleUrls: ['./create-recipe.css'],
  imports: [CommonModule,  
    FormsModule],
})

export class CreateRecipe {


  // Variables del formulario
  nombre: string = '';
  ingrediente: string = '';
  cantidad: string = '';
  pasos: string = '';

  // Lista de ingredientes agregados
  ingredientes: { nombre: string; cantidad: string }[] = [];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Puedes usar esta lógica para validar navegación si lo necesitas
      });
  }

  // Método llamado al enviar el formulario
  enviarReceta() {
    const receta = {
      nombre: this.nombre,
      ingredientes: this.ingredientes,
      pasos: this.pasos,
      // Aquí podrías agregar lógica para guardar la imagen si haces upload real
    };

    console.log('Receta enviada:', receta);

    // Redirige al home o a otra ruta tras guardar
    this.router.navigate(['/profile'], {
    state: { desdeCreateRecipe: true }
  });
  }

  // Método para agregar un ingrediente
  addIngredient() {
  if (this.ingrediente && this.cantidad) {
    this.ingredientes.push({
      nombre: this.ingrediente,
      cantidad: this.cantidad
    });

    // Limpiar los campos después de agregar
    this.ingrediente = '';
    this.cantidad = '';
  }
}

  closeModal() {
    this.router.navigate(['/profile']);
  }
}

