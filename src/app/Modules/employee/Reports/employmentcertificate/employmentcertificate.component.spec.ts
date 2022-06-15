import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentcertificateComponent } from './employmentcertificate.component';

describe('EmploymentcertificateComponent', () => {
  let component: EmploymentcertificateComponent;
  let fixture: ComponentFixture<EmploymentcertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentcertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentcertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
