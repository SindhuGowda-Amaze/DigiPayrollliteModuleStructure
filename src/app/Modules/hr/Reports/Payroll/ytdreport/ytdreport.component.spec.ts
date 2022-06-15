import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YTDReportComponent } from './ytdreport.component';

describe('YTDReportComponent', () => {
  let component: YTDReportComponent;
  let fixture: ComponentFixture<YTDReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YTDReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YTDReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
