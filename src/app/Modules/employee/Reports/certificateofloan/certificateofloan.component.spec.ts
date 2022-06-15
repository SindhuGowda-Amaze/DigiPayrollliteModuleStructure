import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateofloanComponent } from './certificateofloan.component';

describe('CertificateofloanComponent', () => {
  let component: CertificateofloanComponent;
  let fixture: ComponentFixture<CertificateofloanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateofloanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateofloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
