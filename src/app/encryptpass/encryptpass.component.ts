import { Component, OnInit } from '@angular/core';
import { PasswordSecurityService } from '../services/password-security.service';

@Component({
  selector: 'app-encryptpass',
  templateUrl: './encryptpass.component.html',
  styleUrls: ['./encryptpass.component.css']
})
export class EncryptpassComponent implements OnInit {

  constructor(private passService: PasswordSecurityService) { }
  password="";
  ngOnInit(): void {
    
  }
  encryptPassword(){
    console.log(this.passService.encryptFun(this.password));
  }
}
