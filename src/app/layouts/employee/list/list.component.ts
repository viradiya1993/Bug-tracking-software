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
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'mobile_number', 'department', 'role', 'action'];
  dataSource: MatTableDataSource<EmployeeData>;
  total = 0;
  PerPage = AppConst.pageSize;
  currentPage = 1;
  pageSizeOptions = AppConst.pageSizeOptions;
  isLoading = false;
  sortType: string = 'desc';
  searchKey: any = null;
  formEmployeeSearch: FormGroup;
  gendersArray: any = AppConst.genderArray;
  roleArray: [] = [];
  departmentArray: [] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
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
      roleId: new FormControl('')
    });
    this.isLoading = true;
    this.spinner.show();
    this.getDepartment();
    this.getRoles();
    this.getEmployeeData();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event) {
    console.log(this.formEmployeeSearch.value);
    // let formValue = this.formEmployeeSearch.value;
    // let filteredObject = {
    //   first_name: formValue.first_name ? formValue.first_name : '',
    //   middle_name: formValue.middle_name ? formValue.middle_name : '',
    //   last_name: formValue.last_name ? formValue.last_name : '',
    //   email: formValue.email ? formValue.email : '',
    //   mobile_number: formValue.mobile_number ? formValue.mobile_number : '',
    //   gender: formValue.gender ? formValue.gender : '',
    // }
    // console.log(filteredObject);

    this.getEmployeeData();
  }

  getEmployeeData() {
    this.page["params"] = this.formEmployeeSearch.value;
    console.log(this.page);
    this.service.getEmployeeList(this.page).subscribe((res: any) => {
      console.log(res);
      this.isLoading = false;
      this.spinner.hide();
      if (res.employeeLists) {
        this.dataSource = new MatTableDataSource(res.employeeLists);
        this.total = res.count;
      }
    },
      (err) => {
        console.log(err);
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
      // this.getRoles();
      console.log(this.departmentArray);
    });
  }

  getRoles() {
    this.layoutService.getRolesData().subscribe(res => {
      console.log(res);
      if (res.userRoles) {
        this.roleArray = res.userRoles;
      }
      // this.setEmployeeData();
    });
  }
  onChangedPage(pageData: PageEvent) {
    // this.isLoading = true;
    this.spinner.show();
    console.log(pageData);

    this.page.size = pageData.pageSize;
    this.page.pageNumber = pageData.pageIndex + 1;

    this.getEmployeeData();

  }

  sortTable(event) {
    console.log(event);
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
          console.log(res);

          this.getEmployeeData();
          this.sharedService.loggerSuccess(res.message);
        })
      }
    }, err => {
      this.sharedService.loggerError(err.message);
    });
  }

  create(action, obj) {
    console.log(action, obj);
    obj.action = action;
    this.router.navigate(['/employee/add']);
  }

  resetSearchFilter(): void {
    this.formEmployeeSearch.reset();
    this.setFormValueOnReset();
    this.getEmployeeData();
  }

  setFormValueOnReset(): void {
    let defaultValue = {
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      mobile_number: '',
      gender: '',
      departmentId: '',
      roleId: ''
    }
    this.formEmployeeSearch.patchValue(defaultValue)
  }

}