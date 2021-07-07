import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppConst } from 'app/app.constant';
import { AuthService } from 'app/auth/auth.service';
import { DeleteBoxComponent } from 'app/shared/delete-box/delete-box.component';
import { SharedService } from 'app/shared/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LayoutService } from '../layout.service';
import { TechnologyService } from './technology.service';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent implements OnInit {
  searchKey: any = null;
  page: any = 0;
  limit: number = AppConst.pageSize;
  length: any;
  dataSource: any;
  sortName: String = 'no';
  sortType: String = 'desc';
  index: number;
  displayedColumns: string[] = ['technology', 'action'];
  send: string = "Technology";
  @ViewChild(MatSort) sort: MatSort;
  showFilter = false;
  constructor(
    private service: TechnologyService,
    private sharedService: SharedService,
    private authService: AuthService,
    public dialog: MatDialog,
  ) { this.sharedService.showLoader() }

  ngOnInit(): void {
    this.getTechnology();
  }

  showFilterBox() {
    this.showFilter = !this.showFilter;
  }
  getTechnology() {
    this.service.getTechnology(this.limit, this.page, this.sortName, this.sortType, this.searchKey)
      .subscribe((res: any) => {
        if (res) {
          this.sharedService.hideLoader();
          this.dataSource = new MatTableDataSource(res.data.technology);
          this.length = res.data.totalcount;
        }
      }, err => {
        this.sharedService.loggerError(err.error.message);
        this.sharedService.showLoader();
      })
  }

  resetFilter() {
    this.page = 0;
    this.index = 0;
    this.getTechnology();
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
      this.getTechnology();
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
    this.getTechnology();
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
    this.getTechnology();
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(DeleteBoxComponent, {
      width: '350px',
      data: AppConst.technologydeleteMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deletetechnology(id).subscribe((res: any) => {
          this.getTechnology();
          this.sharedService.loggerSuccess(res.message);
        })
      }
    }, err => {
      this.sharedService.loggerError(err.message);
    });
  }
}
