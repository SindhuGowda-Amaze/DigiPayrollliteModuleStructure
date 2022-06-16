import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BIR1604CReportComponent } from './bir1604-creport.component';

describe('BIR1604CReportComponent', () => {
  let component: BIR1604CReportComponent;
  let fixture: ComponentFixture<BIR1604CReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BIR1604CReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BIR1604CReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
