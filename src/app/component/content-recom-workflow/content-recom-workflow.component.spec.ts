import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentRecomWorkflowComponent } from './content-recom-workflow.component';

describe('ContentRecomWorkflowComponent', () => {
  let component: ContentRecomWorkflowComponent;
  let fixture: ComponentFixture<ContentRecomWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentRecomWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentRecomWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
