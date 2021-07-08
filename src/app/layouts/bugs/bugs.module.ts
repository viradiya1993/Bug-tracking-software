import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BugsComponent } from './bugs.component';
import { AddBugsComponent } from './add-bugs/add-bugs.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ViewBugsComponent } from './view-bugs/view-bugs.component';
import { TasksComponent } from './tasks/tasks.component';
import { CKEditorModule } from 'ckeditor4-angular';
const routes: Routes = [
  { path: '', component: BugsComponent },
  { path: 'bug-list/:id', component: BugsComponent },
  { path: 'add-bug', component: AddBugsComponent },
  { path: 'add-bug/:project_id', component: AddBugsComponent },
  { path: 'edit-bug/:id', component: AddBugsComponent },
  { path: 'tasks', component: TasksComponent }
];

@NgModule({
  declarations: [BugsComponent, AddBugsComponent, ViewBugsComponent, TasksComponent],
  imports: [
    CommonModule,
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgSelectModule,
    CKEditorModule
  ],

  providers: [
    MatDatepickerModule,
    DatePipe
  ],
})
export class BugsModule { }
