import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentHelpComponent } from './content-help.component';

describe('ContentHelpComponent', () => {
  let component: ContentHelpComponent;
  let fixture: ComponentFixture<ContentHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
