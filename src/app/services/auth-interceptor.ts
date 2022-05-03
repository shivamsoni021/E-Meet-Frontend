import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../login/login.service";

@Injectable({
    providedIn: 'root'
  })
export class AuthInterceptor implements HttpInterceptor
{
    constructor(private loginService:LoginService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        const token=this.loginService.getToken();
         let auth=req;
        if(token!=null)
        {
         auth=auth.clone({setHeaders:{Authorization:`Bearer `+token}});
        }
        return next.handle(auth);
    }
    
}

export const authInterceptorProvider=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,
    }
]