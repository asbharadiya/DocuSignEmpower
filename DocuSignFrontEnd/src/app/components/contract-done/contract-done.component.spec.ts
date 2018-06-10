import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDoneComponent } from './contract-done.component';

describe('ContractDoneComponent', () => {
  let component: ContractDoneComponent;
  let fixture: ComponentFixture<ContractDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
