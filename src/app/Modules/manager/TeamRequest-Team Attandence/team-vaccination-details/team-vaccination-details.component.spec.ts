import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamVaccinationDetailsComponent } from './team-vaccination-details.component';

describe('TeamVaccinationDetailsComponent', () => {
  let component: TeamVaccinationDetailsComponent;
  let fixture: ComponentFixture<TeamVaccinationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamVaccinationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamVaccinationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
