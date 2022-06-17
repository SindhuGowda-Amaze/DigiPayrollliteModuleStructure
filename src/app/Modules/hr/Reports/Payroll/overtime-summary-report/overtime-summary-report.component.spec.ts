import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeSummaryReportComponent } from './overtime-summary-report.component';

describe('OvertimeSummaryReportComponent', () => {
  let component: OvertimeSummaryReportComponent;
  let fixture: ComponentFixture<OvertimeSummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvertimeSummaryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
