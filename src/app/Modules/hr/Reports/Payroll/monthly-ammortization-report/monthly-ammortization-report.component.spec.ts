import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyAmmortizationReportComponent } from './monthly-ammortization-report.component';

describe('MonthlyAmmortizationReportComponent', () => {
  let component: MonthlyAmmortizationReportComponent;
  let fixture: ComponentFixture<MonthlyAmmortizationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyAmmortizationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyAmmortizationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
