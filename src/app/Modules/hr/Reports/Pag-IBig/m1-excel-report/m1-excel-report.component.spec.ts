import { ComponentFixture, TestBed } from '@angular/core/testing';

import { M1ExcelReportComponent } from './m1-excel-report.component';

describe('M1ExcelReportComponent', () => {
  let component: M1ExcelReportComponent;
  let fixture: ComponentFixture<M1ExcelReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ M1ExcelReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(M1ExcelReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
