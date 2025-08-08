import { TestBed } from '@angular/core/testing';
import { AutenticacionApi } from './autenticacion-api';

describe('AutenticacionApi', () => {
  let service: AutenticacionApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticacionApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});