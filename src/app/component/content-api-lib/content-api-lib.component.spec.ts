import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentApiLibComponent } from './content-api-lib.component';

describe('ContentApiLibComponent', () => {
  let component: ContentApiLibComponent;
  let fixture: ComponentFixture<ContentApiLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentApiLibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentApiLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
