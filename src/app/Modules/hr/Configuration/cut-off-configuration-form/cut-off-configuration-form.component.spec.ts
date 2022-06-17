import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutOffConfigurationFormComponent } from './cut-off-configuration-form.component';

describe('CutOffConfigurationFormComponent', () => {
  let component: CutOffConfigurationFormComponent;
  let fixture: ComponentFixture<CutOffConfigurationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CutOffConfigurationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CutOffConfigurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
