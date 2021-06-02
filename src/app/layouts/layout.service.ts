import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

const BACKEND_URL = environment.apiUrl + '';
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

    return this.http.post(BACKEND_URL + '/user/change-password', data);
  }

  getEmployeeList(PerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${PerPage}&page=${currentPage}`
    return this.http.get<{ message: string, employeeLists: any, count: number }>
      (BACKEND_URL + '/employee' + queryParams);
  }
}
