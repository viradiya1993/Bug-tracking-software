import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { TableListComponent } from "./table-list.component";


const routes: Routes = [
    { path: '', component: TableListComponent }
];

@NgModule({
    declarations: [TableListComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      SharedModule
    ]
  })

export class TableListModule { }