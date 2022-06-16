import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RF1PDFReportComponent } from './rf1-pdfreport.component';

describe('RF1PDFReportComponent', () => {
  let component: RF1PDFReportComponent;
  let fixture: ComponentFixture<RF1PDFReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RF1PDFReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RF1PDFReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
