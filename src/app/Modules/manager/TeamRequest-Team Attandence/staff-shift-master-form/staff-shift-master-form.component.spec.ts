import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffShiftMasterFormComponent } from './staff-shift-master-form.component';

describe('StaffShiftMasterFormComponent', () => {
  let component: StaffShiftMasterFormComponent;
  let fixture: ComponentFixture<StaffShiftMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffShiftMasterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffShiftMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
