import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()

export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        public toasterService: ToastrService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                        console.log('this is client side error');
                        errorMsg = `Error: ${error.error.message}`;

                    }
                    else {
                        console.log('this is server side error');
                        console.log(error);

                        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                        if (error.status === 401) {
                            localStorage.clear();
                            this.toasterService.error(error.error.message, 'Error', { timeOut: 2500, progressBar: true });
                            this.router.navigateByUrl('/login');
                        } else if (error.error) {
                            this.toasterService.error(error.error.message, 'Error', { timeOut: 2500, progressBar: true });
                        }
                    }
                    console.log(error.error);
                    return throwError(error);
                })
            )
    }
}