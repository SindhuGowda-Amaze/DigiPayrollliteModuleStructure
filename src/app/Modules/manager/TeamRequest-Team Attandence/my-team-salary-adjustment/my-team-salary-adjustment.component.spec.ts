import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamSalaryAdjustmentComponent } from './my-team-salary-adjustment.component';

describe('MyTeamSalaryAdjustmentComponent', () => {
  let component: MyTeamSalaryAdjustmentComponent;
  let fixture: ComponentFixture<MyTeamSalaryAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTeamSalaryAdjustmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeamSalaryAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
