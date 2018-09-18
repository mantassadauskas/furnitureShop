import { TestBed, inject } from '@angular/core/testing';

import { dataShareService } from './data-share.service';

describe('dataShareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [dataShareService]
    });
  });

  it('should be created', inject([dataShareService], (service: dataShareService) => {
    expect(service).toBeTruthy();
  }));
});
