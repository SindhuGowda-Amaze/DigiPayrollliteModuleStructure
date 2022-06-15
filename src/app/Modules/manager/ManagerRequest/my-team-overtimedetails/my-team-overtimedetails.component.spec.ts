import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamOvertimedetailsComponent } from './my-team-overtimedetails.component';

describe('MyTeamOvertimedetailsComponent', () => {
  let component: MyTeamOvertimedetailsComponent;
  let fixture: ComponentFixture<MyTeamOvertimedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTeamOvertimedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeamOvertimedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
