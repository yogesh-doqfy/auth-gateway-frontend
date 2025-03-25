import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPricingComponent } from './content-pricing.component';

describe('ContentPricingComponent', () => {
  let component: ContentPricingComponent;
  let fixture: ComponentFixture<ContentPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentPricingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
