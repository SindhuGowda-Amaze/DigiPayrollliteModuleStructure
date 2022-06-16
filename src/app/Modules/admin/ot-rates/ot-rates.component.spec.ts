import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtRatesComponent } from './ot-rates.component';

describe('OtRatesComponent', () => {
  let component: OtRatesComponent;
  let fixture: ComponentFixture<OtRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
