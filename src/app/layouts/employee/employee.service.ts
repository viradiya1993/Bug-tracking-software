import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

const BACKEND_URL = environment.apiUrl + '/employee/';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getEmployeeList(PerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${PerPage}&page=${currentPage}`
    return this.http.get<{ message: string, employeeLists: any, count: number }>
      (BACKEND_URL + queryParams);
  }

  addEmployee(employeeData: object) {
    return this.http.post(BACKEND_URL + 'create', employeeData);
  }

  getEmployeeById(id) {
    return this.http.get(BACKEND_URL + id);
  }
}
