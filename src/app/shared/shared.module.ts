import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NgSelectModule } from '@ng-select/ng-select';
import { DialogComponent } from './dialog/dialog.component';
import { SearchTextboxComponent } from './search-textbox/search-textbox.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DateFormatPipe } from './date-format-pipe.pipe';
import { DeleteBoxComponent } from './delete-box/delete-box.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ChartModule } from 'angular-highcharts';
import { ChartsModule } from 'ng2-charts';
import { DateAgoPipe } from './date-ago.pipe';


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
    ReactiveFormsModule,
    NgSelectModule,
    ChartModule,
    ChartsModule,
  ],

  exports: [
    FormsModule,
    ReactiveFormsModule,
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
    ReactiveFormsModule,
    SearchTextboxComponent,
    PaginationComponent,
    DateFormatPipe,
    DateAgoPipe,
    DeleteBoxComponent,
    PieChartComponent
  ],
  entryComponents: [],
  declarations: [DialogComponent, SearchTextboxComponent, PaginationComponent, DateFormatPipe, DateAgoPipe, DeleteBoxComponent, PieChartComponent]
})
export class SharedModule { }
