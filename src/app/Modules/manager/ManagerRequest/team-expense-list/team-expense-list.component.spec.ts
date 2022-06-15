import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamExpenseListComponent } from './team-expense-list.component';

describe('TeamExpenseListComponent', () => {
  let component: TeamExpenseListComponent;
  let fixture: ComponentFixture<TeamExpenseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamExpenseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
