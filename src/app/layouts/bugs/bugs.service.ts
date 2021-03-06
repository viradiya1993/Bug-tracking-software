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
  getBugsList(limit: any, page: any, shortName: any, shortType: any, search: any, employee_id: any, project_id: any, bug_status: any, bug_type: any, bug_priority: any) {
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
    if (employee_id != null) {
      url += '&employee_id=' + employee_id;
    }
    if (project_id != null) {
      url += '&project_id=' + project_id;
    }
    if (bug_status != null) {
      url += '&bug_status=' + bug_status;
    }
    if (bug_type != null) {
      url += '&bug_type=' + bug_type;
    }
    if (bug_priority != null) {
      url += '&bug_priority=' + bug_priority;
    }
    return this.http.get(url);
  }
  
  //get project detail
  getBugsDetail(id: any) {
    return this.http.get(BACKEND_URL + '/bugs/getbugdetails/' + id);
  }

  //Update Bug details
  updateBugDetails(data: any, id: any) {
    return this.http.post(BACKEND_URL + '/bugs/updatebugdetails/' + id, data);
  }

  //Delete project details
  deleteBugDetails(id: any) {
    return this.http.delete(BACKEND_URL + '/bugs/delete-bugs/' + id);
  }

  //Add Comments
  addComments(data: any) {
    return this.http.post(BACKEND_URL + '/comments/create', data);
  }

  //get Comments
  getComments() {
    return this.http.get(BACKEND_URL + '/comments/getComment');
  }
  
  //update Bug status
  updateBugStatus(bugstatusID, bugID) {
    let data = {
      'bugId': bugID,
      'bugstatusId': bugstatusID
    }
    return this.http.post(BACKEND_URL + '/bugs/updatebugStatus', data);
  }

  downloadFile(file: any) {
    return this.http.get(BACKEND_URL + '/comments/file'+ file);
  }
}


//http://localhost:3000/api/bugs/updatebugStatus