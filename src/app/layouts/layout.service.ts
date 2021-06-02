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
<<<<<<< HEAD

    return this.http.post(BACKEND_URL + '/user/change-password', data);
  }

  getEmployeeList(PerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${PerPage}&page=${currentPage}`
    return this.http.get<{ message: string, employeeLists: any, count: number }>
      (BACKEND_URL + '/employee' + queryParams);
=======
    return this.http.post(BACKEND_URL + 'change-password', data);
>>>>>>> 0c7308eca3f097be46dc15abf179baf9feca3b20
  }
}
