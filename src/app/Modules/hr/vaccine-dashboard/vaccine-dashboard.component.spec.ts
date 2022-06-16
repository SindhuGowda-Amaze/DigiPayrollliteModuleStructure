import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineDashboardComponent } from './vaccine-dashboard.component';

describe('VaccineDashboardComponent', () => {
  let component: VaccineDashboardComponent;
  let fixture: ComponentFixture<VaccineDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
