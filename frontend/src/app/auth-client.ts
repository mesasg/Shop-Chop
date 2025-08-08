import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { AuthResponse, LoginRequest, Usuario } from './domains/usuario/model/usuario';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthClient {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiUrl = `${environment.apiUrl}/users`;
  private readonly tokenKey = 'jwt_token';

  private readonly currentUserSignal = signal<Usuario | null>(null);
  private readonly isLoadingSignal = signal<boolean>(false);

  public readonly currentUser = this.currentUserSignal.asReadonly();
  public readonly isAuthenticated = computed(() => !!this.currentUserSignal());
  public readonly isLoading = this.isLoadingSignal.asReadonly();
  
  constructor() {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      // Decode token to get user info
      const userInfo = this.decodeToken(token);
      if (userInfo) {
        this.currentUserSignal.set({
          correo: userInfo.correo,
        });
      }
    } else {
      this.logout();
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    this.isLoadingSignal.set(true);

    return this.http.post<AuthResponse>(`${this.apiUrl}/authenticate`, credentials)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.currentUserSignal.set({
            correo: response.correo,
            documento: response.documento ?? '',
            nombre: response.nombre ?? '',
            celular: response.celular ?? '',
            direccion: response.direccion ?? '',
            contraseña: response.contraseña ?? ''
          });
        }),
        catchError(error => {
          this.isLoadingSignal.set(false);
          return throwError(() => error);
        }),
        tap(() => this.isLoadingSignal.set(false))
      );
  }

  register(user: Usuario): Observable<Usuario> {
    this.isLoadingSignal.set(true);

    return this.http.post<Usuario>(this.apiUrl, user)
      .pipe(
        catchError(error => {
          this.isLoadingSignal.set(false);
          return throwError(() => error);
        }),
        tap(() => this.isLoadingSignal.set(false))
      );
  }

  logout(): void {
    this.removeToken();
    this.currentUserSignal.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = this.decodeToken(token);
      if (!payload?.exp) return true;

      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  }

  refreshUserData(): Observable<Usuario> {
  const currentUser = this.currentUserSignal();
  if (!currentUser?.correo) {
    return throwError(() => new Error('No current user'));
  }

  return this.http.get<Usuario>(`${this.apiUrl}/${currentUser.correo}`)
    .pipe(
      tap(user => this.currentUserSignal.set(user)),
      catchError(error => {
        if (error.status === 401) {
          this.logout();
        }
        return throwError(() => error);
      })
    );
}
}

