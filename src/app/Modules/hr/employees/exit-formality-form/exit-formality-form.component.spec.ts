import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitFormalityFormComponent } from './exit-formality-form.component';

describe('ExitFormalityFormComponent', () => {
  let component: ExitFormalityFormComponent;
  let fixture: ComponentFixture<ExitFormalityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitFormalityFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitFormalityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
