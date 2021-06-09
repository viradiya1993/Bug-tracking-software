import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';


const BACKEND_URL = environment.apiUrl + '';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private router: Router) { }

  getEmployee() {
    return this.http.get<{ message: string, userDepartment: any, count: number }>
      (BACKEND_URL + '/project/getemployee');
  }
}
