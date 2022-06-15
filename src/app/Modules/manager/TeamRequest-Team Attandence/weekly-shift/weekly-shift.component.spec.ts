import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyShiftComponent } from './weekly-shift.component';

describe('WeeklyShiftComponent', () => {
  let component: WeeklyShiftComponent;
  let fixture: ComponentFixture<WeeklyShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyShiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
