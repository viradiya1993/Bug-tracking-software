import { HttpClient, HttpParams } from '@angular/common/http';
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
  getProjectList(limit: any, page: any, shortName: any, shortType: any, search: any, departmentId: any, technology_id: any, employee_id: any, project_manager: any, status: any) {
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

    if (departmentId != null) {
      url += '&departmentId=' + departmentId;
    }
    if (technology_id != null) {
      url += '&technology_id=' + technology_id;
    }
    if (employee_id != null) {
      url += '&employee_id=' + employee_id;
    }
    if (project_manager != null) {
      url += '&project_manager=' + project_manager;
    }
    if (status != null) {
      url += '&status=' + status;
    }
    return this.http.get(url);
  }

  getProjectList1(limit: any, page: any, shortName: any, shortType: any, search: any, sDate, eDate, departmentId: any, technology_id: any, employee_id: any, project_manager: any) {
    let url = BACKEND_URL + '/project/get-project-list';
    // if (limit !== undefined) {
    //   url += '?limit=' + limit;
    // } else {
    //   url += '?limit=5';
    // }
    // if (page !== undefined) {
    //   url += '&skip=' + page;
    // } else {
    //   url += '&skip=0';
    // }
    // if (shortName !== undefined) {
    //   url += '&sortBy=' + shortName + ':' + shortType;
    // }
    // if (search != null) {
    //   url += '&q=' + search;
    // }
    // if (sDate != null && eDate != null) {
    //   url += '&start_date=' + sDate + '&end_date=' + eDate;
    // }
    // if (departmentId != null) {
    //   url += '&departmentId=' + departmentId;
    // }
    // if (technology_id != null) {
    //   url += '&technology_id=' + technology_id;
    // }
    // if (employee_id != null) {
    //   url += '&employee_id=' + employee_id;
    // }
    // if (project_manager != null) {
    //   url += '&project_manager=' + project_manager;
    // }
    let params = new HttpParams()
      .set('limit', limit)
      .set('page', page)
      .set('sortBy', + shortName + ':' + shortType)
      .set('q', search)
      .set('start_date', sDate)
      .set('end_date', eDate)
      .set('technology_id', technology_id)
      .set('employee_id', employee_id)
      .set('project_manager', project_manager)
    return this.http.get(url, { params });
  }

  //Add project
  addProject(data: any) {
    return this.http.post(BACKEND_URL + '/project/create', data);
  }

  getProjectStatus() {
    return this.http.get<{ message: string, status: any, count: number }>
      (BACKEND_URL + '/project/status');
  }

  //get project detail
  getProjectDetail(id: any) {
    return this.http.get(BACKEND_URL + '/project/getproject/' + id);
  }

  //Update Project details
  updateProject(data: any, id: any) {
    return this.http.post(BACKEND_URL + '/project/updateproject/' + id, data);
  }

  //Delete project details
  deleteProject(id: any) {
    return this.http.delete(BACKEND_URL + '/project/delete-projects/' + id);
  }

  updateStatusById(statusID, projectID) {
    let data = {
      'projectId': projectID,
      'statusId': statusID
    }
    return this.http.post(BACKEND_URL + '/project/updateStatusById', data);
  }
}
