import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConst } from 'app/app.constant';
import { User } from 'app/model/user.modle';
import { SharedService } from 'app/shared/shared.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  user = new User();
  loader = false;
  emailPattern = AppConst.emailValidationPattern;
  constructor(private router: Router, private authService: AuthService, private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  submitForgotPassword(form: NgForm) {
    const data = {
      email: form.value.email.toLowerCase()
    }
    if (!this.loader) {
      this.authService.userForgotPassword(data).subscribe((res: any) => {
        this.loader = false;
        console.log(res);
        form.reset();
        this.sharedService.loggerSuccess(res.message);
        this.router.navigate(['/login']);
      }, err => {
         this.setLoader();
         err.message = "User not found!";
         this.sharedService.loggerError(err.message);
      });
    }
  }

 

  setLoader() {
    setTimeout(() => {
      this.loader = false;
    }, 5000);
    this.loader = true;
  }
}
