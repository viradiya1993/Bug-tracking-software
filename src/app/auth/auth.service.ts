import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';



const BACKEND_URL = environment.apiUrl + '/user/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenTimer: NodeJS.Timer;
  constructor(private http: HttpClient, private router: Router) { }

  // get Token
  getToken() {
    return localStorage.getItem('isLoggedin');
  }

  // Create User
  createUser(authData) {
    return this.http.post(BACKEND_URL + 'signup', authData);
  }

  // Login User
  login(authData: any) {
    return this.http.post(BACKEND_URL + 'login', authData);
  }

  // forgot password
  userForgotPassword(email: any) {
    return this.http.post(BACKEND_URL + 'forgot-password', email);
  }

  // reset password
  ResetPassword(data: any) {
    return this.http.post(BACKEND_URL + 'set-password', data);
  }

  //Logout user
  logout() {
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  // Remove login data
  private clearAuthData() {
    localStorage.removeItem("isLoggedin");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

 
    
  // gettoken() {
  //   return !!localStorage.getItem("SeesionUser");
  // }
  
  // setToken() {
  //   localStorage.getItem("SeesionUser")
  // }
}
  