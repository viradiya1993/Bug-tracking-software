import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BugsComponent } from './bugs.component';
import { AddBugsComponent } from './add-bugs/add-bugs.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from 'ckeditor4-angular';
import { CommentsComponent } from './comments/comments.component';


const routes: Routes = [
  { path: '', component: BugsComponent },
  { path: 'bug-list/:id', component: BugsComponent },
  { path: 'add-bug', component: AddBugsComponent },
  { path: 'add-bug/:project_id', component: AddBugsComponent },
  { path: 'edit-bug/:id', component: AddBugsComponent },
  { path: 'view-bug/:viewId', component: AddBugsComponent },
  { path: 'comments/:id', component: CommentsComponent }
];

@NgModule({
  declarations: [BugsComponent, AddBugsComponent, CommentsComponent],
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
