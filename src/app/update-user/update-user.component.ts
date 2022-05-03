import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  userData!: User;
  constructor(private userService: UserService) {
    
   }

  ngOnInit(): void {
    this.userData = this.userService.getData();
    
  }

  onSubmit(){
      
  }
}
