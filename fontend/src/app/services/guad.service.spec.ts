import { TestBed } from '@angular/core/testing';

import { GuadService } from './guad.service';

describe('GuadService', () => {
  let service: GuadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
