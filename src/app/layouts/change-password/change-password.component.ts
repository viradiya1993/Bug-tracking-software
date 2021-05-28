import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'app/shared/shared.service';
import { ChangePassModel } from "../../model/change-password.model";
import { LayoutService } from '../layout.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePassword = new ChangePassModel();
  // changePassword: any = {}
  loader = false;
  constructor(
    private router: Router,
    private service: LayoutService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  onSave(form: NgForm) {
    if (form.invalid) {
      return
    }
    const data = {
      old_password: form.value.oldPassword,
      new_password: form.value.newPassword,
    }
    if (!this.loader) {
      this.loader = true;
      this.service.changePassword(data).subscribe((res: any) => {
        this.loader = false;
        console.log(res);

        // this.token = res.token;
        // if (this.token) {
        //   const expiresInDuration = res.expiresIn;
        //   this.userId = res.userId;
        //   const now = new Date();
        //   const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        //   this.saveAuthData(this.token, expirationDate, this.userId);
        //   this.sharedService.loggerSuccess(res.message);
        //   this.router.navigate(['/dashboard'])
        // }
      }, err => {
        if (err.message) {
          err.message = "Invalid Authentication Credential!";
          this.loader = true;
          this.sharedService.loggerError(err.message);
        }
      });

    }
  }


  onCancel() {
    this.router.navigate(['/dashboard']);
  }
}
