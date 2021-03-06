import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProjectComponent } from './project.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CKEditorModule } from 'ckeditor4-angular';

const routes: Routes = [
  { path: '', component: ProjectComponent },
  { path: 'add-project', component: AddProjectComponent },
  { path: 'edit-project/:id', component: AddProjectComponent },
  { path: 'view-project/:viewId', component: AddProjectComponent },
 
];

@NgModule({
  declarations: [ProjectComponent, AddProjectComponent],
  imports: [
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
export class ProjectModule { }
