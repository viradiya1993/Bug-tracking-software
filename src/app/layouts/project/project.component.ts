import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppConst } from 'app/app.constant';
import { DeleteBoxComponent } from 'app/shared/delete-box/delete-box.component';
import { SharedService } from 'app/shared/shared.service';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  searchKey: any = null;
  page: any = 0;
  limit: number = AppConst.pageSize;
  length: any;
  dataSource: any;
  sortName: String = 'project_no';
  sortType: String = 'desc';
  index: number;
 
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['project_no', 'project_name', 'technology', 'department', 'project_manager', 'employee', 'start_date', 'end_date', 'status', 'project_description', 'action'];
  constructor(
    public projectService: ProjectService,
    public sharedService: SharedService,
    private router: Router,
    public dialog: MatDialog,
  ) { this.sharedService.showLoader() }

  ngOnInit(): void {
    this.getProjectList();
  }

  getProjectList() {
    var projects: any = [];
    this.projectService.getProjectList(this.limit, this.page, this.sortName, this.sortType, this.searchKey)
    .subscribe((res: any) => {
      this.sharedService.hideLoader();
      this.dataSource = new MatTableDataSource(res.data.projects);
      this.length = res.data.totalcount
    }, err => {
      this.sharedService.loggerError(err.error.message);
      this.sharedService.showLoader();
    });
  }

  resetFilter() {
    this.page = 0;
    this.index = 0;
    this.getProjectList();
  }

  /**
   * for search after page goto 1
  * // TODO: resetIndex
  * @param event
  */
   resetIndex(e) {
    this.index = e;
  }

  /**
* for serching table
* // TODO: receiveSearchValue
* @returns list of project related to search
*/
  receiveSearchValue(searchKey: any) {
    if (this.searchKey !== searchKey) {
      this.searchKey = searchKey;
      this.limit = AppConst.pageSize;
      this.page = 0;
      this.getProjectList();
    }
  }

  /**
  * for pagination
  * // TODO: receiveMessage
  * @param event
  */
  receiveMessage(event: any) {
    this.limit = event.pageSize;
    this.page = event.pageIndex;
    this.getProjectList();
  }

   /**
   * for shorting table value
  * // TODO: sortItem
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
    this.getProjectList();
  }

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(DeleteBoxComponent, {
      width: '350px',
      data: AppConst.projectdeleteMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.deleteProject(id).subscribe((res: any) => {
          this.getProjectList();
          this.sharedService.loggerSuccess(res.message);
        })
      }
    }, err => {
       this.sharedService.loggerError(err.message);
    });
  } 
}
