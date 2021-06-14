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
  
  //Add project
  addProject(data: any) {
    return this.http.post(BACKEND_URL + '/project/create', data);
  }

  //get project detail
  getProjectDetail(id: any) {
    return this.http.get(BACKEND_URL + '/project/getproject/' + id);
  }

  //Update Project details
  updateProjectDetail(data, id) {
    return this.http.post(BACKEND_URL + '/project/updateproject/' +  id, data);
  }

  //Delete project details
  deleteProject(id: any) {
    return this.http.delete(BACKEND_URL + '/project/delete-projects/' + id);
  }
}
