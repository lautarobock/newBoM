import { TestBed, inject } from '@angular/core/testing';

import { Util } from './util.service';

describe('UtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Util]
    });
  });

  it('should ...', inject([Util], (service: Util) => {
    expect(service).toBeTruthy();
  }));
});
