import { TestBed } from '@angular/core/testing';

import { BasicTableFormatService } from './basic-table-format.service';

import {} from 'jasmine'

describe('BasicTableFormatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasicTableFormatService = TestBed.get(BasicTableFormatService);
    expect(service).toBeTruthy();
  });
});
