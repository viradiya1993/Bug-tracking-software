import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

const BACKEND_URL = environment.apiUrl + '/user/';
@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  changePassword(data: any) {
    console.log(data);
    return this.http.post(BACKEND_URL + 'change-password', data);
  }
}
