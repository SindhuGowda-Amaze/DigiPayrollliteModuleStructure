import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHelpMenuComponent } from './admin-help-menu.component';

describe('AdminHelpMenuComponent', () => {
  let component: AdminHelpMenuComponent;
  let fixture: ComponentFixture<AdminHelpMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHelpMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHelpMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
