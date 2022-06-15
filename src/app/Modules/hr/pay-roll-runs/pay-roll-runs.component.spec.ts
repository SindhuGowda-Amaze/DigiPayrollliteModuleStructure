import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayRollRunsComponent } from './pay-roll-runs.component';

describe('PayRollRunsComponent', () => {
  let component: PayRollRunsComponent;
  let fixture: ComponentFixture<PayRollRunsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayRollRunsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayRollRunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
