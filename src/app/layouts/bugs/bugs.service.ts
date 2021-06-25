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
}
