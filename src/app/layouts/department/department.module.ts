import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'app/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';


const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'add-department', component: AddComponent },
  { path: 'edit-department/:departmentId', component: AddComponent },
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
export class DepartmentModule { }
