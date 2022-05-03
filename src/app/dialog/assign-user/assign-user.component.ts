import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-user',
  templateUrl: './assign-user.component.html',
  styleUrls: ['./assign-user.component.css']
})
export class AssignUserComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  columnName: string[] = ['select','username', 'email', 'phoneno']
  selection = new SelectionModel<User>(true, []);
  userList!: User[];
  dataSource!: MatTableDataSource<User>;
  isTableFill = false;
  meetId!:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public userService: UserService,
  public router: Router
  ) { }

  ngOnInit(): void {
    this.userList = this.data.list;
    this.meetId = this.data.id;
    if(this.userList.length>0) this.isTableFill=true;
    this.dataSource =  new MatTableDataSource<User>(this.userList);
    this.dataSource.paginator = this.paginator;
  }

  onSubmit(){
    if(this.selection.selected.length>0){
    this.userService.assignUser(this.selection.selected,this.meetId).subscribe(()=>{
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
    this.router.navigate(["meet-list"]);
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select at least one User!!',
      })
    } 
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
}
