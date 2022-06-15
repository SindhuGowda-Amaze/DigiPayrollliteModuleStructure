import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YTDReportAdjustmentComponent } from './ytdreport-adjustment.component';

describe('YTDReportAdjustmentComponent', () => {
  let component: YTDReportAdjustmentComponent;
  let fixture: ComponentFixture<YTDReportAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YTDReportAdjustmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YTDReportAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
