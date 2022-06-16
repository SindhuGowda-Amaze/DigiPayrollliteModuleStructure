import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyOTComponent } from './apply-ot.component';

describe('ApplyOTComponent', () => {
  let component: ApplyOTComponent;
  let fixture: ComponentFixture<ApplyOTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyOTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyOTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
