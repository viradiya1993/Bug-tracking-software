import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { NotificationsComponent } from "./notifications.component";

const routes: Routes = [
    { path: '', component: NotificationsComponent }
];


@NgModule({
    declarations: [NotificationsComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      SharedModule
    ]
  })
export class NotificationsModule { }