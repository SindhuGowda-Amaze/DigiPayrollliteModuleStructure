import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayRollRunsFormComponent } from './pay-roll-runs-form.component';

describe('PayRollRunsFormComponent', () => {
  let component: PayRollRunsFormComponent;
  let fixture: ComponentFixture<PayRollRunsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayRollRunsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayRollRunsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
