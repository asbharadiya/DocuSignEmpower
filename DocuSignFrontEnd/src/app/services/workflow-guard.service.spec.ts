import { TestBed, inject } from '@angular/core/testing';

import { WorkflowGuardService } from './workflow-guard.service';

describe('WorkflowGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkflowGuardService]
    });
  });

  it('should be created', inject([WorkflowGuardService], (service: WorkflowGuardService) => {
    expect(service).toBeTruthy();
  }));
});
