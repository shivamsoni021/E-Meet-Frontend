import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { UserRoles } from '../constants/role';
import { LoginService } from '../login/login.service';
import { PasswordSecurityService } from '../services/password-security.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  apiUrl: string = environment.apiBaseUrl;
  isActive: boolean = false;
  isAdmin!: boolean;
  hide = true;
  userForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    firstName: ['', [Validators.required, Validators.minLength(4)]],
    lastName: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    phoneno: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
  });

  constructor(private userService: UserService,
    private router: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private passwordService: PasswordSecurityService) { }

  ngOnInit(): void { this.getRole();}

  onSubmit() {
    var formValues = this.userForm.value;
    if (this.userForm.valid) {
      let encrypt = this.passwordService.encryptFun(formValues.password);
      this.userService.createUser(formValues.username, encrypt, formValues.phoneno, formValues.email, this.isActive,formValues.firstName , formValues.lastName)
        .subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'User Registered Successfully',
            showConfirmButton: false,
            timer: 1500
          })
          window.location.reload();

          if (this.isAdmin) this.router.navigate(['admin']);
          else this.router.navigate(['user']);
        },
        errData=>{
          console.log(errData);
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: errData.error.message,
          })
        });
    } ;
  }

  get username() { return this.userForm.get('username'); }
  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }
  get phoneno() { return this.userForm.get('phoneno') }

  getRole() {
    let currentRole = this.loginService.getRole();
    if (currentRole === UserRoles.ROLE_ADMIN) {
      this.isAdmin = true;
      this.isActive = true;
    }
    else {
      this.isAdmin = false;
      this.isActive = false;
    }
  }
}
