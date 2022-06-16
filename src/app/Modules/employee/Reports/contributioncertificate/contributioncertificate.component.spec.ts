import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributioncertificateComponent } from './contributioncertificate.component';

describe('ContributioncertificateComponent', () => {
  let component: ContributioncertificateComponent;
  let fixture: ComponentFixture<ContributioncertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributioncertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributioncertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
