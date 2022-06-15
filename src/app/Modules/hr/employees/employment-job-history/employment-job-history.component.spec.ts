import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentJobHistoryComponent } from './employment-job-history.component';

describe('EmploymentJobHistoryComponent', () => {
  let component: EmploymentJobHistoryComponent;
  let fixture: ComponentFixture<EmploymentJobHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentJobHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentJobHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
