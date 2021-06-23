import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


import { AppConst } from 'app/app.constant';
import { AuthService } from 'app/auth/auth.service';
import { DeleteBoxComponent } from 'app/shared/delete-box/delete-box.component';
import { SharedService } from 'app/shared/shared.service';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  searchKey: any = null;
  page: any = 0;
  limit: number = AppConst.pageSize;
  length: any;
  dataSource: any;
  sortName: String = 'no';
  sortType: String = 'desc';
  index: number;
  displayedColumns: string[] = ['department', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private service: DepartmentService,
    private sharedService: SharedService,
    private authService: AuthService,
    public dialog: MatDialog,
  ) {
    // Check If Loggin as Admin
    this.sharedService.checkIfAdminLogged();

  }

  ngOnInit(): void {
    this.sharedService.showLoader();
    this.getDepartmentList();
  }

  getDepartmentList() {
    this.service.getDepartmentList(this.limit, this.page, this.sortName, this.sortType, this.searchKey)
      .subscribe((res: any) => {
        if (res) {
          this.sharedService.hideLoader();
          this.dataSource = new MatTableDataSource(res.userDepartment);
          this.length = res.userDepartment_Count;
        }
      }, err => {
        this.sharedService.showLoader();
      })
  }

  /**
* for serching table
* @returns list of project related to search
*/
  receiveSearchValue(searchKey: any) {
    if (this.searchKey !== searchKey) {
      this.searchKey = searchKey;
      this.limit = AppConst.pageSize;
      this.page = 0;
      this.getDepartmentList();
    }
  }

  /**
  * for pagination
  * // TODO: receiveMessage
  * @param event
  */
  receiveMessage(event: any) {
    // console.log(event);

    this.limit = event.pageSize;
    this.page = event.pageIndex;
    this.getDepartmentList();
  }

  /**
  * for shorting table value
 * @param sortItem
 * @returns asc , desc
 */
  sortItem(sortItem) {
    this.sortName = sortItem;
    if (this.sortType === 'desc') {
      this.sortType = 'asc';
    } else if (this.sortType === 'asc') {
      this.sortType = 'desc';
    }
    this.getDepartmentList();
  }

  resetFilter() {
    this.page = 0;
    this.index = 0;
    this.getDepartmentList();
  }

  /**
   * for search after page goto 1
  * // TODO: resetIndex
  * @param event
  */
  resetIndex(e) {
    this.index = e;
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(DeleteBoxComponent, {
      width: '350px',
      data: AppConst.departmentDeleteMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteDepartment(id).subscribe((res: any) => {
          console.log(res);

          this.getDepartmentList();
          this.sharedService.loggerSuccess(res.message);
        })
      }
    }, err => {
      this.sharedService.loggerError(err.message);
    });
  }
}
