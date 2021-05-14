import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { UserProfileComponent } from "./user-profile.component";

const routes: Routes = [
    { path: '', component: UserProfileComponent }
];


@NgModule({
    declarations: [UserProfileComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      SharedModule
    ]
  })
export class UserProfileModule { }