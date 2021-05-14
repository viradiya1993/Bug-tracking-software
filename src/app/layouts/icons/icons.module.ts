import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { IconsComponent } from "./icons.component";



const routes: Routes = [
    { path: '', component: IconsComponent }
];

@NgModule({
    declarations: [IconsComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      SharedModule
    ]
  })
  
export class IconModule { }