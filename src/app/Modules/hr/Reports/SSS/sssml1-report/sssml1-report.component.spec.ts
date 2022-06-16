import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSSML1ReportComponent } from './sssml1-report.component';

describe('SSSML1ReportComponent', () => {
  let component: SSSML1ReportComponent;
  let fixture: ComponentFixture<SSSML1ReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SSSML1ReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SSSML1ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
