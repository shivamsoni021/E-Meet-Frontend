import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRoles } from '../constants/role';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private loginService: LoginService,
    private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var role = this.loginService.getRole();
    var isGo =false;
    if(role=== UserRoles.ROLE_ADMIN) isGo=true;
    else isGo=false;
      return isGo;
  }
  
}
