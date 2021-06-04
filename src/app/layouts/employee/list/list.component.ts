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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @Output() sendObjectData = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private service: EmployeeService,
    private spinner: NgxSpinnerService,
    private sharedService: SharedService,
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoading = true;
    this.spinner.show();
    this.getEmployeeData();
  }


  ngOnInit(): void {
    this.formEmployeeSearch = new FormGroup({
      first_name: new FormControl(null),
      middle_name: new FormControl(null),
      last_name: new FormControl(null)
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event) {
    console.log(this.formEmployeeSearch.value);
    let formValue = this.formEmployeeSearch.value;
    let filteredObject = {
      first_name: formValue.first_name,
      middle_name: formValue.middle_name,
      last_name: formValue.last_name
    }
    console.log(filteredObject);

    this.getEmployeeData();
  }

  getEmployeeData() {
    this.service.getEmployeeList(this.PerPage, this.currentPage, this.sortType, this.searchKey).subscribe((res) => {
      console.log(res);
      this.isLoading = false;
      this.spinner.hide();
      if (res.employeeLists.length) {
        this.dataSource = res.employeeLists;
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

  onChangedPage(pageData: PageEvent) {
    // this.isLoading = true;
    this.spinner.show();
    console.log(pageData);
    this.PerPage = pageData.pageSize;
    this.currentPage = pageData.pageIndex + 1;
    // this.service.getEmployeeList(this.PerPage, this.currentPage);
    this.getEmployeeData();

  }

  sortTable(event) {
    console.log(event);
    this.spinner.show();
    // this.PerPage = event.active;
    this.sortType = event.active + ':' + event.direction;
    this.getEmployeeData();
  }
  // openDialog(action, obj) {
  //   obj.action = action;
  //   const dialogRef = this.dialog.open(DialogBoxComponent, {
  //     width: '500px',
  //     data: obj
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     // if (result.event == 'Add') {
  //     //   this.addRowData(result.data);
  //     // } else if (result.event == 'Update') {
  //     //   this.updateRowData(result.data);
  //     // } else if (result.event == 'Delete') {
  //     //   this.deleteRowData(result.data);
  //     // }
  //   });
  // }

  create(action, obj) {
    console.log(action, obj);
    obj.action = action;
    this.router.navigate(['/employee/add']);
  }
}
