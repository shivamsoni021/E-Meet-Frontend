import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private loginService:LoginService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.loginService.isLoggedIn()==false)
      {
       
        this.router.navigate(['']);
      }   
      else if(this.loginService.getRole()=='ROLE_USER' && this.loginService.isLoggedIn())
      {
      
        return true;
      }
        

        this.router.navigate(['']);
 
          return false;
  }
  }
  

