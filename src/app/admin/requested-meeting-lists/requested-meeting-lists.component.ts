import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/login/login.service';
import { Meetings } from 'src/app/model/meetings';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requested-meeting-lists',
  templateUrl: './requested-meeting-lists.component.html',
  styleUrls: ['./requested-meeting-lists.component.css']
})
export class RequestedMeetingListsComponent implements OnInit {

  constructor(private userService:UserService,private loginService:LoginService) { }
  userId:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  columnName: string[] = ['select','meetingId', 'meetingUrl', 'date','time','location']
  data!: Meetings[];
  finalMeetings!: Meetings[];
  dataSource!: MatTableDataSource<Meetings>;
  selection = new SelectionModel<Meetings>(true, []);
  userMeeting!: Meetings[];
  userMeetings!: Meetings[];
  selectedList!: Meetings[]
  isTableFill = false;
  isSelected = false;
  ngOnInit(): void {

    this.userId=this.userService.getUserId();
    this.onShow();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  onSubmit() {
    this.selectedList = this.selection.selected;
    if(this.selectedList.length !== 0){
    this.userService.updateMeeting(this.selectedList, this.userId).subscribe(resData => {
      
      this.userService.  deleteRequestedMeeting(this.selectedList, this.userId).subscribe(

        (data:any)=>
        {
          Swal.fire({
            icon: 'success',
            title: 'Successful',
            text: "Done!!!",
          })
          
        }
      )
    });
  }else Swal.fire("Please select at least one meeting!!");
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  
  
  onShow() {
    this.userId = this.userService.getUserId();
    this.userService.RequesttoAssignMeeting(this.userId).subscribe((resData:any) => {
      this.data = resData;
     
        this.finalMeetings = this.userService.formatList(this.data);
        if(this.finalMeetings.length>0) this.isTableFill = true;
        this.dataSource = new MatTableDataSource<Meetings>(this.finalMeetings);
        this.dataSource.paginator = this.paginator;
      });
 
  }

  
  isAdmin():boolean
  {
    if(this.loginService.getRole===undefined)
    return false;
    else if(this.loginService.getRole()==='ROLE_ADMIN')
    return true;
    else
    return false;
  }
  

}
