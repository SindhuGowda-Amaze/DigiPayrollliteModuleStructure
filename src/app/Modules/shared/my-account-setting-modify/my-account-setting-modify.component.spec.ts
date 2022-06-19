import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountSettingModifyComponent } from './my-account-setting-modify.component';

describe('MyAccountSettingModifyComponent', () => {
  let component: MyAccountSettingModifyComponent;
  let fixture: ComponentFixture<MyAccountSettingModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAccountSettingModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountSettingModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
