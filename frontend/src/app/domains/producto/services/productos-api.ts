import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Producto, ProductoDTO } from '../model/producto';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductosApi{
    private readonly http = inject(HttpClient);
      private readonly apiUrl = `${environment.apiUrl}/productos`;
        // Signal for reactive state management
      private readonly productosSignal = signal<Producto[]>([]);
      private readonly isLoadingSignal = signal<boolean>(false);
      
      // Readonly signals for external consumption
      public readonly productos = this.productosSignal.asReadonly();
      public readonly isLoading = this.isLoadingSignal.asReadonly();

      getAllProductos(): Observable<Producto[]> {
        this.isLoadingSignal.set(true);

        return this.http.get<Producto[]>(this.apiUrl)
          .pipe(
            tap(productos => {
              this.productosSignal.set(productos);
              this.isLoadingSignal.set(false);
            }),
            catchError(error => {
              this.isLoadingSignal.set(false);
              return this.handleError(error);
            })
          );
      }

      getProductoById(id: number): Observable<Producto> {
        return this.http.get<Producto>(`${this.apiUrl}/${id}`)
          .pipe(
            catchError(error => this.handleError(error))
          );
      }

      createProducto(producto: ProductoDTO): Observable<Producto> {
        this.isLoadingSignal.set(true);

        return this.http.post<Producto>(this.apiUrl, producto)
          .pipe(
            tap(newProducto => {
              const currentProductos = this.productosSignal();
              this.productosSignal.set([...currentProductos, newProducto]);
              this.isLoadingSignal.set(false);
            }),
            catchError(error => {
              this.isLoadingSignal.set(false);
              return this.handleError(error);
            })
          );
      }

      updateProducto(id: number, producto: Partial<ProductoDTO>): Observable<Producto> {
        this.isLoadingSignal.set(true);

        return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto)
          .pipe(
            tap(updatedProducto => {
              const currentProductos = this.productosSignal();
              const index = currentProductos.findIndex((a: { id: number; }) => a.id === id);
              if (index !== -1) {
                const newProductos = [...currentProductos];
                newProductos[index] = updatedProducto;
                this.productosSignal.set(newProductos);
              }
              this.isLoadingSignal.set(false);
            }),
            catchError(error => {
              this.isLoadingSignal.set(false);
              return this.handleError(error);
            })
          );
      }
    
      deleteUsuario(id: number): Observable<void> {
        this.isLoadingSignal.set(true);
        
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
          .pipe(
            tap(() => {
              const currentProductos = this.productosSignal();
              const filteredProductos = currentProductos.filter((a: { id: number; }) => a.id !== id);
              this.productosSignal.set(filteredProductos);
              this.isLoadingSignal.set(false);
            }),
            catchError(error => {
              this.isLoadingSignal.set(false);
              return this.handleError(error);
            })
          );
      }


    private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Bad request. Please check your input.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please log in.';
          break;
        case 403:
          errorMessage = 'Forbidden. Admin access required for alumni operations.';
          break;
        case 404:
          errorMessage = 'Product not found.';
          break;
        case 409:
          errorMessage = 'Product already exists.';
          break;
        case 500:
          errorMessage = 'Internal server error. Please try again later.';
          break;
        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    
    console.error('UsuarioService Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}