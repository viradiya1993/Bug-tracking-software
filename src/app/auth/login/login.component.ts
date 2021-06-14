import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConst } from 'app/app.constant';
import { User } from 'app/model/user.modle';
import { SharedService } from 'app/shared/shared.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loader = false;
  token: string;
  private userId: string;
  private tokenTimer: NodeJS.Timer;
  private role: string;
  private isAdmin: boolean;

  user = new User();
  show_button: Boolean = false;
  show_eye: Boolean = false;
  emailPattern = AppConst.emailValidationPattern;
  @ViewChild('loginForm', null) loginForm: NgForm;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return
    }
    const AuthData = {
      email: form.value.email.toLowerCase(),
      password: form.value.password,
    }
    if (!this.loader) {
      this.loader = true;
      this.authService.login(AuthData).subscribe((res: any) => {
        this.loader = false;
        this.token = res.token;
        if (this.token) {
          const expiresInDuration = res.expiresIn;
          this.userId = res.userId;
          this.role = res.role;
          this.isAdmin = res.isAdmin;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(this.token, expirationDate, this.userId, this.role, this.isAdmin);
          this.sharedService.loggerSuccess(res.message);
          this.router.navigate(['/dashboard'])
        }
      }, err => {
        if (err.message) {
          this.resetForm();
          err.message = "Invalid Authentication Credential!";
          // this.loader = true;
          this.setLoader();
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

  // Auto auth user
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);

    }
  }

  // Save Auth Data 
  private saveAuthData(token: string, expirationDate: Date, userId: string, role: string, isAdmin: boolean) {
    this.sharedService.setLocalStorage("isLoggedin", token);
    this.sharedService.setLocalStorage("expiration", expirationDate.toISOString());
    this.sharedService.setLocalStorage("userId", userId);
    this.sharedService.setLocalStorage("role", role);
    this.sharedService.setLocalStorage("isAdmin", isAdmin);

  }

  // Set Timer
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.authService.logout();
    }, duration * 1000);
  }

  // get auto authdata
  private getAuthData() {
    const token = localStorage.getItem("isLoggedin");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }

  // Reset Form After getting error or seccuess.
  resetForm() {
    this.loginForm.reset();
  }

  setLoader() {
    setTimeout(() => {
      this.loader = false;
    }, 5000);
    this.loader = true;
  }
}
