import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPublisedMeetingComponent } from './request-publised-meeting.component';

describe('RequestPublisedMeetingComponent', () => {
  let component: RequestPublisedMeetingComponent;
  let fixture: ComponentFixture<RequestPublisedMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestPublisedMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPublisedMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
