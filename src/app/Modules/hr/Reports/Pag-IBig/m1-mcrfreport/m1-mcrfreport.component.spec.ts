import { ComponentFixture, TestBed } from '@angular/core/testing';

import { M1MCRFReportComponent } from './m1-mcrfreport.component';

describe('M1MCRFReportComponent', () => {
  let component: M1MCRFReportComponent;
  let fixture: ComponentFixture<M1MCRFReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ M1MCRFReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(M1MCRFReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
