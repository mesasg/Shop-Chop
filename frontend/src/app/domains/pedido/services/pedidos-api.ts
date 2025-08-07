import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Pedido, PedidoDTO } from '../model/pedido';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PedidosApi{
    private readonly http = inject(HttpClient);
          private readonly apiUrl = `${environment.apiUrl}/pedidos`;
            // Signal for reactive state management
          private readonly pedidosSignal = signal<Pedido[]>([]);
          private readonly isLoadingSignal = signal<boolean>(false);
          
          // Readonly signals for external consumption
          public readonly pedidos = this.pedidosSignal.asReadonly();
          public readonly isLoading = this.isLoadingSignal.asReadonly();
        
          getAllPedidos(): Observable<Pedido[]> {
            this.isLoadingSignal.set(true);
            
            return this.http.get<Pedido[]>(this.apiUrl)
              .pipe(
                tap(pedidos => {
                  this.pedidosSignal.set(pedidos);
                  this.isLoadingSignal.set(false);
                }),
                catchError(error => {
                  this.isLoadingSignal.set(false);
                  return this.handleError(error);
                })
              );
          }
        
          getPedidoById(id: number): Observable<Pedido> {
            return this.http.get<Pedido>(`${this.apiUrl}/${id}`)
              .pipe(
                catchError(error => this.handleError(error))
              );
          }
        
          createUsuario(Pedido: PedidoDTO): Observable<Pedido> {
            this.isLoadingSignal.set(true);
            
            return this.http.post<Pedido>(this.apiUrl, Pedido)
              .pipe(
                tap(newPedido => {
                  const currentPedidos = this.pedidosSignal();
                  this.pedidosSignal.set([...currentPedidos, newPedido]);
                  this.isLoadingSignal.set(false);
                }),
                catchError(error => {
                  this.isLoadingSignal.set(false);
                  return this.handleError(error);
                })
              );
          }
        
          updatePedido(id: number, pedido: Partial<PedidoDTO>): Observable<Pedido> {
            this.isLoadingSignal.set(true);
            
            return this.http.put<Pedido>(`${this.apiUrl}/${id}`, pedido)
              .pipe(
                tap(updatedPedido => {
                  const currentPedidos = this.pedidosSignal();
                  const index = currentPedidos.findIndex((a: { id: number; }) => a.id === id);
                  if (index !== -1) {
                    const newPedidos = [...currentPedidos];
                    newPedidos[index] = updatedPedido;
                    this.pedidosSignal.set(newPedidos);
                  }
                  this.isLoadingSignal.set(false);
                }),
                catchError(error => {
                  this.isLoadingSignal.set(false);
                  return this.handleError(error);
                })
              );
          }
        
          deletePedido(id: number): Observable<void> {
            this.isLoadingSignal.set(true);
            
            return this.http.delete<void>(`${this.apiUrl}/${id}`)
              .pipe(
                tap(() => {
                  const currentPedidos = this.pedidosSignal();
                  const filteredPedidos = currentPedidos.filter((a: { id: number; }) => a.id !== id);
                  this.pedidosSignal.set(filteredPedidos);
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
              errorMessage = 'Pedido not found.';
              break;
            case 409:
              errorMessage = 'Pedido already exists.';
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