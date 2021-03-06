import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAttendenceComponent } from './upload-attendence.component';

describe('UploadAttendenceComponent', () => {
  let component: UploadAttendenceComponent;
  let fixture: ComponentFixture<UploadAttendenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadAttendenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
