import { Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';

export const AdminLayoutRoutes: Routes = [
   
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard',    canActivate: [AuthGuard],    loadChildren:() => import('./../dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'maps',         canActivate: [AuthGuard],    loadChildren:() => import('./../maps/maps.module').then(m => m.MapModule) },
    { path: 'user-profile', canActivate: [AuthGuard],    loadChildren:() => import('./../user-profile/user-profile.module').then(m => m.UserProfileModule) },
    { path: 'change-password',       loadChildren:() => import('./../change-password/change-password.module').then(m => m.ChangePasswordModule) },
    { path: 'table-list',   canActivate: [AuthGuard],    loadChildren:() => import('./../table-list/table-list.module').then(m => m.TableListModule)  },
    { path: 'typography',   canActivate: [AuthGuard],    loadChildren:() => import('./../typography/typography.module').then(m => m.TypographyModule) },
    { path: 'icons',        canActivate: [AuthGuard],    loadChildren:() => import('./../icons/icons.module').then(m => m.IconModule) },
    { path: 'notifications', canActivate:[AuthGuard],    loadChildren:() => import('./../notifications/notifications.module').then(m => m.NotificationsModule)},
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];


 