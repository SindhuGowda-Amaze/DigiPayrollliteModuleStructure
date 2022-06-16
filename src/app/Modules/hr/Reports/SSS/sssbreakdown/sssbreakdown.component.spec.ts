import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSSBreakdownComponent } from './sssbreakdown.component';

describe('SSSBreakdownComponent', () => {
  let component: SSSBreakdownComponent;
  let fixture: ComponentFixture<SSSBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SSSBreakdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SSSBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
