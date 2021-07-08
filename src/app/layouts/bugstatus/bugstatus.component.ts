import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppConst } from 'app/app.constant';
import { DeleteBoxComponent } from 'app/shared/delete-box/delete-box.component';
import { SharedService } from 'app/shared/shared.service';
import { BugstatusService } from './bugstatus.service';

@Component({
  selector: 'app-bugstatus',
  templateUrl: './bugstatus.component.html',
  styleUrls: ['./bugstatus.component.css']
})
export class BugstatusComponent implements OnInit {
  searchKey: any = null;
  page: any = 0;
  limit: number = AppConst.pageSize;
  length: any;
  dataSource: any;
  sortName: String = 'bugstatus';
  sortType: String = 'desc';
  index: number;
  displayedColumns: string[] = ['bugstatus', 'color', 'action'];
  send: string = "BugStatus";
  @ViewChild(MatSort) sort: MatSort;
  showFilter = false;
  constructor(
    private service: BugstatusService,
    private sharedService: SharedService,
    public dialog: MatDialog) { this.sharedService.showLoader() }

  ngOnInit(): void {
    this.getBugStatus();
  }

  //Get Bug Types
  getBugStatus() {
    this.service.getBugStatusList(this.limit, this.page, this.sortName, this.sortType, this.searchKey)
    .subscribe((res: any) => {
      if (res) {
        this.sharedService.hideLoader();
        this.dataSource = new MatTableDataSource(res.data.bugStatus);
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
    this.getBugStatus();
  }

  resetIndex(e) {
    this.index = e;
  }

  receiveSearchValue(searchKey: any) {
    if (this.searchKey !== searchKey) {
      this.searchKey = searchKey;
      this.limit = AppConst.pageSize;
      this.page = 0;
      this.getBugStatus();
    }
  }

  receiveMessage(event: any) {
    this.limit = event.pageSize;
    this.page = event.pageIndex;
    this.getBugStatus();
  }

  sortItem(sortItem) {
    this.sortName = sortItem;
    if (this.sortType === 'desc') {
      this.sortType = 'asc';
    } else if (this.sortType === 'asc') {
      this.sortType = 'desc';
    }
    this.getBugStatus();
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(DeleteBoxComponent, {
      width: '350px',
      data: AppConst.bugstatusDeleteMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteBugStatus(id).subscribe((res: any) => {
          this.getBugStatus();
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
