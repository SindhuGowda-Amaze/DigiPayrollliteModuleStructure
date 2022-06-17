import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpJobHistoryFormComponent } from './emp-job-history-form.component';

describe('EmpJobHistoryFormComponent', () => {
  let component: EmpJobHistoryFormComponent;
  let fixture: ComponentFixture<EmpJobHistoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpJobHistoryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpJobHistoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
