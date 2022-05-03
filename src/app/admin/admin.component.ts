import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { MatMenuTrigger  } from '@angular/material/menu';
import { AssignMeetComponent } from '../dialog/assign-meet/assign-meet.component';
import { ViewMeetComponent } from '../dialog/view-meet/view-meet.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateUserComponent } from '../create-user/create-user.component';
import { RequestedMeetingListsComponent } from './requested-meeting-lists/requested-meeting-lists.component';
import Swal from 'sweetalert2';


import { LoginService } from '../login/login.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  @ViewChild('menuTrigger',{static:true}) menuTrigger!: MatMenuTrigger;
  @ViewChild('childMenu',{static:true}) public childMenu!: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  menu: string = "menu";
  usersList!: User[];
  columnName: string[] =['no','username','firstName','lastName','email','status','phoneno','modify'];
  dataSource!: MatTableDataSource<User>;
  panelOpenState: boolean = false;

  constructor(private userService: UserService,
    private router: Router,
    
    private dialog: MatDialog
    ,
    private loginservice:LoginService,) {}

  ngOnInit(): void {
    this.getMeetings();
    this.fetchUsers();
   
  
    }

  getMeetings(){
    this.userService.fetchMeeting().subscribe();
  }

  fetchUsers(){
    this.userService.fetchUsers().subscribe(resData=>{
      this.userService.setUsers(resData);
        this.usersList = this.userService.getUsers();
        this.dataSource = new MatTableDataSource<User>(this.usersList);
        this.dataSource.paginator = this.paginator;
    });
  }
  
  createUser(){
    this.dialog.open(CreateUserComponent,{width:'40%'});
  }

  disableUser(userId: string,username:string,active:boolean){
    this.userService.disableUser(userId,username).subscribe(()=>
    {
      if(active)
      {
        Swal.fire({
          icon: 'success',
          title: 'SuccessFul',
          text: username + " has been Disabled",
        })
      }
      
      
      else
      {
        Swal.fire({
          icon: 'success',
          title: 'SuccessFul',
          text: username + " has been Activated",
        })
      } 

      this.reloadCurrentPage();
    
    },
    (error:any)=>console.log(error));
}
  
  navigateToModify(user: User){
    this.userService.setData(user);
    this.router.navigate(["update-user"]);
  }
  
  assignMeet(userId:string, type: string){
    this.userService.setUserId(userId);  
      this.dialog.open(AssignMeetComponent, {data: type,
        width: '80%'
      });
    }

    viewMeet(userId:string){
      this.userService.setUserId(userId);
      this.dialog.open(ViewMeetComponent,{
      width: '80%'
      });
    }
    listOfRequestMeet(userId:any)
    {
      this.userService.setUserId(userId);
      this.dialog.open(RequestedMeetingListsComponent,{
      width: '80%'
      });
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
        // return usersList.username.toLowerCase().includes(filterValue) || usersList.username.toLowerCase().includes(filterValue);
    
  }
  reloadCurrentPage() {
    console.log("Clicked");
    this.dataSource.data = [];
    this.ngOnInit();

   }
  togglePanel() {
    this.panelOpenState = !this.panelOpenState;
} 
  }