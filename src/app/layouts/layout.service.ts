import { HttpClient, HttpParams } from '@angular/common/http';
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
 
  //Chnage Password
  changePassword(data: any) {
    return this.http.post(BACKEND_URL + '/user/change-password', data);
  }
 
  //get employee list
  getEmployeeList(PerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${PerPage}&page=${currentPage}`
    return this.http.get<{ message: string, employeeLists: any, count: number }>
      (BACKEND_URL + '/employee' + queryParams);
  }

  getDepartmentData() {
    return this.http.get<{ message: string, userDepartment: any, count: number }>
      (BACKEND_URL + '/user/getDepartmentList');
  }

  getRolesData() {
    return this.http.get<{ message: string, userRoles: any, count: number }>
      (BACKEND_URL + '/user/getRole');
  }

  //get technology list=
  getTechnology(limit: any, page: any, shortName: any, shortType: any, search: any) {
    let url = BACKEND_URL + '/technology/getTechnologyList';
    if (limit !== undefined) {
      url += '?limit=' + limit;
    } else {
      url += '?limit=5';
    }
    if (page !== undefined) {
      url += '&skip=' + page;
    } else {
      url += '&skip=0';
    }
    if (shortName !== undefined) {
      url += '&sortBy=' + shortName + ':' + shortType;
    }
    if (search != null) {
      url += '&q=' + search;
    }
   
    return this.http.get(url);
  }

 

  //Add Technology
  addTechnology(data: any) {
    return this.http.post(BACKEND_URL + '/technology/create', data);
  }

  // get technology detail
  geTechnologyDetail(id: any) {
    return this.http.get(BACKEND_URL + '/technology/getTechnology/' + id);
  }

  updateTechnology(data, id) {
    return this.http.post(BACKEND_URL + '/technology/updateTechnology/' +  id, data);
  }

  // for delete technology
  deletetechnology(id: any) {
    return this.http.delete(BACKEND_URL + '/technology/delete-technology/' + id);
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