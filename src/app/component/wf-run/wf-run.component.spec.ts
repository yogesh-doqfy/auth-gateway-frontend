import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WfRunComponent } from './wf-run.component';

describe('WfRunComponent', () => {
  let component: WfRunComponent;
  let fixture: ComponentFixture<WfRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WfRunComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WfRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
