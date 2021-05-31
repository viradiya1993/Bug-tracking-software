import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConst } from './../app.constant'


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private toastr: ToastrService, private spinner: NgxSpinnerService) { }



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

}
