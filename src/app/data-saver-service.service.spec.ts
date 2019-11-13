import { TestBed } from '@angular/core/testing';

import { DataSaverServiceService } from './data-saver-service.service';

describe('DataSaverServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataSaverServiceService = TestBed.get(DataSaverServiceService);
    expect(service).toBeTruthy();
  });
});
