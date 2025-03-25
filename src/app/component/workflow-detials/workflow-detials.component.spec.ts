import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowDetialsComponent } from './workflow-detials.component';

describe('WorkflowDetialsComponent', () => {
  let component: WorkflowDetialsComponent;
  let fixture: ComponentFixture<WorkflowDetialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowDetialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
