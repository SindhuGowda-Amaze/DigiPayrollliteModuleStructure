import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BIR1700ReportComponent } from './bir1700-report.component';

describe('BIR1700ReportComponent', () => {
  let component: BIR1700ReportComponent;
  let fixture: ComponentFixture<BIR1700ReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BIR1700ReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BIR1700ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
