import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { MatSelectModule } from '@angular/material/select'
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule} from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from  '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlexLayoutModule } from '@angular/flex-layout'

const uiModules = [
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatSelectModule,
  MatToolbarModule,
  MatCardModule,
  BrowserAnimationsModule,
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatMenuModule,
  MatDialogModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMomentDateModule,
  MatPaginatorModule,
  MatExpansionModule,
  FlexLayoutModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    uiModules
  ],
  exports: [
    uiModules
  ]
})
export class AppUIModule { }
