import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Meetings } from 'src/app/model/meetings';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-meet',
  templateUrl: './assign-meet.component.html',
  styleUrls: ['./assign-meet.component.css']
})
export class AssignMeetComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
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

  constructor(private userService: UserService,
      @Inject(MAT_DIALOG_DATA) public type: string) {}

  ngOnInit(): void { this.onShow(); }

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
    this.userService.updateMeeting(this.selectedList, this.userId).subscribe(resData => {
      Swal.fire({
        icon: 'success',
        title: 'Meeting Assigned Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    },
    errData=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    });
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please select at least one User!!',
    })
  } 
  }
  
  onShow() {
    this.userId = this.userService.getUserId();
    this.userService.fetchMeeting().subscribe(resData => {
      this.data = resData;
      this.userService.findUserMeetings(this.userId).subscribe(resData => {
        this.userMeetings = resData;
        this.finalMeetings= [];
        for (let i in this.data) {
          let isPresent = false;
          for (let j in this.userMeetings) {
            if (this.data[i].time === this.userMeetings[j].time) isPresent = true;
          }
          if (isPresent === false) this.finalMeetings.push(this.data[i]);
        }
        this.finalMeetings = this.userService.formatList(this.finalMeetings);
        if(this.finalMeetings.length>0) this.isTableFill = true;
        this.dataSource = new MatTableDataSource<Meetings>(this.finalMeetings);
        this.dataSource.paginator = this.paginator;
      })
    });
  }
}