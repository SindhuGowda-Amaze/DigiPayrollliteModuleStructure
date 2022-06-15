import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSSRL1ReportComponent } from './sssrl1-report.component';

describe('SSSRL1ReportComponent', () => {
  let component: SSSRL1ReportComponent;
  let fixture: ComponentFixture<SSSRL1ReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SSSRL1ReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SSSRL1ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
