import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayRollDashComponent } from './pay-roll-dash.component';

describe('PayRollDashComponent', () => {
  let component: PayRollDashComponent;
  let fixture: ComponentFixture<PayRollDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayRollDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayRollDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
