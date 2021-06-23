import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugsComponent } from './bugs.component';
import { AddBugsComponent } from './add-bugs/add-bugs.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  { path: '', component: BugsComponent },
  { path: 'add-bug', component: AddBugsComponent },
  { path: 'add-bug/:id', component: AddBugsComponent },
 
];

@NgModule({
  declarations: [BugsComponent, AddBugsComponent],
  imports: [
    CommonModule,
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgSelectModule,
  ]
})
export class BugsModule { }
