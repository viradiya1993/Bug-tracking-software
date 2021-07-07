import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppConst } from 'app/app.constant';
import { DeleteBoxComponent } from 'app/shared/delete-box/delete-box.component';
import { SharedService } from 'app/shared/shared.service';
import { BugtypeService } from './bugtype.service';

@Component({
  selector: 'app-bugtypes',
  templateUrl: './bugtypes.component.html',
  styleUrls: ['./bugtypes.component.css']
})
export class BugtypesComponent implements OnInit {
  searchKey: any = null;
  page: any = 0;
  limit: number = AppConst.pageSize;
  length: any;
  dataSource: any;
  sortName: String = 'bugType';
  sortType: String = 'desc';
  index: number;
  displayedColumns: string[] = ['bugType', 'action'];
  send: string = "BugType";
  @ViewChild(MatSort) sort: MatSort;
  showFilter = false;
  constructor(
      private service: BugtypeService, 
      private sharedService: SharedService,
      public dialog: MatDialog) { this.sharedService.showLoader() }

  ngOnInit(): void {
    this.getBugType();
  }
  
  //Get Bug Types
  getBugType() {
    this.service.getBugTypeList(this.limit, this.page, this.sortName, this.sortType, this.searchKey)
    .subscribe((res: any) => {
      if (res) {
        this.sharedService.hideLoader();
        this.dataSource = new MatTableDataSource(res.data.bugType);
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
    this.searchKey = null
    this.getBugType();
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
      this.getBugType();
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
    this.getBugType();
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
    this.getBugType();
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(DeleteBoxComponent, {
      width: '350px',
      data: AppConst.bugtypeDeleteMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteBugType(id).subscribe((res: any) => {
          this.getBugType();
          this.sharedService.loggerSuccess(res.message);
        })
      }
    }, err => {
      this.sharedService.loggerError(err.message);
    });
  }

  showFilterBox() {
    this.showFilter = !this.showFilter;
  }
}
