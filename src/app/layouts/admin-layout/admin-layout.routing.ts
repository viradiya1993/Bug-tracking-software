import { Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';

export const AdminLayoutRoutes: Routes = [

    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: () => import('./../dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
    { path: 'maps', loadChildren: () => import('./../maps/maps.module').then(m => m.MapModule), canActivate: [AuthGuard] },
    { path: 'user-profile', loadChildren: () => import('./../user-profile/user-profile.module').then(m => m.UserProfileModule), canActivate: [AuthGuard] },
    { path: 'change-password', loadChildren: () => import('./../change-password/change-password.module').then(m => m.ChangePasswordModule), canActivate: [AuthGuard] },
    { path: 'table-list', loadChildren: () => import('./../table-list/table-list.module').then(m => m.TableListModule), canActivate: [AuthGuard] },
    { path: 'typography', loadChildren: () => import('./../typography/typography.module').then(m => m.TypographyModule), canActivate: [AuthGuard] },
    { path: 'icons', loadChildren: () => import('./../icons/icons.module').then(m => m.IconModule), canActivate: [AuthGuard] },
    { path: 'notifications', loadChildren: () => import('./../notifications/notifications.module').then(m => m.NotificationsModule), canActivate: [AuthGuard] },
    { path: 'employee', loadChildren: () => import('./../employee/employee.module').then(m => m.EmployeeModule), canActivate: [AuthGuard] },
    { path: 'technology', loadChildren: () => import('./../technology/technology.module').then(m => m.TechnologyModule), canActivate: [AuthGuard] },
    { path: 'department', loadChildren: () => import('./../department/department.module').then(m => m.DepartmentModule), canActivate: [AuthGuard] },
    { path: 'project', loadChildren: () => import('./../project/project.module').then(m => m.ProjectModule), canActivate: [AuthGuard]},
    { path: 'bugs', loadChildren: () => import('./../bugs/bugs.module').then(m => m.BugsModule), canActivate: [AuthGuard]},
    { path: 'bugsType', loadChildren: () => import('./../bugtypes/bugtypes.module').then(m => m.BugtypesModule), canActivate: [AuthGuard]},
    { path: 'bugStatus', loadChildren: () => import('./../bugstatus/bugstatus.module').then(m => m.BugstatusModule), canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];


