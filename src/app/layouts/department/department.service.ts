import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

const BACKEND_URL = environment.apiUrl + '/department/';
@Injectable({
  providedIn: 'root'
})

export class DepartmentService {

  constructor(
    private http: HttpClient,
  ) { }


  //get technology list=
  getDepartmentList(limit: any, page: any, shortName: any, shortType: any, search: any) {
    let url = BACKEND_URL + 'getDepartmentList';
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

  addDepartment(data: any) {
    return this.http.post(BACKEND_URL + 'create-department', data);
  }

  updateDepartment(data: any) {
    return this.http.put(BACKEND_URL + 'update-department/' + data.id, data);
  }

  getDepartmentById(id: any) {
    return this.http.get(BACKEND_URL + 'getDepartmentByID/' + id);
  }

  deleteDepartment(id: any) {
    return this.http.delete(BACKEND_URL + 'delete-department/' + id);
  }


}
