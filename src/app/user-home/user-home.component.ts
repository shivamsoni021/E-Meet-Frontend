import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { RequestPublisedMeetingComponent } from '../admin/request-publised-meeting/request-publised-meeting.component';
import { RequestedMeetingListsComponent } from '../admin/requested-meeting-lists/requested-meeting-lists.component';
import { LoginService } from '../login/login.service';
import { Meeting } from '../model/meeting';
import { Meetings } from '../model/meetings';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(private activeRoute:ActivatedRoute,private userService:UserService,
    private loginService:LoginService,
    private dialog: MatDialog) { }
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  userMeetings!:Meetings[];
  userId!:string;
  columnName: string[] =['no','meetingUrl','date','time','location'];
  meetingList!: Meetings[]; 
  preferedMeeting:Meeting=new Meeting;
  dataSource!: MatTableDataSource<Meetings>;
  ngOnInit(): void {
    this.userId=this.loginService.getUserId();
  
  
    this.getMeetingList();
    this.preferedMeetins();
    //this.preferedMeeting.time=this.formatList()

  }
  
 

  getMeetingList()
  {
    this.userService.findUserMeetings(this.userId).subscribe(resData=>{
      this.meetingList = resData;
      this.dataSource = new MatTableDataSource<Meetings>(this.meetingList)
      this.dataSource.paginator = this.paginator;
      this.formatList();
    });
  }

  


    formatList(){
      for(let i in this.meetingList){
        let date = new Date(this.meetingList[i].date).toLocaleDateString();
        this.meetingList[i].date = date;
        let temp = new Date(this.meetingList[i].time).setSeconds(0);
        let time = new Date(temp).toLocaleTimeString();
        this.meetingList[i].time = time;
      }
    }
  

  preferedMeetins()
{
  this.userService.PreferedMeetings(this.userId).subscribe(resData=>{
    this.preferedMeeting = resData;
    let date = new Date(this.preferedMeeting.date).toLocaleDateString();
      this.preferedMeeting.date = new Date(date);
     let temp = new Date(this.preferedMeeting.time).setSeconds(0);
        let time = new Date(temp).toLocaleTimeString();
        this.preferedMeeting.time = time;
  
   
  });
}

requestMeeting()
{
  
    this.userService.setUserId(this.userId);  
      this.dialog.open(RequestPublisedMeetingComponent, {data: this.userId,
        width: '80%'
      });
    
}

viewRequestedMeeting()
{
  this.userService.setUserId(this.userId);  
      this.dialog.open(RequestedMeetingListsComponent, {data: this.userId,
        width: '80%'
      });
}
  }


