import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';


const BACKEND_URL = environment.apiUrl + '';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getProjectCount(data: any) {
    let params = new HttpParams()
    .set('statusOpen', data.statusOpen)
    .set('statusInPro', data.statusInPro)
    .set('status', data.status)
    return this.http.get(BACKEND_URL + '/dashboard/get-project-count', { params })
  }

  getActiveProject(data: any) {
    let params = new HttpParams()
    .set('statusOpen', data.statusOpen)
    .set('statusInPro', data.statusInPro)
    return this.http.get(BACKEND_URL + '/dashboard/get-active-project', { params })
  }  
  
  getAssignActiveProject(data: any) {
    let params = new HttpParams()
    .set('statusOpen', data.statusOpen)
    .set('statusInPro', data.statusInPro)
    return this.http.get(BACKEND_URL + '/dashboard/get-activeassignpmproject', {params})
  }
}
