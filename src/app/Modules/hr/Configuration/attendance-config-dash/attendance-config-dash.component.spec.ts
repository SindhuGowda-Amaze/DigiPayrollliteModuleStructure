import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceConfigDashComponent } from './attendance-config-dash.component';

describe('AttendanceConfigDashComponent', () => {
  let component: AttendanceConfigDashComponent;
  let fixture: ComponentFixture<AttendanceConfigDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceConfigDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceConfigDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
