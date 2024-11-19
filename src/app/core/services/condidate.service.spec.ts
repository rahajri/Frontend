import { TestBed } from '@angular/core/testing';

import { CondidateService } from './condidate.service';

describe('CondidateService', () => {
  let service: CondidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CondidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
