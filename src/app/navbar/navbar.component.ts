import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateUserComponent } from '../create-user/create-user.component';
import { LoginService } from '../login/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userId! : string;
  isSet = false;
  constructor(private router: Router,
      private loginService: LoginService,
      private dialog:MatDialog
      ) { }

  ngOnInit() : void {
    this.userId = this.loginService.getUserId();
    if(this.userId !== undefined){
      this.isSet =true;
    }
  }

  
  meetList(){
      this.router.navigate(["meet-list"]);
  }
  navigateToUsers(){
    this.router.navigate(["admin"]);
  }

  

  logout()
  {
    this.loginService.logout();
    this.router.navigate(['login']);
    window.location.reload();
  }

  isLogin():boolean
  {
    return this.loginService.isAuthenticated;
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
