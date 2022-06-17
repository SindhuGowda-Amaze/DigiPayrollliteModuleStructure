import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BIRAlphaList7Component } from './biralpha-list7.component';

describe('BIRAlphaList7Component', () => {
  let component: BIRAlphaList7Component;
  let fixture: ComponentFixture<BIRAlphaList7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BIRAlphaList7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BIRAlphaList7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
