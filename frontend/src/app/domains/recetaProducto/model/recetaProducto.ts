export interface RecetaProducto {
  id: number;
  nombre: string;
  ingredientes: string[];
  instrucciones: string;
  tiempoPreparacion: number;
  porciones: number;
}
export interface RecetaProductoDTO {
  id: number;
  nombre: string;
  ingredientes: string[];
  instrucciones: string;
  tiempoPreparacion: number;
  porciones: number;
}