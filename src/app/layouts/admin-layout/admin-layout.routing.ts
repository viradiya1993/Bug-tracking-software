import { Routes } from '@angular/router';

export const AdminLayoutRoutes: Routes = [
   
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard',    loadChildren:() => import('./../dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'maps',         loadChildren:() => import('./../maps/maps.module').then(m => m.MapModule) },
    { path: 'user-profile', loadChildren:() => import('./../user-profile/user-profile.module').then(m => m.UserProfileModule) },
    { path: 'table-list',   loadChildren:() => import('./../table-list/table-list.module').then(m => m.TableListModule)  },
    { path: 'typography',   loadChildren:() => import('./../typography/typography.module').then(m => m.TypographyModule) },
    { path: 'icons',        loadChildren:() => import('./../icons/icons.module').then(m => m.IconModule) },
    { path: 'notifications',loadChildren:() => import('./../notifications/notifications.module').then(m => m.NotificationsModule)},
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];


