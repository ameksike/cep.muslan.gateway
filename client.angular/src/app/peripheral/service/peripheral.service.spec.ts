import { TestBed } from '@angular/core/testing';

import { PeripheralService } from './peripheral.service';

describe('PeripheralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeripheralService = TestBed.get(PeripheralService);
    expect(service).toBeTruthy();
  });
});
