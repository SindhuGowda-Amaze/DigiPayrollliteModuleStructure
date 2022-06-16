import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleTypeFormComponent } from './role-type-form.component';

describe('RoleTypeFormComponent', () => {
  let component: RoleTypeFormComponent;
  let fixture: ComponentFixture<RoleTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
