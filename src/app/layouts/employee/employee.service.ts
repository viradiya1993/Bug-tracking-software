import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Page } from 'app/shared/page';

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
    // console.log(data);
    let params = new HttpParams()
      .set('pageSize', data.size ? data.size : '')
      .set('page', data.pageNumber ? data.pageNumber : '')
      .set('sortBy', data.sortby ? data.sortby : '')
      .set('first_name', data.params.first_name ? data.params.first_name : '')
      .set('middle_name', data.params.middle_name ? data.params.middle_name : '')
      .set('last_name', data.params.last_name ? data.params.last_name : '')
      .set('email', data.params.email ? data.params.email : '')
      .set('mobile_number', data.params.mobile_number ? data.params.mobile_number : '')
      .set('gender', data.params.gender ? data.params.gender : '')
      .set('roleId', data.params.roleId ? data.params.roleId : '')
      .set('departmentId', data.params.departmentId ? data.params.departmentId : '')

    // const queryParams = `?pageSize=${data.size}&page=${data.pageNumber}&sortBy=${data.sortby}`
    return this.http.get<{ message: string, employeeLists: any, count: number }>
      (BACKEND_URL, { params });
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
