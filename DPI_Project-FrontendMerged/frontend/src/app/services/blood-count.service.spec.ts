import { TestBed } from '@angular/core/testing';

import { BloodCountService } from './blood-count.service';

describe('BloodCountService', () => {
  let service: BloodCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloodCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
