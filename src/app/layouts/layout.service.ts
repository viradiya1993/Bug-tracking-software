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

  //get technology list
  getTechnology(limit: any, page: any, shortType: any, search: any) {
    let params = new HttpParams()
    .set("limit", limit)
    .set("page", page)
    .set("sortBy", shortType )
    .set("search", search)
    return this.http.get(BACKEND_URL + '/technology/gettechnology', { params: params });
    // .set("pagesize", postsPerPage)
    // .set("page", currentPage);
    // this.http.get<{message: string, posts: any, maxPosts: number}>('http://localhost:3000/api/posts', { params: params })
    let url = BACKEND_URL + '/technology/gettechnology';
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
    
    if (search != null) {
      url += '&q=' + search;
    }
    
    return this.http.get(url);
  }
  

}
