import { TestBed } from '@angular/core/testing';
import { TransformService } from './transform.service';

import {} from 'jasmine'

describe('TransformService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransformService = TestBed.get(TransformService);
    expect(service).toBeTruthy();
  });
});
