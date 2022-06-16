import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollSummaryReportComponent } from './payroll-summary-report.component';

describe('PayrollSummaryReportComponent', () => {
  let component: PayrollSummaryReportComponent;
  let fixture: ComponentFixture<PayrollSummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollSummaryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
