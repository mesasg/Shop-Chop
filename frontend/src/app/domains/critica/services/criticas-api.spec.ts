import { TestBed } from '@angular/core/testing';
import { CriticasApi } from './criticas-api';

describe('CriticasApi', () => {
  let service: CriticasApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriticasApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});