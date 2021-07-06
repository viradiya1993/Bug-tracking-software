import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChartModule } from 'angular-highcharts';
import { ChartsModule } from 'ng2-charts';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
    { path: '', component: DashboardComponent }
];

@NgModule({
    declarations: [DashboardComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      SharedModule,
      //ChartModule,
      //ChartsModule
    ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
      NO_ERRORS_SCHEMA
    ]
  })
export class DashboardModule { }