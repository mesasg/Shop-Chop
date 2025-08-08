import { TestBed } from '@angular/core/testing';
import { PedidosProductosApi } from './pedidosProductos-api';

describe('PedidosProductosApi', () => {
  let service: PedidosProductosApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidosProductosApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});