import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MapsComponent } from "./maps.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";

const routes: Routes = [
    { path: '', component: MapsComponent }
];

@NgModule({
    declarations: [MapsComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      SharedModule
    ]
  })

  export class MapModule { }