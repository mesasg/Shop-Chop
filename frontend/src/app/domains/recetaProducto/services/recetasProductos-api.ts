import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RecetaProducto, RecetaProductoDTO } from '../model/recetaProducto';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RecetaProductoApi{
    private readonly http = inject(HttpClient);
      private readonly apiUrl = `${environment.apiUrl}/recetas-productos`;
        // Signal for reactive state management
      private readonly recetaProdSignal = signal<RecetaProducto[]>([]);
      private readonly isLoadingSignal = signal<boolean>(false);
      
      // Readonly signals for external consumption
      public readonly recetasProd = this.recetaProdSignal.asReadonly();
      public readonly isLoading = this.isLoadingSignal.asReadonly();
    
      getAllRecetaProd(): Observable<RecetaProducto[]> {
        this.isLoadingSignal.set(true);

        return this.http.get<RecetaProducto[]>(this.apiUrl)
          .pipe(
            tap(recetaProd => {
              this.recetaProdSignal.set(recetaProd);
              this.isLoadingSignal.set(false);
            }),
            catchError(error => {
              this.isLoadingSignal.set(false);
              return this.handleError(error);
            })
          );
      }
    
      getRecetaProdById(id: number): Observable<RecetaProducto> {
        return this.http.get<RecetaProducto>(`${this.apiUrl}/${id}`)
          .pipe(
            catchError(error => this.handleError(error))
          );
      }

      createUsuario(Receta: RecetaProductoDTO): Observable<RecetaProducto> {
        this.isLoadingSignal.set(true);

        return this.http.post<RecetaProducto>(this.apiUrl, Receta)
          .pipe(
            tap(newRecetaProd => {
              const currentRecetas = this.recetaProdSignal();
              this.recetaProdSignal.set([...currentRecetas, newRecetaProd]);
              this.isLoadingSignal.set(false);
            }),
            catchError(error => {
              this.isLoadingSignal.set(false);
              return this.handleError(error);
            })
          );
      }

      updateRecetaProd(id: number, recetaProd: Partial<RecetaProductoDTO>): Observable<RecetaProducto> {
        this.isLoadingSignal.set(true);

        return this.http.put<RecetaProducto>(`${this.apiUrl}/${id}`, recetaProd)
          .pipe(
            tap(updatedRecetaProd => {
              const currentRecetaProd = this.recetaProdSignal();
              const index = currentRecetaProd.findIndex((a: { id: number; }) => a.id === id);
              if (index !== -1) {
                const newRecetaProd = [...currentRecetaProd];
                newRecetaProd[index] = updatedRecetaProd;
                this.recetaProdSignal.set(newRecetaProd);
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
              const currentRecetaProd = this.recetaProdSignal();
              const filteredRecetaProd = currentRecetaProd.filter((a: { id: number; }) => a.id !== id);
              this.recetaProdSignal.set(filteredRecetaProd);
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
          errorMessage = 'Producto Receta not found.';
          break;
        case 409:
          errorMessage = 'Producto Receta already exists.';
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