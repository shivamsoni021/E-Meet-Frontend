import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AppUIModule } from './app-ui.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent} from './admin/admin.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { MenuComponent } from './menu/menu.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AssignMeetComponent } from './dialog/assign-meet/assign-meet.component';
import { ViewMeetComponent } from './dialog/view-meet/view-meet.component';
import { MeetListComponent } from './admin/meet-list/meet-list.component';
import { AssignUserComponent } from './dialog/assign-user/assign-user.component';
import { ViewUserComponent } from './dialog/view-user/view-user.component';
import { CreateMeetComponent } from './admin/meet-list/create-meet/create-meet.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatTooltipModule} from '@angular/material/tooltip';



import { RequestPublisedMeetingComponent } from './admin/request-publised-meeting/request-publised-meeting.component';
import { RequestedMeetingListsComponent } from './admin/requested-meeting-lists/requested-meeting-lists.component';
import { RequsetMeetingViewComponent } from './admin/requset-meeting-view/requset-meeting-view.component';
import { authInterceptorProvider } from './services/auth-interceptor';
import { EncryptpassComponent } from './encryptpass/encryptpass.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UserHomeComponent,
    CreateUserComponent,
    HomeComponent,
    NavbarComponent,
    UpdateUserComponent,
    MenuComponent,
    AssignMeetComponent,
    ViewMeetComponent,
    MeetListComponent,
    AssignUserComponent,
    ViewUserComponent,
    CreateMeetComponent,
    
    RequestPublisedMeetingComponent,
         RequestedMeetingListsComponent,
         RequsetMeetingViewComponent,
         EncryptpassComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppUIModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    MatTooltipModule
    
    
  ],
  providers: [authInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
