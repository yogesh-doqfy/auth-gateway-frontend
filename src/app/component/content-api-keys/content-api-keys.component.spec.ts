import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentApiKeysComponent } from './content-api-keys.component';

describe('ContentApiKeysComponent', () => {
  let component: ContentApiKeysComponent;
  let fixture: ComponentFixture<ContentApiKeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentApiKeysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentApiKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
