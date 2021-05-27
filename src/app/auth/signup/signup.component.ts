import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConst } from 'app/app.constant';
import { User } from 'app/model/user.modle';
import { SharedService } from 'app/shared/shared.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  loader = false;
  user = new User();
  show_button: Boolean = false;
  show_eye: Boolean = false;
  emailPattern = AppConst.emailValidationPattern;
  constructor(private authService: AuthService, private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
   
  }

  onSignup(form: NgForm) {
    if(form.invalid) {
      return
    }
    const AuthData = {
      email : form.value.email.toLowerCase(),
      password : form.value.password,
    }
    if(!this.loader) {
      this.loader = true;
      this.authService.createUser(AuthData).subscribe((res:any) => {
        this.loader = false;
        this.sharedService.loggerSuccess(res.message);
        this.router.navigate(['/']);
      }, err => {
        if (err.message) {
          err.message = "Invalid Authentication Credential!";
          this.loader = true;
          this.sharedService.loggerError(err.message);
        }
      });
    }
  }

   // Show password eye
   showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }
  
}
