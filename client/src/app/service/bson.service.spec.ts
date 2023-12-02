import { TestBed } from '@angular/core/testing';

import { BsonService } from './bson.service';

describe('BsonService', () => {
  let service: BsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
