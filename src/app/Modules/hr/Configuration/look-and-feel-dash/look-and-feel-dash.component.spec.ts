import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookAndFeelDashComponent } from './look-and-feel-dash.component';

describe('LookAndFeelDashComponent', () => {
  let component: LookAndFeelDashComponent;
  let fixture: ComponentFixture<LookAndFeelDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookAndFeelDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LookAndFeelDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
