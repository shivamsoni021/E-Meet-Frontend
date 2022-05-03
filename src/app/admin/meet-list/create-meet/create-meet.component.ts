
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Meeting } from 'src/app/model/meeting';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

export interface Meetingss {
  date: Date;
  location: string;
  meetingUrl: string;
  meetingId: string;
  time: Date;
  users: string[];
  Published: boolean
}

@Component({
  selector: 'app-create-meet',
  templateUrl: './create-meet.component.html',
  styleUrls: ['./create-meet.component.css']
})

export class CreateMeetComponent implements OnInit {

  meetId!: string;
  selectedDate: Date = new Date();
  time!: string;
  date: string = "";
  users: string[] = ["1"];
  meeting: Meeting = new Meeting();
  l!: string;
  todayDate!:Date;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService) { }

  ngOnInit(): void { this.meetId = this.data;
    const currentYear = moment().year();
    this.todayDate =new Date();
    // this.maxDate = moment([currentYear + 1, 11, 31]);
    
  }

  onSubmit() {
    let selectedTime: string[] = this.time.split(":");
    let newTime: Date = new Date();
    newTime.setHours(Number(selectedTime[0]));
    newTime.setMinutes(Number(selectedTime[1]));
    newTime.setDate(new Date(this.selectedDate).getDate());
    this.meeting.time = newTime.toISOString();
    this.meeting.date = newTime;
    this.meeting.meetingId=this.meetId;
    this.meeting.location = this.l;
    this.meeting.users = this.users;
    this.userService.createMeeting(this.meeting).subscribe(() =>
    {Swal.fire({
      icon: 'success',
      title: 'Meeting Created Successfully',
      showConfirmButton: false,
      timer: 1500,
      
    }
    )
    window.location.reload();
  
  }
    
     , (error) => { });
  }
}
