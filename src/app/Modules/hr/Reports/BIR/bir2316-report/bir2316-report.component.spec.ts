import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BIR2316ReportComponent } from './bir2316-report.component';

describe('BIR2316ReportComponent', () => {
  let component: BIR2316ReportComponent;
  let fixture: ComponentFixture<BIR2316ReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BIR2316ReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BIR2316ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
