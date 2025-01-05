import { TestBed } from '@angular/core/testing';

import { ConsultationDetailService } from './consultation-detail.service';

describe('ConsultationDetailService', () => {
  let service: ConsultationDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultationDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
