import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyloansComponent } from './applyloans.component';

describe('ApplyloansComponent', () => {
  let component: ApplyloansComponent;
  let fixture: ComponentFixture<ApplyloansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyloansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyloansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
