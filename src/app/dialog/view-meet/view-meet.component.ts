import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Meetings } from 'src/app/model/meetings';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-meet',
  templateUrl: './view-meet.component.html',
  styleUrls: ['./view-meet.component.css']
})
export class ViewMeetComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  columnName: string[] = ['meetingId', 'meetingUrl','date', 'time' ,'location']; 
  userMeetings!: Meetings[];
  currentUser!: string;
  isTableFill = false;
  dataSource !: MatTableDataSource<Meetings>;
  
  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.currentUser = this.userService.getUserId();
    this.getUserMeetings(this.currentUser);
  }

  getUserMeetings(userId: string){
    this.userService.findUserMeetings(userId).subscribe(resData =>{
        this.userMeetings = resData;
        this.userMeetings = this.userService.formatList(this.userMeetings);
        if(this.userMeetings.length >0) this.isTableFill = true;
        this.dataSource = new MatTableDataSource<Meetings>(this.userMeetings);
        this.dataSource.paginator = this.paginator;
      
      });
  }
}