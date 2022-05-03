import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CreateMeetComponent } from './admin/meet-list/create-meet/create-meet.component';
import { MeetListComponent } from './admin/meet-list/meet-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AssignMeetComponent } from './dialog/assign-meet/assign-meet.component';
import { AssignUserComponent } from './dialog/assign-user/assign-user.component';
import { EncryptpassComponent } from './encryptpass/encryptpass.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from './services/admin.guard';
import { AuthGuard } from './services/auth.guard';
import { RoleGuard } from './services/role.guard';
import { UserGuard } from './services/user.guard';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserHomeComponent } from './user-home/user-home.component';


const routes: Routes = [
 
  // {path: 'logout',component: HomeComponent},
  {path: '',component: LoginComponent, pathMatch: 'full'},
  {path: 'login',component: LoginComponent},
  
  {path: 'encrypt',component: EncryptpassComponent},
  {path: 'admin',component: AdminComponent,canActivate:[AdminGuard]},
  {path: 'create-user',component: CreateUserComponent},
  {path: 'user',component: UserHomeComponent,canActivate:[UserGuard]},
  {path: 'update-user',component: UpdateUserComponent,canActivate:[AdminGuard]},
  {path: 'meeting-list',component: AssignMeetComponent,canActivate:[AuthGuard]},
  {path: 'meet-list',component: MeetListComponent,canActivate:[AdminGuard]},
  {path: 'admin/create-meet',component: CreateMeetComponent,canActivate:[AuthGuard]},
  {path: 'admin/assign-user',component: AssignUserComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
