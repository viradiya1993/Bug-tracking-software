import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';


const BACKEND_URL = environment.apiUrl + '';
@Injectable({
  providedIn: 'root'
})
export class BugtypeService {

  constructor(private http: HttpClient) { }

  //Fetch Bug Type List
  getBugTypeList(limit: any, page: any, shortName: any, shortType: any, search: any) {
    let url = BACKEND_URL + '/bugtype/getbugTypeList';
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
  addBugType(data: any) {
    return this.http.post(BACKEND_URL + '/bugtype/create', data);
  }

   // get BugType detail
  geBugTypeDetail(id: any) {
    return this.http.get(BACKEND_URL + '/bugtype/getbugtype/' + id);
  }

  updateBugType(data, id) {
    return this.http.post(BACKEND_URL + '/bugtype/updateBugtype/' +  id, data);
  }

  // for delete bugType
  deleteBugType(id: any) {
    return this.http.delete(BACKEND_URL + '/bugtype/delete-bugtype/' + id);
  }
}
