import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtratesformComponent } from './otratesform.component';

describe('OtratesformComponent', () => {
  let component: OtratesformComponent;
  let fixture: ComponentFixture<OtratesformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtratesformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtratesformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
