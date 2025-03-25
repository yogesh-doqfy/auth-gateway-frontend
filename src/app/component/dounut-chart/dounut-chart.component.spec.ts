import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DounutChartComponent } from './dounut-chart.component';

describe('DounutChartComponent', () => {
  let component: DounutChartComponent;
  let fixture: ComponentFixture<DounutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DounutChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DounutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
