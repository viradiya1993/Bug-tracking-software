import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    RouterModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    ReactiveFormsModule
  ],

  exports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    RouterModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  entryComponents:[],
  declarations: [DialogBoxComponent]
})
export class SharedModule { }
