import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

export interface LoginData {
	id: number;
	username: string;
	email: string;
	roles: any[];
	accessToken: string;
}
@Injectable({
	providedIn: 'root'
})
export class LoginService {
	apiUrl = environment.apiBaseUrl;
	currentUserId: string | undefined;
	responseData!: LoginData;
	role!: string;
	userId!: string;
	isAuthenticated = false;
	constructor(private http: HttpClient) { }

	login(username: string, password: string) {
		return this.http.post<LoginData>(`${this.apiUrl}/auth/signin`, {username, password })
	}

	setUserData(data: LoginData) { this.responseData = data; }

	getUserData(): LoginData{ return this.responseData}

	setRole(role: string){ this.role = role; }

	getRole(): string{return this.role;}

	setUserId(userId: string){
		this.userId = userId;
		this.isAuthenticated = true;
	}
	getUserId(){ return this.userId;}

	getAuthStatus(){ return this.isAuthenticated;}

	saveDataToLocal(accessToken: string,userId: string, userRole: string){
		this.setUserId(userId);
		this.setRole(userRole);
		localStorage.setItem('accessToken',accessToken);
		localStorage.setItem('userId', userId);
		localStorage.setItem('userRole',userRole)	
	}
	logout(){
		localStorage.removeItem('accessToken');
		localStorage.removeItem('userId');
		localStorage.removeItem('userRole');
		sessionStorage.clear();
		this.isAuthenticated = false;
		return true;
	}

    getToken()
	{
		return localStorage.getItem('accessToken');
	}
	 
	isLoggedOut()
	{
		if(sessionStorage.getItem('accessToken')==undefined||
		sessionStorage.getItem('accessToken')==null||
		sessionStorage.getItem('userRole')==undefined||
		sessionStorage.getItem('userRole')==null)
		return true;
		else
		return false;
	}

	

	isLoggedIn(){
		if(localStorage.getItem('accessToken')!==undefined) return true;
		else return false;
	}
}