import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

const BACKEND_URL = environment.apiUrl + '';
@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {

  constructor(private http: HttpClient, private router: Router) { }

  //Chnage Password
  changePassword(data: any) {
    return this.http.post(BACKEND_URL + '/user/change-password', data);
  }

}
