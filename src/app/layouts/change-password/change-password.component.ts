import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('changePasswordForm', null) changePasswordForm: NgForm;
  loader = false;
  loaderCancel = false;
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
        if (!res.error) {
          this.sharedService.loggerSuccess(res.message);
          // if we want to make user login again then we will call logout service here
          this.resetForm();
        }

      }, err => {
        if (err.message) {
          console.log(err);
          this.resetForm();
          this.setLoader();
          this.sharedService.loggerError(err.error.message);
        }
      });

    }
  }


  onCancel() {
    this.loaderCancel = true;
    this.router.navigate(['/dashboard']);
  }

  // Reset Form After getting error or seccuess.
  resetForm() {
    this.changePasswordForm.reset();
  }

  setLoader() {
    setTimeout(() => {
      this.loader = false;
    }, 5000);
    this.loader = true;
  }

  setLoaderCancel() {
    setTimeout(() => {
      this.loaderCancel = false;
    }, 5000);
    this.loaderCancel = true;
  }
}
