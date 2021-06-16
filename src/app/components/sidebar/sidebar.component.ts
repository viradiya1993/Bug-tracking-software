import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { SharedService } from 'app/shared/shared.service';

declare const $: any;
// declare interface RouteInfo {
//   path: string;
//   title: string;
//   icon: string;
//   class: string;
//   onlyAdmin: boolean
// }
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

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  private isAdminLogged;
  constructor(
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.isAdminLogged = this.sharedService.getIsAdmin();
    if (this.isAdminLogged == "true") {
      this.menuItems = this.sharedService.ROUTES.filter(menuItem => menuItem);
    } else {
      this.menuItems = this.sharedService.ROUTES.filter(menuItem => menuItem.onlyAdmin == false);

    }
  }

  logout() {
    this.authService.logout();
    // this.router.navigate(['/login']);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
