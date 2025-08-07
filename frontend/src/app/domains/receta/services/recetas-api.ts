import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Receta, RecetaDTO } from '../model/receta';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RecetasApi{
    private readonly http = inject(HttpClient);
      private readonly apiUrl = `${environment.apiUrl}/recetas`;
        // Signal for reactive state management
      private readonly recetasSignal = signal<Receta[]>([]);
      private readonly isLoadingSignal = signal<boolean>(false);
      
      // Readonly signals for external consumption
      public readonly recetas = this.recetasSignal.asReadonly();
      public readonly isLoading = this.isLoadingSignal.asReadonly();
    
      getAllRecetas(): Observable<Receta[]> {
        this.isLoadingSignal.set(true);
        
        return this.http.get<Receta[]>(this.apiUrl)
          .pipe(
            tap(recetas => {
              this.recetasSignal.set(recetas);
              this.isLoadingSignal.set(false);
            }),
            catchError(error => {
              this.isLoadingSignal.set(false);
              return this.handleError(error);
            })
          );
      }
    
      getRecetaById(id: number): Observable<Receta> {
        return this.http.get<Receta>(`${this.apiUrl}/${id}`)
          .pipe(
            catchError(error => this.handleError(error))
          );
      }
    
      createUsuario(Receta: RecetaDTO): Observable<Receta> {
        this.isLoadingSignal.set(true);
        
        return this.http.post<Receta>(this.apiUrl, Receta)
          .pipe(
            tap(newReceta => {
              const currentRecetas = this.recetasSignal();
              this.recetasSignal.set([...currentRecetas, newReceta]);
              this.isLoadingSignal.set(false);
            }),
            catchError(error => {
              this.isLoadingSignal.set(false);
              return this.handleError(error);
            })
          );
      }
    
      updateReceta(id: number, receta: Partial<RecetaDTO>): Observable<Receta> {
        this.isLoadingSignal.set(true);
        
        return this.http.put<Receta>(`${this.apiUrl}/${id}`, receta)
          .pipe(
            tap(updatedReceta => {
              const currentRecetas = this.recetasSignal();
              const index = currentRecetas.findIndex((a: { id: number; }) => a.id === id);
              if (index !== -1) {
                const newRecetas = [...currentRecetas];
                newRecetas[index] = updatedReceta;
                this.recetasSignal.set(newRecetas);
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
              const currentRecetas = this.recetasSignal();
              const filteredRecetas = currentRecetas.filter((a: { id: number; }) => a.id !== id);
              this.recetasSignal.set(filteredRecetas);
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
          errorMessage = 'Receta not found.';
          break;
        case 409:
          errorMessage = 'Receta already exists.';
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