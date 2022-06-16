import { ComponentFixture, TestBed } from '@angular/core/testing';

import { STLRFExcelReportComponent } from './stlrfexcel-report.component';

describe('STLRFExcelReportComponent', () => {
  let component: STLRFExcelReportComponent;
  let fixture: ComponentFixture<STLRFExcelReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ STLRFExcelReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(STLRFExcelReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
