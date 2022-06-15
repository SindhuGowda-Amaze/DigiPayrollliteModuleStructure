import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveConfigDashComponent } from './leave-config-dash.component';

describe('LeaveConfigDashComponent', () => {
  let component: LeaveConfigDashComponent;
  let fixture: ComponentFixture<LeaveConfigDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveConfigDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveConfigDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
