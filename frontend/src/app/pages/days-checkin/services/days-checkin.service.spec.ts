import { TestBed } from '@angular/core/testing';

import { DaysCheckinService } from './days-checkin.service';

describe('DaysCheckinService', () => {
  let service: DaysCheckinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaysCheckinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
