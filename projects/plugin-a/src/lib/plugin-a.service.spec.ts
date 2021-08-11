import { TestBed } from '@angular/core/testing';

import { PluginAService } from './plugin-a.service';

describe('PluginAService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PluginAService = TestBed.get(PluginAService);
    expect(service).toBeTruthy();
  });
});
