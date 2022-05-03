import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedMeetingListsComponent } from './requested-meeting-lists.component';

describe('RequestedMeetingListsComponent', () => {
  let component: RequestedMeetingListsComponent;
  let fixture: ComponentFixture<RequestedMeetingListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestedMeetingListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedMeetingListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
