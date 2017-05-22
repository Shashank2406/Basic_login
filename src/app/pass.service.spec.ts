/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PassService } from './pass.service';

describe('PassService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassService]
    });
  });

  it('should ...', inject([PassService], (service: PassService) => {
    expect(service).toBeTruthy();
  }));
});
