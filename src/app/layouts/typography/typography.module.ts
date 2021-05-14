import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { TypographyComponent } from "./typography.component";

const routes: Routes = [
    { path: '', component: TypographyComponent }
];

@NgModule({
    declarations: [TypographyComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      SharedModule
    ]
  })
export class TypographyModule { }