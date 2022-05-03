import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { LoginData } from "../login/login.service";
import { Meeting } from "../model/meeting";
import { Meetings } from "../model/meetings";
import { User } from "../model/user";

export interface MeetingDemo {
    id: number;
    date: Date;
    location: string;
    meetingUrl: string;
    meetingId: string;
    time: Date;
    users: User[];
}

@Injectable({ providedIn: 'root' })
export class UserService {
    private apiUrl = environment.apiBaseUrl;
    email!: string;
    password!: string;
    accessToken!: string;
    usersData!: User[];
    userData!: User;
    currentUserId!: string;
    constructor(private http: HttpClient) { }

    public fetchUsers(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/users`);
    }

    public setUsers(data: User[]) {
        this.usersData = data;
    }

    public getUsers(): User[] {
        return this.usersData;
    }

    public fetchMeeting(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/meeting-list`);
    }

    
    public fetchRequestedMeetings(id:any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/userReqMeetingList/${id}`);
    }


    public RequesttoAssignMeeting(id:any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/userRequestedList/${id}`);
    }

    assignUser(selected: User[], meetId: string) {
        return this.http.post<any>(`${this.apiUrl}/assign-user/${meetId}`, selected);
    }

    createUser(username: string, password: string, phoneno: string, email: string, isActive: boolean, firstName:string,lastName:string) {
        return this.http.post<LoginData>(`${this.apiUrl}/signup`, { username, firstName, lastName, password, phoneno, email, isActive, role: ["ROLE_USER"] });
    }

    findUserMeetings(userId: string) {
        return this.http.get<any>(`${this.apiUrl}/user-meeting/${userId}`);
    }

    PublishedMeetings(): Observable<Meetings[]> {
        return this.http.get<Meetings[]>(`${this.apiUrl}/isPublished`);
    }

    PreferedMeetings(userId:string):Observable<Meeting>
    {
        return this.http.get<Meeting>(`${this.apiUrl}/userDisabledmeeting/${userId}`);    
    }

    deleteRequestedMeeting(list: Meetings[], id: string) {
        let updateList: MeetingDemo[] = [];
        for (let i in list) {
            let dateArr = list[i].date.split("/");
            let timeArr = list[i].time.split(":");
            let date: Date = this.setDate(dateArr, list[i].date, timeArr)
            updateList.push({ id: list[i].id, date: date, time: date, meetingId: list[i].meetingId, meetingUrl: list[i].meetingUrl, location: list[i].location, users: list[i].users });
        }
        return this.http.post<any>(`${this.apiUrl}/userReqMeetingRemove/${id}`, updateList);
    }


    updateMeeting(list: Meetings[], id: string) {
        let updateList: MeetingDemo[] = [];
        for (let i in list) {
            let dateArr = list[i].date.split("/");
            let timeArr = list[i].time.split(":");
            let date: Date = this.setDate(dateArr, list[i].date, timeArr)
            updateList.push({ id: list[i].id, date: date, time: date, meetingId: list[i].meetingId, meetingUrl: list[i].meetingUrl, location: list[i].location, users: list[i].users });
        }
        return this.http.post<any>(`${this.apiUrl}/assign-meets/${id}`, updateList);
    }

    RequestMeeting(list: Meetings[], id: string) {
        let updateList: MeetingDemo[] = [];
        for (let i in list) {
            let dateArr = list[i].date.split("/");
            let timeArr = list[i].time.split(":");
            let date: Date = this.setDate(dateArr, list[i].date, timeArr)
            updateList.push({ id: list[i].id, date: date, time: date, meetingId: list[i].meetingId, meetingUrl: list[i].meetingUrl, location: list[i].location, users: list[i].users });
        }
        return this.http.post<any>(`${this.apiUrl}/userReqMeeting/${id}`, updateList);
    }

    setDate(dateArr: string[], date: string, timeArr: string[]) {
        let newDate = new Date(date);
        newDate.setDate(Number(dateArr[1]));
        newDate.setMonth(Number(dateArr[0]));
        newDate.setFullYear(Number(dateArr[2]));
        newDate.setHours(Number(timeArr[0]));
        newDate.setMinutes(Number(timeArr[1]));
        return new Date(newDate);
    }
  


    formatList(meetings: Meetings[]) {
        for (let i in meetings) {
            let date = new Date(meetings[i].date).toLocaleDateString();
            meetings[i].date = date;
            let temp = new Date(meetings[i].time).setSeconds(0);
            let time = new Date(temp).toLocaleTimeString();
            meetings[i].time = time;
        }
        return meetings;
    }

    createMeeting(meet: Meeting) {
        return this.http.post<Meeting>(`${this.apiUrl}/create-meeting`, meet);
    }

    disableUser(userId: string, username: string) {
        return this.http.post<string>(`${this.apiUrl}/update-role/${userId}`, username);
    }

    setData(user: User) { this.userData = user; }

    getData() { return this.userData; }

    setUserId(userId: string) { this.currentUserId = userId; }

    getUserId() { return this.currentUserId;}

    disableMeeting(mid: number) { return this.http.get(`${this.apiUrl}/disable/${mid}`); }


    public publishMeeting(id:number) {
        return this.http.get(`${this.apiUrl}/meeting_publish/${id}`);
    }
}