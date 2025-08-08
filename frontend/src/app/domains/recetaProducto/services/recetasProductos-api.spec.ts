import { TestBed } from '@angular/core/testing';
import { RecetaProductoApi } from './recetasProductos-api';

describe('RecetaProductoApi', () => {
  let service: RecetaProductoApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecetaProductoApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});