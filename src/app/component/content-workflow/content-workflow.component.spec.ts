import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentWorkflowComponent } from './content-workflow.component';

describe('ContentWorkflowComponent', () => {
  let component: ContentWorkflowComponent;
  let fixture: ComponentFixture<ContentWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
