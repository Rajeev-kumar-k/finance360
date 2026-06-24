import { TestBed } from '@angular/core/testing';

import { Travel } from './travel';

describe('Travel', () => {
  let service: Travel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Travel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
