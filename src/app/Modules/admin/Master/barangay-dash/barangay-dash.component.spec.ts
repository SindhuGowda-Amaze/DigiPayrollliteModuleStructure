import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangayDashComponent } from './barangay-dash.component';

describe('BarangayDashComponent', () => {
  let component: BarangayDashComponent;
  let fixture: ComponentFixture<BarangayDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarangayDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarangayDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
