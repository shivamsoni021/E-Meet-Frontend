import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private loginService: LoginService){}
  
  ngOnInit(): void {
    this.checkUser();
  }  
  title = 'e-meet';
  hide = true;

  isLogin():Boolean
   {
     return this.loginService.isLoggedIn();
   }
  
  checkUser(){
   let accessToken =  localStorage.getItem('accessToken');
   var userId= localStorage.getItem('userId');
   var userRole = localStorage.getItem('userRole');
   if(accessToken!==null && userId !== null && userRole !== null){
    this.loginService.setUserId(userId.toString());
    this.loginService.setRole(userRole.toString());
   }
   
   
  }
}
