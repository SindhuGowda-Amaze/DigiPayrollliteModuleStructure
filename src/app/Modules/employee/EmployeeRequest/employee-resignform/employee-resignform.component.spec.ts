import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeResignformComponent } from './employee-resignform.component';

describe('EmployeeResignformComponent', () => {
  let component: EmployeeResignformComponent;
  let fixture: ComponentFixture<EmployeeResignformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeResignformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeResignformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
