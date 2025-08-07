import { TestBed } from '@angular/core/testing';
import { RecetasApi } from './recetas-api';

describe('RecetasApi', () => {
  let service: RecetasApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecetasApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});