import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverTimeSummaryPerEmployeeComponent } from './over-time-summary-per-employee.component';

describe('OverTimeSummaryPerEmployeeComponent', () => {
  let component: OverTimeSummaryPerEmployeeComponent;
  let fixture: ComponentFixture<OverTimeSummaryPerEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverTimeSummaryPerEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverTimeSummaryPerEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
