import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugtypesComponent } from './bugtypes.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AddBugtypeComponent } from './add-bugtype/add-bugtype.component';

const routes: Routes = [
  { path: '', component: BugtypesComponent },
  { path: 'add-bugtype', component: AddBugtypeComponent },
  { path: 'edit-bugType/:id', component: AddBugtypeComponent },
 
];

@NgModule({
  declarations: [BugtypesComponent, AddBugtypeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class BugtypesModule { }
