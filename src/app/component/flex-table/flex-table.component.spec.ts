import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexTableComponent } from './flex-table.component';

describe('FlexTableComponent', () => {
  let component: FlexTableComponent;
  let fixture: ComponentFixture<FlexTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlexTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlexTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
