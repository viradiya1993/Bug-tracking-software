import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from './list/list.component';
import { SharedModule } from 'app/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';


const routes: Routes = [
  { path: '', component: ListComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxSpinnerModule
  ]
})
export class EmployeeModule { }
