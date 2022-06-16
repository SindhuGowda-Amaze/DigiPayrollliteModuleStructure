import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BIR1601CReportComponent } from './bir1601-creport.component';

describe('BIR1601CReportComponent', () => {
  let component: BIR1601CReportComponent;
  let fixture: ComponentFixture<BIR1601CReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BIR1601CReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BIR1601CReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
