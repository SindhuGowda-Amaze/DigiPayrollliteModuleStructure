import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveConfigFormComponent } from './leave-config-form.component';

describe('LeaveConfigFormComponent', () => {
  let component: LeaveConfigFormComponent;
  let fixture: ComponentFixture<LeaveConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveConfigFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
