import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequsetMeetingViewComponent } from './requset-meeting-view.component';

describe('RequsetMeetingViewComponent', () => {
  let component: RequsetMeetingViewComponent;
  let fixture: ComponentFixture<RequsetMeetingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequsetMeetingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequsetMeetingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
