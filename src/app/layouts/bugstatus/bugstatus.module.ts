import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugstatusComponent } from './bugstatus.component';
import { AddStatusComponent } from './add-status/add-status.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
//import { ColorPickerModule } from 'ngx-color-picker';
const routes: Routes = [
  { path: '', component: BugstatusComponent },
  { path: 'add-bugstatus', component: AddStatusComponent },
  { path: 'edit-bugstatus/:id', component: AddStatusComponent },
 
];

@NgModule({
  declarations: [BugstatusComponent, AddStatusComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxMatColorPickerModule,
    //ColorPickerModule
  ],
  providers: [
   { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ]
})
export class BugstatusModule { }
