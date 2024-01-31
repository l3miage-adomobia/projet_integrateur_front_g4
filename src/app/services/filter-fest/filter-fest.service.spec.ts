import { TestBed } from '@angular/core/testing';

import { FilterFestService } from './filter-fest.service';

describe('FilterFestService', () => {
  let service: FilterFestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterFestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
