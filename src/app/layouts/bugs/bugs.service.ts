import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';


const BACKEND_URL = environment.apiUrl + '';
@Injectable({
  providedIn: 'root'
})
export class BugsService {

  constructor(private http: HttpClient) { }

  //Fetch Bug status
  getBugstatus() {
    return this.http.get(BACKEND_URL + '/bugs/getbugstatus');
  }

  //Fetch Bug type
  getBugsType() {
    return this.http.get(BACKEND_URL + '/bugs/getbugstype');
  }

  //Fetch Bug Priority
  getBugsPriority() {
    return this.http.get(BACKEND_URL + '/bugs/getbugspriority');
  }

  //Add bug
  addBug(data: any) {
    return this.http.post(BACKEND_URL + '/bugs/create', data);
  }

  //Fetch Bug List
  getBugsList(limit: any, page: any, shortName: any, shortType: any, search: any, project_id: any,) {
    let url = BACKEND_URL + '/bugs/get-bugs-list';
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
    if (project_id != null) {
      url += '&project_id=' + project_id;
    }
    return this.http.get(url);
  }
  
}
