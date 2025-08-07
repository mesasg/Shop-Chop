import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Usuario, UsuarioDTO } from '../model/usuario';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuariosApi{
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/usuarios`;
    // Signal for reactive state management
  private readonly usuariosSignal = signal<Usuario[]>([]);
  private readonly isLoadingSignal = signal<boolean>(false);
  
  // Readonly signals for external consumption
  public readonly usuarios = this.usuariosSignal.asReadonly();
  public readonly isLoading = this.isLoadingSignal.asReadonly();

  getAllUsuarios(): Observable<Usuario[]> {
    this.isLoadingSignal.set(true);
    
    return this.http.get<Usuario[]>(this.apiUrl)
      .pipe(
        tap(usuarios => {
          this.usuariosSignal.set(usuarios);
          this.isLoadingSignal.set(false);
        }),
        catchError(error => {
          this.isLoadingSignal.set(false);
          return this.handleError(error);
        })
      );
  }

  getUsuarioByDocumento(documento: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${documento}`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  createUsuario(Usuario: UsuarioDTO): Observable<Usuario> {
    this.isLoadingSignal.set(true);
    
    return this.http.post<Usuario>(this.apiUrl, Usuario)
      .pipe(
        tap(newUsuario => {
          const currentUsuarios = this.usuariosSignal();
          this.usuariosSignal.set([...currentUsuarios, newUsuario]);
          this.isLoadingSignal.set(false);
        }),
        catchError(error => {
          this.isLoadingSignal.set(false);
          return this.handleError(error);
        })
      );
  }

  updateUsuario(documento: string, usuario: Partial<UsuarioDTO>): Observable<Usuario> {
    this.isLoadingSignal.set(true);
    
    return this.http.put<Usuario>(`${this.apiUrl}/${documento}`, usuario)
      .pipe(
        tap(updatedUsuario => {
          const currentUsuarios = this.usuariosSignal();
          const index = currentUsuarios.findIndex((a: { documento: string; }) => a.documento === documento);
          if (index !== -1) {
            const newUsuarios = [...currentUsuarios];
            newUsuarios[index] = updatedUsuario;
            this.usuariosSignal.set(newUsuarios);
          }
          this.isLoadingSignal.set(false);
        }),
        catchError(error => {
          this.isLoadingSignal.set(false);
          return this.handleError(error);
        })
      );
  }

  deleteUsuario(documento: string): Observable<void> {
    this.isLoadingSignal.set(true);
    
    return this.http.delete<void>(`${this.apiUrl}/${documento}`)
      .pipe(
        tap(() => {
          const currentUsuarios = this.usuariosSignal();
          const filteredUsuarios = currentUsuarios.filter((a: { documento: string; }) => a.documento !== documento);
          this.usuariosSignal.set(filteredUsuarios);
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
          errorMessage = 'Usuario not found.';
          break;
        case 409:
          errorMessage = 'Usuario already exists.';
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

