import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';


const BACKEND_URL = environment.apiUrl + '';
@Injectable({
  providedIn: 'root'
})
export class BugstatusService {

  constructor(private http: HttpClient) { }


  //Fetch Bug Type List
  getBugStatusList(limit: any, page: any, shortName: any, shortType: any, search: any) {
    let url = BACKEND_URL + '/bugstatus/getbugstatusList';
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

   //Add Bug Status
  addBugStatus(data: any) {
   return this.http.post(BACKEND_URL + '/bugstatus/create', data);
  }

  // get BugType detail
  geBugStatusDetail(id: any) {
    return this.http.get(BACKEND_URL + '/bugstatus/getbugstatus/' + id);
  }

  updateBugStatus(data, id) {
    return this.http.post(BACKEND_URL + '/bugstatus/updateBugstatus/' +  id, data);
  }

  // for delete bugStatus
  deleteBugStatus(id: any) {
    return this.http.delete(BACKEND_URL + '/bugstatus/delete-bugstatus/' + id);
  }
}
