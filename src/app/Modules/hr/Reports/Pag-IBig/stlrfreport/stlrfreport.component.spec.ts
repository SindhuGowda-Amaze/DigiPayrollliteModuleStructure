import { ComponentFixture, TestBed } from '@angular/core/testing';

import { STLRFReportComponent } from './stlrfreport.component';

describe('STLRFReportComponent', () => {
  let component: STLRFReportComponent;
  let fixture: ComponentFixture<STLRFReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ STLRFReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(STLRFReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
