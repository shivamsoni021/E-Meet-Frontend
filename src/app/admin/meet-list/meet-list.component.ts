import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AssignUserComponent } from 'src/app/dialog/assign-user/assign-user.component';
import { ViewUserComponent } from 'src/app/dialog/view-user/view-user.component';
import { Meeting } from 'src/app/model/meeting';
import { Meetings } from 'src/app/model/meetings';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { CreateMeetComponent } from './create-meet/create-meet.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meet-list',
  templateUrl: './meet-list.component.html',
  styleUrls: ['./meet-list.component.css']
})
export class MeetListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  columnName: string[] = ['no', 'meetingId', 'meetingUrl', 'date', 'time', 'location','published', 'modify'];
  meetingList!: Meetings[];
  assignedUsers!: User[];
  usersList!: User[];
  dataSource!: MatTableDataSource<Meetings>;

  constructor(private userService: UserService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.fetchMeeting().subscribe(resData => {
      this.meetingList = resData;
      this.dataSource = new MatTableDataSource<Meetings>(this.meetingList)
      this.dataSource.paginator = this.paginator;
      this.formatList();
    });
    this.userService.fetchUsers().subscribe(userResData => {
      this.usersList = userResData;
    });
  }

  formatList() {
    for (let i in this.meetingList) {
      let date = new Date(this.meetingList[i].date).toLocaleDateString();
      this.meetingList[i].date = date;
      let temp = new Date(this.meetingList[i].time).setSeconds(0);
      let time = new Date(temp).toLocaleTimeString();
      this.meetingList[i].time = time;
    }
  }

  createMeeting() {
    let meetId = this.makeid();
    this.dialog.open(CreateMeetComponent, { data: meetId });
    this.dialog.afterAllClosed.subscribe(() => { this.ngOnInit(); });
  }

  assignUser(meet: Meetings, meetId: string) {
    this.assignedUsers = meet.users;
    let usersNotInMeeting: User[] = [];
    for (let i in this.usersList) {
      let isPresent = false;
      for (let j in this.assignedUsers) {
        if (this.usersList[i].id === this.assignedUsers[j].id) isPresent = true;
      }
      if (!isPresent) usersNotInMeeting.push(this.usersList[i]);
    }
    this.dialog.open(AssignUserComponent, { data: { list: usersNotInMeeting, id: meetId }, width: '80%' });
    this.dialog.afterAllClosed.subscribe(() => { this.ngOnInit(); });
  }

  viewUsers(meet: Meetings, meetId: string) {
    let users: User[] = meet.users;
    this.dialog.open(ViewUserComponent, {
      data: { list: users, id: meetId },
      width: '80%'
    });
  }

  makeid() {
    var result = '';
    var characters = 'Ad4Rj7Ge2M0h9rTYQ8kZ0';
    var charactersLength = 11;
    for (var i = 0; i < 11; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  cancelMeeting(Meeting: Meeting, mid: number) {
    this.userService.disableMeeting(mid).subscribe((data) => {}, (error) => {});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

reloadCurrentPage() {
  window.location.reload();
 }
 panelOpenState: boolean = false;
 togglePanel() {
   this.panelOpenState = !this.panelOpenState;
}
navigateToMeeting(meetingUrl:string){
  window.open(meetingUrl)?.focus();
} 

publishMeeting(id:number)
{
  this.userService.publishMeeting(id).subscribe((data:any)=>
  {
   
    
      Swal.fire({
        icon: 'success',
        title: 'SuccessFul',
        text: "Meeting has been Published",
      })
      window.location.reload();
    }
    ,
    (error)=>
    {
      Swal.fire({
        icon: 'error',
        title: '',
        text: "Something went wrong",
      })
    }
  
    
   

   
  
  );
}
}
