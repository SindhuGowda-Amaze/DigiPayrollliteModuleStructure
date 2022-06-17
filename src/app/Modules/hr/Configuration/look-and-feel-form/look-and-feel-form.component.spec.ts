import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookAndFeelFormComponent } from './look-and-feel-form.component';

describe('LookAndFeelFormComponent', () => {
  let component: LookAndFeelFormComponent;
  let fixture: ComponentFixture<LookAndFeelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookAndFeelFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LookAndFeelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
