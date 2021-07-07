import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from './list/list.component';
import { SharedModule } from 'app/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSortModule } from '@angular/material/sort';


const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'add-employee', component: AddComponent },
  { path: 'edit-employee/:employeeId', component: AddComponent },
];

@NgModule({
  declarations: [ListComponent, AddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatSortModule
  ]
})
export class EmployeeModule { }
