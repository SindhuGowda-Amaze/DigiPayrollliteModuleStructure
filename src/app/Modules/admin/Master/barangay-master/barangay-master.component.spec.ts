import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangayMasterComponent } from './barangay-master.component';

describe('BarangayMasterComponent', () => {
  let component: BarangayMasterComponent;
  let fixture: ComponentFixture<BarangayMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarangayMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarangayMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
