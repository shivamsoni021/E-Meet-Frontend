import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserRoles } from '../constants/role';
import { CreateUserComponent } from '../create-user/create-user.component';
import { PasswordSecurityService } from '../services/password-security.service';
import { LoginData, LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  username!: string;
  password!: string;
  userData!: LoginData;
  role!: string;
  userId!:string;
  
  constructor(private loginService: LoginService,
    private router: Router,
    private dialog:MatDialog,
    private passwordService: PasswordSecurityService) { }
  ngOnInit(): void {
    this.checkUser();
    }

    RegsiterUser()
    {
    
      this.dialog.open(CreateUserComponent,{
      width: '40%'
      });
      
    }

  checkUser(){{
    let isLoggedIn = this.loginService.isLoggedIn();
    if(isLoggedIn){
    let role = this.loginService.getRole();
    if(role === UserRoles.ROLE_ADMIN) this.router.navigate(["admin"]);
    else this.router.navigate(["user"]);
    }
  }}
  public async onSubmit() {
    this.password = this.passwordService.encryptFun(this.password);
    this.loginService.login(this.username, this.password)
      .subscribe(resData => {
        console.log(resData);
        this.loginService.setUserData(resData);
        this.userId=this.loginService.getUserId();
        this.loginService.saveDataToLocal(resData.accessToken,resData.id.toString(),resData.roles[0]);
        this.role = this.loginService.getRole();        
        if(this.role === UserRoles.ROLE_ADMIN){
          this.router.navigate(["admin"]); 
        }
        else if(this.role === UserRoles.ROLE_USER){
          this.router.navigate(["user"]);
        }
      },
      errData=>{
        Swal.fire({
          icon: 'error',
          title: 'Authentication Failed',
          text: errData.error.message,
        })
      });


  }
}
