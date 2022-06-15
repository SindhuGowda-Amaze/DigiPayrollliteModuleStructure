import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreliminaryReportComponent } from './preliminary-report.component';

describe('PreliminaryReportComponent', () => {
  let component: PreliminaryReportComponent;
  let fixture: ComponentFixture<PreliminaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreliminaryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreliminaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
