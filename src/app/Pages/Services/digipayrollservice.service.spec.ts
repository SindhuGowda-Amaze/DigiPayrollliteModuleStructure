import { TestBed } from '@angular/core/testing';

import { DigipayrollserviceService } from './digipayrollservice.service';

describe('DigipayrollserviceService', () => {
  let service: DigipayrollserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigipayrollserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
