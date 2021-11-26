import { TestBed } from '@angular/core/testing';

import { BtsVideosService } from './bts-videos.service';

describe('BtsVideosService', () => {
  let service: BtsVideosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BtsVideosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
