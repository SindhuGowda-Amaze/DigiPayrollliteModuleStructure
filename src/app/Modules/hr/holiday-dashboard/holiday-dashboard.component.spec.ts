import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayDashboardComponent } from './holiday-dashboard.component';

describe('HolidayDashboardComponent', () => {
  let component: HolidayDashboardComponent;
  let fixture: ComponentFixture<HolidayDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
