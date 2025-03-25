import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentMyApisComponent } from './content-my-apis.component';

describe('ContentMyApisComponent', () => {
  let component: ContentMyApisComponent;
  let fixture: ComponentFixture<ContentMyApisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentMyApisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentMyApisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
