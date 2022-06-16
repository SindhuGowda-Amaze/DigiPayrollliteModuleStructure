import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamLeavedetailsComponent } from './my-team-leavedetails.component';

describe('MyTeamLeavedetailsComponent', () => {
  let component: MyTeamLeavedetailsComponent;
  let fixture: ComponentFixture<MyTeamLeavedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTeamLeavedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeamLeavedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
