import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { PedidoProducto, PedidoProductoDTO } from '../model/pedidoProducto';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PedidosProductosApi{
    private readonly http = inject(HttpClient);
      private readonly apiUrl = `${environment.apiUrl}/pedidos-productos`;
        // Signal for reactive state management
      private readonly pedidoProductoSignal = signal<PedidoProducto[]>([]);
      private readonly isLoadingSignal = signal<boolean>(false);
      
      // Readonly signals for external consumption
      public readonly pedidoProd = this.pedidoProductoSignal.asReadonly();
      public readonly isLoading = this.isLoadingSignal.asReadonly();

      getAllPedidosProd(): Observable<PedidoProducto[]> {
        this.isLoadingSignal.set(true);

        return this.http.get<PedidoProducto[]>(this.apiUrl)
        .pipe(
          tap((pedidoProd: PedidoProducto[]) => {
            this.pedidoProductoSignal.set(pedidoProd);
            this.isLoadingSignal.set(false);
          }),
          catchError(error => {
            this.isLoadingSignal.set(false);
            return this.handleError(error);
          })
        );
      }

      getPedidoProdById(id: number): Observable<PedidoProducto> {
        return this.http.get<PedidoProducto>(`${this.apiUrl}/${id}`)
          .pipe(
            catchError(error => this.handleError(error))
          );
      }

      createUsuario(PedidoProd: PedidoProductoDTO): Observable<PedidoProducto> {
        this.isLoadingSignal.set(true);

        return this.http.post<PedidoProducto>(this.apiUrl, PedidoProd)
          .pipe(
            tap(newPedidoProd => {
              const currentPedidoProds = this.pedidoProductoSignal();
              this.pedidoProductoSignal.set([...currentPedidoProds, newPedidoProd]);
              this.isLoadingSignal.set(false);
            }),
            catchError(error => {
              this.isLoadingSignal.set(false);
              return this.handleError(error);
            })
          );
      }

      updatePedidoProd(id: number, pedidoProd: Partial<PedidoProductoDTO>): Observable<PedidoProducto> {
        this.isLoadingSignal.set(true);

        return this.http.put<PedidoProducto>(`${this.apiUrl}/${id}`, pedidoProd)
          .pipe(
            tap(updatedPedidoProd => {
              const currentPedidoProds = this.pedidoProductoSignal();
              const index = currentPedidoProds.findIndex((a: { id: number; }) => a.id === id);
              if (index !== -1) {
                const newPedidoProds = [...currentPedidoProds];
                newPedidoProds[index] = updatedPedidoProd;
                this.pedidoProductoSignal.set(newPedidoProds);
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
              const currentPedidoProd = this.pedidoProductoSignal();
              const removedPedidoProductos = currentPedidoProd.filter((a: { id: number; }) => a.id !== id);
              this.pedidoProductoSignal.set(removedPedidoProductos);
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
          errorMessage = 'Pedido Producto not found.';
          break;
        case 409:
          errorMessage = 'Pedido Producto already exists.';
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