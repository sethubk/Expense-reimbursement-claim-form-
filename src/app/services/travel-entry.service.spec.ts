import { TestBed } from '@angular/core/testing';

import { TravelEntryService } from './travel-entry.service';

describe('TravelEntryService', () => {
  let service: TravelEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
