import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { clientGuard } from './client.guard';

describe('clientGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => clientGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
