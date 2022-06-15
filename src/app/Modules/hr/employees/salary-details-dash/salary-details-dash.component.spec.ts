import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryDetailsDashComponent } from './salary-details-dash.component';

describe('SalaryDetailsDashComponent', () => {
  let component: SalaryDetailsDashComponent;
  let fixture: ComponentFixture<SalaryDetailsDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryDetailsDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryDetailsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
