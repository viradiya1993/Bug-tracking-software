import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnologyComponent } from './technology.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { DatePipe } from '@angular/common';
import { AddTechnologyComponent } from './add-technology/add-technology.component';
import { EditTechnologyComponent } from './edit-technology/edit-technology.component';

const routes: Routes = [
  { path: '', component: TechnologyComponent },
  { path: 'add-technology', component: AddTechnologyComponent },
  { path: 'edit-technology/:id', component: EditTechnologyComponent }
];

@NgModule({
  declarations: [TechnologyComponent, AddTechnologyComponent, EditTechnologyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [DatePipe]
})
export class TechnologyModule { }
