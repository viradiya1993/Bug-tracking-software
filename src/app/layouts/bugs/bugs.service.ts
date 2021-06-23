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
    return this.http.get<{ message: string, data: any, count: number }>
      (BACKEND_URL + '/bugs/getbugstatus');
  }

  // //Fetch Bug type
  // getBugsType() {
  //   return this.http.get<{ message: string, data: any, count: number }>
  //     (BACKEND_URL + '/bugs/getbugtypes');
  // }

  //Fetch Bug Priority
  getBugsPriority() {
    return this.http.get<{ message: string, data: any, count: number }>
    (BACKEND_URL + '/bugs/getbugspriority');
  }
}
