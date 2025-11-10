import { TestBed } from '@angular/core/testing';

import { RolDeProceso } from './rol-de-proceso';

describe('RolDeProceso', () => {
  let service: RolDeProceso;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolDeProceso);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
