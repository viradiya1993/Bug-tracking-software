import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

const BACKEND_URL = environment.apiUrl + '';
@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private http: HttpClient, private router: Router) { }

  //get employee list
  getEmployeeList(PerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${PerPage}&page=${currentPage}`
    return this.http.get<{ message: string, employeeLists: any, count: number }>
      (BACKEND_URL + '/employee' + queryParams);
  }

  getDepartmentData() {
    return this.http.get<{ message: string, userDepartment: any, count: number }>
      (BACKEND_URL + '/department/getDepartmentList');
  }

  getRolesData() {
    return this.http.get<{ message: string, userRoles: any, count: number }>
      (BACKEND_URL + '/user/getRole');
  }

  getGenderData() {
    return this.http.get<{ message: string, data: any, data_count: number }>
      (BACKEND_URL + '/user/gender');
  }

  getEmployee(data: any) {
    let params = new HttpParams()
      .set('roleId', data.roleId)
    return this.http.get<{ message: string, employee: any, count: number }>
      (BACKEND_URL + '/employee/', { params });
  }

  getTechnology() {
    return this.http.get<{ message: string, technologoy: any, count: number }>
      (BACKEND_URL + '/project/gettechnology');
  }

  getProject() {
    return this.http.get<{ message: string, project: any, count: number }>
    (BACKEND_URL + '/bugs/getproject');
  }

}

/*
   let params = new HttpParams()
    .set("?limit", limit)
    .set("page", page)
    .set("sortBy", shortType )
    .set("&q", search)
    return this.http.get(BACKEND_URL + '/technology/gettechnology', { params: params } );

*/