import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



import { Meetings } from '../model/meetings';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private service:UserService) { }

  columnName: string[] =['no','meetingId','meetingUrl','date','time','location'];
  meetingList!: Meetings[]; 
  searchText="";
  dataSource!: MatTableDataSource<Meetings>;
  ngOnInit(): void {

    this.service.PublishedMeetings().subscribe(resData=>{
      this.meetingList = resData;
      this.dataSource = new MatTableDataSource<Meetings>(this.meetingList)
      this.dataSource.paginator = this.paginator;
      this.formatList();
    });
  
  }

  formatList(){
    for(let i in this.meetingList){
      let date = new Date(this.meetingList[i].date).toLocaleDateString();
      this.meetingList[i].date = date;
      let temp = new Date(this.meetingList[i].time).setSeconds(0);
      let time = new Date(temp).toLocaleTimeString();
      this.meetingList[i].time = time;
    }
  }
   

}
