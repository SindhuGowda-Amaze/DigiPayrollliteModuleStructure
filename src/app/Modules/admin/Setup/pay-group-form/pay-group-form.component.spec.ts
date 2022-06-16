import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayGroupFormComponent } from './pay-group-form.component';

describe('PayGroupFormComponent', () => {
  let component: PayGroupFormComponent;
  let fixture: ComponentFixture<PayGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayGroupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
