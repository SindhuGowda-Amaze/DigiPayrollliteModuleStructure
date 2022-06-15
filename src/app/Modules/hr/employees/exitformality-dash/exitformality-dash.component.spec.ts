import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitformalityDashComponent } from './exitformality-dash.component';

describe('ExitformalityDashComponent', () => {
  let component: ExitformalityDashComponent;
  let fixture: ComponentFixture<ExitformalityDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitformalityDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitformalityDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
