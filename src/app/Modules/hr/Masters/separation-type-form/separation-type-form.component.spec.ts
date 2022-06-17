import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparationTypeFormComponent } from './separation-type-form.component';

describe('SeparationTypeFormComponent', () => {
  let component: SeparationTypeFormComponent;
  let fixture: ComponentFixture<SeparationTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeparationTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparationTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
