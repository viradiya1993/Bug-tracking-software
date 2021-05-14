import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes =[
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'}, 
  { path: 'login', component: LoginComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: '', component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren:() => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  },

  

];
//{ path: 'onboarding', loadChildren: () => import('./pages/onboarding/onboarding.module').then(m => m.OnboardingModule), canActivate: [AuthGuard] },

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [],
})
export class AppRoutingModule { }
