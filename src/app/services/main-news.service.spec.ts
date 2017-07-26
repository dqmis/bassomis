import { TestBed, inject } from '@angular/core/testing';

import { MainNewsService } from './main-news.service';

describe('MainNewsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainNewsService]
    });
  });

  it('should be created', inject([MainNewsService], (service: MainNewsService) => {
    expect(service).toBeTruthy();
  }));
});
