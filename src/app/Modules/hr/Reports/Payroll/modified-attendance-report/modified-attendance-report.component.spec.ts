import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiedAttendanceReportComponent } from './modified-attendance-report.component';

describe('ModifiedAttendanceReportComponent', () => {
  let component: ModifiedAttendanceReportComponent;
  let fixture: ComponentFixture<ModifiedAttendanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiedAttendanceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifiedAttendanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
