import { TestBed, inject } from '@angular/core/testing';

import { IngredientsHelperService } from './ingredients-helper.service';

describe('IngredientsHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IngredientsHelperService]
    });
  });

  it('should be created', inject([IngredientsHelperService], (service: IngredientsHelperService) => {
    expect(service).toBeTruthy();
  }));
});
