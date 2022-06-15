import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLoansComponent } from './team-loans.component';

describe('TeamLoansComponent', () => {
  let component: TeamLoansComponent;
  let fixture: ComponentFixture<TeamLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamLoansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
