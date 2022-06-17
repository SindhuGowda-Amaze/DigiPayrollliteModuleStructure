import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparationTypeDashComponent } from './separation-type-dash.component';

describe('SeparationTypeDashComponent', () => {
  let component: SeparationTypeDashComponent;
  let fixture: ComponentFixture<SeparationTypeDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeparationTypeDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparationTypeDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
