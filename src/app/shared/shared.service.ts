import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConst } from './../app.constant'

import { RouteInfo } from "../model/routes.model";
import { Router } from '@angular/router';
// export const ROUTES: RouteInfo[] = [
//   { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '', onlyAdmin: false },
//   { path: '/user-profile', title: 'User Profile', icon: 'person', class: '', onlyAdmin: false },
//   { path: '/table-list', title: 'Table List', icon: 'content_paste', class: '', onlyAdmin: false },
//   { path: '/typography', title: 'Typography', icon: 'library_books', class: '', onlyAdmin: false },
//   { path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '', onlyAdmin: false },
//   { path: '/maps', title: 'Maps', icon: 'location_on', class: '', onlyAdmin: false },
//   { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '', onlyAdmin: false },
//   { path: '/employee', title: 'Employee', icon: 'content_paste', class: '', onlyAdmin: true },
//   { path: '/technology', title: 'Technology', icon: 'content_paste', class: '', onlyAdmin: false },
//   { path: '/department', title: 'Department', icon: 'dashboard', class: '', onlyAdmin: false },
//   { path: '/project', title: 'Project', icon: 'content_paste', class: '', onlyAdmin: false },
// ];

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '', onlyAdmin: false },
    // { path: '/user-profile', title: 'User Profile', icon: 'person', class: '', onlyAdmin: false },
    // { path: '/table-list', title: 'Table List', icon: 'content_paste', class: '', onlyAdmin: false },
    // { path: '/typography', title: 'Typography', icon: 'library_books', class: '', onlyAdmin: false },
    // { path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '', onlyAdmin: false },
    // { path: '/maps', title: 'Maps', icon: 'location_on', class: '', onlyAdmin: false },
    // { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '', onlyAdmin: false },
    { path: '/employee', title: 'Employee', icon: 'content_paste', class: '', onlyAdmin: true },
    { path: '/technology', title: 'Technology', icon: 'content_paste', class: '', onlyAdmin: true },
    { path: '/department', title: 'Department', icon: 'dashboard', class: '', onlyAdmin: true },
    { path: '/project', title: 'Project', icon: 'content_paste', class: '', onlyAdmin: true },
    { path: '/bugs', title: 'Bug', icon: 'bug_report', class: '', onlyAdmin: true },
  ];

  // for success message of toster
  loggerSuccess(msg: string, timeOut = 1500) {
    this.toastr.success(msg, 'Success', { timeOut: timeOut, progressBar: true });
  }


  // for info message of toster
  loggerInfo(msg: string, timeOut = 2500) {
    this.toastr.info(msg, 'Info', { timeOut: timeOut, progressBar: true });
  }

  // for error message of toster
  loggerError(msg: string, timeOut = 2500) {
    this.toastr.error(msg, 'Error', { timeOut: timeOut, progressBar: true });
  }

  // for warning message of toster
  loggerWarning(msg: string, timeOut = 2500) {
    this.toastr.warning(msg, 'Warning', { timeOut: timeOut, progressBar: true });
  }

  // for show loader
  showLoader() {
    this.spinner.show();
  }

  // for hide loader
  hideLoader() {
    this.spinner.hide();
  }

  // for remove white space of input text
  trimming_function(x: any) {
    return x ? x.replace(AppConst.trimPattern, '') : '';
  }


  // for remove local storage value
  removeLocalStorage(storageKey: any) {
    return localStorage.removeItem(storageKey);
  }

  // for delete local storage value
  deleteLocalStorage() {
    localStorage.clear();
  }

  // for set local storage value
  setLocalStorage(storageKey: any, storageValue: any) {
    localStorage.setItem(storageKey, storageValue);
  }

  getIsAdmin() {
    return localStorage.getItem('isAdmin');
  }

  checkIfAdminLogged() {
    let isAdmin = this.getIsAdmin();
    if (isAdmin != "true") {
      this.router.navigate(['/dashboard']);
    }
  }



}
