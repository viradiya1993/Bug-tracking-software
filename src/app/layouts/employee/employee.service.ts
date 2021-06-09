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

  // getEmployeeList(PerPage: number, currentPage: number, shortType: string, search: any) {
  //   console.log(search);
  //   let searchObject = {
  //     first_name: search.first_name,
  //     middle_name: search.middle_name,
  //     last_name: search.last_name,
  //   }
  //   const queryParams = `?pageSize=${PerPage}&page=${currentPage}&sortBy=${shortType}&search=`
  //   const querySearchParams = searchObject;
  //   return this.http.get<{ message: string, employeeLists: any, count: number }>
  //     (BACKEND_URL + queryParams + querySearchParams);
  // }

  getEmployeeList(data: any) {
    console.log(data);
    const queryParams = `?pageSize=${data.size}&page=${data.pageNumber}&sortBy=${data.sortby}`
    return this.http.get<{ message: string, employeeLists: any, count: number }>
      (BACKEND_URL + queryParams, data);
  }

  addEmployee(employeeData: object) {
    return this.http.post(BACKEND_URL + 'create', employeeData);
  }

  getEmployeeById(id) {
    return this.http.get(BACKEND_URL + id);
  }

  editEmployee(employeeData: object, id: string) {
    return this.http.put(BACKEND_URL + id, employeeData);
  }

  deleteEmployee(id: string) {
    return this.http.delete(BACKEND_URL + id);
  }
}
