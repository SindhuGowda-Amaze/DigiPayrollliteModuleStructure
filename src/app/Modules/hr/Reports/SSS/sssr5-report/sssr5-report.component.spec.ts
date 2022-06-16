import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSSR5ReportComponent } from './sssr5-report.component';

describe('SSSR5ReportComponent', () => {
  let component: SSSR5ReportComponent;
  let fixture: ComponentFixture<SSSR5ReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SSSR5ReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SSSR5ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
