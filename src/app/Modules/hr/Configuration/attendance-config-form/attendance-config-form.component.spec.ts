import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceConfigFormComponent } from './attendance-config-form.component';

describe('AttendanceConfigFormComponent', () => {
  let component: AttendanceConfigFormComponent;
  let fixture: ComponentFixture<AttendanceConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceConfigFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
