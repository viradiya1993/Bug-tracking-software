import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { SharedService } from 'app/shared/shared.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private sharedService: SharedService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let getToken = localStorage.getItem('isLoggedin');
        if (req.url.includes('') || req.url.includes('')) {
            let token = getToken == null ? '' : getToken;
            const copiedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
            return next.handle(copiedReq);
        }
        this.sharedService.showLoader();

        if (getToken != null) {
            let token = getToken == null ? '' : getToken;
            const copiedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
            return next.handle(copiedReq)
                .pipe(
                    // Log when response observable either completes or errors
                    finalize(() => {
                        //this.sharedService.hideLoader();
                    })
                )
        }
        else {
            // this.sharedService.hideLoader();
            return next.handle(req).pipe(
                // Log when response observable either completes or errors
                finalize(() => {
                    //this.sharedService.hideLoader();
                })
            );
        }
    }
}