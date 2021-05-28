import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MustMatchDirective } from "app/shared/must-match.directive";
import { SharedModule } from "app/shared/shared.module";
import { ChangePasswordComponent } from "./change-password.component";

const routes: Routes = [
  { path: '', component: ChangePasswordComponent }
];

@NgModule({
  declarations: [
    ChangePasswordComponent,
    MustMatchDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ChangePasswordModule { }