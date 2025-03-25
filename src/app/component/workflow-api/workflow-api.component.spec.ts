import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowApiComponent } from './workflow-api.component';

describe('WorkflowApiComponent', () => {
  let component: WorkflowApiComponent;
  let fixture: ComponentFixture<WorkflowApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
