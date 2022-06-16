import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BIR1604CFReportComponent } from './bir1604-cfreport.component';

describe('BIR1604CFReportComponent', () => {
  let component: BIR1604CFReportComponent;
  let fixture: ComponentFixture<BIR1604CFReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BIR1604CFReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BIR1604CFReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
