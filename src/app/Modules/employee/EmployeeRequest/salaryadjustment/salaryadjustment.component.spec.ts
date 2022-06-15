import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryadjustmentComponent } from './salaryadjustment.component';

describe('SalaryadjustmentComponent', () => {
  let component: SalaryadjustmentComponent;
  let fixture: ComponentFixture<SalaryadjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryadjustmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryadjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
