import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Critica, CriticaDTO } from '../model/critica';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CriticasApi{
    private readonly http = inject(HttpClient);
          private readonly apiUrl = `${environment.apiUrl}/criticas`;
            // Signal for reactive state management
          private readonly criticasSignal = signal<Critica[]>([]);
          private readonly isLoadingSignal = signal<boolean>(false);
          
          // Readonly signals for external consumption
          public readonly criticas = this.criticasSignal.asReadonly();
          public readonly isLoading = this.isLoadingSignal.asReadonly();
        
          getAllCriticas(): Observable<Critica[]> {
            this.isLoadingSignal.set(true);
            
            return this.http.get<Critica[]>(this.apiUrl)
              .pipe(
                tap(criticas => {
                  this.criticasSignal.set(criticas);
                  this.isLoadingSignal.set(false);
                }),
                catchError(error => {
                  this.isLoadingSignal.set(false);
                  return this.handleError(error);
                })
              );
          }
        
          getCriticaById(id: number): Observable<Critica> {
            return this.http.get<Critica>(`${this.apiUrl}/${id}`)
              .pipe(
                catchError(error => this.handleError(error))
              );
          }
        
          createUsuario(Critica: CriticaDTO): Observable<Critica> {
            this.isLoadingSignal.set(true);
            
            return this.http.post<Critica>(this.apiUrl, Critica)
              .pipe(
                tap(newCritica => {
                  const currentCriticas = this.criticasSignal();
                  this.criticasSignal.set([...currentCriticas, newCritica]);
                  this.isLoadingSignal.set(false);
                }),
                catchError(error => {
                  this.isLoadingSignal.set(false);
                  return this.handleError(error);
                })
              );
          }
        
          updateCritica(id: number, critica: Partial<CriticaDTO>): Observable<Critica> {
            this.isLoadingSignal.set(true);
            
            return this.http.put<Critica>(`${this.apiUrl}/${id}`, critica)
              .pipe(
                tap(updatedCritica => {
                  const currentCriticas = this.criticasSignal();
                  const index = currentCriticas.findIndex((a: { id: number; }) => a.id === id);
                  if (index !== -1) {
                    const newCriticas = [...currentCriticas];
                    newCriticas[index] = updatedCritica;
                    this.criticasSignal.set(newCriticas);
                  }
                  this.isLoadingSignal.set(false);
                }),
                catchError(error => {
                  this.isLoadingSignal.set(false);
                  return this.handleError(error);
                })
              );
          }
        
          deleteCritica(id: number): Observable<void> {
            this.isLoadingSignal.set(true);
            
            return this.http.delete<void>(`${this.apiUrl}/${id}`)
              .pipe(
                tap(() => {
                  const currentCriticas = this.criticasSignal();
                  const filteredCriticas = currentCriticas.filter((a: { id: number; }) => a.id !== id);
                  this.criticasSignal.set(filteredCriticas);
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
              errorMessage = 'Critica not found.';
              break;
            case 409:
              errorMessage = 'Critica already exists.';
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