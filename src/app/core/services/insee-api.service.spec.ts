import { TestBed } from '@angular/core/testing';

import { InseeApiService } from './insee-api.service';

describe('InseeApiService', () => {
  let service: InseeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InseeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
