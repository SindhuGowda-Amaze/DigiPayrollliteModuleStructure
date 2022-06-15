import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRLeaveRequestComponent } from './hrleave-request.component';

describe('HRLeaveRequestComponent', () => {
  let component: HRLeaveRequestComponent;
  let fixture: ComponentFixture<HRLeaveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRLeaveRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HRLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
