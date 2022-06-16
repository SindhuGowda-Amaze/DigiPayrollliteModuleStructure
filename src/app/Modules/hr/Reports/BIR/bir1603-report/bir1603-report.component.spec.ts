import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BIR1603ReportComponent } from './bir1603-report.component';

describe('BIR1603ReportComponent', () => {
  let component: BIR1603ReportComponent;
  let fixture: ComponentFixture<BIR1603ReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BIR1603ReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BIR1603ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
