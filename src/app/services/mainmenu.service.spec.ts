import { TestBed } from '@angular/core/testing';

import { MainmenuService } from './mainmenu.service';

describe('MainmenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainmenuService = TestBed.get(MainmenuService);
    expect(service).toBeTruthy();
  });
});
