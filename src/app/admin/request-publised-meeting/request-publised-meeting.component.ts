import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Meetings } from 'src/app/model/meetings';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request-publised-meeting',
  templateUrl: './request-publised-meeting.component.html',
  styleUrls: ['./request-publised-meeting.component.css']
})
export class RequestPublisedMeetingComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService:UserService) { }

columnName: string[] = ['select','meetingId', 'meetingUrl', 'date','time','location']
data!: Meetings[];
finalMeetings!: Meetings[];
dataSource!: MatTableDataSource<Meetings>;
selection = new SelectionModel<Meetings>(true, []);
userMeeting!: Meetings[];
userId!: string;
userMeetings!: Meetings[];
selectedList!: Meetings[]
isTableFill = false;
isSelected = false;




  ngOnInit(): void {

  this.userId=  this.userService.getUserId();
  this.onShow();
  
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onSubmit() {
    this.selectedList = this.selection.selected;
    if(this.selectedList.length !== 0){
    this.userService.RequestMeeting(this.selectedList, this.userId).subscribe(resData => {
      Swal.fire({
        icon: 'success',
        title: 'Meeting Assigned Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
    ,(error:any)=>console.log(error));
    
  }else Swal.fire("Please select at least one meeting!!");
  }

  onShow() {
    this.userId = this.userService.getUserId();
    this.userService.fetchRequestedMeetings(this.userId).subscribe(resData => {
      this.data = resData;
     
        this.finalMeetings = this.userService.formatList( this.data );
        if(this.finalMeetings.length>0) this.isTableFill = true;
        this.dataSource = new MatTableDataSource<Meetings>(this.finalMeetings);
        this.dataSource.paginator = this.paginator;
      
    });
  }

}
