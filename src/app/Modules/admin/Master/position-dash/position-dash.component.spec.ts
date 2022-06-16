import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionDashComponent } from './position-dash.component';

describe('PositionDashComponent', () => {
  let component: PositionDashComponent;
  let fixture: ComponentFixture<PositionDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
