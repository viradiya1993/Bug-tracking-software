import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


import { AppConst } from 'app/app.constant';
import { AuthService } from 'app/auth/auth.service';
import { EmployeeData } from 'app/model/employee.model';
import { SharedService } from 'app/shared/shared.service';
import { EmployeeService } from '../employee.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from 'app/shared/dialog/dialog.component';
import { Page } from 'app/shared/page';
import { DeleteBoxComponent } from 'app/shared/delete-box/delete-box.component';
import { LayoutService } from 'app/layouts/layout.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'status', 'mobile_number', 'department', 'role', 'action'];
  dataSource: MatTableDataSource<EmployeeData>;
  total = 0;
  PerPage = AppConst.pageSize;
  currentPage = 1;
  pageSizeOptions = AppConst.pageSizeOptions;
  isLoading = false;
  sortType: string = 'desc';
  searchKey: any = null;
  formEmployeeSearch: FormGroup;
  // gendersArray: any = AppConst.genderArray;
  gendersArray: [] = [];
  roleArray: [] = [];
  departmentArray: [] = [];
  employeeStatus: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  showFilter = false;
  // @Output() sendObjectData = new EventEmitter();

  page = new Page();
  constructor(
    public dialog: MatDialog,
    private service: EmployeeService,
    private spinner: NgxSpinnerService,
    private sharedService: SharedService,
    private layoutService: LayoutService,
    private authService: AuthService,
    private router: Router
  ) {
    // Check If Loggin as Admin
    this.sharedService.checkIfAdminLogged();
  }


  ngOnInit(): void {
    this.page.pageNumber = 0;
    this.page.size = this.PerPage;
    this.page.sortby = '';
    this.page.sortOrder = '';

    this.formEmployeeSearch = new FormGroup({
      first_name: new FormControl(''),
      middle_name: new FormControl(''),
      last_name: new FormControl(''),
      email: new FormControl(''),
      mobile_number: new FormControl(''),
      gender: new FormControl(''),
      departmentId: new FormControl(''),
      roleId: new FormControl(''),
      status: new FormControl('')
    });
    this.isLoading = true;
    this.spinner.show();
    this.getDepartment();
    this.getRoles();
    this.getGender();
    this.getEmployeeData();
    this.getEmpStatus();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  showFilterBox() {
    this.showFilter = !this.showFilter;
  }
  
  applyFilter() {
    this.getEmployeeData();
  }

  getEmployeeData() {
    this.page["params"] = this.formEmployeeSearch.value;
    this.service.getEmployeeList(this.page).subscribe((res: any) => {
      this.isLoading = false;
      this.spinner.hide();
      if (res.employeeLists) {
        this.dataSource = new MatTableDataSource(res.employeeLists);
        this.total = res.count;
      }
    },
      (err) => {
        if (err.error.message) {
          this.spinner.hide();
          if (err.status == 401) {
            this.authService.logout();
            err.error.message = "Token Expires Login Again";
          }
          this.sharedService.loggerError(err.error.message);
        }
      })
  }

  getDepartment() {
    this.layoutService.getDepartmentData().subscribe(res => {
      if (res.userDepartment) {
        this.departmentArray = res.userDepartment;
      }
    });
  }

  getRoles() {
    this.layoutService.getRolesData().subscribe(res => {
      if (res.userRoles) {
        this.roleArray = res.userRoles;
      }
    });
  }
  getEmpStatus() {
    this.layoutService.getEmpStatus().subscribe((res: any) => {
      this.employeeStatus = res.status
    });
  }

  getGender() {
    this.layoutService.getGenderData().subscribe((res: any) => {
      if (res.data) {
        this.gendersArray = res.data;
      }
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.spinner.show();
    this.page.size = pageData.pageSize;
    this.page.pageNumber = pageData.pageIndex;
    this.getEmployeeData();

  }

  sortTable(event) {
    this.spinner.show();
    this.page.sortby = event.active + ':' + event.direction;
    this.getEmployeeData();
  }


  openDialog(id): void {
    const dialogRef = this.dialog.open(DeleteBoxComponent, {
      width: '350px',
      data: AppConst.departmentDeleteMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteEmployee(id).subscribe((res: any) => {
          this.getEmployeeData();
          this.sharedService.loggerSuccess(res.message);
        })
      }
    }, err => {
      this.sharedService.loggerError(err.message);
    });
  }

  create(action, obj) {
    obj.action = action;
    this.router.navigate(['/employee/add-employee']);
  }

  resetSearchFilter(): void {
    this.formEmployeeSearch.reset();
    this.getEmployeeData();
  }

}