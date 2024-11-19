import { TestBed } from '@angular/core/testing';

import { FreelancerGuard } from './freelancer.guard';

describe('FreelancerGuard', () => {
  let guard: FreelancerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FreelancerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
