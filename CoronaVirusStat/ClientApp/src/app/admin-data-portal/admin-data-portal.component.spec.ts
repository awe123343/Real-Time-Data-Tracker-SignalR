import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDataPortalComponent } from './admin-data-portal.component';

describe('AdminDataPortalComponent', () => {
  let component: AdminDataPortalComponent;
  let fixture: ComponentFixture<AdminDataPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDataPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDataPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
