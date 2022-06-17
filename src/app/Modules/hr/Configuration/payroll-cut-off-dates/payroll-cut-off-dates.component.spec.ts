import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollCutOffDatesComponent } from './payroll-cut-off-dates.component';

describe('PayrollCutOffDatesComponent', () => {
  let component: PayrollCutOffDatesComponent;
  let fixture: ComponentFixture<PayrollCutOffDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollCutOffDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollCutOffDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
