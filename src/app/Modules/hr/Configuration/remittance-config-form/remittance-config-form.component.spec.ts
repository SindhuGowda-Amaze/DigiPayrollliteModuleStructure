import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemittanceConfigFormComponent } from './remittance-config-form.component';

describe('RemittanceConfigFormComponent', () => {
  let component: RemittanceConfigFormComponent;
  let fixture: ComponentFixture<RemittanceConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemittanceConfigFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemittanceConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
