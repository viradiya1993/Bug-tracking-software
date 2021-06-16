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

  //Fetch Project
  getProjectList(limit: any, page: any, shortName: any, shortType: any, search: any) {
    let url = BACKEND_URL + '/project/get-project-list';
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
  
  //Add project
  addProject(data: any) {
    return this.http.post(BACKEND_URL + '/project/create', data);
  }

  //get project detail
  getProjectDetail(id: any) {
    return this.http.get(BACKEND_URL + '/project/getproject/' + id);
  }

  //Update Project details
  updateProject(data: any, id: any) {
    return this.http.post(BACKEND_URL + '/project/updateproject/' +  id, data);
  }

  //Delete project details
  deleteProject(id: any) {
    return this.http.delete(BACKEND_URL + '/project/delete-projects/' + id);
  }
}
