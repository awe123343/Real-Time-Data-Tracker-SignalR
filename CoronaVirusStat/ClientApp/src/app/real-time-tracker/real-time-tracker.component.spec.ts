import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeTrackerComponent } from './real-time-tracker.component';

describe('RealTimeTrackerComponent', () => {
  let component: RealTimeTrackerComponent;
  let fixture: ComponentFixture<RealTimeTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealTimeTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
