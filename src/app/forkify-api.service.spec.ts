import { TestBed } from '@angular/core/testing';

import { ForkifyApiService } from './forkify-api.service';

describe('ForkifyApiService', () => {
  let service: ForkifyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForkifyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
