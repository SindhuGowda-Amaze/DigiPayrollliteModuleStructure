import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemittanceConfigDashComponent } from './remittance-config-dash.component';

describe('RemittanceConfigDashComponent', () => {
  let component: RemittanceConfigDashComponent;
  let fixture: ComponentFixture<RemittanceConfigDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemittanceConfigDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemittanceConfigDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
