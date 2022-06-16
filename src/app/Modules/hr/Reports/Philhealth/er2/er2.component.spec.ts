import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ER2Component } from './er2.component';

describe('ER2Component', () => {
  let component: ER2Component;
  let fixture: ComponentFixture<ER2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ER2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ER2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
