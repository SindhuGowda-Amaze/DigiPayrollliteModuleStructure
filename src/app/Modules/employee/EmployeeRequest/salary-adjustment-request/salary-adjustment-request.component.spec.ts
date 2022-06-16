import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryAdjustmentRequestComponent } from './salary-adjustment-request.component';

describe('SalaryAdjustmentRequestComponent', () => {
  let component: SalaryAdjustmentRequestComponent;
  let fixture: ComponentFixture<SalaryAdjustmentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryAdjustmentRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryAdjustmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
