import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RFReportComponent } from './rfreport.component';

describe('RFReportComponent', () => {
  let component: RFReportComponent;
  let fixture: ComponentFixture<RFReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RFReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RFReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
