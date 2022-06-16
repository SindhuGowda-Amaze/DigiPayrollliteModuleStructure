import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OTrequestComponent } from './otrequest.component';

describe('OTrequestComponent', () => {
  let component: OTrequestComponent;
  let fixture: ComponentFixture<OTrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OTrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OTrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
