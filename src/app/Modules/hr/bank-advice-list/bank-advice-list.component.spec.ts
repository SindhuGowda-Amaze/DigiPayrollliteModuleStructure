import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAdviceListComponent } from './bank-advice-list.component';

describe('BankAdviceListComponent', () => {
  let component: BankAdviceListComponent;
  let fixture: ComponentFixture<BankAdviceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAdviceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAdviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
