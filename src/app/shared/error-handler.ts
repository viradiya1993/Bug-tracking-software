import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler, Injector , NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ErrorsHandlerService implements ErrorHandler {

    constructor(private injector: Injector,
        private toastr: ToastrService, private zone: NgZone) {
    }

    handleError(error: Error | HttpErrorResponse) {
        const router = this.injector.get(Router);

        if (error instanceof HttpErrorResponse) {
            // Server or connection error happened
            if (!navigator.onLine) {
                // Handle offline error
            } else {
                // Handle Http Error (error.status === 403, 404...)
                if (error.status === 401) {
                    localStorage.clear();
                    this.toastr.error(error.error.message, 'Error', { timeOut: 2500, progressBar: true });
                    this.zone.run(() => { router.navigate(['/login']) });
                } else if (error.error) {
                    this.toastr.error(error.error.message, 'Error', { timeOut: 2500, progressBar: true });
               }
                // if(error.status === 401){
                //     let router = this.injector.get(Router);
                //     document.getElementById('logoutJD').click();
                //     router.navigate(['signin']);
                // }
            }
        } else {
            // Handle Client Error (Angular Error, ReferenceError...)     
        }
        console.log(error)
    }
}