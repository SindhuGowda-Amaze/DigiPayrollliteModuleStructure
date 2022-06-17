import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BIR1604FReportComponent } from './bir1604-freport.component';

describe('BIR1604FReportComponent', () => {
  let component: BIR1604FReportComponent;
  let fixture: ComponentFixture<BIR1604FReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BIR1604FReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BIR1604FReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
