import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCompletionFormComponent } from './profile-completion-form.component';

describe('ProfileCompletionFormComponent', () => {
  let component: ProfileCompletionFormComponent;
  let fixture: ComponentFixture<ProfileCompletionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCompletionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCompletionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
