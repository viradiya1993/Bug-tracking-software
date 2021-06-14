import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

const BACKEND_URL = environment.apiUrl + '';
@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  constructor(private http: HttpClient, private router: Router) { }

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
