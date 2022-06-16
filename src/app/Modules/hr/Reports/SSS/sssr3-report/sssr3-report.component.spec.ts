import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSSR3ReportComponent } from './sssr3-report.component';

describe('SSSR3ReportComponent', () => {
  let component: SSSR3ReportComponent;
  let fixture: ComponentFixture<SSSR3ReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SSSR3ReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SSSR3ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
