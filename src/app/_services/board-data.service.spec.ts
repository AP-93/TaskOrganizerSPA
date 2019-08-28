import { TestBed } from '@angular/core/testing';

import { BoardDataService } from './board-data.service';

describe('BoardDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoardDataService = TestBed.get(BoardDataService);
    expect(service).toBeTruthy();
  });
});
