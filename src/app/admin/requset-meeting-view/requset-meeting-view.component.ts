import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/login/login.service';
import { Meetings } from 'src/app/model/meetings';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-requset-meeting-view',
  templateUrl: './requset-meeting-view.component.html',
  styleUrls: ['./requset-meeting-view.component.css']
})
export class RequsetMeetingViewComponent implements OnInit {
  constructor(private userService:UserService,private loginService:LoginService) { }
  

  userId:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  columnName: string[] = ['select','meetingId', 'meetingUrl', 'date','time','location']
  data!: Meetings[];
  finalMeetings!: Meetings[];
  dataSource!: MatTableDataSource<Meetings>;
 
  userMeeting!: Meetings[];
  userMeetings!: Meetings[];
  selectedList!: Meetings[]
  isTableFill = false;
  
  ngOnInit(): void {

    this.userId=this.userService.getUserId();
    this.onShow();
  }
  
  onShow() {
    this.userId = this.userService.getUserId();
    this.userService.RequesttoAssignMeeting(this.userId).subscribe((resData:any) => {
      this.data = resData;
        this.finalMeetings = this.userService.formatList(this.data);
        if(this.data.length>0) 
        this.isTableFill = true;
        this.dataSource = new MatTableDataSource<Meetings>(this.finalMeetings);
        this.dataSource.paginator = this.paginator;
      });

      
 
  }

  
  

}
