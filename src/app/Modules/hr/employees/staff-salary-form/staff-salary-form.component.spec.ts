import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSalaryFormComponent } from './staff-salary-form.component';

describe('StaffSalaryFormComponent', () => {
  let component: StaffSalaryFormComponent;
  let fixture: ComponentFixture<StaffSalaryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffSalaryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffSalaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
