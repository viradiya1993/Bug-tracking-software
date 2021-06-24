import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';


import {
  AgmCoreModule
} from '@agm/core';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { MatInputModule } from '@angular/material/input';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { SharedModule } from './shared/shared.module';

import { SharedService } from './shared/shared.service';

import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HttpErrorInterceptor } from './shared/error-handler';
import { SignupComponent } from './auth/signup/signup.component';
import { LayoutService } from "./layouts/layout.service";
import { ListComponent } from './layouts/employee/list/list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatInputModule,
    SharedModule,
    ToastrModule.forRoot({
      // timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCD4HEW9A9rwS51T5kEZ6vOz6itrH-6kPw'
    }),
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularMultiSelectModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SignupComponent
  ],
  providers: [
    SharedService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      //useClass: ErrorsHandlerService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    LayoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
