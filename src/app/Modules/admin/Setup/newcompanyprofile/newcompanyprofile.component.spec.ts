import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcompanyprofileComponent } from './newcompanyprofile.component';

describe('NewcompanyprofileComponent', () => {
  let component: NewcompanyprofileComponent;
  let fixture: ComponentFixture<NewcompanyprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcompanyprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcompanyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
