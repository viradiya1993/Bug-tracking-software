import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordModel } from 'app/model/reset-password.model';
import { SharedService } from 'app/shared/shared.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  user: ResetPasswordModel = new ResetPasswordModel();
  token: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private authService: AuthService, public sharedService: SharedService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      this.token = res.token;
    })
  }

  submitForm(form: NgForm) {
    const data = {
      new_password: form.value.confirmPassword,
      reset_password_token: this.token
    }
    this.authService.ResetPassword(data).subscribe((res: any) => {
      this.sharedService.loggerSuccess(res.message);
      this.router.navigate(['/login'])
    }, err => {
      this.sharedService.loggerError(err.message);
    });
  }

  onCancel() {
    this.router.navigate(['/login']);
  }
}
