import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  usersList!: User[];
  meetId!: string;
  columnName: string[] = ['username', 'email', 'phoneno', 'status']; 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  dataSource!: MatTableDataSource<User>;
  isTableFill = false;

  ngOnInit(): void {
    this.usersList = this.data.list;
    if(this.usersList.length>0) this.isTableFill = true;
    this.dataSource = new MatTableDataSource<User>(this.usersList);
    this.dataSource.paginator = this.paginator;
  }
}
